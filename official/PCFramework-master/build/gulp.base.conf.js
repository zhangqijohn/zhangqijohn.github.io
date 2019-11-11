'use strict'
/**
 * 公用路径配置
 * dev 开发环境路径配置
 * build 生产环境路径配置
 * supportedBrowsers 配置自动添加CSS前缀兼容浏览器
 */

module.exports = {
    dev: {
        html: './*.html',
        css: './css/*.css',
        js: './js/*.js',
        modjs: './module/*.js',
        icon: './icon/*.png',
        image: './img/*.{jpg,gif,png}'
    },
    build: {
        html: './dist/*.html',
        css: './dist/css/*.css',
        js: './dist/js/*.js',
        manifest: './dist/**/*.json'
    },
    output: './dist',
    exclude: "'!./dist/**/*.{html,css,js,jpg,png,gif}', '!./node_modules/**/*.{html,css,js,jpg,png,gif}', '!./dist/node_modules/**/*.{html,css,js,jpg,png,gif}'",
    supportedBrowsers: [
        "> 1%",
        "last 2 versions",
        "firefox >= 28",
        "not ie <= 8",
        'edge >= 12',
        'safari >= 7'
    ]
}
