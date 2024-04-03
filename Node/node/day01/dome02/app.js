/**
 * fs.stat 判断是文件还是目录
 * fs.mkdir 创建目录
 * fs.writeFile 创建写入文件
 * fs.appendFile 追加文件
 * fs.readFile 读取文件
 * fs.readdir 读取目录
 * fs.rename 重命名/移动文件
 * fs.rmdir 删除目录
 * fs.unlink 删除文件
 */

// const fs = require('fs');

/**
 * path 文件目录
 * callback 回调函数
 *

  fs.stat("./html", (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
    // 文件
    console.log(res.isFile()); // false
    // 目录
    console.log(res.isDirectory()); // true
  })
  fs.stat("./package.json", (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(res);
    // 文件
    console.log(res.isFile()); // true
    // 目录
    console.log(res.isDirectory()); // false
  })

 */


/**
 * path 创建路径
 * mode 权限
 * callback 回调函数

fs.mkdir("./css", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("success");
})

 */


/**
 * path 创建路径
 * data 写入的数据
 * option 文件设置
 * callback 回调函数

fs.writeFile("./html/index.html", "Hello Html", (err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log("write file success");
})

 */

/**
 * path 文件路径 不存在回先创建
 * data 写入数据
 * callback 回调函数
 *

  fs.appendFile("./html/index.html", "Hello NodeJs", (err) => {
    if(err){
      console.log(err);
      return;
    }
    console.log("append File write success");
  })

 */

/**
 * 
 
fs.readFile("./html/index.html", (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(data); // buffer
    console.log(data.toString());
 })

 */

/**
 * 
 
 fs.readdir("./html", (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(data);
  })

 */

/**
 * 重命名/移动文件
 * 
 
 fs.rename("./css", "./scss", (err) => {
    if (err) {
      console.log(err);
      return;
    }
  })

 */

/**
 * 
 
 fs.unlink("./scss/base.scss", (err) => {
    if (err) {
      console.log(err);
      return;
    }
  })
  // 目录下有文件不可删除
  fs.rmdir("./scss", (err) => {
    if (err) {
      console.log(err);
      return;
    }
  })

 */
