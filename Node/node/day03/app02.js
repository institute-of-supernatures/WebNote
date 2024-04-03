const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const common = require('./module/common.js');

// console.log(common.getMint(".js"));

http.createServer(function (req, res) {
  // login || index
  // 1. 获取地址
  var pathName = url.parse(req.url).pathname;
  pathName = pathName == "/" ? "/index.html" : pathName;

  let extName = path.extname(pathName); // 获取后缀
  // 2.读取文件
  if (req.url != "/favicon.ico") {
    fs.readFile("./static" + pathName, async (err, data) => {
      let mine = common.getMine(extName);
      let mint = await common.getMint(extName);
      console.log(mint);
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end("not fround");
      }

      res.writeHead(200, { 'Content-Type': mint+';charset="utf-8"' });
      res.end(data);
    })
  }
}).listen(3002);

console.log('Server running at http://127.0.0.1:3002/');