# Git 日常使用
---

1. 创建仓库
2. Git Bash Here
	- 创建本地仓库
	`git init` 
3. 添加文件至暂存区
	`git add <fliename>`
	`git add .`
	- 查看暂存区状态 项目提交仓库后无法查看
	`git status`
4. 配置本地仓库
	`git config --global user.email "you@example.com"`
	`git config --global user.name "Your Name"`
5. 创建项目至本地仓库
	`git commit -m "log name"`
	- 查看日志列表
	`git log`
6. 项目更新/拉取远程代码合并
	`git pull`
	`git pull --rebase origin master`
	- 克隆项目
	`git clone "Project Address"`
7. 本地仓库同步至远程服务器
	- 连接远程
	`git remote add origin "Remote Address"`
	- 删除之前的远程仓库链接
	`git remote rm origin`
	- 上传项目
	`git push -u origin master`
	- 强制提交 会覆盖远程文件
	`git push -f origin master`