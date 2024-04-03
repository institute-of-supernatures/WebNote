const http = require('http');
const routes = require('./module/routes');
const url = require('url');
const ejs = require('ejs'); // ejs 模版引擎

// console.log(common.getMint(".js"));

http.createServer(function (req, res) {
  // 创建web服务
  routes.static(req, res, "static");

  var pathName = url.parse(req.url).pathname;
  // new?page=1&size=10
  console.log(req.method) // 获取请求方式
  if (pathName === "/news") {
    let query = url.parse(req.url, true).query;
    console.log(query);

    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end("query");
  } else if (pathName === "/login") {
    ejs.renderFile("./views/logins.ejs", {}, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    })
  } else if (pathName === "/doLogin") {
    // post
    var postData = "";
    if(req.method == "POST"){
      req.on("data", (data) => {
        postData += data;
      })
      req.on("end", () => {
        try {
          postData = JSON.parse(postData);
        } catch (error) {
          
        }
        req.query = postData;
        console.log(req.query);
      })
    }
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end("post ok")
  } else if (pathName === '/admin') {
    let msg = "数据库数据";
    let list = [
      { data: "1" },
      { data: "2" },
      { data: "3" },
      { data: "4" },
    ]
    ejs.renderFile("./views/login.ejs", { msg: msg, list: list }, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end("not found")
  }


}).listen(3004);

console.log('Server running at http://127.0.0.1:3004/');