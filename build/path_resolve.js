var path = require('path');
var moduleExports = {};

moduleExports.root =  path.resolve(__dirname, '../'); // 项目根目录
moduleExports.views =  path.resolve(moduleExports.root, './server/views/dev'); // views
moduleExports.logic =  path.resolve(moduleExports.root, './src/script'); // script

module.exports = moduleExports;