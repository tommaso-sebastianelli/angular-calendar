(function() {



  var header = {
    bindings: {
      date: '<'
    },
    require: {
      parent: '^tsCal'
    },
    controller: function() {
      this.days = ['sunday', 'monday', 'thursday', 'wednesday', 'tuesday',
        'friday', 'saturday'
      ];
    },
    template: '<span class="ts-cal-day-header" ng-repeat="day in $ctrl.days">' +
      '<span class="ts-cal-ghost-align"></span>' +
      '<span>{{day.substring(0, 3)}}</span>' +
      '</span>'
  }

  angular
    .module('tsCal')
    .component('tsCalWeekHeader', header)

})();
