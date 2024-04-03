const fs = require('fs');

// 判断资源为目录还是文件
async function isDir(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, res) => {
      if (err) {
        console.log(err);
        reject(err)
        return;
      }
      if (res.isDirectory()) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  })
}

// 获取wwwroot下所有资源 遍历

function main() {
  var path = "./wwwroot/";

  var dirArr = [];

  fs.readdir(path, async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    for (var i = 0; i < data.length; i++) {
      let p = await isDir(path + data[i]);
      if (p) {
        dirArr.push(data[i])
      }
    }

    console.log(dirArr);
  })
}

main()