---
id: introduce
title: Makefile introduce
sidebar_label: Introduce
---

_来自文档《跟我一起写Makefile》的笔记_

在执行make命令时，工程是需要makefile文件的，通过一些makefile规则，来正确编译并被链接。一般来说makefile的三个规则：
1. 如果这个工程未被编译过，那么所有的C文件都要被编译并连接
2. 如果这个工程的某些C文件被改变了，那么我们要编译修改了的C文件，并把编译文件链接到工程
3. 如果这个工程头文件被更改，那么需要编译引用了这些头文件的C文件并链接

## 如何工作
在工程下，当我们输入make命令，此时
1. make会检索当前目录下，去找名字叫做Makefile的文件
2. 如果找到了这个文件，他会找文件里第一个目标文件，也就是target