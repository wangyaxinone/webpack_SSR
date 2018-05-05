var path = require("path"),
　　fs = require('fs'),
　　webpack = require("webpack");
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var AssetsPlugin = require('assets-webpack-plugin')
var vendors = [
　　'vue', 
　　'vue-router', 
　　'vuex',
    'lodash'
];

module.exports = {
　　entry: {
　　　　vendor: vendors
　　},
    mode:'development',
　　output: {
　　　　path: path.join(__dirname, "public/bli"),
　　　　filename: "Dll-[hash:6].js",
　　　　library: "[name]_[hash:6]"
　　},
　　plugins: [
　　　　new webpack.DllPlugin({
　　　　　　path: path.join(__dirname, "./", "manifest.json"),
　　　　　　name: "[name]_[hash:6]",
　　　　　　context: __dirname
　　　　}),
        new AssetsPlugin({
            filename:'bundle-config.json',
            path:'./'
        }),
        new WebpackCleanupPlugin(),
　　]
}; 