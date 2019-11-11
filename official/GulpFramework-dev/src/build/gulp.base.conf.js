'use strict'
/**
 * 公用路径配置
 * dev 开发环境路径配置
 * build 生产环境路径配置
 * supportedBrowsers 配置自动添加CSS前缀兼容浏览器
 */

const path = require('path')

module.exports = {
    dev: {
        img: './src/assets/img/**/*',
        css: './src/assets/css/**/*.css',
        scss: './src/assets/scss/**/*.scss',
        js: './src/assets/js/**/*.js',
        html: './src/views/**/*.html',
        lib: './src/assets/js/lib/*.js',
        app: './src/assets/js/app/*.js',
        module: './src/assets/js/module/*.js'
    },
    build: {
        img: './dist/static/img',
        css: './dist/static/css',
        scss: './dist/static/scss',
        js: './dist/static/js',
        html: './dist/**/*.html',
        lib: './dist/static/js/lib',
        app: './dist/static/js/app',
        module: './dist/static/js/module/*.js',
        files: './dist/**/*.html',
        manifest: './dist/**/*.json'
    },
    supportedBrowsers: [
        "> 1%",
        "last 2 versions",
        "firefox >= 28",
        "not ie <= 8",
        'edge >= 12',
        'safari >= 7'
    ]
}