var express = require("express");
var router = express.Router();
var Content = require("../models/Content.js");
require("../models/Category");
require("../models/User");
// 分类下内容列表
router.get("/", function(req, res, next){
    let data = {}
    data.page= Number(req.query.page || 1);
    data.limit= 15;
    data.pages= 0;
    data.count= 0;
    data.category = req.query.id || ""
    console.log("category")
    console.log( req.query )
    var where = {};
    if(data.category){
        where.category = req.query.id ;
    }
    //获取 分类下文章个数
    Content.where(where).count().then(function(count){
        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);
        //要根据page的值动态进行计算
        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(["category", "author"]);
    }).then(function(contents){
        data.contents =contents;
        //在这里将用户数据分配给各个模板
        console.log(contents);
        res.send(data);
    })
})
//导出路由
module.exports = router;