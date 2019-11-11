
### window下安装SASS首先需要安装Ruby，先从官网下载Ruby并安装。
    安装过程中请注意勾选Add Ruby executables to your PATH添加到系统环境变量。

### 安装
``` base
//安装如下(如mac安装遇到权限问题需加 sudo gem install sass)
gem install sass
gem install compass
```

### 命令行用法
```
//单文件转换命令
sass input.scss output.css

//单文件监听命令
sass --watch input.scss:output.css

//如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets

//编译格式 nested 、expanded 、compact 、compressed 
sass --watch input.scss:output.css --style compact

//编译添加调试map
sass --watch input.scss:output.css --sourcemap

//选择编译格式并添加调试map
sass --watch input.scss:output.css --style expanded --sourcemap

//开启debug信息
sass --watch input.scss:output.css --debug-info

```

### 代码用法
