module.exports = {
    //配置ip
    host: '0.0.0.0',
    //配置端口
    port: '8080',
    //是否使用URL哈希值， 1.true 使用哈希值 test_4ca6e89.js 2.false 不使用哈希值，会自动添加query时间戳 test.js?t=1531234568
    useHash: true,
    //是否使用cdn
    usecdn: false,
    //配置style的cdn地址
    csscdn: 'https://css.res.q1.com/ywz/zt/ztmz/css',
    //配置script的cdn地址
    jscdn: 'https://css.res.q1.com/ywz/zt/ztmz/js',
    //构建时忽略lib文件夹的js，则不会一起打包合并，默认lib库直接忽略，不打包.
    ignore: ['/lib/*.js']
}