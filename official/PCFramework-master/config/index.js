'use strict'
/**
 * 公用配置
 * dev开发环境
 * build 生产环境
 * libraryTarget 模块化规范  1.common 使用nodejs模式开发js业务，2.cmd 使用面向过程传统模式开发js业务
 */

module.exports = {
    port: '8080',
    host: '0.0.0.0',
    autoOpenBrowser: true,
    usecdn: true,
    useSprite: true,
    cdn: {
        img: '//cdn.xxx.com/游戏名称/项目类型/项目名称/img/',
        css: '//cdn.xxx.com/游戏名称/项目类型/项目名称/css/',
        js: '//cdn.xxx.com/游戏名称/项目类型/项目名称/js/'
    },
    libraryTarget: 'common',
    isMobile: false,
    useHash: true
}
