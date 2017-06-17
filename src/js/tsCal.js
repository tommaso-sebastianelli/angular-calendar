(function() {



  var cal = {
    bindings: {},
    controller: function() {
      var self = this;
      this.$onInit = function() {
        self.weeks = [];
        init();
      };

      function init(date) {
        self.weeks = [];
        var d = getFirstDate(date);
        var currentMonth = d.add(7, 'd').getMonth();
        do {
          self.weeks.push({
            date: d
          });
          d = d.add(7, 'd');
        }
        while (d.getMonth() === currentMonth);
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
        init(d.add(1, 'M'));
      };
      self.prev = function() {
        var d = self.weeks[0].date;
        init(d.add(-1, 'M'));
      };
    },
    template: '<div class="ts-cal-actions">' +
      '<button class="today" ng-click="$ctrl.today()">today</button>' +
      '<button class="next" ng-click="$ctrl.next()">next</button>' +
      '<button class="prev" ng-click="$ctrl.prev()">prev</button>' +
      '</div>' +
      '<div class="ts-cal-container">' +
      '<ts-cal-row-header class="ts-cal-row-header"></ts-cal-row-header>' +
      '<ts-cal-row class="ts-cal-row" ng-repeat="row in $ctrl.weeks" date="row.date"></ts-cal-week>' +
      '</div>'
  };

  angular
    .module('tsCal')
    .component('tsCal', cal);

})();
