const path = require('path')
const express = require('express')
const webpack = require('webpack')
var consolidate = require('consolidate');
var webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.dev.js'),
    proxyMiddleware = require('http-proxy-middleware'),
    bundleConfig = require('./bundle-config.json');

var app = express();

app.locals.env = process.env.NODE_ENV || 'pro';
app.locals.reload = true;

console.log(process.env.NODE_ENV);
app.middleware = [
    proxyMiddleware(['/mobile'], {target: 'http://baidu.com', changeOrigin: true}),
    proxyMiddleware(['/school'], {target: 'http://baidu.com', changeOrigin: true}),
    proxyMiddleware(['/api/track'], {target: 'http://baidu.com', changeOrigin: true}),
    proxyMiddleware(['/manage/integral'], {target: 'http://baidu.com', changeOrigin: true}),
];
app.use(app.middleware);
if(process.env.NODE_ENV==='dev'){
    app.locals.Dll = "<script src='/bli/"+bundleConfig.vendor.js+"'></script>";
    app.engine('html', consolidate.ejs);
    app.set('views','./server/views/dev')
    app.set('view engine','html')
    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {
    
        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static("public"))
    app.get('/', function (req, res) {
        //res.send('1212')
        res.render('index',{
            title:'王亚♥',
            user:{
                name:'你好'
            }
        });
    });
    app.get('/login', function (req, res) {
      res.render('login',{
        title:'login1234511',
        user:{
            name:'你好'
        }
      });
    });
    
    var reload = require('reload');
    var http = require('http');
    
    var server = http.createServer(app);
    reload(server, app);
    
    server.listen(3000, function(){
        console.log('App1 (dev) is now running on port 3000!');
    });
}else{
    app.locals.Dll = "<script src='/bli/"+bundleConfig.vendor.js+"'></script>";
    app.set('views','./server/views/dist')
    app.set('view engine','ejs')
    var server = app.listen(3000);
    app.get('/', function (req, res) {
        //res.send('1212')
        res.render('index',{
            title:'首页11',
            user:{
                name:'你好'
            }
        });
    });
    app.get('/login', function (req, res) {
      res.render('login',{
        title:'login1234511',
        user:{
            name:'你好'
        }
      });
    });
    app.use('/bli',express.static('public/bli'));
    app.use('/static/js',express.static('public/js'));
    app.use('/static/css',express.static('public/css'));
}