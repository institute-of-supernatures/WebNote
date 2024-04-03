const url = require("url");

var api = "http://allen.io?name=hump&age=24";

console.log(url.parse(api, true));

var temp = url.parse(api, true).query;

console.log(temp);

console.log(`姓名: ${temp.name} -- 年龄: ${temp.age}`);