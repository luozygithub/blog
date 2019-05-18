var express = require("express");
var router = express.Router();
var Category = require("../models/Category");
var Content = require("../models/Content");
// 关联表
require("../models/User")
// Tags标签分类展示 显示分类下内容
//传递信息
let data = {};
router.use(function(req, res, next){
    data = {
        userInfo: req.userInfo,
        categories: [],
        count:0
    }
    Category.count().then(function(count){
        data.count=count
    })
    Category.find().then(function(categories){
        if(categories){
            data.categories = categories;
            next();
        }else{
            router.send({
                userInfo: req.userInfo,
                message: "分类未找到"
            });
            return;
        }
    })
})
//分类主页面
router.get("/", function(req, res, next){
    res.send(data);
})
//某个分类下文章
router.get("/list", function(req, res, next){
    data.page= Number(req.query.page || 1);
    data.limit= 15;
    data.pages= 0;
    data.count= 0;
    data.category = req.query.category || ""

    var where = {};
    if(data.category){
        where.category = data.category;
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
        res.render("main/articleList",data);
    })
})

module.exports = router;