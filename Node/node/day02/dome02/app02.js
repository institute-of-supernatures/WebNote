const fs = require('fs');

// 获取文件流
var writeSteam = fs.createWriteStream('./output.text');


var data = "";
for(var i = 0; i < 6000; i++ ){
  data += "this is a data\n";
}

writeSteam.write(data);

// 标记写入完成
writeSteam.end();

writeSteam.on("finish", () => {
  console.log("写入完成");
})