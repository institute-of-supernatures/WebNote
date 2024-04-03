var obj = {
  get: function () {
    console.log("get data from server");
  },
  post: function () {
    console.log("submit data");
  }
}

// exports.request = obj;
module.exports = obj;