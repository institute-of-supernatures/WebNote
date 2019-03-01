<?php
    // 处理用户输入信息的页面
    header('content-type:text/html; charset=UTF-8');
    $content = $_REQUEST['content'];
    session_start();
    $Id = $_SESSION['info']['Id'];
    include_once "./Tools/phpTools.php";
    $sql = "insert into chat_message(user_id,content) values('$Id','$content');";
    $rows = mysqli_excute_zsg($sql);
    if($rows > 0){
        header('location:chat.php');
    }else{
        echo "信息发送失败,<a href='./chat.php'>请重新发送</a>";
    }
?>