(function () {



  var week = {
    bindings:{
      date: '<'
    },
    require: {
      parent: '^tsCal'
    },
    controller: function(){
      this.days = [];
      var start = this.date;
      for(var i = 0; i < 7; i++){
        this.days.push({
          date: start
        });
        start = start.add(1, 'd');
      }
    },
    template:'<ts-cal-day class="ts-cal-day" ng-repeat="day in $ctrl.days" date="day.date"></ts-cal-day>'
  }

  angular
      .module('tsCal')
      .component('tsCalRow', week)

})();
