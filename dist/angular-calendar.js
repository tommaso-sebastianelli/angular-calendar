angular.module("tsCal",[]),function(){function t(t){function a(t){n.weeks=[];var a=e(t);n.currentMonth=a.add(7,"d").getMonth();do n.weeks.push({date:a}),a=a.add(7,"d");while(a.getMonth()===n.currentMonth)}function e(t){t||(t=new Date);var a=new Date(t.getFullYear(),t.getMonth(),1,0,0,0);return 0!==a.getDay()&&(a=a.add(a.getDay()*-1,"d")),a}var n=this;this.labels=t,n.currentMonth,this.$onInit=function(){n.weeks=[],a()},n.today=function(){a()},n.next=function(){var t=n.weeks[0].date;a(t.add(7,"d").add(1,"M"))},n.prev=function(){var t=n.weeks[0].date;a(t.add(-7,"d"))}}var a={bindings:{},controller:t,template:function(){return'<div class="ts-cal-controls"><ul class="controls"><li class="control left"><span class="today"></span></li><li class="control center"><span class="prev fa fa-angle-left" ng-click="$ctrl.prev()"></span><span class="today"> {{$ctrl.labels.months[$ctrl.currentMonth]}}</span><span class="next fa fa-angle-right" ng-click="$ctrl.next()"></span></li><li class="control right"><span class="today fa fa-calendar-o" ng-click="$ctrl.today()"></span></li></ul></div><div class="ts-cal-container"><ts-cal-week-header class="ts-cal-week-header"></ts-cal-week-header><ts-cal-week class="ts-cal-week" ng-repeat="row in $ctrl.weeks" date="row.date"></ts-cal-week></div>'}};angular.module("tsCal").component("tsCal",a)}(),function(){var t={bindings:{date:"<"},require:{parent:"^tsCalWeek"},controller:function(){this.$onInit=function(){this.start=this.date,this.monthDay=this.start.getDate(),this.weekDay=this.start.getDay(),this.month=this.start.getMonth(),this.year=this.start.getFullYear();var t=this.start.add(1,"d");this.end=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0),this.isCurrentMonth=function(t){return t===this.parent.parent.currentMonth}}},template:'<span class="ts-cal-placeholder" ng-class="{\'outside\' : !$ctrl.isCurrentMonth($ctrl.month)}">{{$ctrl.monthDay}}</span>'};angular.module("tsCal").component("tsCalDay",t)}(),function(){var t={bindings:{date:"<"},require:{parent:"^tsCal"},controller:function(){this.days=[];for(var t=this.date,a=0;a<7;a++)this.days.push({date:t}),t=t.add(1,"d")},template:'<ts-cal-day class="ts-cal-day" ng-repeat="day in $ctrl.days" date="day.date"></ts-cal-day>'};angular.module("tsCal").component("tsCalWeek",t)}(),function(){var t={bindings:{date:"<"},require:{parent:"^tsCal"},controller:function(){this.days=["sunday","monday","thursday","wednesday","tuesday","friday","saturday"]},template:'<span class="ts-cal-day-header" ng-repeat="day in $ctrl.days">{{day.substring(0, 3)}}</span>'};angular.module("tsCal").component("tsCalWeekHeader",t)}(),function(){var t={months:["January","February","March","April","May","June","July","August","September","October","November","December"]};angular.module("tsCal").constant("labels",t)}(),Date.prototype.add=function(t,a){var e=0,n=0,s=0;switch(a){case"y":case"year":case"years":e=t;break;case"M":case"month":case"months":n=t;break;case"d":case"day":case"days":s=t}var r=this;return new Date(r.getFullYear()+e,r.getMonth()+n,r.getDate()+s,0,0,0)};