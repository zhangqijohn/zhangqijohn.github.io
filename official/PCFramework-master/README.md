# webFramework 2.0  

> 怎么使用？，点击[使用指南](document.md)了解

### 公告:

> 因2.0不适配老模式目录结构，老模式目录结构混乱类别复杂，只适配新模式目录结构规范整站开发（详情见1.0.0-rc2分支）

> 因目前无法自动化发布，使用无法git和svn分开，只能用一个项目一个库，每次开发新项目要安装依赖

> 所以，还是使用一个项目一个库开发项目.

* 本项目是基于Gulp, Nodejs开发的前端框架，主要面向PC端兼容低版本IE的项目,也可以应用于移动端，移动端请用Vue框架，旨在为游戏官网 / 活动专题 / 冰川平台等应用场景提供最佳前端解决方案：

# 安装使用

```

    一、安装配置项目
    
    1.安装npm模块
      
        npm install q1web -g
      
    2.初始化创建模板项目
        
        q1web init
        
    3. 进入工程目录
    
        cd PCFramework
       
    3. 安装项目依赖
       
        npm install
        
    4.启动项目
    
        npm run dev
       
    5.发布项目
    
        npm run build
   
```

# 团队推崇

    ```
    1.项目部署
    3.开发规范
    2.性能优化
    4.团队协作
    5.项目维护
    6.基础建设
    
    ```

# 目录结构

```
.
├─ .gitignore
├─ README.md
├─ build
│    └─ gulp.base.conf.js
├─ config
│    ├─ dev.env.js
│    ├─ index.js
│    └─ prod.env.js
├─ css
│    ├─ icon.css
│    ├─ style.css
│    ├─ style2.css
│    └─ style3.css
├─ gulpfile.js
├─ icon
│    ├─ alarm.png
│    ├─ close-reg.png
│    ├─ error.png
│    ├─ question.png
│    ├─ success.png
│    ├─ user.png
│    └─ warning.png
├─ img
│    ├─ 2560X1600-1.jpg
│    ├─ box.jpg
│    ├─ box2.jpg
│    ├─ fdsfsf65.jpg
│    └─ icon.png
├─ index.html
├─ info.html
├─ js
│    └─ app.js
├─ lib
│    ├─ artTemplate.js
│    ├─ jquery.js
│    └─ swiper.js
├─ module
│    ├─ banner.js
│    ├─ list.js
│    ├─ nav.js
│    └─ news.js
├─ package-lock.json
└─ package.json

```
