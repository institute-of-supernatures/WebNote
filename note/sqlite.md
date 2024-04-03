# sqlite

> 条件编译

```js
/* 必须使用条件编译才能识别 H5+ 代码 */

// #ifdef APP-PLUS

  // h5+ 代码
  
// #endif

```

> 创建/ 打开 数据库

```js
/**
 * @param {name} 数据库名
 * @param {path} 数据库路径
 */
plus.sqlite.openDatabase({ name, path });
```

```js
plus.sqlite.openDatabase({
  name: "person", // 数据库名称
  path: "_doc/test.db", // 路径
  success: function(e) {
    console.log("数据库创建/ 打开成功");
  },
  fail: function(e) {
    console.log("数据库创建. 打开失败: " + JSON.stringify(e));
  }
});
```

> 判断数据库是否打开

```js
/**
 * @param {name} 数据库名
 * @param {path} 数据库路径
 * @return {Boolean} true/ false
 */
plus.sqlite.isOpenDatabase({ name, path });
```

> 关闭数据库

```js
/**
 * @param {name} 数据库名
 */
plus.sqlite.closeDatabase({
  name: "person",
  success: e => {
    console.log("关闭成功");
  },
  fail: e => {
    console.log("关闭失败: " + JSON.stringify(e));
  }
});
```

> 执行增删改等操作的 SQL 语句

```js
plus.sqlite.executeSql({
  name: "person",
  sql:
    'create table if not exists database("where" CHAR(110),"location" CHAR(100),"age" INT(11))', // 需要执行的sql, 建表
  success: function(e) {
    plus.sqlite.executeSql({
      name: "person",
      sql: "insert into database values('北京','安乐林','11')", // 需要执行的sql, 增加数据
      success: function(e) {
        console.log("executeSql success!");
      },
      fail: function(e) {
        console.log("executeSql failed: " + JSON.stringify(e));
      }
    });
  },
  fail: function(e) {
    console.log("executeSql failed: " + JSON.stringify(e));
  }
});
```

> 执行查询的 SQL 语句

```js
plus.sqlite.selectSql({
  name: "person",
  sql: "select * from database", // 需要执行的sql
  success: function(data) {
    console.log("selectSql success: ");
    for (var i in data) {
      console.log(data[i]);
    }
  },
  fail: function(e) {
    console.log("selectSql failed: " + JSON.stringify(e));
  }
});
```
