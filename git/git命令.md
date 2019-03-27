# Git命令

## 使用流程

- 创建仓库
    - 鼠标右键 Git Bash Here  `<保证路径在项目根目录>`
- $ git init  `<创建本地仓库>`
- $ git add index.html  `<添加单文件至暂存区>`
    - $ git add .  `<添加所有文件至暂存区>`
    - $ git status  `<查看暂存区状态, 项目提交至仓库后无法查看>`
- 配置本地仓库
    - git config --global user.email "you@example.com"
    - git config --global user.name "Your Name"
- $ git commit -m '项目名称1.0'  `<创建项目至仓库>`
    - $ git log  `<查看提交项目日志>`
- 项目更新后 `<项目中重复执行>`
    - $ git add .
    - $ git commit -m '项目名称2.0'
        - $ git log
- 本地仓库同步远程服务器 `<项目完成后才执行>`
    - $ git remote add origin 远程地址  `<远程连接>`
        - $ git remote rm origin `<删除之前的远程仓库链接>`
    - $ git push -u origin master  `<上传项目>`

## 版本回退

- $ git show `<查看当前版本>`
- $ git reset --hard HEAD^ `<回到上个版本>`
- $ git reflog  `<查看所有版本号>`
- 回到指定版本
    - $ git reset --hard 版本号

## 克隆

- $ git clone 仓库地址  `<将下载代码文件>`
    - $ git pull `<将远程仓库的代码更新到本地仓库>`

## 其他命令

- $ git diff `<查看当前代码与暂存区内代码的区别>`
- $ git checkout -- . `<回撤所有文件代码>`
    - 如果已经向暂存区添加项目了, 必须先撤退再撤销
        - $ git reset HEAD . `<撤退add, 取消暂存区代码文件>`
    - $ git git checkout -- 指定文件.扩展名 `<撤回到上个版本的代码>`
- 生成SSH秘钥
    - $ ssh-keygen -t rsa -C "邮箱"

## git的分支

- $ git init
- $ git add .
- $ git commit -m '项目名称'  `<默认创建主分支 master>`
- $ git branch 分支名  `<创建分支>`
- $ git checkout 分支名  `<切换分支>`
    - 写分支代码文件
    - $ git checkout master  `<返回主分支, 进入主分支无法看到其他分支的代码文件>`
- $ git add .  `<提交到分支暂存库>`
- $ git commit -m '项目名称'  `<创建分支项目至本地分支库>`
- $ git log
- $ git remote add origin 远程地址  `<远程连接>`
- 单独上传
    - $ git push origin master  `<上传项目主分支>`
    - $ git checkout 分支名
    - $ git push origin 分支名  `<上传项目分支>`
- 合并上传
    - $ git checkout master 
    - $ git merge 分支名  `<合并分支>`
        - $ git merge 分支名 -m '合并日志名'  `<合并分支并输入日志>`
    - $ git add .  `<重新整合>`
    - $ git commit -m '项目名称'  `<重新加库>`
    - $ git log
    - $ git push -u origin master

## gitHub 托管

- 创建一个 gh-pages 分支 `<必须创建, github官方规定>`
- 访问托管网页网址
    - 用户名.github.io/仓库名/页面名  `<如果页面名是index可以省略>`

## 注意

> 当你在github 的网页中给项目添加了其他文件时, 需要先同步本地与github的文件后才能够上传更新

- $ git pull --rebase origin master `<同步本地与github项目文件>`
- $ git push -u origin master

> 也可以强推项目进行更新

- $ git push -f origin master `<强行更新gitHUb项目，会进行强行覆盖>`

> 当项目文件目录中有我们不需要上传的文件时
    使用 .gitignore 文件进行上传文件的限制  

```text

#  井号表示注释 忽略node_modules  文件夹就直接写文件夹名

node_modules

# 我忽略了数据连接的文件

数据库连接.txt

```