# Angular Calendar

A simple, light calendar component for AngularJs

![alt text](https://github.com/tommaso-sebastianelli/angular-calendar/blob/master/screenshots/02.gif)

- [Demo](https://plnkr.co/edit/7eHoO3YeZzSSF3uUfpeS?p=preview)

## Features

- Only Angular and Angular Animate Required (No Momentjs, JQuery or fonts needed)
- Native Angular CSS Animations
- Fully responsive behavior
- Angular l18n date support
- Material design
- Lightweight

For the roadmap, check [issue](https://github.com/tommaso-sebastianelli/angular-calendar/issues)

## Requirements

- AngularJs 1.5.1 (or newer)
- Angular Animate 1.5.1 or (newer)

## Getting Started


### Install
#### app.js

```
angular.module('app', ['tsCal'])
```

#### index.html
```
<link rel="stylesheet" href="angular-calendar.min.css" />
<script src="angular-calendar.min.js"></script>
```

### Use
```
<ts-cal></ts-cal>
```

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp`
* Install local dev dependencies: `npm install` in repository directory

### Development Commands

* `gulp` to build and test
* `gulp build` to build demo and distribute plugin files
* `gulp dist` to distribute plugin files

## Authors

* [Tommaso Sebastianelli](https://github.com/tommaso-sebastianelli)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
