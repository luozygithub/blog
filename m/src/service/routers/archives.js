var express = require("express");
var router = express.Router();
var Content = require("../models/Content.js");
require("../models/Category");

// 归档
router.get("/", function(req, res, next){
    let data = {}
    data.page= Number(req.query.page || 1);
    data.limit= 12;
    data.pages= 0;
    data.count= 0;
    data.newPage=false;//是否是其他页面跳过来的 主页搜索跳过来
    Content.count().then(function(count){
        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);
        //要根据page的值动态进行计算
        var skip = (data.page - 1) * data.limit;
        return Content.find().limit(data.limit).skip(skip).sort({addTime: -	1});
    }).then(function(contents){
        data.contents =contents;
        //在这里将用户数据分配给各个模板
        res.send(data);
    })
})
//内容搜索
router.get("/search", function(req, res){
    console.log('search')
    //模糊查询
    //解决了 用populate查询的时候 要注意comments模式里的ref指向的user 要和 mongoose.model()里面的user一样 注意大小写。
    Content.find({"title": {$regex:req.query.title,$options: 'i'}}).populate(["Category"]).then(function(contents){
        res.send({
            contents:contents
        })
    })
})

//导出路由
module.exports = router;