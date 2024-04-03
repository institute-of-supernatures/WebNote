# Git 分支操作
---

1. 创建分支
	`git branch "Branch Name"`
	- 查看所有分支记录
	`git branch -a`
	- 删除分支
	`git branch -D "Branch Name"`
	- 删除远程连接分支
	`git push origin --delete "Branch Name"`
2. 切换分支
	`git checkout "Branch Name"`
3. 上传
	- 单独上传 切换到需要上传的分支进行上传
	- 合并上传
		- 合并分支 需切换到主分支
		`git merge "Branch Name"`
		- 合并分支 增加日志
		`git merge "Branch Name" -m "log Name`