// webpack.config.js
const path = require('path')
 
// 导入在内存中生成HTML页面的插件
// 只要是插件，都一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除上一个版本文件
 
module.exports = {
    // 入口：表示要使用webpack打包哪个文件
    entry: path.join(__dirname, './src/js/index.js'),
    // 出口：输出文件的相关配置
    output: {
        // 指定打包好的文件，输出到哪个目录中去
        path: path.join(__dirname, './dist'),
        //pathpublic:"https://img.ssl.q1.com/yz/images/huodong/",//cdn
        // 指定输出的文件名称
        filename: ' bundle.js'
        //filename:'js/[name]._[hash].js'
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
            template: './src/page1.html',
            // 指定生成的页面的名称
            filename: 'page1.html',
			title: '',
			inject: 'body',  //打包后的js在哪引入   body：在body中引入   false： 不引入
			minify: {
                    removeComments: true,  //删除注释
                }
        }),
		new MiniCssExtractPlugin({
			filename: "css/style.[hash:8].css",
			// chunkFilename: "[id].css"
		}),
		new OptimizeCssAssetsPlugin(),        // 压缩css
		new CleanWebpackPlugin(['dist'])       //传入数组,指定要删除的目录

	],
    // 这个节点，用于配置 所有第三方模块加载器
    module: {
        // 所有第三方模块的 匹配规则
        rules: [
            // 配置处理.css文件的第三方loader规则
            //{ //本页面css
				//test: /\.css$/,
				//use: ['style-loader', 'css-loader']
            //},

			{//link 单独css
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{ //img
				test: /\.(png|jpg|gif|svg)$/,
				use:[{
					loader: 'url-loader',
					options: 
					{
						outputPath:'images/',
						publicPath:'https://img.ssl.q1.com/yz/images/huodong/hd/',
						limit:500,
						name: '[name].[hash:5].[ext]'
                        //name: '[name].[ext]?v=[hash:3]'
					}
				}]
			},
			{ //html
				test: /\.(htm|html)$/i, 
				use: ['html-withimg-loader']
			}
        ]
    }
}
