const fs = require('fs');
let path = "./upload";

fs.stat(path, (err, data) => {
  if (err) {
    mkdirFile(path)
    return;
  }
  
  if (data.isDirectory()) {
    console.log("upload 文件存在");
  } else {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      mkdirFile(path)
    })
  }
})

function mkdirFile(path) {
  fs.mkdir(path, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  })
}