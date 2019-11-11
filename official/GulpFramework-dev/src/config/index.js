const path = require('path')

/**
 * 公用配置
 * dev开发环境
 * build 生产环境
 * libraryTarget 模块化规范  1.amd 使用RequireJs AMD规范开发，2.cmd 使用面向过程传统模式开发
 */

module.exports = {
    dev: {
        index: '',
        assetsSubDirectory: 'assets',
        assetsPublicPath: './',
        port: '8080',
        host: '0.0.0.0',
        autoOpenBrowser: false
    },
    build: {
        index: '',
        assetsSubDirectory: 'dist',
        assetsPublicPath: './',
        useCdn: true,
        cdn: {
            // img: '//cdn.xxx.com/项目名/系统类型/项目类型/项目时间/img/',
            // css: '//cdn.xxx.com/项目名/系统类型/项目类型/项目时间/css/',
            // js: '//cdn.xxx.com/项目名/系统类型/项目类型/项目时间/js/'
            img: '//worker.zq.dev.q1.com/github/official/GulpFramework-dev/src/dist/static/img/',
            css: '//worker.zq.dev.q1.com/github/official/GulpFramework-dev/src/dist/static/css/',
            js: '//worker.zq.dev.q1.com/github/official/GulpFramework-dev/src/dist/static/js/'
        },
        compressImage: true
    },
    libraryTarget: 'amd'
}


