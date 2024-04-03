# Git 其他命令
---

1. 查看当前文件与暂存区文件区别
	`git diff`
2. 回撤所有文件
	- 如果已经向暂存区添加了项目，必须先回撤在撤销
	`git checkout --.`
	- 回撤add 取消暂存区文件
	`git reset HEAD.`
	- 回撤指定文件到上一个版本
	`git checkout --"fileName"`
3. 生成SSH密钥
	`ssh-keygen -t rsa -C "you@example.com"`
4. 查看密钥
	```cat ~/.ssh/id_rsa.pub```
5. .gitignore文件 限制上传文件/文件夹