# PC-FrameWork

# 本项目基于nodejs/gulp/fis开发，旨在为兼容低版本浏览提供最佳前端开发解决方案.

# 传统工业时代的开发痛点？
* 1.手动将img/css/js一个一个的资源合并（1.copy网上合并，复制本地. 2.下载客户端工具，一个个文件夹并处理）？
* 2.手动将img/css/js一个一个的资源压缩？
* 3.手动一个一个创建存放img/css/js文件夹？
* 4.手动修改CDN引用与本地开发的来回切换？
* 5.手动添加样式前缀解决浏览器兼容？
* 5.手动处理css雪碧图，开PS软件将图标左移动/右移动/上移动/下移动.....一个个度量大小、位置？
* 6.手动修改多个页面同一处地方？（ide工具批处理避免不了手误）
* 7.手动重写或去copy公用reset样式？
* 8.手动修改页面多个js引用的顺序以解决依赖关系？
* 9.多人协作js命名冲突？命名空间？无法避免，只能减少！
* 10.项目文件夹/文件命名混乱，目录混乱，他人接手项目难以进行？
* 11.手动一个一个引用开发中需要的js/css/img?
* 12.手动并接大量字符串JS代码？
* 13.多个css全局冲突？多个人引用不同的JS库？

* .....低效率、低品质、高成本、难维护的工厂流水线工作？？？

# 本项目结束了水深火热的工厂搬运工时代，有以下特性：

## 性能
* 1.自动压缩img/css/js，减少文件体积
* 2.自动合并css/js，减少http请求
* 3.自动合并图标并生成css，直接require导入即可使用
* 4.支持js模块按需异步加载
* 5.支持artTemplate模板引擎渲染

## 规范
* 1.自动生成目录架构
* 2.模块化开发，支持AMD,CMD规范，本项目采用CMD规范, 即nodejs写法
* 3.css/js命名规范.1.css 采用bem命名规范 2.js使用驼峰命名规范. PS:名字为英文，不懂就网上翻译，选择简短英文.

## 效率
* 1.自动添加css前缀兼容不同浏览器
* 2.自动处理合并压缩后的页面资源引用路径
* 3.支持添加hash/query双模式选择，去缓存及时更新页面
* 4.内置css公用基础样式库
* 5.支持本地开发资源/cdn资源自由切换URL
* 6.支持scss/less样式处理器

## 维护
* 1.支持css导入js, img导入js
* 2.支持组件化开发, css/js/html存放同一个文件夹，同命名依赖，使用的时候只需导入组件即可
* 3.支持模板拆分导入页面


# 目录结构

```

├─ README.md  //文档说明
├─ config     
│    ├─ dev.conf.js   //开发环境API配置
│    ├─ prod.conf.js  //生产环境API配置
│    └─ index.js          //基础环境和打包配置
├─ fis-conf.js            //fis配置
├─ gulpfile.js            //gulp配置
├─ img                    //存放项目的图片
│    ├─ 11.jpg
│    ├─ 12.jpg
│    ├─ 2560X1600-1.jpg
│    └─ 9.jpg
├─ lib                    //存放项目依赖的js库
│    ├─ jquery-1.11.3.js
│    ├─ mod.js
│    └─ swiper.js
├─ module                 //存放项目依赖的模块
│    ├─ app               //页面入口
│    │    ├─ about.js
│    │    └─ app.js
│    ├─ css               //公用css
│    │    ├─ about.css
│    │    ├─ common.css
│    │    ├─ icon.css
│    │    ├─ index.css
│    │    └─ swiper.css
│    └─ js                 //公用js
│         ├─ banner.js
│         ├─ nav.js
│         └─ news.js
├─ package-lock.json
├─ package.json
├─ pages                    //存放项目的html页面
│    ├─ about.html
│    └─ index.html
└─ util
       └─ index.js          //存放一些工具函数
```

# 使用

> 安装环境依赖

    1、npm install -g fis3
    2、npm install
    
> 使用命令

    1、npm start 启动服务器
    2、npm stop 关闭服务器
    3、npm run dev 开发环境
    4、npm run build 发布项目，自动生成dist文件夹，包含img/css/js/html前端资源