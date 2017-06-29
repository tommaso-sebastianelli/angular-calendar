(function() {

  var cal = {
    bindings: {},
    controller: ctrl,
    template: function(){
      return '<div class="ts-cal-controls">' +
      '<ul class="controls">'+
      '<li class="control left">'+
      '<span class="today"></span>' +
      '</li>'+
        '<li class="control center">'+
        '<span class="prev ri ri-arrow-left ripple" ng-click="$ctrl.prev()"></span>' +
        '<span class="current"> {{$ctrl.labels.months[$ctrl.currentMonth]}}</span>'+
        '<span class="next ri ri-arrow-right ripple" ng-click="$ctrl.next()"></span>' +
        '</li>'+
        '<li class="control right">'+
        '<span class="today ri ri-calendar" ng-click="$ctrl.today()"></span>' +
        '</li>'+
        '</ul>' +
        '</div>' +
        '<div class="ts-cal-container">' +
        '<ts-cal-week-header class="ts-cal-week-header"></ts-cal-week-header>' +
        '<ts-cal-week class="ts-cal-week" ng-repeat="row in $ctrl.weeks" date="row.date"></ts-cal-week>' +
        '</div>'
    }
  };

  function ctrl(labels) {
    var self = this;
    this.labels = labels;
    self.currentMonth;

    this.$onInit = function() {
      self.weeks = [];
      init();
    };

    function init(date) {
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
  }

  angular
    .module('tsCal', ['ngAnimate'])
    .component('tsCal', cal);

})();
