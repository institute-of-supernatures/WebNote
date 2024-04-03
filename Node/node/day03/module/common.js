const fs = require('fs');

exports.getMine = function (path) {
  switch (path) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    default:
      return "text/html";
  }
}

exports.getMint = function (path) {

  let data = fs.readFileSync("./data/index.json"); // 同步获取数据
  let mint = JSON.parse(data.toString());
  return (mint[path]);

  // return new Promise((resolve, reject) => {
  //   fs.readFile("./data/index.json", (err, data) => {
  //     if(err) {
  //       console.log(err);
  //       reject(err)
  //       return;
  //     }
  //     let mint = JSON.parse(data.toString());
  //     console.log(mint[path]);
  //     resolve(mint[path ]);
  //   })
  // })
}