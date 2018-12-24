var express = require("express");
var router = express.Router();
var User = require("../modules/User");
var Category = require("../modules/Category");
var Content = require("../modules/Content");
router.use(function(req, res, next){
	if(!req.userInfo.isAdmin){
		//如果当前用户是非管理员
		res.send("对不起，只有管理员才可以进入后台");
		return;
	}else{
		next();
	}
})
router.get("/", function(req, res, next){
	res.render("admin/index",{
		userInfo: req.userInfo
	});
})
router.get("/user", function(req, res, next){
	var page = Number(req.query.page || 1);
	var limit = 2;
	var pages = 0;
	
	User.count().then(function(count){
		pages = Math.ceil(count/limit);
		page = Math.max(page, 1);
		page = Math.min(page, pages);
		var skip = (page - 1) * limit;
		User.find().limit(limit).skip(skip).then(function(users){
			res.render("admin/user_index",{
				userInfo: req.userInfo,
				users: users,
				page: page,
				count: count,
				pages: pages,
				limit: limit,
				path: "user"
			})
		})

	})
	
})
router.get("/category", function(req, res){
	var page = Number(req.query.page || 1);
	var limit = 2;
	var pages = 0; //总页数

	/*
		【这】在这个地方一定要注意，我们的页数不能低于1，也不能大于数据库的总页数
		这个时候就需要的page的数值进行限制。
	*/
	Category.count().then(function(count){
		// console.log(count);
		// 由于数据库操作是异步的，所以我们的后续操作应该放在这里

		//计算总页数
		pages = Math.ceil(count / limit);
		//取值不能超过pages
		page = Math.min(page, pages);
		//取值不能小于1
		page = Math.max(page, 1);
		//要根据page的值动态进行计算
		var skip = (page - 1) * limit;

		Category.find().limit(limit).skip(skip).then(function(categories){
			// console.log(users); 可以看到数据
			res.render("admin/category_index", {
				userInfo: req.userInfo,
				categories: categories, //将从数据库中取出的数据传入
				
				page: page,   //前端页面需要知道当前是哪一页
				count: count,
				pages: pages,
				limit: limit,
				path: "category"
			})
		});

	}); //输出当前数据库的总页数
})
router.get("/category/add", function(req, res){
	res.render("admin/category_add", {
		userInfo: req.userInfo
	})
})
router.post("/category/add", function(req, res){
	/*
		处理提交过来的数据
		对提交过来的数据进行验证
	*/
	// console.log(req.body);
	var name = req.body.name || "";
	if(name == ""){
		//如果为空，我们去渲染一个通用的错误页面
		res.render("admin/error", {
			userInfo: req.userInfo,
			message: "名称不能为空"
		});
		return;
	}

	//验证数据库中是否已经存在同名的分类名称
	Category.findOne({
		name: name
	}).then(function(result){
		if(result){
			//res 在这里不能写 会和 res响应重名
			//数据库中已经存在该分类
			res.render("admin/error", {
				userInfo: req.userInfo,
				message: "分类已经存在"
			})
			return Promise.reject();
		}else{
			//数据库中没有该分类,可以保存
			return new Category({
				name: name
			}).save();
		}
	}).then(function(newCategory){
		res.render("admin/success", {
			userInfo: req.userInfo,
			message: "分类保存成功",
			url: "/admin/category"
		})
	})
})
router.get("/category/edit", function(req, res){
	//获取要修改的分类的信息，并且用表单的形式展现出来
	var id = req.query.id || "";
	//获取要修改分类的信息
	Category.findOne({
		_id: id
	}).then(function(category){
		if(!category){
			res.render("admin/error", {
				userInfo: req.userInfo,
				message: "分类信息不存在"
			});
		}else{
			//如果成功跳转到编辑预览页面
			res.render("admin/category_edit", {
				userInfo: req.userInfo,
				category: category
			});
		}
	})
})
router.get("/content", function(req, res){
	var page = Number(req.query.page || 1);
	var limit = 10;
	var pages = 0;
	Content.count().then(function(count){
		pages = Math.ceil(count/ limit);
		page = Math.max(page, pages);
		page = Math.min(page, 1);
		var skip = (page - 1) * limit;
		//populate 通过外键将其他表数据查询出来
		Content.find().sort({_id: -1}).limit(limit).skip(skip).populate(["category","author"]).then(function(contents){
			res.render("admin/content_index", {
				userInfo: req.userInfo,
				contents: contents,
				pages: pages,
				limit: limit,
				count: count,
				path: "content"
			})
		})
	})
})
router.get("/content/add", function(req, res){
    Category.find().sort({_id: -1}).then(function(categories){
        res.render("admin/content_add",{
            userInfo: req.userInfo,
            categories: categories
        })
    })
})
router.post("/content/add", function(req, res){
    if(req.body.category == ""){
        res.render("admin/error",{
            userInfo: req.userInfo,
            message: "内容不能为空"
        })
        return;
    }
    new Content({
        category: req.body.category,
		title: req.body.title,
		author: req.userInfo._id.toString(),
		description: req.body.description,
		content: req.body.content
    }).save().then(function(rs){
		res.render("admin/success", {
			userInfo: req.userInfo,
			message: "内容保存成功",
			url: "/admin/content"
		})
		// console.log(rs)
		return;
	})
})
router.get("/content/edit",  function(req, res){
    var id = req.query.id || "";
    var categories = [];
    Category.find().sort({_id: -1}).then(function(rs){
		categories = rs;
		return Content.findOne({
			_id: id
		});
	}).then(function(content){
		//如果读取出来的信息不存在
		// console.log(content);
		if(!content){
			res.render("admin/error", {
				
				
				message: "指定内容不存在"
			});
			return Promise.reject();
		}else{
			res.render("admin/content_edit", {
				
				
				content: content,
				categories: categories
			})
		}
	})
})
router.post("/content/edit", function(req, res){
    var id = req.query.id || "";
    if(req.body.category == ""){
        res.render("admin/error", {
			message: "内容分类不能为空"
		})
		return;
    }
    Content.update({
		_id: id
	},{
		category: req.body.category,
		title: req.body.title,
		description: req.body.description,
		content: req.body.content

	}).then(function(){
		res.render("admin/success", {
			// 
			
			message: "内容保存成功",
			url: "/admin/content"
		})
	})
})
router.get("/content/delete", function(req, res){
	var id = req.query.id || "";
	Content.remove({
		_id: id
	}).then(function(rs){
		if(rs){
			res.render("admin/success", {
				message: "删除成功",
				url: "/admin/content"
			})
		}else{
			res.render("admin/error", {
				userInfo: req.userInfo,
				message: "删除失败",
				url: "/admin/content"
			})
		}
	})
})
router.get("/category/delete", function(req, res){
    var id = req.query.id || "";
    Category.remove({
        _id: id
    }).then(function(rs){
		if(rs){
			res.render("admin/success", {
				message: "删除成功",
				url: "/admin/content"
			})
		}else{
			res.render("admin/error", {
				userInfo: req.userInfo,
				message: "删除失败",
				url: "/admin/content"
			})
		}
	})
})
module.exports = router;