<?php
    header('content-type:text/html; charset=UTF-8');
    // 处理登录信息的页面
    $userName  = $_REQUEST['userName'];
    $userPwd = $_REQUEST['userPwd'];

    include_once "./Tools/phpTools.php";
    $sql = "select * from chat_user where userName='$userName' and userPass = '$userPwd'";
    $arr = mysqli_select($sql);
    if(count($arr)>0){
        header("location:chat.php");
        session_start();
        $_SESSION['info'] = $arr[0];
    }else{
        echo "账号或者密码错误,<a href='./login.html'>请重新登录</a>";
    }
?>