<?php
    // 处理登出信息的页面
    header('content-type:text/html; charset=UTF-8');

    session_start();
    unset($_SESSION['info']);
    header('location:login.html');
?>