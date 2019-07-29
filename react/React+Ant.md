### 基础知识
1.使用脚手架创建项目并启动
​   1.1 安装脚手架：npm install -g create-react-app
​   1.2 使用脚手架创建项目：create-react-app react-ant          // react-ant为项目名。
​   1.3 启动: npm start


2.npm转换为yarn
​   2.1 安装yarn： npm install -g yarn
​   2.2 获取yarn当前的镜像源：yarn config get registry
​   2.3 设置为淘宝镜像： yarn config set registry 'https://registry.npm.taobao.org
​   2.4 常用命令：
    yarn init       --初始化
    yarn add        --添加模块
    yarn remove     --删除模块
    yarn /yarn install      --安装项目中的依赖


### 项目搭建
2.1 安装react-router 4.0、axios、less-loader  : yarn add react-router-dom axios less-loader
2.2 暴漏webpack配置: yarn eject
webpack配置
2.3 配置less-loader
​   antd是基于less开发的，我们使用less可以方便的改变主题色等配置。
​   安装less模块：yarn add less@2.7.3
​   打开config/webpack.config.dev.js添加如下配置：
```
    {
                test: /\.less$/,
                use: [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: { importLoaders: 1 },
                  },
                  {
                    // Options for PostCSS as we reference these options twice
                    // Adds vendor prefixing based on your specified browser support in
                    // package.json
                    loader: require.resolve('postcss-loader'),
                    options: {
                      // Necessary for external CSS imports to work
                      // https://github.com/facebook/create-react-app/issues/2677
                      ident: 'postcss',
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                          autoprefixer: {
                            flexbox: 'no-2009',
                          },
                          stage: 3,
                        }),
                      ],
                    },
                  },
                  { loader: require.resolve('less-loader') }
                ],
    },
```
到配置cssload同级如图所示


图片示例

注意：在webpack.config.dev.js添加的配置部分，也需要在webpack.config.prod.js中做相同的配置。否则可能导致项目发布上线后，报错无法执行。

2.4 安装antd:  yarn add antd

2.5 测试使用
```
import { Button } from "antd";
import 'antd/dist/antd.css';

...
 render() {
    return (
      <div>
          <Button>click</Button>
      </div>
    );
  }
...
```
注意：默认情况下安装的antd需要引入antd/dist/antd.css才会生效样式，但很多时候，我们只是使用了部分组件，引入整个antd样式文件，有些得不偿失。所以按需加载应运而生。

2.6 antd按需加载
1.添加babel-plugin-import，

yarn add babel-plugin-import

2.打开webpack配置，搜索：JS with Babel

找到如下配置：
```
// Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript and some ESnext features.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,

            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              // Save disk space when time isn't as important
              cacheCompression: true,
              compact: true,
            },
          },
```
进行修改plugin下添加：

["import", { "libraryName": "antd", "style": true }]

至此可以取消引入css文件了，babel会自动根据引入的组件，默认加载对应的css。

2.7修改主题色
```
              {
                loader: require.resolve('less-loader'),
                options: {
                  modules: false,
                  modifyVars: {
                    "@primary-color": "#f9c700"
                  }
                }
              }
```
在webpack，中配置less的地方即可修改。@primary-color为antd内置的less变量，只需要覆盖掉默认的配置，就实现了修改主题色。
