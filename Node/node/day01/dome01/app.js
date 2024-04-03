const md5 = require('md5');
const sd = require('silly-datetime');

console.log(md5("123456"));

let data = sd.format(new Date(), "YYYY-MM-DD")
console.log(data);
console.log(sd.format(+new Date() - 2000));