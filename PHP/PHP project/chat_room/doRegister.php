<?php
    header('content-type:text/html; charset=UTF-8');
    // 处理注册信息的页面
    $userName = $_REQUEST['userName'];
    // 判断名称是否被注册过
    include "./Tools/phpTools.php";
    $sql = "select * from chat_user where userName= '$userName'";
    $arr = mysqli_select($sql); // 返回查询完后的数组
    if(count($arr)>0){
        echo "sorry,该用户名已被注册,请重新注册,<a href='./register.html'>重新注册</a>";
    }else{
        $userPwd = $_REQUEST['userPwd'];
        $userIcon = $_FILES['userIcon'];

        $userIcon_oldName = $userIcon['name']; // utf-8
        $userIcon_newName = iconv('utf-8','gbk',$userIcon_oldName);
        $new_path = "./images/icon/$userIcon_newName";
        $tmp_path = $userIcon['tmp_name'];

        $res = move_uploaded_file($tmp_path,$new_path);
        if(!$res){
            echo "头像上传失败";
            return false;
        }

        // 数据库保存用户信息
        $sql = "insert into chat_user(userName,userPass,userIcon) values('$userName','$userPwd','$userIcon_oldName')";
        $rows =  mysqli_excute_zsg($sql); // 返回受影响的行数
        if($rows>0){
            echo "注册成功,<a href='./login.html'>请登录</a>";
        }else{
            echo "注册失败,<a href='./register.html'>请重新注册</a>";
        }
    }
    
    
?>