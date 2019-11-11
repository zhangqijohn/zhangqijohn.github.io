'use strict'
/**
 * 开发环境入口配置
 * distAssetsServer 构建完成时启动dist目录预览
 */

const config = require('../config')
const dist = require('./gulp.dev.server')

module.exports = {
    distAssetsServer: () => {
        return dist.start()
    }
}