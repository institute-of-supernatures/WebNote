# indexedDB

> 打开/ 创建数据库

```js
// 获取IDBFactory接口实例
let indexedDB =
  window.indexedDB ||
  window.webkitIndexedDB ||
  window.mozIndexedDB ||
  window.msIndexedDB;
if (!indexedDB) {
  console.log("你的浏览器不支持IndexedDB");
}
/**
 * @param {databaseName} 创建/ 打开的数据库名
 * @param {version} 当前版本, 创建时默认为 1
 * @return {IDBRequest对像}
 */
let IDBRequest = indexedDB.open(databaseName, version);
```

> IDBRequest 对像

```js
let db; // 全局的indexedDB数据库实例。
/**
 * @param {error} 错误事件
 * @param {success} 成功事件
 * @param {upgradeneeded} 更新事件
 */
IDBRequest.onerror = e => {
  console.log("创建/ 打开数据库出错");
};

IDBRequest.onsuccess = e => {
  db = IDBRequest.result; // 获取数据库对象
  console.log("创建/ 打开数据库成功");
};

IDBRequest.onupgradeneeded = e => {
  db = e.target.result; // 获取数据库对象
};
```

> 建表

```js
// 指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
IDBRequest.onupgradeneeded = e => {
  // 新建数据库时, 在此建表
  let objectStore;
  // 判断 person 表是否存在
  if (!db.objectStoreNames.contains("person")) {
    // 不存在
    objectStore = db.createObjectStore("person", { keyPath: "id" }); // 创建 person 表, 主键为 id
  }
};

/* =============================================================================================== */

IDBRequest.onupgradeneeded = e => {
  db = event.target.result;
  // 新建数据库时, 在此建表
  let objectStore;
  // 判断 person 表是否存在
  if (!db.objectStoreNames.contains("person")) {
    objectStore = db.createObjectStore("person", { autoIncrement: true }); // 创建 person 表, 主键 indexedDB 自动生成
  }
};
```

> 建索引

```js
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("person", { keyPath: "id" });
  /**
   * @param {name} 索引名称
   * @param {property} 索引属性
   * @param {obj} 配置对象 <是否包含重复的值>
   */
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
};
```

> 新增数据

```js
let request = db
  .transaction(["person"], "readwrite") // 指定表格名称和属性 <只读 / 读写>
  .objectStore("person") // 获取 IDBObjectStore 对象
  .add({ id: 1, name: "张三", age: 24, email: "zhangsan@example.com" }); // 写入记录

request.onsuccess = function(event) {
  console.log("数据写入成功");
};

request.onerror = function(event) {
  console.log("数据写入失败");
};
```

> 读取数据

```js
let transaction = db.transaction(["person"]);
let objectStore = transaction.objectStore("person");
let request = objectStore.get(1); // 获取数据, 参数为主键的值

request.onerror = function(event) {
  console.log("事务失败");
};

request.onsuccess = function(event) {
  if (request.result) {
    console.log("Name: " + request.result.name);
    console.log("Age: " + request.result.age);
    console.log("Email: " + request.result.email);
  } else {
    console.log("未获得数据记录");
  }
};
```

> 遍历数据

```js
let objectStore = db.transaction("person").objectStore("person");

objectStore.openCursor().onsuccess = function(event) {
  // 异步操作
  let cursor = event.target.result;

  if (cursor) {
    console.log("Id: " + cursor.key);
    console.log("Name: " + cursor.value.name);
    console.log("Age: " + cursor.value.age);
    console.log("Email: " + cursor.value.email);
    cursor.continue();
  } else {
    console.log("没有更多数据了！");
  }
};
```

> 更新数据

```js
let request = db
  .transaction(["person"], "readwrite")
  .objectStore("person")
  .put({ id: 1, name: "李四", age: 35, email: "lisi@example.com" }); // 自动更新主键为 1 的数据

request.onsuccess = function(event) {
  console.log("数据更新成功");
};

request.onerror = function(event) {
  console.log("数据更新失败");
};
```

> 删除数据

```js
let request = db
  .transaction(["person"], "readwrite")
  .objectStore("person")
  .delete(1); // 删除数据, 参数为主键值

request.onsuccess = function(event) {
  console.log("数据删除成功");
};
```

> 使用索引

```js
// 如果创建时加入了索引, 则可以根据索引进行检索
let transaction = db.transaction(["person"], "readonly");
let store = transaction.objectStore("person");
let index = store.index("name"); // 通过索引 name 进行检索
let request = index.get("李四"); // 检索出 name = "李四" 的数据

request.onsuccess = function(e) {
  let result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
};
```
