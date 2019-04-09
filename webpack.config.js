const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin参数方法
var getHtmlConfig = function(name, title){
    return{
              template  : `./src/view/${name}.html`,
              filename  : `view/${name}.html`,
              title     : title,
              inject    : true,
              hash      : true,
              chunks    : ['common', name]
    }
}

var config = {
    mode: 'development',
    entry: {
        // 'common': './src/page/common/index.js',
        'index': './src/page/index/index.js',
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    externals : {
        'jquery': 'window.jQuery'   //引入外部对象
    },
    module: {
        rules: [
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            "css-loader"
                        ],
                    },
                    { 
                        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                        use:[
                            'url-loader?limit=100&name=resource/[name].[ext]' 
                        ]
                        
                    } 
                ]

    },
    plugins:[
        // 单独打包css文件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename        : "css/[name].css",
            chunkFilename   : "[id].css"
          }),
          //html模板处理
          new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
          new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),
          new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
		splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    devServer:{
        contentBase:'./dist',					//配置服务开启在dist文件夹下
        // open: true,							//可在启动webpackdevserver时自动打开浏览器
        // proxy:{
        //     '/api': 'http://localhost:3000'	//可配置请求转发（当访问 /api 接口时，自动转发到 localhost:3000 下）
        // },
        // port: 8080,							//可配置webpack-dev-server启动时的端口地址
        hot: true,
        // hotOnly: true
    },
    resolve: {
        alias: {
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image',
        }
    }

}
module.exports = config;