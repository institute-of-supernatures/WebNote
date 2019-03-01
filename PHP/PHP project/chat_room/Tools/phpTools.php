<?php
    // 把php操作数据库代码封装成函数

    // 增 删 改
    function mysqli_excute_zsg($sql){
        // 链接数据库
        $link = mysqli_connect("127.0.0.1","root","root","erjiuqi");
        // 执行sql语句
        $res = mysqli_query($link,$sql);
        // 获取受影响的行数
        $rows = mysqli_affected_rows($link);
        mysqli_close($link);

        return $rows;
    }

    // 查
    function mysqli_select($sql){
         // 链接数据库
         $link = mysqli_connect("127.0.0.1","root","root","erjiuqi");
         // 执行sql语句
         $res = mysqli_query($link,$sql);
         // 获取受影响的行数
         $arr = mysqli_fetch_all($res,1);
         mysqli_close($link);

         return $arr;
    }
?>