# 使用指南

## 本地开发

### html

1、直接使用html入口模板文件进行开发，多文件另存多份，如下代码

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <!-- inject:css -->
        <link rel="stylesheet" href="dev/app.css">
        <!-- endinject -->
    
    </head>
    <body>
    <h1 style="text-align: center">hello</h1>
    <p><img src="img/box.jpg" alt=""></p>
    <p><img src="img/2560X1600-1.jpg" alt=""></p>
    <p><img src="img/fdsfsf65.jpg" alt=""></p>
    <div class="box"></div>
    <div class="box2"></div>
    <!-- inject:js -->
    <script src="dev/common.js"></script>
    <script src="dev/main.js"></script>
    <!-- endinject -->
    </body>
    </html>

```

### css

1、直接在css文件夹写css样式，文件名不限，因为打包后rename成app.css

### js

> 注意：不要直接在页面引入../module/xxx.js，为什么？模块化了解下！common规范/amd规范/cmd规范/mod规范/umd规范，必须要入口文件解析模块依赖，这个重点！！！

1.直接在module文件夹写js业务模块，比如，轮播模块，滚动模块，抽奖模块...

2.入口文件放js文件夹，目前只支持单入口，还未支持多入口，所以只能是一个文件，命名不限，示例如下：

3. 如果页面没有模块，可以直接在入口文件里写业务逻辑

```
    
    js/index.js
    
    var banner = require('../module/banner')
    var roll = require('../module/roll')
    
    banner.init()
    
    $('xxx').click(function(){
        require('../module/lottery').init()
    })

    ......some code
    

```

### icon

1. 如果使用雪碧图直接放icon文件夹，npm run dev初始化后自动处理雪碧图，会在css文件夹里生成icon.css，在img文件夹里生成icon.png

2. 所以，在开发的时候你不需要关注这个，直接引用dev/app.css，里面已经合并了你的雪碧图样式和页面样式

## 使用技巧

1. inject注释标签用于引用发布生产环境后的CSS和JS, 发布生产环境 运行npm run build 模板页面中的inject标签内的css/js会被替换成打包后的资源引用，

2. inject:css 会引用打包后css文件夹的所有css，inject:js 会引用打包后js文件夹的所有js

3. 如果项目部不用使用雪碧图，要把config文件夹里的index.js中的useSprite改为false，默认是开启雪碧图集成

4. 如果涉及数据的，先npm run dev, 然后引用你项目里dev的资源，发文件给后端,模式还是先按之前的，如：ywz.xxx.dev.q1.com/xxx/xxx/xxx.html

5. 发布生产后所有css合并一个app.css, 所有模块合并成一个main.js，所有第三库合并成common.js

## 发布生产

> npm run build 

1. css/js文件夹直接扔到你的项目cdn目录即可，如项目目录 => https://cdn.xxx.com/游戏名称/项目类型/项目名称/

2. html文件直接扔到项目目录里
