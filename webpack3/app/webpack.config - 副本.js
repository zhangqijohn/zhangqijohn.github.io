// webpack.config.js
const path = require('path')
 
// 导入在内存中生成HTML页面的插件
// 只要是插件，都一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
    // 入口：表示要使用webpack打包哪个文件
    entry: path.join(__dirname, './src/js/main.js'),
    // 出口：输出文件的相关配置
    output: {
        // 指定打包好的文件，输出到哪个目录中去
        path: path.join(__dirname, './dist'),
        // 指定输出的文件名称
        filename: 'bundle.js'
    },
    // 配置插件的节点,是一个数组
    plugins: [
        // 创建一个在内存中生成HTML页面的插件
        new htmlWebpackPlugin({
            // 指定模板页面，将来会根据指定的模板路径，去生成内存中的页面
            template: './src/index.html',
            // 指定生成的页面的名称
            filename: 'index.html',
			title: '',
			inject: 'body',  //打包后的js在哪引入   body：在body中引入   false： 不引入
			minify: {
                    removeComments: true,  //删除注释
                }
        }),
		new htmlWebpackPlugin({
            // 指定模板页面，将来会根据指定的模板路径，去生成内存中的页面
            template: './src/main.html',
            // 指定生成的页面的名称
            filename: 'main.html',
			title: '',
			inject: 'body',  //打包后的js在哪引入   body：在body中引入   false： 不引入
			minify: {
                    removeComments: true,  //删除注释
                }
        })
    ],
    // 这个节点，用于配置 所有第三方模块加载器
    module: {
        // 所有第三方模块的 匹配规则
        rules: [
            // 配置处理.css文件的第三方loader规则
            { 
				test: /\.css$/, 
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use:[{
					loader: 'url-loader',
					options: 
					{
						outputPath:'images/',
						publicPath:'images/',
						limit:500,
						name: '[name].[hash:5].[ext]'
					}
				}]
			},
			{ 
				test: /\.(htm|html)$/i, 
				use: ['html-withimg-loader']
			}
        ]
    }
}
