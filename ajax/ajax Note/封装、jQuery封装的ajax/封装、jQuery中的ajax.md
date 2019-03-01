---
typora-copy-images-to: media
typora-root-url: media
---

# 封装ajax、jQuery中的ajax



## 1. 封装ajax代码之一



### 1.1 为什么要封装

- 我们一个完整的网页，很多部分都需要异步请求数据，会用到ajax技术，但每次ajax请求的大体代码都是一样的，根据封装的思想：重复的代码封装成函数，因此封装函数能加快开发以及让代码相对更整洁



### 1.2 简单封装思路

- 声明个函数，把之前实现的 `ajax` 请求代码，直接当函数体封装起来，代码如下：

```js
function ajax(){
    //1. 创建xhr
	var xhr = new XMLHttpRequest()
	//2. 设置请求头
    xhr.open('get', 'www.zll.com/data.php')
	//3. 发送请求
    xhr.send(null)
    
    //4. 拿到响应体
    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){

          console.log(xhr.responseText);
      }
    }
}
```



## 2. 封装ajax代码之二



### 2.1 之前封装存在的问题

- 之前的封装，功能局限性太强，体现在以下几点
  - 只能发送get请求
  - 只能请求www.zll.com/data.php这个接口
  - 没有携带参数
  - 拿到响应体后只是打印响应体



### 2.2 继续封装ajax

- 根据封装思想，不同的数据或操作当参数传递，我们对之前封装继续改进。

#### 2.2.1 解决只能发get请求的问题

- 请求不能写死，应该当参数传递过来，修改后代码如下：

```js
//type参数：传get或post
function ajax(type){
    //1. 创建xhr
	var xhr = new XMLHttpRequest()
	//2. 设置请求行
    xhr.open(type, 'www.zll.com/data.php')
    
    if(type== "post" || type=="POST"){
        
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    }
    
	//3. 发送请求
    xhr.send(null)
    
    //4. 拿到响应体
    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){

          console.log(xhr.responseText);
      }
    }
}
```



#### 2.2.2 解决只能请求一个接口的问题

- 网址接口不能写死，当做参数传递过来，修改后代码如下：

```js
//type参数：传get或post
//url参数：请求的接口地址
function ajax(type,url){
    //1. 创建xhr
	var xhr = new XMLHttpRequest()
	//2. 设置请求头
    xhr.open(type, url)
	//3. 发送请求
    xhr.send(null)
    
    //4. 拿到响应体
    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){

          console.log(xhr.responseText);
      }
    }
}
```



#### 2.2.3 解决不能携带参数的问题

- 多加一个函数的参数，把请求需要发送的数据当函数参数的传递

```js
    /**
    *  type: 请求方式
    *  url：请求路径
    *  data：发送请求时提交的数据   都要传 key=value的形式
    */ 
    // 二.0 加了一个形参data
    function ajax(type,url,data) {

        //把相同的代码封装起来

        //1. 创建请求对象
        var xhr = new XMLHttpRequest();

        //二.1 如果有传数据过来，并且是get请求，应该拼接网址了
        if(data != "" && type.toLocaleLowerCase() == 'get'){

            url += "?" + data;
        }
        
        //2. 设置请求行（用传进来的参数来填充）
        xhr.open(type, url); 

        //二.2 如果是post请求还要设置请求头
        if(type.toLocaleLowerCase() == "post"){
            //设置请求头
            xhr.setRequestHeader('Content-type',"application/x-www-form-urlencoded");

            //3. 发送请求
             xhr.send(data);  //如果是POST请求，把数据直接send过去

        }else{

             xhr.send();  //如果是get就发空参数
        }
        
        

        //4. 监听响应完成事件
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {

                console.log(xhr.responseText);
            }

        }
    }
```

#### 2.2.4 拿到JSON数据做不同操作

- 现在我们封装的函数拿到响应体后，只是打印响应体。
- 每个人拿到响应体，想做的事不一样，也就意味着每个人拿到响应体后写的代码不一样
- 根据封装思想：不一样的部分当参数传递进来。每个人实现代码不一样，就干脆让调用者把自己要实现的代码当做参数传过来（即传递一个函数）

> 代码如下：

```js
/**
    *  type: 请求方式
    *  url：请求路径
    *  data：发送请求时提交的数据   都要传 key=value的形式
    */
    // 三.1 加了一个形参success
    function ajax(type, url, data, success) {

        //把相同的代码封装起来

        //1. 创建请求对象
        var xhr = new XMLHttpRequest();

        //二.1 如果有传数据过来，并且是get请求，应该拼接网址了
        if (data != "" && type.toLocaleLowerCase() == 'get') {

            url += "?" + data;
        }

        //2. 设置请求行（用传进来的参数来填充）
        xhr.open(type, url);

        //二.2 如果是post请求还要设置请求头
        if (type.toLocaleLowerCase() == "post") {
            //设置请求头
            xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");

            //3. 发送请求
            xhr.send(data);  //如果是POST请求，把数据直接send过去

        } else {

            xhr.send();  //如果是get就发空参数
        }



        //4. 监听响应完成事件
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {

                //每次发的异步请求，拿到响应体想做的事是不一样的！
                //而你在这里，只是打印出了响应体
                //我们一般要把响应体解析到界面上，而且也可能是不同的界面
                //console.log(xhr.responseText);

                //别人想怎么处理响应体，就让它把处理响应体的代码传过来就行了
                //怎样才能传一段代码进来？？函数就能保存一段代码，那么也就意味着，只要
                //接收一个函数，在这里调用就行了
                //三.2 调用就行了
                success(xhr.responseText);
            }

        }
    }
```

> 因为我们封装的ajax代码，可能以后很多项目要用，所以把以上代码写到一个 myajax.js 文件里，以后要用就导入这个文件即可



#### 2.2.5 测试封装的ajax

- 新建 `data.php` 页面，代码如下：

```php
<?php
    $data = array('name' => 'jack','age' => 16 );
	//响应报文为json字符串
    echo json_encode($data);
?>
```

- 新建  `index.html` 页面，代码如下

```html
<!-- 导入我们刚刚封装好的ajax工具 -->    
<script src="myAjax.js"></script>

<script>
    //参数1：请求方式
    //参数2：请求地址
    //参数3：参数
    //参数4：拿到响应体的回调函数
    ajax('get','./data.php','',function(json){
        console.log(json);
        console.log('假装把拿到的json数据展示到界面上');
    });
</script>
```

- 结果如下：

![1524555761758](1524555761758.png)

#### 2.2.6 图解封装函数调用过程

 ![1524555761758](2332434543.png)





## 3. 封装ajax代码之三

> 我们发现，刚刚封装的函数，一共有4个参数，参数太多，而且以后如果要多传一段数据，需要又再加一个参数，能否优化为就一个参数？

### 3.1 修改参数

- 我们可以把参数改成一个对象
- 修改封装的ajax代码，把多个参数值改成一个参数，要求传入一个对象，代码如下

```js
/*
  params是一个对象
  params.type     请求类型
  params.url      请求网址
  params.data     请求参数
  params.success  回调函数
*/
function ajax(params){

    //1. 创建xhr
    var xhr = new XMLHttpRequest()

    //2.1 判断是get还是post
    if(params.type == "get"){
        // 拼接参数
        params.url += "?" + params.data;
	    // 设置请求行
        xhr.open(params.type, params.url);
    
	    //3. 发送请求
        xhr.send(null);

    }else{

	    // 设置请求行
        xhr.open(params.type, params.url);
        
        //设置请求头
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    
	    //3. 发送请求
        xhr.send(params.data);
    }

    
    //4. 拿到响应体
    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){

          //转成JSON对象
          var json = JSON.parse(xhr.responseText);

          //交给调用者处理
          params.success(json);
      }
    }
}
```

### 3.2 测试调用

```js
//调用ajax函数，传入一个对象
//对象里有type,url,data,success属性
ajax(
    {
        type : 'get',
        url : './data.php',
        data : '',
        success : function(json) {
            console.log(json);
            console.log('假装把拿到的json数据展示到界面上');
        }
	});
```



## 4. 封装ajax代码之四

### 4.1 目的

- 我们刚刚封装的函数（如果未来还打算继续封装几个有关ajax的请求），会有多个变量名污染（例如全局变量中占用了ajax这个名），如何解决？

###4.2 完成

- 把函数都封装到一个对象里，作为对象的方法，即可解决这些函数名污染的问题

```js
var myJq = new Object();

/*
  params是一个对象
  params.type     请求类型
  params.url      请求网址
  params.data     请求参数
  params.success  回调函数
*/
myJq.ajax = function(params){

    //1. 创建xhr
    var xhr = new XMLHttpRequest()

    //2.1 判断是get还是post
    if(params.type == "get"){
        // 拼接参数
        params.url += "?" + params.data;
	    // 设置请求行
        xhr.open(params.type, params.url);
    
	    //3. 发送请求
        xhr.send(null);

    }else{

	    // 设置请求行
        xhr.open(params.type, params.url);
        
        //设置请求头
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    
	    //3. 发送请求
        xhr.send(params.data);
    }

    
    //4. 拿到响应体
    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){

          //转成JSON对象
          var json = JSON.parse(xhr.responseText);

          //交给调用者处理
          params.success(json);
      }
    }
}
```





## 5. jQuery封装的ajax工具

- jQuery是一个JS库：即一套用JS封装好的函数库
- jQuery本身就已经封装好了方便程序员调用ajax的方法，功能比我们刚刚自己封装的更强大



### 5.1 $.ajax

- jQuery中用来发ajax请求的方法，跟我们封装的方法类似，但是功能更强大

```js
//传入一个对象
$.ajax({
    
  //请求网址
  url: './data.php',
  //请求类型
  type: 'post',
  //服务器响应数据类型，如果是跨域，可以改成jsonp
  dataType: 'json',
  //发送给服务器的数据（请求体）,如果是get请求数据写在url,如果是post才写data属性
  data: { id: 1 },
  //回调函数：响应回来调用的函数
  success: function (data) {
    console.log(data)
  },
  //请求失败触发
  error: function (err) {
    console.log(err)
  }
    
})
```

- 常用选项参数介绍：
  - url：请求地址

  - type：请求方法，默认为 `get`

  - dataType：服务端响应数据类型，一般只是在跨域时写jsonp，其他时候可以不写，自动根据响应头判断返回数据

  - data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递

  - timeout：请求超时时间

  - success：请求成功之后触发

  - error：请求失败触发

> 有些用不到的属性，可以不用写

- 例子代码如下：

```js
$.ajax({
    url:'http://api.douban.com/v2/movie/top250',
    type:'get',
    dataType:'jsonp',
    success:function(data){
        console.log(data);
    }
});

```

> 使用$.ajax方法有个不太方便的地方是：每次要指定type属性，即请求的类型



### 5.2 $.get

- 专门用来只做  `get`  请求的方法，参数与 `ajax` 方法一样，只是不用写 `type`

```js
$.get({
    url:'http://api.douban.com/v2/movie/top250',
    dataType:'jsonp',
    success:function(data){
        console.log(data);
    }
})
```

- 或者可以不传对象，传四个参数
  - 参数1：请求url
  - 参数2：要传递给服务器的数据（如果不传数据可以不写此参数）
  - 参数3：回调函数，函数的第一个参数是服务器返回的数据
  - 参数4：dataType，返回的数据格式

```js
$.get('http://api.douban.com/v2/movie/top250',function(data){
    
    console.log('data');
    
},'jsonp')
```



### 5.3 $.post

- 专门用来只做  `post`  请求的方法，参数与 `ajax` 方法一样，只是不用写 `type`

```js
$.post({
    url:'./data.php',
    //传字符串
    data:"name=jack&pwd=123",
    success:function(data){
        console.log(data);
    }
})
```

- 此方法要给服务器传递数据时，需要写  `data`  属性，属性值可以是  `"name=jack&pwd=123"`  这样的字符串，也可以是对象， 代码如下：

```js
$.post({
    url:'./data.php',
    //传对象
    data:{ name:"jack", pwd:123 },
    success:function(data){
        console.log(data);
    }
})
```

或者可以不传对象，传四个参数

- 参数1：请求url
- 参数2：要传递给服务器的数据（如果不传数据可以不写此参数）
- 参数3：回调函数，函数的第一个参数是服务器返回的数据
- 参数4：dataType，返回的数据格式

```js
$.get('http://api.douban.com/v2/movie/top250',
      {name:"jack", pwd:123},
      function(data){
    	console.log('data');
       },
      'jsonp');
```



## 6. ajax案例：注册界面

案例如图：

![1524586183888](/1524586183888.png)



### 6.1 需求说明

- 用户一旦输入完用户名（失去焦点），就用ajax验证用户名是否可用
  - 在请求开始和响应完成之间的时间需要显示出 `加载动画`
- 用户一旦输入完手机（失去焦点），用ajax验证此手机号是否可用
  - 在请求开始和响应完成之间的时间需要显示出 `加载动画`
- 用户点击获取验证码，用ajax去接口请求验证码
  - 需要点击后有倒计时，倒计时期间不允许再次点击获取验证码
  - 倒计时结束还原按钮
  - 响应结束自动把验证码带入输入框
- 点击注册，注册新用户


### 6.2 接口说明

- 为了模拟真实开发， 后台接口部分就不写了，直接用已经写好的接口，并且提供接口文档，学习如何看接口文档开发
- 接口文档请看 [api文档](./api.md) （按住ctrl键+鼠标左键）




### 6.3 首页布局与结构 

#### 6.3.1 样式部分

- 样式了解一下即可（讲师带领讲解各元素样式）

```css
    html,
    body {
      height: 100%;
      overflow: hidden;
      font-family: '微软雅黑';
    }

    body {
      margin: 0;
      padding: 0;
      background: url('./resource/images/wallpaper.jpg') no-repeat center /100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ul {
      margin: 0;
      padding: 50px;
      padding-top: 0px;
      list-style: none;
    }

    .register {
      width: 800px;
      background-color: #F9F9F9;
      border: 1px solid #CCC;
      border-radius: 5px;
    }

    li {
      display: flex;
      margin: 20px 0;
    }

    label,
    input {
      display: block;
      float: left;
      height: 46px;
      font-size: 24px;
      box-sizing: border-box;
      color: #333;
    }

    label {
      width: 200px;
      line-height: 46px;
      margin-right: 30px;
      text-align: right;
    }

    input {
      width: 320px;
      padding: 8px;
      line-height: 1;
      outline: none;
      position: relative;
    }

    input.code {
      width: 120px;
    }

    input.verify {
      width: 190px;
      margin-left: 10px;
    }

    input.disabled {
      background-color: #CCC !important;
      cursor: not-allowed !important;
    }

    input[type=button] {
      border: none;
      color: #FFF;
      background-color: #E64145;
      border-radius: 4px;
      cursor: pointer;
    }

    .tips {
      width: 100%;
      height: 40px;
      text-align: center;
    }

    .tips p {
      min-width: 300px;
      max-width: 400px;
      line-height: 40px;
      margin: 0 auto;
      color: #FFF;
      display: none;
      background-color: #C91623;
    }

    .submit:disabled {
      background-color: gray;
      cursor: not-allowed;
    }

    span {
      line-height: 46px;
      padding-left: 20px;
      font-size: 20px;
      color: yellowgreen;
      text-shadow: 0 0 20px yellowgreen;
    }

    .cover{
        width: 100%;
        height: 100%;
        background: url('./resource/images/loading.gif') no-repeat center;
        z-index: 999;
        position: absolute;
        background-color: black;
        opacity: 0.2;
        display: none;
    }
```

#### 6.3.2 HTML结构部分

- 整体是一个div，这个div的类名是register
- 叫tips的div，默认不显示，当需要提示信息时才显示
- 所有都输入内容都在表单里，表单id为ajaxForm
- 没有submit，只有button，所以当点击注册时，要自己写代码监听点击事件，再提交数据到服务器

```html
  <!-- 遮罩层 -->
  <div class="cover"></div>
  <!-- 注册界面 -->
  <div class="register">
    <div class="tips">
      <p>用户名不能为空</p>
    </div>
    <form id="ajaxForm">
      <ul>
        <li>
          <label for="">用户名</label>
          <input type="text" name="name" class="name">
        </li>
        <li>
          <label for="">请设置密码</label>
          <input type="password" name="pass" class="pass">
        </li>
        <li>
          <label for="">请确认密码</label>
          <input type="password" name="repass" class="repass">
        </li>
        <li>
          <label for="">验证手机</label>
          <input type="text" name="mobile" class="mobile">
        </li>
        <li>
          <label for="">短信验证码</label>
          <input type="text" name="code" class="code">
          <input type="button" value="获取验证码" class="verify">
        </li>
        <li>
          <label for=""></label>
          <input type="button" class="submit" value="立即注册">
        </li>
      </ul>
    </form>
  </div>
```

### 6.4 输入完用户名ajax请求是否可用

- 先导入jQuery框架，如下：

```html
<script src="./js/jquery-1.12.4.min.js"></script>
```

- 然后给用户名的文本框加失去焦点事件

```js
    //给用户名加失去焦点事件
    $(".name").blur(function(){

        //如果内容为空，则提示不能为空
        if(this.value == ""){
            
            //提示不能为空
            $('.tips p').html("用户名不能为空").stop().fadeIn(1000).fadeOut(1000);
            
            //不去服务器请求
            return;
        }
        //显示加载中的遮罩层
        $('.cover').show();

        //请求服务器验证
        $.get('api/checkName.php?name=' + this.value,function(data){
            
            //当响应回来后，把响应内容显示到提示框，并用动画效果淡入提示框和淡出提示框
            $('.tips p').html(data).stop().fadeIn(1000).fadeOut(1000);
            
            //隐藏加载中的遮罩层
            $('.cover').hide();
        });
    });
```

- 效果展示

![register_name](/register_name.gif)



### 6.5 验证手机是否可用

- 当手机输入框失去焦点后触发，代码如下：

```js
	//给手机框加失去焦点事件
    $('.mobile').blur(function(){

         //显示加载中的遮罩层
         $('.cover').show();

        $.post(
            'api/checkMobile.php',

            { mobile: this.value },

            function(data){

            //当响应回来后，把响应内容显示到提示框，并用动画效果淡入提示框和淡出提示框
            $('.tips p').html(data).stop().fadeIn(1000).fadeOut(1000);

            //隐藏加载中的遮罩层
            $('.cover').hide();
        });;
    });
```

- 代码说明：
  - 当输入完手机后触发事件
  - 事件里先显示出加载中的遮罩层
  - 然后向服务器发post请求
  - 当服务器结果返回时，把结果展示在提示框，并且隐藏遮罩层

### 6.6 手机验证码

- 点击获取验证码后，去请求服务器验证码，代码如下

```js
    //给获取验证码加点击事件
    $('.verify').click(function () {

        //如果还有disabled类，证明5秒内被点过，直接return
        if($(this).hasClass('disabled')) return;

        // 设置倒计时时间
        var totalTime = 5;
        // 改变按钮的文字和设置按钮变灰
        $('.verify').val('还有' + totalTime + 'S').addClass('disabled');;
        // 开启计时器
        var interId = setInterval(function () {
            //秒数-1
            totalTime--;

            //倒计时完成
            if (totalTime == 0) {

                //清除计时器
                clearInterval(interId);
                // 还原样式
                // 还原内容
                $('.verify').removeClass('disabled').val('获取验证码');

            } else {
                $('.verify').val('还有' + totalTime + 'S');
            }

        }, 1000);
        
        //向服务器发请求要验证码
        $.get(
            //请求地址
            'api/code.php',
            //参数名为mobile，值为手机号
            { mobile: $('.mobile').val() },
            //回调
            function (data) {
                //把服务器返回的验证码填入验证码框
                $('.code').val(data);
            });;
    });
```

- 思路分析：

  - 首先需要给点击发送按钮加点击事件

    - 点击事件里，需要一个变量记录倒计时5秒
    - 然后开启一个计时器，每隔1秒触发一次
      - 在计时器里修改按钮文字为当前倒计时
      - 判断倒计时是否为0，为0停止计时器并复原按钮

    ​

    - 给服务器发送请求获取验证码



### 6.7 完成注册按钮

- 点击注册后，提交信息到服务器

```js
    // 点击注册按钮
    $('.submit').click(function(){

      // 发送post请求，并设置提交的数据
      $.post('api/register.php',
      {
        name:$('.name').val(),
        mobile:$('.mobile').val(),
        pass:$('.pass').val(),
        repass:$('.repass').val(),
        code:$('.code').val()
      },
      function(backData){
        console.log(backData);
      })
    })
```



## 7. jQuery中关于ajax部分的补充

### 7.1 serialize方法

- 根据刚刚的注册案例得知，我们需要在一个表单中提交所有数据时，需要一个一个取出元素的值，很不方便
- serialize方法可以让我们一下子获得表单中的值，并拼接成字符串形式

```js
var sendData = $('#ajaxForm').serialize();
console.log(sendData);
```

- 结果：

  ![1524645682971](/1524645682971.png)

  > 注意：只有表单里加了 name属性的，通过serialize方法可以把它取到值作为参数，没加name属性的不会取到。



### 7.2 jQuery中ajax的全局方法



#### 7.2.1 ajaxSetup

- ajax默认设置方法。可以设置一些jQuery中的ajax请求的默认参数

```js
$.ajaxSetup({
  url: "http://www.zll.com",
  type: "POST",
  data:{ name:"jack",age:16 }
  ......
});
```

- 说明：
  - 当这么设置后，再用jQuery发ajax请求时，如果不指定url,type和data，那么将自动把url变为www.zll.com，发送类型为post，数据为jack,16的这个对象。

例：

```js
    $.ajaxSetup({
        url: "http://api.douban.com/v2/movie/top250",
        type: "POST",
        data: { name: "jack", age: 16 }
    });
	
	//如果没有设置url，会自动按全局默认设置的url来
    $.ajax({
        dataType:'jsonp',
        success: function(data){

            console.log(data);
        }
    })
```



![1524646937255](/1524646937255.png)

#### 7.2.2 ajaxStart

- 当全局有任意一次jQuery做的ajax请求发起时调用的方法

```js
    $(document).ajaxStart(function (xhr) {
      // 全局有任意一次 AJAX 请求开始（必须是 jQuery 发起的请求）
      console.log('有请求了')
    })

```



#### 7.2.3 ajaxStop

- 当全局有任意一次jQuery做的ajax请求结束时调用的方法

```js
    $(document).ajaxStop(function (xhr) {
      // 全局有任意一次 AJAX 请求结束（必须是 jQuery 发起的请求）
      console.log('请求结束了')
    })

```



# 延伸阅读

更多jQuery中的ajax方法，可查阅

http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp