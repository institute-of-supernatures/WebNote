const fs = require('fs');

var path = "./wwwroot";
var dirArr = [];

fs.readdir(path, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  // 错误， fs里面的方法是异步的  经典面试题for循环setTimeout
  // for (var i = 0; i < data.length; i++) {
  //   fs.stat(path + "/" + data[i], (err, res) => {
  //     if (res.isDirectory()) {
  //       dirArr.push(data[i])
  //     }
  //   })
  // }

  // for(var i = 0; i < 3; i++ ){
  //   setTimeout(() => {
  //     console.log(i); // 3 3 3
  //   }, 100)
  // }

  (function getDir(i) {
    if (i == data.length) {
      console.log(dirArr);
      return;
    };
    fs.stat(path + "/" + data[i], (err, res) => {
      if (res.isDirectory()) {
        dirArr.push(data[i])
      }
      getDir(i + 1)
    })
  })(0);
})