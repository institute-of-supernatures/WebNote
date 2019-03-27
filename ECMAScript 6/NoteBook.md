# ECMAScript 6

## 1.0 let & const

### 1.1 let 命令

#### 1.1.1 let 基本用法

- 用来声明变量, 用法类似于 var, 但其所声明的变量只在`代码块`中有效

`ex1 :`

```javascript
// 启用块级域
{
  let a = 10;
  var b = 1;
}
console.log(a); // ReferenceError: a is not defined
console.log(b); // 1
```

`ex2 :`

```javascript
// for循环中也存在块级作用域
for (let i = 0; i < 10; i++) {}
/* 注意: 此时i 不在for循环内 */
console.log(i); // ReferenceError: i is not defined
```

`ex3 & ex4 :`

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 10
```

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
/* 注意: 变量 i 是let声明的, 当前 i 只在本轮循环有效, 即每一次循环中的i 都是一个新的变量, 所以a[6]()最后输出的 i 是第六轮的 i ,也就是6 */
a[6](); // 6
```

`ex5:`

```javascript
/* 注意: for循环中, 设置循环变量的部分是一个父作用域, 而循环体内部是一个单独的子作用域 */
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
// 结果是 abc 打印3次, 此例子与ex3 & ex4 原理相似
```

#### 1.1.2 let 不存在变量的提升

> let & var 对比

- var 存在变量的提升, 即变量可以在声明之前调用, 值为 undefined
- let 改变了语法行为, 它所声明的变量`必须`在声明之后使用, 否则会报错

`ex : var`

```javascript
console.log(foo); // undefined
var foo = 2;
```

`ex : let`

```javascript
console.log(bar); // 报错
let bar = 2;
```

#### 1.1.3 let 会存在暂时性死区

**本质:　只要一进入当前作用域, 所要使用的变量就已经存在了, 但此时不可获取, 只有等到`声明变量`的那一行代码出现, 才能够`获取`和`使用`该变量**

1. 只要块级作用域内存在 let 命令, 它所声明的变量就"绑定"这个区域, 不在受到外部的影响
2. 如果区域中存在 let 和 const 命令, 这个区域中通过 let 和 const 声明的变量, 从一开始就形成了`封闭作用域`.<所有在声明前使用的变量都会报错>
3. 在代码快内, 使用 let 命令声明变量之前, 该变量都是不可用. 语法上, 称之为: `暂时性死区`

`ex1 :`

```javascript
var tmp = 123;
if (true) {
  tmp = "abc"; // 报错
  let tmp;
}
/* 注意: 虽然存在全局变量tmp, 但是块级作用域中let又声明了一个局部变量tmp, 导致tmp绑定了这个块级作用域. 所以, 在let声明之前, tmp是不存在的, 对其赋值会报错 */
```

`ex2 :`

```javascript
if (true) {
  // 死区开始
  tmp = "abc"; // 报错
  console.log(tmp); // 报错

  let tmp; // 死区结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

`ex3 :`

```javascript
typeof x; // 报错
let x;
/* 注意: 变量x在let声明之前都是死区, 只要使用了就会报错 */
```

`ex4 & ex5 :`

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错
/* 注意: 此处报错, 因为在参数x赋值时, 参数y未被声明, 属于死区 */
```

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

`ex6 :`

```javascript
var x = x; // 不报错

let x = x; // 报错
/* 注意: 使用let声明变量时, 只要变量在还没有声明完成前使用就会报错 */
```

#### 1.1.4 let 不允许重复声明

- let 不允许在`相同作用域`内重复声明`同一个`变量

`ex1 & ex2 :`

```javascript
function fn() {
  let a = 10;
  var a = 1; // 报错
}
```

```javascript
function fn() {
  let a = 10;
  let a = 1; // 报错
}
```

`ex3 & ex5 :`

```javascript
function fn(arg) {
  let arg; // 报错
}
```

```Javascript
function fn(arg){
    { let arg; } // 不报错
}
```

### 1.2 块级作用域

- ES5 只有全局作用域和函数作用域, 没有块级作用域, 很多场景不合理
  1. 内层变量可能会覆盖外层变量
  2. 用来技术的循环变量泄露为全局变量

`ex1 :`

```javascript
var tmp = new Date();
function fn() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}
fn(); // undefined 变量提升, 导致内层的tmp覆盖le外层tmp
```

`ex2 :`

```javascript
var s = "hello";
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5 变量i原本只控制循环, 但循环结束之后, 他并没有消失, 泄露成了全局变量
```

- ES6 的块级作用域
  1. let 实际上为 JavaScript 新增了块级作用域
  2. 允许块级作用域的任意嵌套
  3. 外层作用域无法读取内层作用域的变量
  4. 内层作用域可以`定义`或`读取`外层作用域的同名变量
  5. 块级作用域的出现, 使获得广泛应用的立即执行函数表达式(IIFE)不在必要

`ex1 :`

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  /* 注意: 外层代码不受内层代码影响, 所以外层n=5 */
  console.log(n); // 5
}
```

`ex2 :`

```javascript
{
  {
    {
      {
        {
          let insane = "Hello world";
        }
        // 外层作用域无法读取内层作用域的变量
        console.log(insane); // 报错
      }
    }
  }
}
```

`ex3 :`

```javascript
{
  {
    {
      {
        let insane = "Hello World";
        // 内层作用域可以定义外层作用域的同名变量
        {
          let insane = "Hello World";
        }
      }
    }
  }
}
```

`ex4 :`

```javascript
// IIFE写法
(function() {
  var tmp = 2;
})();
// 块级作用域写法
{
  let tmp = 2;
}
```

- 块级作用域与函数声明

  ES5 规定, 函数只能在顶层作用域和函数作用域之中声明, 不能再块级作用域声明

`ex1 :`

```javascript
if (true) {
  function fn() {}
}
```

`ex2 :`

```javascript
try {
  function fn() {}
} catch (error) {
  // content
}
```

---`上述两个例子都是非法声明, 但是并不会报错`---  
浏览器没有遵守这个规定, 是为了兼容以前的旧代码, 还是支持在块级作用域中声明函数

- ES6 引入了`块级作用域`, 明确允许在块级作用域中声明函数
- ES6 规定, 在块级作用域中, 函数声明语句的行为类似于 let, 在块级作用域之外不可以引用
- ES6 解决兼容 :
  1. 允许在块级作用域内声明函数
  2. 函数声明类似于 var, 即会提升到全局作用域或函数作用域头部
  3. 函数声明会提升到块级作用域的顶部
     > 注意
     >
     > - 上面三条规则只对支持 ES6 的浏览器有效, 其他环境的实现不用遵守, 还是将块级作用域的函数声明当做`let`处理
     > - 根据这三条规则, 在浏览器的 ES6 环境中, 块级作用域内声明的函数, 行为类似于`var声明的变量`

`ex1 :ES5环境`

```javascript
function fn() {
  console.log("I am outside!");
}
(function() {
  function fn() {
    // 函数声明提升
    console.log("I am inside!");
  }
  if (false) {
  }
  fn(); // I am inside
})();
```

`ex1 :ES6环境`

```javascript
function fn() {
  console.log("I am outside!");
}
(function() {
  function fn() {
    console.log("I am inside!");
  }
  if (false) {
  }
  fn(); // 报错
})();
```

> 考虑到环境导致的行为差异太大, 应该避免在块级作用域中声明函数, 如若确实需要, 可以写成函数表达式

```javascript
// 函数声明语句 不推荐
{
  let a = "sercet";
  function fn() {
    return a;
  }
}
// 函数表达式
{
  let a = "secret";
  let fn = function() {
    return a;
  };
}
```

> ES6 的`块级作用域`允许声明函数的规则, 只有在使用大括号的情况下成立, 如果没有大括号就会报错

`ex2 :`

```javascript
// 严格模式 (函数内部选择进行较为严格的全局或局部的错误条件检测)
'use strict'
// 不报错
if(true){
  function fn(){}
}
// 报错
if(true)
  function fn(){}
```

### 1.3 const 命令

#### 1.3.1 基本用法

- const 声明一个常量, 一旦声明, 常量不可以更改
- const 一旦声明, 就必须立即初始化, 不能留到以后赋值
- const 的作用域与 let 命令相同, 只在声明所在的块级作用域内有效
- const 命令声明的常量和 let 一样, 没有提升, 同样存在暂时性死区, 只能在声明后使用
- const 声明的常量不可以重复声明

`ex1 :`

```javascript
const PI = 3.1415;
PI = 3; // 报错
```

`ex2 :`

```javascript
const foo; // 报错, 只声明不赋值
```

`ex3 :`

```javascript
if (true) {
  console.log(MAX); // 报错
  const MAX = 5;
}
```

`ex4 :`

```javascript
var message = "Hello";
let age = 25;
const message = "Goodbye!"; // 报错
const age = 30; // 报错
```

#### 1.3.2 const 本质

- 简单数据类型在栈中存储的是值, const 保证`值`不得改变
- 复杂数据类型在栈中存储的是地址, const 保证`地址的值`不得改变, 至于地址指向的数据改不改变与其无关

`ex1 :`

```javascript
const foo = {};
foo.prop = 123;
console.log(foo.prop); // 123

foo = {}; // 报错
```

`ex2 :`

```javascript
const a = [];
a.push("Hello"); // 可执行
a.length = 0; // 可执行
a = ["Dave"]; // 报错
```

> 对象及其属性冻结 `Object.freeze`

`ex3 :`

```javascript
const foo = Object.freeze({});
// 常规模式下, 不起作用
// 严格模式下, 报错
foo.prop = 123;
```

### 1.4 顶层对象的属性

> ES5

1. 顶层对象的属性与全局变量是等价的
2. 顶层对象的属性赋值与全局变量的赋值是同一件事

`ex :`

```javascript
window.a = 1;
console.log(a); // 1
a = 2;
console.log(window.a); // 2
```

**_ 存在的问题 _**

1. 没法在编译时就报出变量未声明的错误, 只有在运行是才能知道
   `(因为全局变量可能是顶层对象的属性创造的, 而属性的创造是动态的)`
2. 程序员很容易不知不觉的就创造了全局变量
3. 顶层对象的属性是到处可以可以读写的, 这非常不利于模块化编程
4. window 对象有实体含义, 指的是浏览器的窗口对象, 顶层对象是一个有实体含义的对象

> ES6

1. 为了保持兼容性, var 命令和 function 命令声明的全局变量依旧是顶层对象的属性
2. let 命令, const 命令, calss 命令声明的全局变量, 不属于顶层对象的属性

`ex :`

```javascript
var a = 1; // 顶层对象的属性
// 如果在Node的REPL环境中, 可以写成global.a
// 如果采用通用的方式, 写成 this.a
console.log(window.a); // 1
let b = 1; // 非顶层对象
console.log(window.b); // undefined
```

### 1.5 global 对象

> ES5

1. 浏览器里面, 顶层对象是 window, 但 Node 和 Web Worker 没有 window
2. 浏览器和 Web Worker 里面, self 也指向顶层对象, 但 Node 没有 self
3. Node 里面, 顶层对象是 global, 其他环境中都不支持 global

> this

1. 能够在各种环境中取到顶层对象, 但是有局限性
2. 全局环境中, this 会返回顶层对象. 但在 Node 模块和 ES6 模块中, this 返回的是当前模块
3. 函数里面的 this, 如果函数不是作为对象的方法运行, 而是单纯作为函数运行, this 会执行顶层对象. 但是在严格模式下, this 会返回 undefined
4. 不管是严格模式, 还是普通模式, new Function('return this')(), 总是会返回全局对象. 但是, 如果浏览器用了 CSP`(Content Security Policy 内容安全策略)`, 那么 eval , new Function 这些方法就可能无法使用

> 如何兼容各种环境拿到顶层对象

`ex1 :`

```javascript
(typeof window !== 'undefined'
  window
  :(typeof process === 'object' &&
    typeof require === 'function' &&
    typeof global === 'object')
    global
    :this);
```

`ex2 :`

```javascript
var getGlobal = function() {
  if (typeof self != "undefined") {
    return self;
  }
  if (typeof window != "undefined") {
    return window;
  }
  if (typeof global != "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
};
```

> **_ 语言标准的层面 `引入global作为顶层对象, 在所有环境下, global都是存在的` _**

`ex :`

```javascript
// 拿到global, 将顶层对象 赋值给 global
// CommonJs写法
var global = require("system.global")();

// ES6模块写法
import getGlobal from "system.global";
const global = getGlobal();
```

## 2.0 变量的结构赋值

### 2.1 基本使用

- ES6 允许按照一定模式, 从数组和对象中提取值, 对变量进行赋值, 这称之为结构
- 只要等号两边的模式相同, 左边的变量就会被赋予对应的值
- 只要某种数据结构具有 lterator 接口, 都可以采用数组形式的解构赋值
- 如果等号右边不是可以遍历的数组, 将会报错

`ex1 :`

```javascript
// 以前为变量赋值只能直接指定值
// ES6赋值
let [a, b, c] = [1, 2, 3];
```

`ex2 :`

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo + bar + baz); // 1 2 3
let [, , third] = ["foo", "bar", "baz"];
console.log(third); // baz
```

`ex3 :`

```javascript
let [x, , y] = [1, 2, 3];
console.log(x + y); // 1 3
let [head, ...tail] = [1, 2, 3, 4];
console.log(head + tail); // 1 [2,3,4]
let [x, y, ...z] = ["a"];
console.log(x + y + z); // "a" undefined []
```

`ex4 :`

```javascript
let [foo] = [];
let [bar, foo] = [1];
// 两个foo的值都为undefined
```

`ex5 :`

```javascript
let [x, y] = [1, 2, 3];
console.log(x + y); // 1 2
let [a, [b], d] = [1, [2, 3], 4];
console.log(a + b + d); // 1 2 4
```

`ex6 :`

```javascript
// 对于Set结构, 也可以使用数组的解构赋值
let [x, y, z] = new Set(["a", "b", "c"]);
console.log(x); // 'a'
```

`ex7 :`

```javascript
// 生成器函数
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    // yield 相当于 return
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
// 0 1 1 2 3 5
```

`ex8 :`

```javascript
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
// 上述foo 都会报错
```

### 2.2 解构赋值的默认值

- 解构赋值允许指定默认值
- ES6 内部使用严格相等运算符`(===)`, 来判断一个位置是否有值. 只有当一个数组成员严格等于 undefined, 默认值才会生效
- 默认值可以引用 解构赋值的其他变量, 但该变量必须已经声明

`ex1 :`

```javascript
let [foo = true] = [];
console.log(foo); // true

let [x, y = "b"] = ["a"];
console.log(x + y); // 'a' 'b'
let [x, y = "b"] = ["a", undefined];
console.log(x + y); // 'a' 'b'
```

`ex2 :`

```javascript
let [x = 1] = [undefined];
console.log(x); // 1

let [x = 1] = [null];
console.log(x); // null
```

`ex3 :`

```javascript
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
```

## 3.0 字符串扩展

### 3.1 includes/startsWith/endsWith

- includes() 返回布尔值, 表示是否找到了参数字符串
- startsWith() 返回布尔值, 表示参数字符串是否在原字符串头部
- endsWith() 返回布尔值, 表示参数字符串是否在原字符串的尾部

`ex :`

```javascript
let s = "Hello world!";
// 这三个方法都支持第二个参数，表示开始搜索的位置。
s.startsWith("Hello", 6); // true
s.endsWith("!"); // true
s.includes("o"); // true
```

### 3.2 repeat

- repeat() 重复字符串

`ex1 :`

```javascript
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
"na".repeat(0); // ""
```

- 如果参数是小数, 会向下取整

`ex2 :`

```javascript
"na".repeat(2.9); // 'nana'
```

- 如果参数是负数或 Infinity, 会报错

`ex3 :`

```javascript
"na".repeat(Infiity); // RangeError
"na".repeat(-1); // RangeError
```

- 如果参数是 0 到-1 之间的小数, 则等同于 0 , 这是因为会先进行取整运算, 取整后等于-0, repeat 视为 0

`ex4 :`

```javascript
"na".repeat(-0.9); // ""
```

- 如果参数为 NaN, 则等同于 0

`ex5 :`

```javascript
"na".repeat(NaN); // ""
```

- 如果 repeat 的参数是字符串, 则会先转成数字

`ex6 :`

```javascript
"na".repeat("na"); // ""
"na".repeat("3"); // "nanana"
```

### 3.3 模板字符串

- 模板字符串, 用反引号 ` 标识

1. 可以当做普通字符串使用, 也可以用来定义多行字符串, 或者在字符串中嵌入变量

`ex :`

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed`// 多行字符串
`In JavaScript this is
not legal`;
// 字符串中嵌入变量
let name = "Bob",
  time = "today";
`Hello ${name}, how are you ${time}?`;
```

2. 如果使用模板字符串表示多行字符串, 所有的空格和缩进都会保留在输出之中, 如果你不想要这个换行, 可以使用 trim 方法

`ex :`

```javascript
$("list").html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
```

3. 大括号内部可以放入任意的 JavaScript 表达式, 可以进行运算, 以及引用对象属性

`ex :`

```javascript
let x = 1;
let y = 2;
`${x} + ${y} = ${x + y}`; // "1 + 2 = 3"
```

4. 模板字符串之中还能调用函数

`ex :`

```javascript
funciton fn (){
  return 'Hello World';
}
`foo ${fn()} bar` // foo Hello World bar
```

5. 模板字符串的大括号内部就是执行 JavaScript 代码的, 如果大括号内部也是一个字符串, 将会原样输出

`ex :`

```javascript
`Hello ${"world"}`; // "Hello World"
```

### 3.4 padStart/padEnd

- padStart()用于头部补全, pedEnd()用于尾部补全
- 两者都接收两个参数
  1. 参数 1: 字符串补全的自大长度
  2. 参数 2: 用来补全的字符串

`ex :`

```javascript
"x".padStart(5, "ab"); // ababx
"x".padStart(4, "ab"); // abax
"x".padEnd(5, "ab"); // xabab
"x".padEnd(4, "ab"); // xaba
```

- 如果原字符串的长队等于或大于第一个参数, 则字符串补全将不生效, 返回原字符串

`ex :`

```javascript
"xxx".padStart(3, "ad"); // xxx
"xxx".padEnd(3, "ad"); // xxx
```

- 如果参数二长度 + 原字符串长度 > 第一个参数, 则会截去超出的位数, 在补全字符串

`ex :`

```javascript
"abc".padStart(10, "123456789"); // 1234567abc
```

- 如果省略第二个参数, 默认使用空格补全长度

`ex :`

```javascript
"x".padStart(4); // "   x"
"x".padEnd(4); // "x   "
```

## 4.0 数组的扩展

### 4.1 扩展运算符

- ... 将一个数组转为用逗号分隔的参数序列

`ex :`

```javascript
console.log(...[1, 2, 3]); // 1,2,3
console.log(1, ...[2, 3, 4], 5); // 1,2,3,4,5
```

- 扩展运算符一般用于函数调用

`ex :`

```javascript
function add(x + y){
  return x + y;
}
const num = [4,38];
add(...num); // 42
```

- 如果扩展运算符后面是个空数组, 则不产生任何结果

`ex :`

```javascript
console.log([...[], 1]); // [1]
```

> 注意

1. 扩展运算符如果放在括号中, JavaScript 引擎就会认为这是函数调用, 如果这时不是函数调用, 就会报错
2. console.log(...[1,2])不会报错, 因为是函数调用, (...[1,2])会报错

- 扩展运算符可以替代 apply()方法

`ex :`

```javascript
// ES5 写法
function fn(x, y, z) {
  // ...
}
var args = [0, 1, 2];
fn.apply(null, args);
// ES6 写法
function fn(x, y, z) {
  // ...
}
let args = [0, 1, 2];
fn(...args);
```

> 扩展运算符的应用

1. 复制数组

`ex :`

```javascript
const a1 = [1, 2];
const a2 = [...a];
```

2. 合并数组

`ex :`

```javascript
// ES5
arr1.concat(arr2, arr3);
// ES6
[...arr1, ...arr2, ...arr3];
```

### 4.2 Array.from()

- Array.from()方法用于将两类对象转为真正的数组, `类似于数组的对象` 和 `可遍历的对象`

> 类似于数组的对象

```javascript
let arr = {
  "0": "a",
  "1": "b",
  "2": "c",
  length: 3
};
// ES5
var arr1 = [].slice.call(arr);
// ES6
let arr2 = Array.from(arr);
```

- 如果参数是一个真正的数组, Array.from 会返回一个一模一样的新数组

### 4.3 Array.of()

- Array.of()方法用于将一组值转换为数组
- 这个方法的主要目的是为了弥补数组的构造函数 Array()的不足

```javascript
Array(); // []
Array(3); // [,,,]
Array(3, 11, 8); // [3,11,8]

Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

### 4.4 some()

1. 对数组中的每一个元素都执行一次指定的函数(callback), 直到此函数返回 true, 如果发现这个元素, some 将返回 true, 如果回调函数对每个元素执行完成后都是 false, some 将返回 false
2. some 只对数组中的非空元素执行指定的函数, 没有赋值会这已经删除的元素将会被忽略

`ex :`

```javascript
let arr = [10, 20, 3, 1, 5, 10];
// 检查是否有数组元素大于等于10
function isBig(ele, index, array) {
  return ele >= 10;
}
arr.some(isBig); // true
```

### 4.5 find/findIndex

#### 4.5.1 find()

1. 找到第一个符合条件的数组成员. 他的参数是一个回调函数, 所有的成员一次执行该回调函数
2. 直接找到第一个返回值为 true 的成员, 然后返回该成员. 如果没有符合条件的成员, 则返回 undefined
3. find 方法的回调函数可以接受三个参数, 为`当前的值`, `当前的位置`,`原数组`

`ex :`

```JavaScript
[1,5,10,15,20].find(function(value, index, arr){
  return value > 9;
}) // 10
```

#### 4.5.2 findIndex()

- 返回第一个符合条件的数组成员的位置, 如果所有成员都不符合条件, 则返回 -1

`ex :`

```JavaScript
[1, 5, 10, 15].findIndex(function(value, index ,arr) {
  return value > 9;
}) // 2
```

> 注意: 这两个方法都可以接受第二个参数, 用来绑定回调函数的 this 对象

`ex :`

```javascript
function fn(value) {
  return value > this.age;
}
let person = {
  name: "jack",
  age: 20
};
[10, 12, 26, 15].find(fn, person); // 26
```

### 4.6 filter()

- 对数组中的每个元素都执行callback函数, 并且创建一个新的数组, 该数组的元素是所有回调函数执行时返回值为true的`原数组元素`, 它只对数组中非空的元素执行指定的函数, 没有赋值或已经删除的元素将忽略, 同时, 创建新的数组也不会包含这些元素

`ex :`

```javascript
/* 
  callback : 要对每个数组元素执行的回调函数
  thisObj : 在执行回调函数时定义的this对象
*/
var filterArr = array.filter(callback, thisObj);
```

`ex :`

```javascript
// 过滤小于10的数组元素
function isBig(ele,index,arr){
  return ele >= 10;
}
var filter = [12, 5, 5, 8, 130, 113].filter(isBig); // 12,130,113
```

### 4.7 includes()

- 方法返回一个布尔值, 表示某个数组是否包含给定的值, 与字符串的includes方法类似
- 该方法的第二个参数表示要搜索的起始位置, 默认为0. 如果给定第二个参数为负数, 则表示倒数的位置, 如果他的长度大于数组的长度(比如参数为-4, 但数组的长度为3), 则会重置, 从0 开始

```JavaScript
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false
[1, 2, NaN].includes(NaN) // true
```

## 5.0 对象的拓展

### 5.1 属性的简洁表示法

> ES6 允许在对象中直接写变量

```javascript
const foo = 'bar'
const baz = {foo} // {foo: 'bar'}
```

```javascript
function fn(x ,y) {
  return {x,y}; // {x: x, y: y}
}
```

> ES6 允许在对象之中直接写方法

```javascript
const o = {
  methods() {
    return "Hello!";
  }
}
// 等同于
const o = {
  methods: function(){
    return "Hello!";
  }
}
```

- 属性的赋值器`setter` 和 取值器`getter`

```JavaScript
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.anme} ${this.surname}`
  },
  set fullName(Value) {
    [this.name, this.surname] = value.split(" ")
  }
}
user.fullName = "Alice Cooper";
alert(user.name); // Alice
alert(user.surname); // Cooper
```

### 5.2 属性名表达式

- JavaScript定义对象的属性
  1. 直接用`标识符`作为属性名

``` js
obj.foo = true;
```

  2. 用`表达式`作为属性名, 这时要将表达式放在方括号内

```js
obj['a'+'bc'] = 123;
```

`ex :`

```js
let last = 'last world';
consr a = {
  'first word': 'hello',
  [last]: 'world'
}
a['first word']; // hello
a[last]; // world
a['last world']; // world
```

- 表达式还可以用于`定义`方法名

```js
let obj = {
  ['h'+'ello'](){
    return 'hi';
  }
}
obj.hello() // hi
```

> 注意

1. `属性名表达式`与`简洁表示法`不能同时使用, 会报错

```js
// 报错
const foo = 'bar'
const bar = 'abc'
const baz = {[foo]};
// 正确
const foo = 'bar';
const baz = {[foo]: 'abc'}
```

2. 属性名表达式如果是一个对象, 默认情况下会自动将对象转为字符串[object Object]

```js
const keyA = {a:1};
const keyB = {b:2};
const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}
// myObject Object{[object Object]: 'valueB'}
```

- - [keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性

### 5.3 函数的name属性返回函数名



### 5.4 属性的可枚举性和遍历
### 5.5 属性的遍历
### 5.6 super 关键字