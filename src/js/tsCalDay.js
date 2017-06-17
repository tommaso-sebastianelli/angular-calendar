(function () {

      var day = {
        bindings:{
          date: '<'
        },
        require: {
          parent: '^tsCalRow'
        },
        controller: function(){
          this.$onInit = function () {
            this.start = this.date;
            this.monthDay = this.start.getDate();
            this.weekDay = this.start.getDay();
            this.month = this.start.getMonth();
            this.year = this.start.getFullYear();

            var e = this.start.add(1, 'd');
            this.end = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);

            //this.events = (events) ? events : []; //array for storing events
          };
        },
        template: '<span class="placeholder">{{$ctrl.monthDay}}</span>'
      }

      angular
      .module('tsCal')
      .component('tsCalDay', day)

})();
