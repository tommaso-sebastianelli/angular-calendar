(function() {

  var day = {
    bindings: {
      date: '<'
    },
    require: {
      parent: '^tsCalWeek'
    },
    controller: function() {
      this.$onInit = function() {
        this.start = this.date;
        this.monthDay = this.start.getDate();
        this.weekDay = this.start.getDay();
        this.month = this.start.getMonth();
        this.year = this.start.getFullYear();

        var e = this.start.add(1, 'd');
        this.end = new Date(e.getFullYear(), e.getMonth(), e.getDate(),
          0, 0, 0);
        this.isCurrentMonth = function(num) {
            return num === this.parent.parent.currentMonth;
          }
          //this.events = (events) ? events : []; //array for storing events
      };
    },
    template: '<span class="ts-cal-ghost-align"></span>' +
      '<span class="ts-cal-placeholder">{{$ctrl.monthDay}}</span>'
  }

  angular
    .module('tsCal')
    .component('tsCalDay', day)

})();
