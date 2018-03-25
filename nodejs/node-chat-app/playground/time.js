const moment = require('moment');

const date = moment();
date.add(1, 'y')
  .subtract(3, 'M');
console.log(date.format('MMM Do, YYYY H:MM:ss'));
