Date.prototype.add = function(qt, unit) {

  var years = 0;
  var months = 0;
  var days = 0;

  switch(unit){
    case 'y':
    case 'year':
    case 'years':
      years = qt;
      break;
    case 'M':
    case 'month':
    case 'months':
      months = qt;
      break;
    case 'd':
    case 'day':
    case 'days':
      days = qt;
      break;
    default: break;
  }


  var date = this;

  return new Date(date.getFullYear() + years,
              date.getMonth() + months,
              date.getDate() + days,
              0,
              0,
              0);
}
