# 一、Git基础



# 二、独自使用Git的常见场景



## 14、怎么删除不需要的分支？





## 15、修改最新的commit的message?

```shell
git commit --amend '新的commit信息'
```



## 16、如何修改老旧的message?

![image-20220108182028837](C:\Users\z\Documents\笔记\images\image-20220108182028837.png)

## 17、把连续的多个commit整理成一个？



```shell
git rebase -i commitid
```



![image-20220108183001301](C:\Users\z\Documents\笔记\images\image-20220108183001301.png)



## 18、把间隔的commit整合成一个？

![image-20220108183702817](C:\Users\z\Documents\笔记\images\image-20220108183702817.png)





![image-20220108183606911](C:\Users\z\Documents\笔记\images\image-20220108183606911.png)



## 19、如何比较暂存区和HEAD所含文件的差异？



```shell
git diff --cached
```

![image-20220108184530920](C:\Users\z\Documents\笔记\images\image-20220108184530920.png)



## 20、怎么比较工作区和暂存区所含文件的差异？



所有的文件差异

```shell
git diff
```





某个文件的差异



```shell
git diff -- readme
```

![image-20220108185119213](C:\Users\z\Documents\笔记\images\image-20220108185119213.png)





## 21、如何让暂存区恢复成和HEAD一样的？



场景：就是当前暂存区的所有东西都不想要了。

![image-20220108185545373](C:\Users\z\Documents\笔记\images\image-20220108185545373.png)



变更暂存区的用 `reset`，变更工作区的用`checkout`。



## 22、如何让工作区的文件恢复为和暂存区一样？

![image-20220108190126263](C:\Users\z\Documents\笔记\images\image-20220108190126263.png)





## 23、怎样取消暂存区部分文件的更改？



![image-20220108190527864](C:\Users\z\Documents\笔记\images\image-20220108190527864.png)











## 24、消除最近的几次提交？

有些commit 彻底不想要了

![image-20220108190800846](C:\Users\z\Documents\笔记\images\image-20220108190800846.png)





## 25、查看不同提交的指定文件的差异？



![image-20220108200725640](C:\Users\z\Documents\笔记\images\image-20220108200725640.png)

也可以准换成 commitId

![image-20220108200841424](C:\Users\z\Documents\笔记\images\image-20220108200841424.png)



## 26、正确的删除文件的方法





![image-20220108201132475](C:\Users\z\Documents\笔记\images\image-20220108201132475.png)





## 27、开发中临时加塞了紧急任务怎么处理？



![image-20220108213214213](C:\Users\z\Documents\笔记\images\image-20220108213214213.png)

![image-20220108213442300](C:\Users\z\Documents\笔记\images\image-20220108213442300.png)



```shell
apply 应用暂存区的并保存一份
pop 应用并删除
```



## 28、如何指定不需要Git管理的文件？



创建.gitignore文件，里面写不受管理的文件或者文件夹





## 29、如何将Git仓库备份到本地？

![image-20220108215211640](C:\Users\z\Documents\笔记\images\image-20220108215211640.png)

添加远端仓库   `remote`

![image-20220108214842143](C:\Users\z\Documents\笔记\images\image-20220108214842143.png)



![image-20220108215307636](C:\Users\z\Documents\笔记\images\image-20220108215307636.png)



# 三、Git与Github的简单同步





## 30、注册一个Github账号



## 31、配置公私钥





## 32、在Github上创建个人仓库





## 32、把本地仓库同步到Github









# 四、Git多人单分支集成协作时的常见场景



## 34、不同人修改了不同文件怎么处理？



![image-20220109171127707](C:\Users\z\Documents\笔记\images\image-20220109171127707.png)



也可以直接`git pull`





## 35、不同人修改了同文件的不同区域如何处理？



![image-20220109172326944](C:\Users\z\Documents\笔记\images\image-20220109172326944.png)



## 36、不同人修改了同文件的相同区域如何处理？

在同一分支的情况下，就是把远程分支的与本地的拉下来进行合并

```shell
git pull

// 解决冲突，再push

```





## 37、同时变更了文件名和文件内容如何处理？

改代码之前先 git pull







## 38、把同一文件改成了不同的文件名怎么处理？

git pull 之后选择要保留那个文件名 ，并使用 `git rm xxxx`移除掉不需要的文件。



# Git集成使用禁忌





## 39、禁止向集成分支执行 push -f 操作



## 40、禁止向集成分支执行变更历史操作

