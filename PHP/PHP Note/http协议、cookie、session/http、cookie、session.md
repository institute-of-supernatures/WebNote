---
typora-copy-images-to: images
typora-root-url: images
---

## http协议、cookie和session

### 学习目标

 - 理解http协议
 - 理解请求、响应的概念
 - 理解cookie是什么
 - 掌握cookie使用
 - 理解session是什么
 - 掌握session使用




### 1. http协议

#### 1.1 http概念：

**协议**：就是一个规范行为的约定。

​	我们生活中有多种多样的协议，诸如：用人协议、租房协议等。

​	用人协议：就是规范了用人应该遵守的一些行为

​	租房协议：规范了租房时的一些行为

​	那么    `http协议` 又是什么呢？

**http**：HyperText（超文本） Transfer（传输） Protocol（协议）

​	  从字面上我们可以看到，首先http也是一种协议，是一种用来约束    `超文本传输 ` 时的行为。

​	

`超文本`是什么？其实就是`html`

> html全称：HyperText Markup Language  超文本标记语言



**所以http就是一个专门用来做网页传输的一种协议。**



#### 1.2 http解析

​	![52154141058](/1521541410589-1521541412198.png)

我们知道，访问一个网页无非就是`浏览器`发起`请求`，`服务器`对其`响应`。

**说人话**：即浏览器对服务器说：哥们，我要看A网页（请求）。然后服务器把A网页的内容发回给浏览器（响应）

而http协议就是一套规范`请求`格式，和`响应`格式的约定

也即：要看网页可以，但你得按我的规范来要，以及我按规范给你返回。这套规范就是http协议

##### 1.2.1 请求报文

​	浏览器发请求到底是发什么东西呢？其实就是一段按照协议格式写好的内容。我们把这段内容叫    `请求报文`

**如何看到`请求报文`**

​	打开浏览器，按F12，弹出底部栏后，再点   `Network`

如图：

![52154226100](/1521542261005.png)

然后下面红框区域，就是浏览器本次发送的所有`请求记录`

![52154235269](/1521542352697.png)然后我们点击本次我们发请求的地址，如`127.0.0.1`

![52154241531](/1521542415318.png)

右侧弹出界面，然后选`Headers`，我们发现右侧有`Request`和 `Response `，分别对应的就是`请求报文`和`响应报文`



我们点开`Request Headers`，默认显示的是浏览器优化后的显示结果，如果我们要看到`请求报文`真实是什么样子的。则点`view source`，如图分别为三大部分：`请求行`、`请求头`、`请求正文（也叫请求体）`

![52159590995](/1521595909958.png)

`请求行`：指明本次请求是`get`请求还是`post`请求（也有其他请求，例如put、delete、trace等，但不常用，常用的主要为get何post），以及指明本次请求遵守的协议版本

`请求头`：本部分的格式以`键值对`的形式组成，每行一对。本部分大概的内容有：请求目的地域名、连接状态、缓存状态、发起请求的浏览器信息、字符编码等。请求头后面会有一个空行，作为请求头部分结束的标记。

`请求正文`：本次请求发送给服务器的附加信息。一般`get请求`的请求正文为空



接下来我们看一个post请求的请求报文。

首先，界面代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
    <form action="login.php" method="POST">
        <input type="text" name='id' placeholder="请输入账号">
        <input type="password" name='pwd' placeholder="请输入密码">
        <input type="submit">
    </form>

</body>
</html>
```

当点击提交后，提交到login.php。使用post请求。

我们看到的请求报文如下：

![52159984932](/1521599849324.png)



发现：无论是`get`还是`post`发起的请求，格式都是三大部分，`请求行`、`请求头`、`请求体`。

主要差别在，请求行里，变成了`post`请求，请求体也就是请求正文里有了内容。`get`请求体里没内容主要是因为`get`请求把数据主要通过网址传递过去。而`post`是通过请求报文传递过去

> 总结： 请求报文里主要包含了要访问的文件、和在请求时传递给服务器的数据、发请求的系统环境等。



附：请求头部分内容说明

| **请求头**             | **说明**                            |
| ------------------- | --------------------------------- |
| **Host**            | 接受请求的服务器地址，可以是IP:端口号，也可以是域名       |
| **User-Agent**      | 发送请求的应用程序名称                       |
| **Connection**      | 指定与连接相关的属性，如Connection:Keep-Alive |
| **Accept-Charset**  | 通知服务端可以发送的编码格式                    |
| **Accept-Encoding** | 通知服务端可以发送的数据压缩格式                  |
| **Accept-Language** | 通知服务端可以发送的语言                      |

##### 1.2.2 响应报文

响应报文就是浏览器收到请求后，对浏览器所做出的响应（即回应）。包含三大部分：`状态行`，`响应头`，`响应体（响应正文）`

![52160336342](/1521603363421.png)

状态行：（HTTP/1.1）协议版本、（200）状态码、（OK）状态消息

响应头：包含响应时间、服务器环境、响应体的格式等，响应头后面会有一个空行代表结尾。

响应体：就是发回的文件内容。例如浏览器请求index.html界面，那么假设服务器能正常访问到这个文件的情况下，服务器会把index.html里的内容当做响应体发回给浏览器，然后浏览器自己再解析。



查看响应体方法如图：

![52160278138](/1521602781385.png)



> 总结：响应报文就是服务器对浏览器这次请求的一个回应，要么告诉浏览器失败，要么给浏览器发回一段内容并告诉它解析格式。



附：

状态码一览

| 状态码  | 说明                 |
| ---- | ------------------ |
| 200  | 响应成功               |
| 302  | 发生跳转               |
| 400  | 客户端请求有语法错误，不被服务器理解 |
| 403  | 服务器收到请求，但拒绝提供服务    |
| 404  | 请求的资源不存在           |
| 500  | 服务器内部错误            |

##### 1.2.3 一次完整的浏览器请求和服务器响应图解

![52161805805](/1521618058059.png)

说明：

​	1.服务器为什么能收到浏览器的请求，是因为服务器装了Apache。

​	2.如果浏览器请求的是.html或者.txt等格式的文件，服务器会直接把这个文件找到并读取内容做成响应报文发回给浏览器

​	3.如果浏览器请求的是.php文件，那么会先把这个php文件先交给    `php7apache2_4.dll`去执行（本处细节在第一天有讲），把执行后的结果再做成响应报文发回给浏览器

​	4.如果服务器找不到浏览器要请求的文件，响应报文中也有响应体，响应体是一个404 Not Found的页面，状态码是404



### 2. cookie

#### 2.1 应用场景

​	我们在浏览一些网站时，会发现有些网站能记住我们的一些信息。例如，京东就会把你上次登录后的昵称给记录上。如图

![52162313890](/1521623138901.png)

​	那么，这种方式是怎么实现的呢？这种实现技术是程序员的"小甜点"-->   `cookie`

​	

#### 2.2 cookie是什么

​	比如说你去超市买食品，带回家后突然发现食品过期了，这个时候你直接去超市，超市可不认识你。但是超市认识你的小票。凭小票就能知道你上一次来超市的各种信息。

​	那么Cookie 就像是在超级市场买东西拿到的小票，由超市（Server）发给消费者（Browser），超市方面不用记住每一个消费者的脸，但是他们认识消费者手里的小票（Cookie），可以通过小票知道消费者之前的一些消费信息（在服务端产生的数据）。



#### 2.3 使用cookie

##### 2.3.1 需求：

​	有个网站有如下功能：

​	第一次打开网站时，会在首页上方有一个app的广告界面，如图

![52168477823](/1521684778235.png)

点击`X`关闭按钮后，会弹出如下界面

![52168480458](/1521684804586.png)

然后只要是7天内打开这个网页，将不再显示此广告。



##### 2.3.2 分析

​	这是一个典型用    `cookie`做的功能，浏览器第一次访问此网站，服务器没有给他cookie（小票），所以服务器不认识它，依然要给它放广告，当点击`X`关闭后，服务器会给浏览器一个cookie（小票）记录下来，那么下次浏览器再访问这个网站时，因为带着cookie（小票），服务器一下子就认出它来，不再给它放广告。



##### 2.3.3 实现：

​	1.新建一个   `index.php`文件，代码如下

```php+HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .alert{

            border:1px solid black;
            width:230px;
            text-align: center;
            position: relative;
        }
        a{
            position: absolute;
            right:10px;
        }
    </style>
</head>
<body>

<div class="container mt-4">
	
    <!-- 此处等会添加判断cookie代码,决定要不要显示下面的广告  -->
    <div class="alert alert-warning alert-dismissible fade show">
      <a class="close" href="closeAD.php">&times;</a>
      <strong>屠龙宝刀，点击就送。</strong> 
      <div>关掉我就再也不出现了</div>
    </div>

    <h1>Hello cookie</h1>

</div>

</body>
</html>
```

新建一个`closeAD.php`，代码如下

```php
<?php

    //给浏览器写入一个cookie,这个cookie名字叫closeAD
    //值为off,
    setcookie("closeAD",'off');

    //写完后重新跳转回index.php
    header('location:index.php');
?>
```



此时，我们访问`index.php`，然后在浏览器界面按`F12`，然后点`Application`，再点`Cookies`，可以看到现在右侧什么都没显示。

![52168965386](/1521689653869.png)



然后，我们点击界面上的`x`关闭按钮，可以看到右侧多出了一条记录

![52168979580](/1521689795803.png)

这证明，我们用`setcookie`函数成功的给浏览器写入了一条cookie。

总结：写入cookie基本语法：

```php
setcookie('名','值');
```

那么现在，相当于浏览器有小票(cookie)，那么每次进超市（访问服务器），超市就该判断有没有小票，有小票不给广告。

因此，修改`index.php`代码，代码主要写在  `<div class="alert alert-warning alert-dismissible fade show">`上面

详细代码如下：

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .alert{

            border:1px solid black;
            width:230px;
            text-align: center;
            position: relative;
        }
        a{
            position: absolute;
            right:10px;
        }
    </style>
</head>
<body>

<div class="container mt-4">


    <?php
        //如果cookie中不存在closeAD,那么就显示下面的div
        if(!isset($_COOKIE['closeAD'])):
    ?>
    <!-- 广告部分 -->
    <div class="alert alert-warning alert-dismissible fade show">
      <a class="close" href="closeAD.php">&times;</a>
      <strong>屠龙宝刀，点击就送。</strong> 
      <div>关掉我就再也不出现了</div>
    </div>
    <?php
        endif;
    ?>

    <h1>Hello cookie</h1>

</div>

</body>
</html>
```



此时，以后无论什么时候用这个浏览器打开网页，广告都不会显示，除非自己删除cookie。

总结：获取浏览器的cookie语法：

```php
$_COOKIE['名'];
```

我们之前看的案例，是7天有效期，而我们目前写的是永久有效，除非自己清楚浏览器cookie，那么怎样才能做cookie的有效期呢？这时候我们要用到cookie的第三个参数，设置失效时间

用法如下：

```php
setcookie('名','值',time() + 秒数);
```

例：

```php
setcookie('login','ok',time() + 60); //代表60秒后失效
```

同样的道理，如果我们需要我们的广告cookie有效期为7天，就写成`time() + 60*60*24*7`

说明：60秒为1分钟 再乘以60 代表1小时 再乘以24代表一天，再乘以7代表一星期。

修改后代码为：

```php
<?php

    //给浏览器写入一个cookie,这个cookie名字叫closeAD
    //值为off,10秒后删除这个cookie
    setcookie("closeAD",'off',time() + 60*60*24*7);

    //写完后重新跳转回index.php
    header('location:index.php');
?>
```



#### 2.4 完整cookie交互流程：

首先，我们删掉之前浏览器已经存好的cookie，当做这是我们第一次访问网站。

删cookie方法如图

![52170079218](/1521700792182.png)



然后重新访问网站，看浏览器发送的请求，如图

![52170090247](/1521700902477.png)

可以发现，此次发送的请求依然是跟之前学的请求没差别，就是向`服务器`请求`index.php`这个文件。然后服务器响应`index.php`执行后的内容回来。

![52170099504](/1521700995040.png)



即：

​	![52170120808](/1521701208085.png)

接下来，我们关注重点的一步：点击`X`，让广告7天内不再显示的部分。

如图点击`X`

![52170130340](/1521701303402.png)

此次我们再来看请求报文和响应报文：

请求报文如下：

![52170141473](/1521701414736.png)

因为此次请求的是服务器的`closeAD.php`，发现发送请求报文时还是跟之前普通的请求报文没差别。

但仔细看响应报文，会发现跟之前的不太一样，如图

![52170158231](/1521701582319.png)

如图蓝色部分，这是跟我们之前看到的响应报文不一样的地方，在这个响应报文里多了一行`Set-Cookie`，这一行就是专门告诉浏览器，让浏览器保存一张小票（即cookie），以及告诉这个小票（即`cookie`）的内容是什么和失效时间。（这一步相当于去超市买东西，超市给你一张小票保存）

![52170207685](/1521702076852.png)

至此，我们就知道浏览器保存cookie的完整细节了，但是，cookie究竟是如何起到作用的呢？

我们再看，当浏览器有cookie后，再访问我们的这个网站，在发送请求报文时会在里面带上这个cookie（这一步相当于以后你再去超市，就带着小票去了）

如图：

![52170222345](/1521702223457.png)



因为`index.php` 里有代码做过判断，如果访问者没有cookie，那么才显示广告div，如果有cookie就不显示，所以只要浏览器有这个cookie，就一直看不到广告了。

详细逻辑图如下：

![52170380106](/1521703801067.png)

#### 2.5 删除cookie

##### 2.5.1 浏览器端自行删除：

​	首先按F12打开开发者工具，然后点击    `application`，再点击  `cookies` ，右侧找到并点击你要删除的那条cookie，最后点`x`就删掉了。

如下图：

![52203641334](/1522036413346.png)



##### 2.5.2 服务器端用代码删除：

我们知道，cookie是有有效期的，所以其实删除cookie的思路就是设置cookie，让它的过期时间为过去的时间即可

语法如下：

```php
setcookie('名','值',过去的某个时间);
```

例:

```php
setcookie('closeAD','off',time() - 3600);
```





#### 2.6 cookie案例1：记住登录名

有很多的网站，当你登录后，它会记住你的用户名，下次再登录时直接把用户名显示在界面上了，效果如图：

![52177561456](/1521775614563.png)



那么这个功能怎么实现的呢？其实也是用cookie，把信息保存在本地，在需要时再显示出来。

步骤：

1.新建`login.php`页面，代码如下：

```php+HTML
<?php
    
    //先判断cookie里有没有username，如果有，就取出来赋值给变量$username，如果没有，就给$username赋值为空字符
    $username = isset( $_COOKIE['username'] ) ? $_COOKIE['username'] : '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="check.php" method="post">

        <!-- 如果有cookie.此时value会为保存的用户名，否则为空 -->
        <input type="text" name='username' placeholder="请输入用户名" value="<?php echo $username; ?>">
        <input type="text" name='userpwd' placeholder="请输入密码">
        <input type="submit">

    </form>
</body>
</html>
```



2.新建`check.php`页面，代码如下：

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php

//取出提交来的账号和密码
$username = $_POST['username'];
$pwd = $_POST['userpwd'];

//判断账号密码是否正确
if($username == 'admin' && $pwd=='123456'){

    echo '登录成功';
    //如果正确，把用户名写入浏览器cookie
    setcookie('username',$username,time() + 60*60*24);

}else{

    echo '账号或密码错误！';
}

?>
</body>
</html>
```



此时，当登录成功一次后，下次再打开登录页面，即`login.php`会发现上面有登录名了



#### 2.7 cookie案例2：保持登录状态

##### 2.7.1 搭建登录界面

新建  `login.html`文件，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        form{
            width: 180px;
            margin: 100px auto;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <!-- 提交到check.php页面 -->
    <form action="check.php" method="post">

        <input type="text" placeholder="请输入账号" name='username'>
        <input type="text" placeholder="请输入密码" name='pwd'>
        <input type="submit" value="登录">
    </form>
</body>
</html>
```

##### 2.7.2 验证账号密码是否正确

在登录界面可知，用户登录后，会提交到 `check.php`页面，因此新建  `check.php`文件，在此做账号密码验证

```php
<?php
   
   //判断是否有提交账号和密码数据过来
   if(isset($_POST['username']) && isset($_POST['pwd'])){
    
       //取出账号和密码
       $username = $_POST['username'];
       $pwd = $_POST['pwd'];

       //打开数据库
       $link = mysqli_connect('localhost','root','root','test');
   
       //准备sql查询语句
       $sql = "select *from user where username='$username' and password='$pwd'";

       //查询结果
       $result = mysqli_query($link,$sql);

       //转换成数组
       $data = mysqli_fetch_all($result,1);

       //关闭数据库连接
       mysqli_close($link);

       //如果结果不为0，证明有此账号密码，则登录成功，给它显示网页
       if(count($data) > 0){
           	//去主页面
            header('location:main.php');
       }else{
		   //账号密码错误，去登录页
            header('location:login.html');
       }
    }
?>
```

再新建`main.php`，代码如下

```php+HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h2>欢迎登录：某某！您的余额为：0元</h2>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eos deleniti perspiciatis ea enim ipsa nam ipsam aliquid facere obcaecati rerum, iusto atque error beatae excepturi tempore alias natus! Vel?</p>
</body>
</html>

```

##### 2.7.3 存在的问题：

1. 在  `main.php`里，希望把登录用户的信息展示出来，例如，展示他的用户名和余额。


2. 用户不登录，直接访问 `main.php`这个页面，也能直接出这个界面。



解决思路：我们在账号密码验证正确后，把用户名、余额存到cookie里，然后在main.php里判断是否有这个cookie，如果有，证明登录成功可以访问，把cookie的内容取出来显示到界面上。如果没有，就调回login.html。

##### 2.7.3 把登录信息存到cookie

修改  `check.php` 中 `if( count($data) > 0 )` 部分，代码如下：

```php
//信息存到cookie
setcookie('name',$username);
setcookie('money',$data[0]['money']);

header('location:main.php');
```

然后修改  `main.php`的代码，让它有cookie才能访问，没有调回登录，代码如下：

```php
<?php
	//取cookie
    $username = $_COOKIE['name'];
    $money = $_COOKIE['money'];
	//判断是否存在cookie
    if(isset($username) && isset($money)):
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h2>欢迎登录：<?php echo $username; ?>您的余额为：<?php echo $money; ?>元</h2>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eos deleniti perspiciatis ea enim ipsa nam ipsam aliquid facere obcaecati rerum, iusto atque error beatae excepturi tempore alias natus! Vel?</p>
</body>
</html>

<?php
    else:
	    //如果不存在cookie，证明没登录过，返回登录页
        header('location:login.html');
    endif;
?>
```

至此，我们完成了登录状态保持。

### 3. session

> 回忆：cookie是存在哪？



#### 3.1 cookie可以被伪造

​	由于cookie是存在于浏览器端的特性，所以cookie是可以被用户自由修改、伪造。

例：我们做的  `保持登录状态` 案例。我们保存的用户信息都一目了然的存在于浏览器。很不安全，如图：

![52298406106](/1522984061061.png)

此时，我只要在电脑上随意修改，例如修改金额为`999999`，那么打开网站时也是`999999`。并且，其他人只要知道了你的用户名，那么也可以自行添加cookie，骗过服务器，直接访问`main.php`。（具体操作见课堂演示）



#### 3.2 session基本使用

> 思考：我们把cookie要存的那些数据，存在服务端是不是就更安全了呢？

如果要把原本cookie可以存的东西存在服务端，有一种技术叫session即可实现。

##### 3.2.1 session介绍

​	session可以理解为是服务器上的一个保险柜，把所有数据都保存在服务器的保险柜里，只给浏览器一把钥匙用来访问这些数据。

如图：

![52299996640](/1522999966404.png)

由图，我们可知：数据都是存在服务器端，而浏览器端只存一把 `钥匙`。因为要把 `钥匙`给浏览器存起来，存钥匙的技术还是cookie，所以说session技术是基于cookie的。



##### 3.2.1 新增session语法：

```php
//一定要先调用此函数开启session
session_start();
//通过超全局变量添加一条session记录
$_SESSION['名']= 值;
```

之前我们用cookie值一般都是给字符串，但是在session中，除了可以给基本类型，还可以给复杂数据类型

例：

``` php
//一定要先调用此函数开启session
session_start();
//保存基本类型
$_SESSION['name'] = 'jack';
//保存复杂数据类型
$_SESSION['books'] = array('C语言从入门到入土','MySQL优化之道：从删库到跑路');
```

注意：新增时一定要先使用   `session_start();` 开启session



##### 3.2.2 读取session语法

```php
//一定要先调用此函数开启session
session_start();
//直接通过超全局变量可以取到session记录
var_dump($_SESSION);
//单独取出某条$_SESSION记录
echo $_SESSION['name'];
```



##### 3.2.3 修改session语法

直接对已经存在的session重新赋值就是修改

```php
// 开启session
session_start();
//修改
$_SESSION['name'] = 'rose';
```



##### 3.2.4 删除session语法

使用 `unset`函数可以删除session

```php
// 开启session
session_start();

// 删除保存的session
// 删除变量的值
unset($_SESSION['name']);
```



>  总结：只要是想操作session，请记得都要开启session



##### 3.2.5 session关闭浏览器就删除了



### 4. 延伸阅读  -----《图解http》

[图解http]: ./图解HTTP+彩色版.pdf

注：按住ctrl键 + 鼠标左键可以打开

