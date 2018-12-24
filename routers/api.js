var express = require("express");
var router = express.Router();
var User = require("../modules/User");
var Content = require("../modules/Content");
var responseData;
router.use(function(req, res, next){
	responseData = {
		code: 0,    //错误码
		message: "" //信息
	}
	next();
})
router.post("/user/login", function(req, res, next){
    var username = req.body.username;
	var password = req.body.password;

	if(username == "" || password == ""){
		responseData.code = 1;
		responseData.message = "用户名和密码不能为空";
		res.json(responseData);
		return;
    }
    User.findOne({
		username: username,
		password: password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 2;
			responseData.message = "用户名或密码错误";
			res.json(responseData);
			return;
		}

		//用户名和密码正确
		responseData.message = "登录成功";
		//将登录信息返回前端页面
		responseData.userInfo = {
			_id: userInfo._id,
			username: userInfo.username
        }
        req.cookies.set("userInfo", JSON.stringify({
			_id: userInfo._id,
			username: userInfo.username
		}))
		res.json(responseData);
		return;
	})

})
router.post("/user/register", function(req, res, next){
	/*
		body-parse会将解析完的post提交过来的数据
		以对象的形式挂载在
		req.body

		下面我们编写注册的逻辑
		1、基本的注册逻辑判断
			(1)用户名不能为空
			(2)密码不能为空
			(3)两次密码输入必须一致
		2、和数据库中的数据，进行比对，判断是否注册过
			(1)数组库查询
	 */
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	//用户名是否为空
	if(username == ""){
		responseData.code = 1;
		responseData.message = "用户名不能为空";
		//返回前端  将对象转成json格式的字符串，返回前端
		res.json(responseData);
		return;
	}
	//密码不能为空
	if(password == ""){
		responseData.code = 2;
		responseData.message = "密码不能为空";
		res.json(responseData);
		return;
	}
	//两次密码要相同
	if(password != repassword){
		responseData.code = 3;
		responseData.message = "两次输入的密码不一致";
		res.json(responseData);
		return;
	}

	/*
		用户名是否已经被注册

		.then 属于 ECMA6 Promise的语法 保证任务串行执行的。
	 */
	User.findOne({
		username: username
	}).then(function(userInfo){
		//userInfo 查询的结果
		if(userInfo){
			//在数据库中有记录
			responseData.code = 4;
			responseData.message = "用户名已经被注册了";
			res.json(responseData);
			return;
		}

		//保存用户的注册的信息到数据库中
		var user = new User({
			username: username,
			password: password
		});

		//保存数据库
		return user.save()
	}).then(function(newUserInfo){
		console.log(newUserInfo);
		//注册成功
		responseData.message = "注册成功";
		res.json(responseData);    
	})
	
})
router.get("/user/logout", function(req, res){
	//清除cookie
	req.cookies.set("userInfo", null);
	res.json(responseData)
})

router.get("/loginOut", function(req, res){
	req.cookies.set("userInfo","");
	res.render("admin/loginOut",{
		userInfo: req.userInfo,
		message: "退出成功",
		url: "/"
	})
})
router.post("/comment/post", function(req, res){
    var contentId = req.body.contentId || "";
    var postData = {
		username: req.userInfo.username,
		postTime: new Date(),
		content: req.body.content
    }
    Content.findOne({
		_id: contentId
	}).then(function(content){
		content.comments.push(postData);
		content.comments = content.comments.reverse();
		return content.save()
	}).then(function(newContent){
		// console.log(newContent)
		if(newContent){
			responseData.message = "评论成功;"
			res.json(responseData);
		}
	})
})
module.exports = router;