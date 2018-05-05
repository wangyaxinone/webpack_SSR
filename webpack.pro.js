
var webpack = require('webpack');
var path = require('path');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode:'production',
    //devtool:'source-map',
    entry:{
        'index':['./src/script/index.js'],
        'main':['./src/script/main.js'],
        //'vendor':['vue','vuex','vue-router']
    },
   
    output:{
        filename: 'js/[name]-[chunkhash:6].js',
        path: path.join(__dirname,'/public/'),
        publicPath: '/static'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime',require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader: "html-loader" 
                    }
                ]
            },
            {
                test: /\.scss$/,
                
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath:'/static',
                    use: [ {
                        loader: "css-loader" 
                    }, {
                        loader: "postcss-loader",
                        
                    }, {
                        loader: "sass-loader",
                        
                    }]
                })
                
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new ExtractTextPlugin({
            filename:'css/[name]-[md5:contenthash:base32:6].css',
            allChunks:true
        }),
        new WebpackCleanupPlugin({
            exclude:["bli/**"]
        }),
        new HtmlWebpackPlugin({
            filename:path.join(__dirname,'/server/views/dist/index.ejs'),
            template:'./server/views/dev/index.html',
            inject:'body',
            title:'index',
            cache:true,
            showErrors:true,
            chunks:['index','manifest']
        }),
        new HtmlWebpackPlugin({
            filename:path.join(__dirname,'/server/views/dist/login.ejs'),
            template:'./server/views/dev/login.html',
            inject:'body',
            title:'login',
            cache:true,
            showErrors:true,
            chunks:['main','manifest']
        }),
       
        // new webpack.optimize.CommonsChunkPlugin({
        //     // 将公共代码打包成以common命名的js文件
        //     name:'manifest'
        // })
    ],
    optimization: {
        splitChunks: {
            chunks: "all", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            } 
            //minSize: 30000, // 最小尺寸，默认0
            //minChunks: 2, // 最小 chunk ，默认1
            // maxAsyncRequests: 1, // 最大异步请求数， 默认1
            // maxInitialRequests : 1, // 最大初始化请求书，默认1
            // name: function(){}, // 名称，此选项可接收 function
            // cacheGroups:{ // 这里开始设置缓存的 chunks
            //     priority: 0, // 缓存组优先级
            //     vendor: { // key 为entry中定义的 入口名称
            //         chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步) 
            //         test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
            //         name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
            //         minSize: 0,
            //         minChunks: 1,
            //         enforce: true,
            //         maxAsyncRequests: 1, // 最大异步请求数， 默认1
            //         maxInitialRequests : 1, // 最大初始化请求书，默认1
            //         reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
            //     }
            // }
        },
        runtimeChunk : {
            name: 'manifest'
        }
    }
}