const http = require('http');
const routes = require('./module/routes');
const url = require('url');

// console.log(common.getMint(".js"));

http.createServer(function (req, res) {
  // 创建web服务
  routes.static(req, res, "static");

  var pathName = url.parse(req.url).pathname;
  if(pathName === "/login"){
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end("login")
  }else {
    res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end("not found")
  }


}).listen(3003);

console.log('Server running at http://127.0.0.1:3003/');