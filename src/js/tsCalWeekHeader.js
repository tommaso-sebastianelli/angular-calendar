(function() {



  var header = {
    bindings: {
      date: '<'
    },
    require: {
      parent: '^tsCal'
    },
    controller: function() {
      this.days = [];
      var start = this.date;
      for(var i = 0; i < 7; i++){
        this.days.push({
          date: start
        });
        start = start.add(1, 'd');
      }
    },
    template: '<span class="ts-cal-day-header" ng-repeat="day in $ctrl.days">' +
      '<span class="ts-cal-ghost-align"></span>' +
      '<span>{{day.date | date : \'EEE\'}}</span>' +
      '</span>'
  }

  angular
    .module('tsCal')
    .component('tsCalWeekHeader', header)

})();
