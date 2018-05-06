var fs = require('fs');
var path_resolve = require('./path_resolve.js');
var entry = {};
//console.log(entry = fs.readdirSync(path_resolve.views));
fs.readdirSync(path_resolve.views).forEach((obj,idx)=>{
    console.log(obj);
    var name = obj.slice(0,obj.indexOf('.'));
    entry[name] = './src/script/'+ name+".js"
})
module.exports = entry;