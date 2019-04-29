# 安装 ruby
```
1.安装SASS首先需要安装Ruby，先从官网下载Ruby并安装。安装过程中请注意勾选Add Ruby executables to your PATH添加到系统环境变量
-[Ruby安装地址](http://rubyinstaller.org/downloads)

2.安装如下(如mac安装遇到权限问题需加 sudo gem install sass)
gem install sass
gem install compass
```


# 编译sass
```
//单文件转换命令
sass input.scss output.css --style compact

//单文件监听命令
sass --watch input.scss:output.css

//如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets

//编译格式
sass --watch input.scss:output.css --style compact
//编译排版格式 nested expanded  compact compressed

//编译添加调试map
sass --watch input.scss:output.css --sourcemap

//选择编译格式并添加调试map
sass --watch input.scss:output.css --style expanded --sourcemap

//开启debug信息
sass --watch input.scss:output.css --debug-info
```


# sass 目录
```
1. 使用变量
    1-1. 变量声明;
    1-2. 变量引用;
    1-3. 变量名用中划线还是下划线分隔;

2. 嵌套CSS 规则
    2-1. 父选择器的标识符&;
    2-2. 群组选择器的嵌套;
    2-3. 子组合选择器和同层组合选择器：>、+和~;
    2-4. 嵌套属性;

3. 导入SASS文件;
    3-1. 使用SASS部分文件;
    3-2. 默认变量值;
    3-3. 嵌套导入;
    3-4. 原生的CSS导入;

4. 静默注释;

5. 混合器;
    5-1. 何时使用混合器;
    5-2. 混合器中的CSS规则;
    5-3. 给混合器传参;
    5-4. 默认参数值;

6. 使用选择器继承来精简CSS;
    6-1. 何时使用继承;
    6-2. 继承的高级用法;
    6-3. 继承的工作细节;
    6-4. 使用继承的最佳实践;
```

# sass 文档
> 1.变量声明与引用
```
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}

//编译后
.selected {
  border: 1px solid #F90;
}
```

> 2. 嵌套CSS 规则
```
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}

//编译后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```


> 3-1. 使用SASS部分文件;
>>当通过@import把sass样式分散到多个文件时，你通常只想生成少数几个css文件。那些专门为@import命令而编写的sass文件，并不需要生成对应的独立css文件，这样的sass文件称为局部文件。对此，sass有一个特殊的约定来命名这些文件。此约定即，sass局部文件的文件名以下划线开头。这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。当你@import一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入themes/_night-sky.scss这个局部文件里的变量，你只需在样式表中写@import "themes/night-sky";。局部文件可以被多个不同的文件引用。当一些样式需要在多个页面甚至多个项目中使用时，这非常有用。在这种情况下，有时需要在你的样式表中对导入的样式稍作修改，sass有一个功能刚好可以解决这个问题，即默认变量值。

> 3-2. 默认变量值;

```
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
```
>> 在上例中，如果用户在导入你的sass局部文件之前声明了一个$fancybox-width变量，那么你的局部文件中对$fancybox-width赋值400px的操作就无效。如果用户没有做这样的声明，则$fancybox-width将默认为400px。

>3-3. 嵌套导入;
>>跟原生的css不同，sass允许@import命令写在css规则内。这种导入方式下，生成对应的css文件时，局部文件会被直接插入到css规则内导入它的地方。举例说明，有一个名为_blue-theme.scss的局部文件，内容如下：
```
aside {
  background: blue;
  color: white;
}
```
>>然后把它导入到一个CSS规则内，如下所示：
```
.blue-theme {@import "blue-theme"}

//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。

.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```
>>被导入的局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。这些变量和混合器不会全局有效，这样我们就可以通过嵌套导入只对站点中某一特定区域运用某种颜色主题或其他通过变量配置的样式。


>4. 静默注释;
```
body {
  color /* 这块注释内容不会出现在生成的css中 */: #333;
  padding: 1; /* 这块注释内容也不会出现在生成的css中 */ 0;
}
```

>5. 混合器;

```
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

//sass最终生成：
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```











