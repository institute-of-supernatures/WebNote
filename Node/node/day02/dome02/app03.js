const fs = require('fs');

var readStream = fs.createReadStream("./output.text");

var writeStream = fs.createWriteStream("./input.text");

// 管道流读取 (大文件)
readStream.pipe(writeStream);
console.log("完成");