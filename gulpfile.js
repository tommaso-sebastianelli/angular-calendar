var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var es = require("event-stream");
var concat = require('gulp-concat');
var depLinker = require('dep-linker');

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Gulp!');
})

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('src/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('demo'));
});

gulp.task('distJS', function() {
  return gulp.src(['src/js/**/*.js', '!src/js/app.js',
      'src/libs/ng-scroll/ng-scroll.js',
      '!src/libs/ng-scroll/src/**/*.js'
    ])
    .pipe(concat('angular-calendar.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('distCSS', function() {
  return gulp.src(['src/css/**/*.css', '!src/css/credits.css'])
    .pipe(concat('angular-calendar.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('demo/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('demo/fonts'))
})

//Pick node_modules from the backend
gulp.task('link-dependencies', function() {
  depLinker.linkDependenciesTo('src/libs');
});

// Cleaning
gulp.task('clean', function() {
  return del.sync('demo').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:demo', function() {
  return del.sync(['demo/**/*', '!demo/images', '!demo/images/**/*']);
});

gulp.task('clean:dist', function() {
  return del('dist/**/*');
});

gulp.task('clean:libs', function() {
  return del('src/libs/**/*');
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence('clean:libs', 'link-dependencies', ['sass', 'browserSync'],
    'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'link-dependencies',
    'clean:demo',
    'sass', ['useref', 'images', 'fonts'],
    'distribute',
    callback
  )
})

gulp.task('distribute', function() {
  runSequence(
    'clean:dist',
    'distJS',
    'distCSS'
  )
});
