//程序入口文件
//加载express模块
const express = require("express");
const app = express()
//加载数据库模块
const mongoose = require("mongoose");

//加载解析模块
const bodyParser = require("body-parser");
const path = require('path')
//利用cors解决跨源
const cors = require('cors')
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))

//监听跳转路径(主要路由)
app.use("/", require("./routers/main"));//主页面  内容、单个详情内容、阅读量
app.use("/archives", require("./routers/archives"));//归档 查找content，读取内容
// app.use("/api", require("./routers/api"));//登录注册退出、评论、
// app.use("/admin", require("./routers/admin"));//后台  检测权限、内容、分类增删查改
// app.use("/about", require("./routers/about"));//关于
app.use("/categories", require("./routers/categories"));//分类
app.use("/articleList", require("./routers/articleList"));//分类下文章
app.use("/featured", require("./routers/featured"));//分类下文章
// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function (req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8')
//     res.send(html)
// })

//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/blog", function(err){
    if(err){
        console.log("数据库链接失败：" + err);
    }else{
        console.log("数据库链接成功");
        //监听端口号
        app.listen("8088");
        console.log("listen to http://localhost:8088");
    }
})