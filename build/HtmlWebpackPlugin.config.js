var fs = require('fs');
var path_resolve = require('./path_resolve.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var htmlWP = [];
//console.log(entry = fs.readdirSync(path_resolve.views));
fs.readdirSync(path_resolve.views).forEach((obj,idx)=>{
    console.log(obj);
    var name = obj.slice(0,obj.indexOf('.'));
    htmlWP.push(new HtmlWebpackPlugin({
        filename:path.join(path_resolve.root,'/server/views/dist/'+name+'.ejs'),
        template:path.join(path_resolve.root,'/src/html/'+name+'.html'),
        inject:'body',
        title:name,
        cache:true,
        showErrors:true,
        chunks:['manifest',name,'vendor']
    }))
})

module.exports = htmlWP;