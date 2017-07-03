(function() {

  var cal = {
    bindings: {},
    controller: ctrl,
    template: function($element, $attrs) {
      return '<div class="ts-cal-controls">' +
        '<ul class="controls">' +
        '<li class="control left">' +
        '<span class="today"></span>' +
        '</li>' +
        '<li class="control center">' +
        '<span class="prev ripple ripple-light ri ri-arrow-left ripple" ng-click="$ctrl.prev()"></span>' +
        '<span class="current"> {{$ctrl.labels.months[$ctrl.currentMonth]}}&nbsp;&nbsp;{{$ctrl.currentYear}}</span>' +
        '<span class="next ripple ripple-light ri ri-arrow-right ripple" ng-click="$ctrl.next()"></span>' +
        '</li>' +
        '<li class="control right">' +
        '<span ng-show="!$ctrl.isCurrentMonth()" class="today ri ri-calendar" ng-click="$ctrl.today()"></span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="ts-cal-container" data-ng-scroll-up="$ctrl.slideUp()" data-ng-scroll-down="$ctrl.slideDown()" ng-mouseenter="$ctrl.scrollAnimation()" ng-mouseleave="$ctrl.defaultAnimation()">' +
        '<ts-cal-week-header class="ts-cal-week-header"></ts-cal-week-header>' +
        '<ts-cal-week class="ts-cal-week animate-repeat" ng-repeat="row in $ctrl.weeks" date="row.date"></ts-cal-week>' +
        '</div>'
    }
  };

  function ctrl($element, $timeout, labels) {
    var self = this;
    this.labels = labels;
    self.currentMonth;
    self.currentYear;
    self.t;

    this.$onInit = function() {
      self.weeks = [];
      init();
    };

    function Week(start) {
      this.date = start;
    }

    /*function init(date) {
      self.weeks = [];
      var d = getFirstDate(date);
      self.currentMonth = d.add(7, 'd').getMonth();
      do {
        self.weeks.push({
          date: d
        });
        d = d.add(7, 'd');
      }
      while (d.getMonth() === self.currentMonth);
    }*/

    function init(date) {
      var d = getFirstDate(date);
      self.weeks = [];
      for (var i = 0; i < 6; i++) {
        self.weeks.push(new Week(d));
        d = d.add(7, 'd');
      }
      self.updateCurrentTime();
    }

    self.updateCurrentTime = function() {
      self.currentMonth = self.weeks[2].date.add(14, 'd').getMonth();
      self.currentYear = self.weeks[2].date.add(14, 'd').getFullYear();
    }

    self.isCurrentMonth = function(num) {
      if (num)
        return self.currentMonth === num;
      else
        return self.currentMonth === new Date().add(14, 'd').getMonth();
    }

    function getFirstDate(date) {
      if (!date)
        date = new Date();
      var first = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
      if (first.getDay() !== 0) {
        first = first.add(first.getDay() * -1, 'd');
      }
      return first;
    }

    self.today = function() {
      init();
    };
    self.next = function() {
      var d = self.weeks[0].date;
      init(d.add(7, 'd').add(1, 'M'));
    };
    self.prev = function() {
      var d = self.weeks[0].date;
      init(d.add(-7, 'd'));
    };

    self.slideUp = function() {
      $timeout.cancel(self.t);
      self.t = $timeout(function() {
        self.weeks.shift();
        var initDate = self.weeks[self.weeks.length - 1].date.add(7,
          'd');
        self.weeks.push(new Week(initDate));
        self.updateCurrentTime();
      }, 50);
    }

    self.slideDown = function() {
      $timeout.cancel(self.t);
      self.t = $timeout(function() {
        self.weeks.pop();
        var initDate = self.weeks[0].date.add(-7, 'd');
        self.weeks.unshift(new Week(initDate));
        self.updateCurrentTime();
      }, 50);
    }

    self.defaultAnimation = function() {
      $element.removeClass('ts-cal-css-scroll');
      $element.addClass('ts-cal-css-fade');
    };

    self.scrollAnimation = function() {
      $element.removeClass('ts-cal-css-fade');
      $element.addClass('ts-cal-css-scroll');
    };
  }

  angular
    .module('tsCal', ['ngAnimate', 'ngScroll'])
    .component('tsCal', cal);

  cal.$inject = ['$element', '$timeout', 'labels'];

})();
