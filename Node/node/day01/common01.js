const http = require("http");
const url = require("url");

// http://www.allen.io/api/list
function formtApi(api){
  return "http://www.allen.io" + api;
}

http.createServer((req, res) => {
  res.writeHead(200, {"Conyent-type": "text/html;charset='utf-8'"});
  // 解决中文乱码
  res.write("<head><meta charset='utf-8'></head>");

  var api = formtApi("/api/list");
  console.log(api);

  if(req.url !== '/favicon.ico'){
    console.log(req.url); // 获取url

    // 获取url传参
    let getValue = url.parse(req.url, true).query;
    console.log(getValue);
  }

  res.end();
}).listen(8802)