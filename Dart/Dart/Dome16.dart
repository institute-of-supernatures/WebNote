// mysql mssql mongodb
// 接口<约定，规范>
abstract class Db {
  String url;
  add(Map data);
  save();
  delete();
}

// 实现接口
class Mysql implements Db {
  @override
  String url;

  Mysql(this.url);

  @override
  add(Map data) {
    // TODO: implement add
    print(data);
  }

  @override
  delete() {
    // TODO: implement delete
  }

  @override
  save() {
    // TODO: implement save
  }
}

main() {
  var obj = new Map();
  obj.addAll({"name": "allen", "age": 22});
  Mysql sql = new Mysql("localhost:8000");
  sql.add(obj);
}
