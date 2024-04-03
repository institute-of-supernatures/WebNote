# 坑
---

`flutter run`

1. 翻墙
2. 使用阿里打包
	1. 打开项目`根目录/android/`，找到`build.gradle`文件，打开，首先注释掉`google()`和`jcenter()`
	2. 添加一行代码`maven{url'https://maven.aliyun.com/repository/google'}`