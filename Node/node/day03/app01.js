const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
  // login || index
  // 1. 获取地址
  var path = req.url;
  path = path == "/" ? "/index" : path;
  // 2.读取文件
  if (req.url != "/favicon.ico") {
    fs.readFile("./static" + path + ".html", (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end("not fround");
      }

      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    })
  }
}).listen(3002);

console.log('Server running at http://127.0.0.1:3002/');