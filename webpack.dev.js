var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var entry= require('./build/entry.config.js');


for(var key in entry){
    var arr = [entry[key]];
    arr.push(hotMiddlewareScript);
    entry[key] = arr;
}

module.exports = {
    mode:'development',
    devtool:'inline-source-map',
    entry:entry,
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
                
                use: [ {
                        loader: "style-loader" 
                    },{
                        loader: "css-loader" 
                    }, {
                        loader: "postcss-loader",
                        
                    }, {
                        loader: "sass-loader",
                        
                    }]
                
            },
            {
    　　　　　　test: /\.(png|jpg)$/,
    　　　　　　use: [
                    {
                        loader:'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
                    }
                ]
    　　　　}
        ]
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'/public'),
        publicPath: publicPath,
		//library: "[name]_[hash:6]"
    },
    
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //new WebpackCleanupPlugin(),
        // new HtmlWebpackPlugin({
        //     filename:path.join(__dirname,'/server/views/dist/index.html'),
        //     template:'./server/views/dev/index.html',
        //     inject:'body',
        //     // title:'index',
        //     // env:'dev',
        //     // reload:true,
        //     // cache:true,
        //     // showErrors:true,
        //     // chunks:['index']
        // }),
        // new HtmlWebpackPlugin({
        //     filename:path.join(__dirname,'/server/views/dist/login.html'),
        //     template:'./server/views/dev/login.html',
        //     inject:'body',
        //     // title:'login',
        //     // env:'dev',
        //     // reload:true,
        //     // cache:true,
        //     // showErrors:true,
        //     // chunks:['main']
        // }),
       
        // new webpack.optimize.CommonsChunkPlugin({
        //     // 将公共代码打包成以common命名的js文件
        //     name:'manifest'
        // })
        
    ],
    
}   