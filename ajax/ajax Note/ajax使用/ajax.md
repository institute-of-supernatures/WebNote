---
typora-copy-images-to: media
typora-root-url: media
---

#ajax使用

## 学习目标

- 了解ajax作用
- 理解异步、同步概念
- 掌握ajax发异步请求
- 掌握json数据操作
- 了解XML和使用



## 1. ajax介绍

### 1.1 为什么需要ajax

 ![1523868192576](/1523868192576.png)

> 输入完用户名后会立即去服务器检测这个用户名有没有被占用，然后根据结果改变页面的显示。要实现这种功能，所要用到的技术就是ajax！



### 1.2 名词解释（了解）

- Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。                 ----- 摘自百度百科


- **说人话**：可以让网页某个局部部分动态地给服务器发起请求，而不用整个页面刷新。是一种可以局部发请求的技术（像上面的注册案例就是ajax）

## 2. 原生ajax技术实现：

> 学习JS原生方式做异步请求

### 2.1 XMLHttpRequest对象

- 本质：是一个系统内置对象。专门用来发起局部请求的对象。一般会被简称为XHR

### 2.2 请求报文复习

- 一次请求三大部分：请求行、请求头、请求体（请求正文）

 ![1525960269427](/1525960269427.png)

### 2.3 使用XHR发get请求

> XMLHttpRequest就是个专门用来发局部请求的对象，而一个请求就包含**请求行、请求头、请求体**这几部分，所以我们也需要依次对这个对象设置这些内容

- 创建XMLHttpRequest：

```js
var xhr = new XMLHttpRequest();
```

> 注：xhr只是我们起的实例名字，实际使用可以自己起，但推荐使用xhr，一看就知道是一个请求对象

- 设置请求行：

```js
//参数1：类似于表单中的method属性
//参数2：类似于表单中的action属性
xhr.open('请求方式','请求地址');

//例：
//使用get请求，请求服务器的test.php页面
xhr.open('get','./test.php');
```

- 设置请求头（get请求一般不设置）：

```js
xhr.setRequestHeader(键，值);
//例：
xhr.setRequestHeader('Content-Type', 'text/html');
```

- 发送请求（设置请求体）：

```js
xhr.send(请求体内容);
```

> 注：如果是get请求，一般小括号里为空，什么都不写（get请求没有请求体），如果是post请求，就在小括号里加请求体内容（后面会专门针对post做案例）



### 2.4 获得响应正文

> 根据学过的http协议我们知道，当发送请求报文后，其本质是为了从服务器拿到响应正文。那么ajax如何拿？

```js
//当响应体回来了会调用此方法
xhr.onload = function(){
    //当此函数调用时，这个属性里保存的就是响应正文
	xhr.responseText;       
}
```

> 为什么要用事件形式？
>
> ​	发送请求是一个网络操作，而受网络环境影响，可能会有延迟。我们不知道什么时候才能得到响应正文。所以最好用事件的形式，一旦接收到响应正文自动触发事件。



### 2.5 总结ajax代码步骤：

```js
//1. 创建请求对象
var xhr = new XMLHttpRequest();
//2. 设置请求行
xhr.open('get','./test.php');
//注：get请求可以不用设置请求头
//3. 发送请求
xhr.send();
//4. 拿到响应体
xhr.onload = function(){
            
}
```



### 2.6 练习案例：给div加内容

效果：

![xiaoguo1](/xiaoguo1.gif)

---

- 有一个php页面，文件名叫  `test.php`，代码如下

```php
<?php
  	ehco "hello";    
?>
```

- 再加一个html网页，元素仅button和div

```html
<body>
    <input type="button" value="点我请求" id="add"/>
    <!-- 给这个div加内容 -->
    <div id="box">
        
    </div>
</body>
```

- 给按钮加点击事件，发送一条请求，请求到  `test.php`  页面

```html
<script>
    
//按钮加点击事件
document.getElementById('add').onclick = function(){
	//1. 创建请求对象
    var xhr = new XMLHttpRequest();
    //2. 设置请求行
    xhr.open('get','./test.php');
    //3. 发送请求
    xhr.send();
    //4. 监听响应完成事件
    xhr.onload = function(){
        //把响应体赋值给div
        document.getElementById('box').innerHTML = xhr.responseText;
    }
}
</script>
```



### 2.7 使用XHR发post请求

- 跟get请求步骤都是一样的，分别是
  1. 创建XHR对象
  2. 设置请求行
  3. 设置请求头（post请求头必须设置，get请求可以不设置）
  4. 发送请求（设置请求体）

代码如下：

```js
//1. 创建xhr对象
var xhr = new XMLHttpRequest();
//2. 设置请求行
xhr.open('get','./test.php');
//3. 设置请求头（必须设置成这样）
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
//4. 发送请求（括号内传请求体）
xhr.send('name=jack');
//5. 监听响应的回调函数
xhr.onload = function(){
    console.log(xhr.responseText);
}
```

> tips：其实仔细观察我们之前通过表单form元素发的get请求和post请求也可以发现：一般get请求的请求头中没有带Content-type，但是post默认都有带。所以我们用ajax时也需要设置上（不然服务器拿不到post过来的数据）。



### 2.8 案例：验证用户名是否存在 

![yanzheng](/yanzheng.gif)

- 搭建界面：输入用户名、输入密码、显示结果的span、和一个注册按钮放到html页面，代码如下

```html
  <body>	
      <input type="text" id="userID" placeholder="请输入账号" required> 
      <!-- 输入账号后面的span，用来显示用户名是否可用的信息 -->
      <span id="result"></span>
      <br>
      <input type="password" id="userPWD" placeholder="请输入密码">
      <br>
      <input type="button" value="注册">
  </body>
```

- 从效果图可以看出，当账号框失去焦点后会立即去服务器查结果，然后把结果显示在span里，因此在页面中加如下js代码

```js
<script>
    //找到显示是否可用的span
    var resSpan = document.getElementById('result');

    //给账号文本框添加失去焦点事件
    document.getElementById('userID').onblur = function(){
        
        //1. 创建xhr
        var xhr = new XMLHttpRequest();
        //2. 设置请求行
        xhr.open('post','check.php');
        //3. 设置请求头（用post必须设置）
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        //4. 发送请求（附带请求体）把用户输入的账号当请求体发给服务器
        xhr.send('userID=' + this.value);

        //5. 监听响应
        xhr.onload = function(){
		   //把服务器响应结果放到span上显示
            resSpan.innerHTML = xhr.responseText;
        }
    };
</script>
```

- 新建个`check.php`页面，在这个页面里验证账号是否已经存在，代码如下

```php
<?php
    //真正验证需要去数据库根据传过来的用户名查是否有记录
    //我们这里就只假设jack是在数据库中已存在的用户名
    if($_POST['userID'] == "jack"){

        echo "账号已存在，请换一个！";
    }else{
        echo "恭喜，账号可以使用！";
    }  
?>
```

总结:

 - 把用户输入的账号传递给服务器
 - 再把服务器的响应结果显示到界面

> tip：如果要把这个改成get请求，那么在xhr.send()里不需要加参数，只需要在请求行的路径里写对应参数即可，即下面代码

```js
//2. 设置请求行
xhr.open('get','check.php?userID'+this.value);
```

注：用了get请求后，服务端的  `check.php`  也需要改成取get的值。



#### 2.8.1 作业：改成去数据库查询的版本

   

## 3. onreadystatechange事件

- onload事件虽然可以监听响应完成，但是在IE8和之前的版本不支持
- onreadystatechange事件也可以监听响应完成，并且所有浏览器都支持

### 3.1 基本使用

例：

```js
//1.0 创建请求对象
var xhr = new XMLHttpRequest();
//2.0 请求头(异步请求)
xhr.open('get','test.php');
//3.0 发送请求
xhr.send();

//4.0 监听响应完成
xhr.onreadystatechange = function(){
   console.log('我被调用了');
}
```

运行代码，可以发现：打印了3次  `我被调用了`

 ![1524042728141](/1524042728141.png)

### 3.2 ajax发起请求的5种状态

| 状态码 |             含义             |
| :----: | :--------------------------: |
|   0    | 请求未初始化（请求还没建立） |
|   1    |       服务器连接已建立       |
|   2    |          请求接收中          |
|   3    |          请求处理中          |
|   4    |   请求已完成，且响应已就绪   |

- 状态码可以通过xhr对象的  `readyState`  属性获取
- 说明：
  - 刚刚创建出xhr对象时，状态码是0
  - 当xhr调用open方法后，状态码是1
  - 2，3，4这几个状态码都是在 `onreadystatechange` 时间里发生改变
  - 只有**状态码为4，才代表响应完成**
- 因此，如果要保证一定拿到响应结果，必须要在状态码为4时才拿，因此代码应该如下写

```js
//监听响应完成
xhr.onreadystatechange = function(){
	//判断状态码是否为4
	if(xhr.readyState == 4){
	   //如果状态码为4才拿响应体
       alert(xhr.responseText);
}
```



### 3.3 服务器响应状态

> 思考：一次请求完成，就一定会得到正确的响应吗？

- 有时候整个请求完成，我们拿到的响应不一定是我们所想要的结果（比如请求了一个不存在的页面，结果就是404，或者服务器无法响应等）
- 因此，如果要保证我们真正能拿到响应的结果，首先要保证我们请求的页面能正确访问，也即，网页状态码要为`200` 也即状态为 `OK`

#### 3.3.1 通过xhr对象，拿到服务器响应状态码

```
xhr.status；
```

#### 3.3.2 要正确获得响应体还要添加响应状态判断

```js
//监听响应完成
xhr.onreadystatechange = function(){
	//判断请求状态码是否为4（请求完成）,并且响应状态为200（正确请求到网页）
	if(xhr.readyState == 4 && xhr.statues == 200){
	   //如果状态码为4才拿响应体
       alert(xhr.responseText);
}
```





## 4. JSON对象

- JSON(JavaScript Object Notation, JS对象标记) 是一种轻量级的数据交换（传输）格式。
- 所有语言都支持JSON，因为JSON本质上就只是一个按规定格式写的字符串

### 4.1 为什么需要JSON对象

- 不论是前端开发、iOS开发、安卓开发、桌面开发等等、都需要跟服务器交互
- 界面使用的开发语言可能是JS，可能是C，可能是Java等，服务器的语言可能是PHP可能是C可能是Java等
- 不同语言的数据无法直接共享。例如：后台语言PHP，有个数组数据要发给前端去展示，但是前端用的JS不认识PHP的数组。
- JSON就是为了能方便各种语言之间数据交换的数据格式

 ![1523948146095](/1523948146095.png)

注：只要是支持JSON的语言，其内部都提供了一套方法，把JSON字符串转换为自己语言里的数组或对象。

### 4.2 JSON字符串基本符号认识

`{}`  代表对象

`[]`  代表数组

如果用{}，那写法要遵循**键值对**的写法，并且**键必须是字符串**

例:

```json
'{"name":"andy","age":16,"gender":true}'; 
```

- 说明：
  + 这个JSON格式代表一个对象，对象有3个属性：name属性，它的值是andy，age属性，她的值是16，gender属性，它的值是true
  + 键一定是字符串，但是值可以是字符串、也可以是数字或布尔类型

例2：

```js
'[{"name":"jack","age":16,"gender":true},{"name":"rose","age":15,"gender":false}]';
```

- 说明
  - 这个JSON格式代表一个数组，数组中有两个元素，每个元素都是一个对象。


### 4.3 在JS中使用JSON

![json1](/json1.gif)

需求说明：

- 假设服务器会返回一个JSON字符串过来，表示一个对象（有姓名和年龄两个属性），然后通过JS把这个JSON字符串的值显示在界面上

核心代码如下

```js
    //假设这是服务器发回来的JSON数据（本质上是字符串）
    var jsonStr = '{"name":"jack","age":16}';

	//按钮的点击事件
    document.getElementById('btn').onclick = function(){
        
        //先把json字符串转换成对象类型
        var jsonObj = JSON.parse(jsonStr);
        //赋值给姓名
        document.getElementById('name').value = jsonObj.name;

        //赋值给年龄
        document.getElementById('age').value = jsonObj.age;

    };
```

解析：

- 服务器发回的JSON字符串表示一个对象
- 但这个字符串里的  `jack`  和  `16`  这两个值在字符串里，不太方便取出来（要做substr截取）赋值到界面
- 因为这个字符串本身就表示一个对象，所以我们要是能想办法把这个字符串直接转成JS中的对象类型，那就方便能取到里面的值了

#### 4.3.1  JSON字符串转成JS数据：

```js
JSON.parse(JSON字符串);
```

- 说明：如果JSON字符串最外层的是{}，会得到对象类型，如果JSON最外层的是[]，会得到数组类型。

例：

![1523957763604](/1523957763604.png)



> 思考：能把一个JSON格式的字符串转成JS的对象类型，那能把JS对象类型转成JSON字符串吗？

####4.3.2 JS数据转成JSON字符串

语法：

```js
JSON.stringify(js数据);
```

例：

 ![1523957534089](/1523957534089.png)

### 4.4 PHP中数据和JSON的互转

- 把PHP中的数组或对象转成JSON

```php
json_encode(数据);
```

例：

![1523958549003](/1523958549003.png)





## 5. 案例：动态添加表格数据

![json2](/json2.gif)



### 5.1 需求说明：

- 点击加载按钮后，会去服务器请求数据
- 服务器收到请求后去数据库查询最新数据
- 服务器把查询到的数据转成JSON字符串当响应报文发回
- 界面拿到服务器返回的JSON字符串后解析成JS数据，并拼接成表格数据显示到界面

### 5.2 实现步骤

- 网页布局结构：主要就是一个  `按钮`   和一个  `表格`

```html
<body>
    <!-- 加载数据按钮 -->
    <input type="button" value="加载数据" id="load">
    <!-- 显示数据的表格 -->
    <table>
        <thead>
            <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>成绩</th>
            </tr>
        </thead>
        <tbody id="tb"></tbody>
    </table>
</body>
```

- 给点击按钮加点击事件，点击事件里去服务器请求数据，大体步骤如下：
  - 1. 先找到tbody、然后给加载数据的按钮加点击事件
    2. 点击事件里，创建xhr，并去服务器请求数据
    3. 监听响应完成的事件，在里面根据拿到的数据，拼接出tr字符串，再加到  `tbody`  的  `innerHTML`  里

```js
//1. 找到tbody
var tb = document.getElementById('tb');
//2. 加载数据按钮的点击事件
document.getElementById("load").onclick = function () {
    //2.1 创建xhr
    var xhr = new XMLHttpRequest();
    //2.2 设置请求行
    xhr.open('get', 'data.php');
    //2.3 发送请求
    xhr.send();
    //2.4 监听响应回来
    xhr.onreadystatechange = function () {
        // 判断是否正确拿到响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            //2.4.1 转成js数组
            var arr = JSON.parse(xhr.responseText);
            //2.4.2 准备tbody内容的字符串
            var content = "";
            //2.4.3 遍历数组
            for (var i = 0; i < arr.length; i++) {
                //创建tr
                content += "<tr>";
                //遍历每个元素的所有属性
                for (var key in arr[i]) {
                    content += "<td>" + arr[i][key] + "</td>";
                }
                content += "</tr>";
            }
        }
        //2.4.4 把拼接好的tr内容加到tbody里
        tb.innerHTML += content;
    }
};
```

- 后台php页面  `data.php`  部分

```php
<?php

    //连接数据库
    $link = mysqli_connect('127.0.0.1','root','root','test');

    //准备sql语句
    $sql = "select * from students";

    //执行查询
    $result = mysqli_query($link,$sql);

    //转化为数组
    $data = mysqli_fetch_all($result,1);
    
    //关闭数据库
    mysqli_close($link);

    //转化为json字符串并当响应报文
    echo json_encode($data);

?>
```

> 提示：以后前端开发，主要是负责发请求、拿到数据再解析的那一部分后台部分有后台人员开发。



# 扩展部分

## 1. 同步、异步的概念

### 1.1 同步

- 一堆任务，要一个完成后才能做下一个。

		相当于一个人处理一堆事。

 ![1524019239942](/1524019239942.png)

### 1.2 异步

- 一堆任务，分为好几个人做，那么可以同时去做好多件事

![1524019487374](/1524019487374.png)

### 1.3 代码中体现同步和异步

- 在使用xhr对象，设置请求行时，其实有第三个参数，所有参数如下

```js
xhr.open('请求方式','请求地址',是否异步);
```

>  参数3是一个bool类型，为true代表这个请求是异步的，为false代表这个请求是同步的，如果不写参数3，默认就是异步

- 根据我们刚刚了解的同步、异步概念，写个案例看看差别。

html结构如下：

```html
    <input type="button" value="发异步请求" id="async">
    <input type="button" value="发同步请求" id="sync">
```

说明：

- 两个按钮，一个点击后发异步请求，一个点击后发同步请求

JS代码如下：

- 异步按钮点击

```js
	//异步请求按钮的点击事件
    document.getElementById("async").onclick = function(){
        
        //1.0 创建请求对象
        var xhr = new XMLHttpRequest();

        //2.0 请求头(异步请求)
        xhr.open('get','test.php',true);

        //3.0 发送请求
        xhr.send();

        alert("异步：我在send后面");
        
    };
```

- 同步按钮点击

```js
    //同步请求按钮的点击事件
    document.getElementById("sync").onclick = function(){
        
        //1.0 创建请求对象
        var xhr = new XMLHttpRequest();

        //2.0 请求头(异步请求)
        xhr.open('get','test.php',false);

        //3.0 发送请求
        xhr.send();

        alert('同步：我在send后面');
        
    };
```

test.php  代码

```php
    //睡1.5秒（模拟网络延迟1.5秒）
    sleep(1.5);

    //输出响应体
    echo 'hello';
```



- 代码分析
  - 请求test.php页面，这个页面会暂停1.5秒，用来模拟网络延时（也就是要3秒后才会完成一次响应）
  - 无论是异步还是同步请求，在send方法后，都有一个alert。
- 结果：异步请求不用等请求结束会立即打印后面的话，同步请求要等请求完了后才会打印后面的话（即等1.5秒）,如下图

![json2](/json2-1524036270418.gif)

**严重说明**

​	以后ajax都会做异步的，**不会写成同步**，这里讲异步和同步，只是为了让大家知道这两个概念！

**总结**：异步不影响后面代码的执行，同步会影响！



## 2.JS中处理JSON的兼容

- 在IE7和之前的版本，不支持JSON.parse这个方法处理JSON字符串

### 2.1 使用eval函数兼容

用法

```js
var obj = eval(JSON字符串);
```

> 不推荐使用： 不安全，eval函数可以执行任意js语句，如果服务器端发回来的是一段破坏性代码，eval也会执行

### 2.2 使用框架兼容

- `json2.js` 这个框架专门用来做json格式的兼容，只要导入这个文件，那么无论在什么版本浏览器里JSON.parse都可使用

```html
<!--[if lt IE 8]>
    <script src="json2.js"></script>
<![endif]-->
```

> 注：if lt IE 8 代表只有在IE8版本以下才执行标签内的代码



## 3.XML数据

- XML是一种标记语言，很类似HTML，但其宗旨是用来传输数据。

![1524049384628](/1524049384628.png)

语法规则：

1. XML的文档声明是<?xml version="1.0" encoding="UTF-8"?>，可以不写，但如果要写，必须写在第一行
2. 必须要有根标签
3. 属性用双引号（即使用单引号浏览器也会修改为双引号）
4. 标签名可以任意写，但是不允许有空格，且只能以字母、下划线开头

例:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <item>
        <id>1</id>
    	<name>张三</name>
    	<age>16</age>
    	<score>99</score>
    </item>
    <item>
        <id>2</id>
    	<name>李四</name>
    	<age>18</age>
    	<score>97</score>
    </item>
    <item>
        <id>3</id>
    	<name>王五</name>
    	<age>15</age>
    	<score>89</score>
    </item>
</root>
```

### 3.1 JS获得XML数据

- 如果服务端返回的是一个XML数据，应该用**respondsXML**获取

```js
//此时xmlDoc就得到了一个xml文档
var xmlDoc = xhr.respondsXML;
```

### 3.2 操作XML

- 因为获取到的xml是一个document类型的对象（即以前学的文档树），因此可以用getElement的方式找到对应元素数据

```JS
//获得所有标签为item的元素
xmlDoc.getElementsByTagName('item');
```

>  然后其他操作跟JS一样，例如innerHTML等属性可以取到或者赋值标签内的元素



### 3.3 XML案例：点击按钮新增表格数据

- 跟之前JSON案例还是一样，只不过把服务器返回的数据从JSON字符串改为XML

核心代码如下：

```js
    //2. 加载数据按钮的点击事件
    document.getElementById("load").onclick = function () {

        //2.1 创建xhr
        var xhr = new XMLHttpRequest();

        //2.2 设置请求行，请求xml文件
        xhr.open('get', 'students.xml');

        //2.3 发送请求
        xhr.send();

        //2.4 监听响应回来
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {

                //2.4.1 拿到xml文档树
                var xmlDoc = xhr.responseXML;

                //2.4.2 找到所有item（即学生）
                var arr = xmlDoc.getElementsByTagName('item');

                //2.4.3 准备tbody内容的字符串
                var content = "";

                //2.4.4 遍历数组
                for (var i = 0; i < arr.length; i++) {

                    //创建tr
                    content += "<tr>";
                    
                    //取到各种值
                    var id = arr[i].getElementsByTagName('id')[0].innerHTML;
                    var name = arr[i].getElementsByTagName('name')[0].innerHTML;
                    var age = arr[i].getElementsByTagName('age')[0].innerHTML;
                    var score = arr[i].getElementsByTagName('score')[0].innerHTML;
                    
                    //追加td
                    content += '<td>' + id + '</td>';
                    content += '<td>' + name + '</td>';
                    content += '<td>' + age + '</td>';
                    content += '<td>' + score + '</td>';

                    //一行结束
                    content += "</tr>";
                }
                
                //2.4.4 把拼接好的tr内容加到tbody里
                tb.innerHTML += content;
            }

        }
    };
```

 

> XML一般用得少，因为它有大量标签占容量，网络传输相对JSON更耗流量和更慢

