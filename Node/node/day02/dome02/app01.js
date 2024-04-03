const fs = require('fs');

// 获取文件流
var readSteam = fs.createReadStream('./data.text');

var count = 0;
var str = "";
readSteam.on('data', (data) => {
  str += data;
  count++;
})

readSteam.on('end', () => {
  console.log(str);
  console.log(count);
})

readSteam.on('error', (err) => {
  console.log(err);
})