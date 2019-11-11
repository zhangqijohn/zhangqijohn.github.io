// 更改了配置文件一定要重启一下
const path = require('path') //
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 生成环境
const isProduction = process.env.NODE_ENV === 'production'


// 引入文件
function  resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 基本路径
    publicPath: './', // baseUrl
    outputDir: 'dist', // eslint
    lintOnSave: true, // 生成环境未false
    devServer: {
        compress: false,
        // open:true, // 自动打开浏览器
        // 代理跨域
        // proxy: {
        //     './apply': {
        //         target: 'http:xxx.com', // 需要代理的服务器
        //         ws: true, // websocket
        //         changeOrigin: true, // 是否允许跨域
        //         pathRewrite:{
        //             '/api': '/' // 接口代理的路径重置
        //         }
        //     }
        // }
    },
    // css相关配置
    css: {
        extract: true, // css分离插件不需安装
        sourceMap : false, // 用于开发环境分析错误，方便开发人员的开发定位，设置为true,打包速度大大提升
        loaderOptions: { // css预处理器
            sass: {
                data:`
                    @import "@/assets/common/index.scss" // 引入公用的scss地址
                `
            }
        },
        modules: false // 是否启用css
    },
    chainWebpack: config =>{
        // 配置别名 不起别名会报错
        config.resolve.alias
        .set("@",resolve("src"))
        .set("@img",resolve("src/assets/img"))
        .set("@scss",resolve("src/assets/common"))

        // 生成环境配置
        if(isProduction) {
            config.plugin.delete('preload')      // 删除预加载
            config.optimization.minimize(true) // 开启压缩代码
            config.optimization.splitChunks({  chunks: "all" })// 分割代码,把相同的代码打成一块
            // cdn
        }else{
            // 测试环境
        }
    },
    configureWebpack: config =>{
        // 生成环境配置
        if(isProduction) {
            // 用CDN当时引入
            // 为生成环境修改配置...
            config.plugin.push(
                new uglifyJsPlugin({
                    compress: {
                        // waring: false
                        drop_debugger: true, // 删除debug
                        drop_console: true // 删除console
                    },
                    sourceMap : false, // 用于开发环境分析错误，方便开发人员的开发定位，设置为true,打包速度大大提升
                    parallel: true // 使用多进程并行来提高构建速度
                })
            )      // 删除预加载
            config.optimization.minimize(true) // 开启压缩代码
            config.optimization.splitChunks({  chunks: "all" })// 分割代码,把相同的代码打成一块
            // cdn
        }else{
            // 测试环境
        }
    },
    productionSourceMap:  false, // 生成环境的
    // 默认并发数为 os.cpus().length - 1
    // 启用多进程
    parallel: require('os').cpus().length > 1
}




// const routerList = []
// function inportAll (r) {
//     r.keys().forEach(
//         (key) => {
//             console.log(r(key))
//             routerList.push(r(key).default)
//         }
//     )
// }
// // 第一个参数目标文件夹 requiire.context
// // 第二个参数是否查找子集
// // 第三个参数是正则匹配
// inportAll(require.context('./router', true, /\.routes\.js$/))
// export let fixedRoutes = [
//     ...routerList,
//     {
//         path: '/404',
//         component: () => import('@/views/NotFound'),
//         hidden: true,
//         meta: {isCommon: true}
//     },
//     {
//         path: '',
//         redirect: '/home',
//         hidden: true,
//         meta: {isCommon: true}
//     }
// ]
// export default new Router({
//     routes: fixedRoutes
// })

