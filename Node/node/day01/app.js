// 引入http模块
var http = require('http');
/**
 * 创建服务
 * request 获取客户端传过来的信息
 * response 给浏览器的响应信息
 */
http.createServer(function (request, response) {
  // 设置响应头
  response.writeHead(200, {'Content-Type': 'text/plain'});
  // 页面显示的语句
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');