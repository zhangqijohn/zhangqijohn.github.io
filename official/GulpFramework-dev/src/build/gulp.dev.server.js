'use strict'
/**
 * 构建完成启动服务
 * {Function} start
 */

const config = require('../config')
const { port, host, libraryTarget } = config
const gulpDevServer = require('browser-sync').create()

module.exports = {
    start: () => {
        const url = libraryTarget !== 'amd' ? './dist/index/index.html' : './dist/index/index_amd.html'
        return gulpDevServer.init({
            startPath: url,
            server: {
                directory: true
            }
        })
    }
}