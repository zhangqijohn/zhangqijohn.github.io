### 一、安装
```
  npm install -g create-react-app
```

### 二、创建react应用
```
  create-react-app my-app
```
   create-react-app是全局命令来创建react项目
1、主要依赖react,react-dom,react-scripts
2、生成目录结构(没有配置文件（webpack.config.js）)
├─ public
│    ├─ favicon.ico
│    ├─ index.html
│    └─ manifest.json
├─ src
│    ├─ App.css
│    ├─ App.js
│    ├─ App.test.js
│    ├─ index.css
│    ├─ index.js
│    ├─ logo.svg
│    └─ serviceWorker.js
├─ package.json
├─ package-lock.json
├─ README.md
├─ yarn.lock

Yarn是一个快速可靠安全的依赖管理工具。
主要的三个特点：
极其快速，Yarn会缓存它下载的每个包，所以无需重复下载。它还能并行化操作以最大化资源利用率。
特别安全，Yarn会在每个安装包被执行前校验其完整性
超级可靠， Yarn使用格式详尽而又简洁的lockfile文件和确定性算法来安装依赖，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上
由Yarn管理
您的yarn.lock文件是自动生成的，也完全Yarn来处理。当你使用Yarn CLI添加/升级/删除 依赖项的时，它将自动更新到您的yarn.lock文件。不要直接编辑这个文件，因为很容易破坏某些东西。
仅限当前包
在安装期间，Yarn将仅使用顶级yarn.lock文件，并将忽略依赖项中存在的任何yarn.lock文件。顶级yarn.lock文件包含Yarn需要锁定整个依赖关系树中所有包的版本的所有内容。

### 三、npm 命令
1、npm start
"start": "react-scripts start" ;  不是熟悉的"node scripts/start.js"
2、react-scripts 是什么？
react-scripts是create-react-app生成项目所有的依赖。
通常情况下，我们创建spa应用时是使用npm安装项目依赖，在通过配置webpack.config.js进行配置，搭建好环境后在src编写源代码。
而create-react-app是自动构建，在package.json中只有react-scripts作为依赖，而在reacr-scripts中已经配置好了项目所有需要的。
从react，es6，babel,webpack编辑到打包，react-scripts都做了。

### 四、npm run eject命令
```
 npm run eject
```
单向操作不可逆，npm eun eject命令暴露项目的配置，可以自由配置项目所需的依赖，不使用的版本零配置即可开发。
1. node_modules\react-scripts\scripts
2. node_modules\react-scripts\config\webpack.config.dev.js




