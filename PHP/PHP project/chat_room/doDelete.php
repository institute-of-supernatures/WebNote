<?php
    header('content-type:text/html; charset=UTF-8');
    include_once "./Tools/phpTools.php";
    $Id = $_REQUEST['Id'];
    $sql = "delete from chat_message where Id=$Id";
    $rows = mysqli_excute_zsg($sql);

    if($rows>0){
        header('location:chat.php');
    }else{
        echo "撤回失败!<a href='chat.php'>返回</a>";
    }
?>