(function() {

  var cal = {
    bindings: {},
    controller: ctrl,
    template: function() {
      return '<div class="ts-cal-controls">' +
        '<ul class="controls">' +
        '<li class="control left">' +
        '<span class="today"></span>' +
        '</li>' +
        '<li class="control center">' +
        '<span class="prev ri ri-arrow-left ripple" ng-click="$ctrl.slideDown()"></span>' +
        '<span class="current"> {{$ctrl.labels.months[$ctrl.currentMonth]}}</span>' +
        '<span class="next ri ri-arrow-right ripple" ng-click="$ctrl.slideUp()"></span>' +
        '</li>' +
        '<li class="control right">' +
        '<span class="today ri ri-calendar" ng-click="$ctrl.today()"></span>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="ts-cal-container">' +
        '<ts-cal-week-header class="ts-cal-week-header"></ts-cal-week-header>' +
        '<ts-cal-week class="ts-cal-week animate-repeat" ng-repeat="row in $ctrl.weeks" date="row.date"></ts-cal-week>' +
        '</div>'
    }
  };

  function ctrl($timeout, labels) {
    var self = this;
    this.labels = labels;
    self.currentMonth;

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
      self.currentMonth = d.add(14, 'd').getMonth();
      self.weeks = [];
      for (var i = 0; i < 6; i++) {
        self.weeks.push({
          date: d
        });
        d = d.add(7, 'd');
      }
    }


    function getFirstDate(date) {
      if (!date)
        date = new Date();
      var first = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
      if (first.getDay() !== 0) {
        first = first.add(first.getDay() * -1, 'd');
      }
      return first.add(-7, 'd');
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
      self.weeks.shift();
      var initDate = self.weeks[self.weeks.length - 1].date.add(7, 'd');
      self.weeks.push(new Week(initDate));

    }

    self.slideDown = function() {
      self.weeks.pop();
      var initDate = self.weeks[0].date.add(-7, 'd');
      self.weeks.unshift(new Week(initDate));
    }

  }

  angular
    .module('tsCal', ['ngAnimate'])
    .component('tsCal', cal);

})();
