const fs = require('fs');
const path = require('path');
const url = require('url');

let getMint = function (extpath) {

  let data = fs.readFileSync("./data/index.json"); // 同步获取数据
  let mint = JSON.parse(data.toString());
  return (mint[extpath]);

}

exports.static = function (req, res, staticPath) {

  // login || index
  // 1. 获取地址
  var pathName = url.parse(req.url).pathname;
  pathName = pathName == "/" ? "/index.html" : pathName;

  let extName = path.extname(pathName); // 获取后缀
  // 2.读取文件
  if (req.url != "/favicon.ico") {
    let data = fs.readFileSync("./" + staticPath + pathName);

    if (data) {
      let mint = getMint(extName);
      console.log(mint);
      res.writeHead(200, { 'Content-Type': mint + ';charset="utf-8"' });
      res.end(data);
    }
    
    // fs.readFile("./" + staticPath + pathName, async (err, data) => {
    //   if (!err) {
    //     let mint = await getMint(extName);
    //     console.log(mint);
    //     res.writeHead(200, { 'Content-Type': mint + ';charset="utf-8"' });
    //     res.end(data);
    //   }
    // })
  }

}