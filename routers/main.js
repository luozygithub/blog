var express = require("express");
var router = express.Router();
var Category = require("../modules/Category");
var Content = require("../modules/Content");
var data = null;
router.use(function(req, res, next){
	data = {
		userInfo: req.userInfo,
		categories: []
	}
	Category.find().sort({_id:-1}).then(function(categories){
		if(categories){
			data.categories = categories;
			next();	
		}else{
			router.render("admin/error",{
				userInfo: req.userInfo,
				message: "分类未找到"
			})
			return;
		}
	})
})
router.get("/", function(req, res, next){
    data.page = Number(req.query.page || 1);
    data.limit = 3;
    data.pages = 0;
    data.count = 0;
    data.Category = req.query.Category || "";
    
    var where = {};
    if(data.Category){
        where.Category = data.Category;
    }
    Content.where(where).count().then(function(count){
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
		//取值不能超过pages
		data.page = Math.min(data.page, data.pages);
		//取值不能小于1
		data.page = Math.max(data.page, 1);
		//要根据page的值动态进行计算
        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().sort({_id: -1}).limit(data.limit).skip(skip).populate(["category", "author"]);
    }).then(function(contents){
        data.contents =contents;
        res.render("main/index", data);
    })
    
})
router.get("/view", function(req, res){
    var contentId = req.query.contentId || "";
    Content.findOne({
        _id: contentId
    }).then(function(content){
        data.content = content,
        content.views++;
        content.save();
        res.render("main/view", data)
    })
})

module.exports = router;