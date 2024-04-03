const http = require("http");

http.createServer((req, res) => {
  console.log(req.url); // 获取url
  
  res.writeHead(402, {"Conyent-type": "text/html;charset='utf-8'"});
  // 解决中文乱码
  res.write("<head><meta charset='utf-8'></head>");
  res.write("你好！")
  res.write("send");

  res.end();
}).listen(8002)