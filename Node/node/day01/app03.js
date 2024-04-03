const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  
  res.writeHead(200, {"Conyent-type": "text/html;charset='utf-8'"});
  // 解决中文乱码
  res.write("<head><meta charset='utf-8'></head>");

  if(req.url !== '/favicon.ico'){
    console.log(req.url); // 获取url
    
    // 获取url传参
    let getValue = url.parse(req.url, true).query;
    console.log(getValue);
    console.log(`姓名: ${getValue.name} -- 年龄: ${getValue.age}`);

  }

  // supervisor 热更新node
  res.write("你好 NodeJs！")
  res.write("send");

  res.end();
}).listen(8002)