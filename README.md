

## 注意
本项目master分支已升级到`webpack4`版本

## 项目介绍
本项目是一个基于webpack架构的**SSR**脚手架，其特点如下：
- 更适合多页应用。
- 既可实现全后端分离，也可以生成后端渲染所需要的模板。

- 编译后的程序不依赖于外部的资源（包括css、font、图片等资源都做了迁移），可以整体放到CDN上。
- 不含Js框架（jQuery不算框架，谢谢）。

## 使用说明
- 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```
$ npm install
```

- 启动服务器
```
$ npm run start
```

- 请手动打开浏览器，在地址栏里输入`http://localhost:3000`，Duang！页面就出来了！

## CLI命令(npm scripts)
| 命令            | 作用&效果          |
| --------------- | ------------- |
| npm run build   | 根据`webpack.pro.js`，build出一份生产环境的代码 |
| npm run pro     | 根据`webpack.pro.js`，build出一份开发环境的代码并自动开启node服务器 |
| npm run start   | **推荐实际开发时使用此项
## 更新日志


### 1.2.0 (2018-05-06)
根据约定好的文件目录结构自动查找页面入口，取代过去手动指定的做法（但如果在调试过程中希望只编译某些页面，仍然可以通过手动指定来实现）。

### 1.1.0
引入Dll的概念，将第三方库进行预打包，那么在打包我们的业务代码的时候，就不需要重复打包这些第三方库了。，可以省一大半的时间。
- 如果修改了Dll所包含的第三方库，比如说升级之类的，请使用`npm run dll`重新打包Dll文件。注意：系统会在打包Dll前先清空Dll目录。
- 如果重新打包了Dll，那么也请重新打包你的业务代码，使用`npm run build`或`npm run start`。


- 编译文件前先清空build目录。
- 分拆webpack配置文件，避免配置文件日益臃肿。
- 分开生产环境和开发环境的webpack配置文件。其中，`npm run build`会调用生产环境的webpack配置文件(webpack.config.js)，而`npm run start`会调用开发环境的配置文件。

