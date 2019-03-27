# 01-英雄模块1：获取所有英雄列表





## 服务端 heroController.js

```javascript
showHeroList:(req,res)=>{
        res.writeHead(302,{
            'Location':'/resource/view/index.html'
        });
        res.end();
    },
    getHeroList:(req,res)=>{//英雄列表
        heroModel.find((err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                });
            }else{
                //1.计算页数(一页10个)
                let pageCount = Math.ceil(docs.length/10);
                //2.返回客户端 第一页数据 和 页数
                res.send({
                    heros:docs.slice(0,10),
                    pageCount,
                });
            }
        });
    },
```



## 客户端 index.js



* 1.页面加载完毕开始请求数据

```javascript
$(function () {
      //1.英雄列表
      $.ajax({
        url: '/heroList',
        type: 'get',
        dataType: 'json',
        success: function (data) {
          console.log(data);
          $('tbody').html(template('heroListTmp', data)); //渲染列表
          $('.pagination').html(template('pageTmp', data)); //渲染页码
        }
      });
    })
  </script>
```

* 2.写模板

```html
<!-- 身体 -->
              <tbody>
                <!-- 模板引擎 -->
                <script id="heroListTmp" type="text/html">
                  {{ each heros }}
                  <tr>
                      <td>{{ $value.name }}</td>
                      <td>{{ $value.skill }}</td>
                      <td><img src="{{ $value.icon }}" width="72px" height="72px"></td>
                      <td class="manager">
                          <button class="btn btn-success" >编辑🐷</button>
                        <button class="btn btn-danger">删除👍</button>
                      </td>
                    </tr>
                  {{ /each }}  
                </script>
              </tbody>
<!-- 分页 -->
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <script id="pageTmp" type="text/html">
                  <% for(var i = 1; i <= pageCount; i++){ %>
                      <li class="page"><a href="javascript:void(0)"><%= i %> </a></li>
                    <% } %>
                  </script>
              </ul>
            </nav>
```



![img](file://C:/Users/%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/28%E6%9C%9FNodejs/%E5%85%B6%E4%BB%96%E8%B5%84%E6%96%99/Nodejs%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/day05/day05.assets/1551034839571.png?lastModify=1551036010)



# 02-英雄模块2：分页功能实现



## 服务端heroController.js



```javascript
getHeroPageList:(req,res)=>{
        //1.获取请求参数
        let page = req.query.page;
        //2.查询数据库
        heroModel.find((err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                });
            }else{
                //返回客户端 指定页数数据
                res.send({
                    heros:docs.slice((page-1)*10,page*10),
                });
            }
        });
    },
```



## 客户端index.html

```javascript
	//1.英雄列表
      $.ajax({
        url: '/heroList',
        type: 'get',
        dataType: 'json',
        success: function (data) {
          console.log(data);
          $('tbody').html(template('heroListTmp', data)); //渲染列表
          $('.pagination').html(template('pageTmp', data)); //渲染页码

          //2.分页查询(必须要等页码渲染之后才可以获取到页码li元素)
          $('.page').on('click', function () {
            $.ajax({
              url: '/heroPage?page=' + $(this).text(),
              type: 'get',
              dataType: 'json',
              success: function (data) {
                console.log(data);
                $('tbody').html(template('heroListTmp', data)); //渲染列表
              }
            });
          });
        }
      });
```



# 03-英雄模块3：搜索功能实现



## 服务端heroController.js

```javascript
 getHeroSearchList:(req,res)=>{
        //1.获取请求参数 searchStr
        let searchStr = req.query.searchStr;
        //2.查询数据库
        let reg = new RegExp(searchStr);
        heroModel.find({name:reg},(err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                });
            }else{
                //返回客户端 查询到的数据
                res.send({
                    heros:docs,
                });
            }
        });
    },
```





## 客户端index.html



```javascript
//3.搜索按钮
      $('.btn-search').on('click', function () {
        if($('#search').val().length == 0){//如果没有输入，不发送请求
          return;
        };

        $.ajax({
          url: '/heroSearch?searchStr=' + $('#search').val(),
          type: 'get',
          dataType: 'json',
          success: function (data) {
            console.log(data);
            $('tbody').html(template('heroListTmp', data)); //渲染列表
            //清空搜索框
            $('#search').val('');
          }
        });
      });
```



# 04-英雄模块4：添加英雄功能实现



## ==客户端 insert.html==

* 1.js原生FormData实现上传文件
* 2.js原生FileReader实现文件预览

```javascript
$(function () {

      $('#form').on('submit', function (e) {
        //使用formdata对象来实现文件提交
        //1.创建一个FormData对象  参数是HTMLElment对象
        var formData = new FormData($('#form')[0]);
        console.log(formData);
        //2.禁用表单默认提交事件
        e.preventDefault();
        //3.开始提交
        $.ajax({
          url: '/heroAdd',
          type: 'post', //提交方式
          dataType: 'json', //返回数据格式（jquery自动帮我们转成json对象）
          data: formData,
          processData: false, //jquery独有属性，会自动对表单数据序列化。文件上传不需要
          /*默认情况下jquery设置请求头的数据类型是application/x-www-form-urlencoded; charset=UTF-8，
          而文件上传的数据类型是表单默认的multipart/form-data*/
          contentType: false,
          success: function (data) {
            if (data.err_code == 0) {
              //跳转首页
              location.href = '/';
            } else {
              alert(data.err_msg);
            };
          }
        });
      });

      /* 前端图片预览+获取图片内存大小+获取图片尺寸 */
      //1.给input元素注册change事件（当选择文件后被触发）
      $('#icon').on('change', function () {
        //2.创建原生FileReader对象（文件读取）
        var fileReader = new FileReader();
        //3.开始读取文件
        fileReader.readAsDataURL(this.files[0]);
        //4.文件读取结束后，会触发fileReader的onload事件
        fileReader.onload = function () {
          //4.1  fileReader.result是文件的base64编码  
          //赋值给img标签的src属性即可显示
          $('#img').attr('src', fileReader.result);

          //4.2 获取img标签图片的宽高
          console.log($('#img').width(), $('#img').height());
          //4.3 获取img标签图片的大小
          /* 算法介绍：  
            a.英文一个字母占据一个字节(byte)，而1kb = 1024byte
            b.由于图片二进制转base编码之后，尺寸会变大，所以需要计算处理
                真实大小 = （base64大小 - base64大小/8*2)
                        = base64大小 * 0.75
            c.最终公式为  真实kb = (base64长度 * 0.75)/1024
          */
          console.log((fileReader.result.length * 0.75) / 1024 + 'kb');

          //获取完数据之后，把img标签设为固定尺寸
          $('#img').width('100px');
          $('#img').height('100px');
        };
      });
    })
```



## ==服务端:使用express-fileupload中间件接收文件==



https://github.com/richardgirges/express-fileupload/tree/master/example



* 1.在app.js中配置中间件

```javascript
//3.4 express-fileupload：接收文件数据
const fileUpload = require('express-fileupload');
app.use(fileUpload());
```

* 2.C层处理业务逻辑

```javascript
doHeroAdd: (req, res) => {
        //1.获取请求参数
        let body = req.body;
        console.log(req.body); //只能获取文本数据
        console.log(req.files); //文件数据   icon是前端input标签name属性值

        //2.处理数据：存储到数据库
        //手动添加图片路径icon
        body.icon = '/resource/images/' + body.name + '.png';
        //2.1 图片文件存入./resource/images/英雄名称.png  (./相对路径：运行node所在文件夹路径)
        req.files.icon.mv('./resource/images/' + body.name + '.png', (err)=> {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                });
            } else {
                //2.2 名字 技能 图片路径存入数据库
                heroModel.create(body, (err) => {
                    if (err) {
                        res.send({
                            err_code: 500,
                            err_msg: err
                        });
                    } else {
                        res.send({
                            err_code: 0,
                            err_msg: 'success'
                        });
                    };
                });
            };
        });
    },
```



# 05-英雄模块5：编辑英雄功能实现

* ***在添加英雄功能中已经配置好multer中间件，无需配置***

## ==客户端 update.html(index.html页面传多个值)==



* 利用window.name属性页面间传多个值(index.html)

```html
<td class="manager">
                          <button class="btn btn-success" onclick="window.name='{{$value.name}},{{$value.skill}},{{$value._id}},{{$value.icon}}';location.href='/resource/view/update.html'">编辑🐷</button>
                        <button class="btn btn-danger" onclick="location.href='/heroDelete?_id={{ $value._id}}'">删除👍</button>
</td>
```

* update.html

```javascript
 $(function () {
      //1.获取页面传参并且显示到页面
      var hero = window.name.split(',');
      console.log(hero); //[0:name,1:skill,2:id,3:icon]
      $('#name').val(hero[0]);
      $('#skill').val(hero[1]);
      $('#_id').val(hero[2]);
      $('#iconImg').attr('src', hero[3]);

      //2.表单提交
      $('#form').on('submit', function (e) {
        //使用formdata对象来实现文件提交
        //1.创建一个FormData对象  参数是HTMLElment对象
        var formData = new FormData($('#form')[0]);
        console.log(formData);
        //2.禁用表单默认提交事件
        e.preventDefault();
        //3.开始提交
        $.ajax({
          url: '/heroUpdate',
          type: 'post', //提交方式
          dataType: 'json', //返回数据格式（jquery自动帮我们转成json对象）
          data: formData,
          processData: false, //jquery独有属性，会自动对表单数据序列化。文件上传不需要
          /*默认情况下jquery设置请求头的数据类型是application/x-www-form-urlencoded; charset=UTF-8，
          而文件上传的数据类型是表单默认的multipart/form-data*/
          contentType: false,
          success: function (data) {
            if (data.err_code == 0) {
              //跳转首页
              location.href = '/';
            } else {
              alert(data.err_msg);
            };
          }
        });
      });
      /* 前端图片预览+获取图片内存大小+获取图片尺寸 */
      //1.给input元素注册change事件（当选择文件后被触发）
      $('#icon').on('change', function () {
        //2.创建原生FileReader对象（文件读取）
        var fileReader = new FileReader();
        //3.开始读取文件
        fileReader.readAsDataURL(this.files[0]);
        //4.文件读取结束后，会触发fileReader的onload事件
        fileReader.onload = function () {
          //4.1  fileReader.result是文件的base64编码  
          //赋值给img标签的src属性即可显示
          $('#img').attr('src', fileReader.result);

          //4.2 获取img标签图片的宽高
          console.log($('#img').width(), $('#img').height());
          //4.3 获取img标签图片的大小
          /* 算法介绍：  
            a.英文一个字母占据一个字节(byte)，而1kb = 1024byte
            b.由于图片二进制转base编码之后，尺寸会变大，所以需要计算处理
                真实大小 = （base64大小 - base64大小/8*2)
                        = base64大小 * 0.75
            c.最终公式为  真实kb = (base64长度 * 0.75)/1024
          */
          console.log((fileReader.result.length * 0.75) / 1024 + 'kb');

          //获取完数据之后，把img标签设为固定尺寸
          $('#img').width('100px');
          $('#img').height('100px');
        };
      });
    });
```



## 服务端heroController.js



```javascript
doHeroUpdate: (req, res) => {
        //1.获取请求参数
        let body = req.body;
        //2.处理数据：修改数据库
        //手动添加图片路径icon
        body.icon = '/resource/images/' + body.name + '.png';
        //2.1 图片文件存入./resource/images/英雄名称.png  (./相对路径：运行node所在文件夹路径)
        req.files.icon.mv('./resource/images/' + body.name + '.png', (err)=> {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                });
            } else {
                //2.2 名字 技能 图片路径存入数据库
                heroModel.findByIdAndUpdate(body._id,body, (err) => {
                    if (err) {
                        res.send({
                            err_code: 500,
                            err_msg: err
                        });
                    } else {
                        res.send({
                            err_code: 0,
                            err_msg: 'success'
                        });
                    };
                });
            };
        });
    },
```



# 06-英雄模块6：删除英雄功能实现



## 客户端：get传参(index.html)

```html
<td class="manager">
                        <button class="btn btn-success" onclick="window.name='{{$value.name}},{{$value.skill}},{{$value._id}},{{$value.icon}}';location.href='/resource/view/update.html'">编辑🐷</button>
                        <button class="btn btn-danger" onclick="location.href='/heroDelete?_id={{ $value._id}}'">删除👍</button>
                      </td>
```



## 服务端：重定向刷新首页

* heroController.js



```javascript
doHeroDelete:(req,res)=>{
        //1.获取请求参数
        let heroID = req.query._id;
        console.log(heroID);
        //2.处理数据：删除
        //第一个参数：要删除的英雄ID 第二个参数：回调函数
        heroModel.findByIdAndDelete(heroID,(err)=>{
            //重定向刷新首页
            res.writeHead(302,{
                'Location':'/'
            });
            res.end();
        });
    }
```

