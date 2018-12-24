
var express = require("express");
var swig = require("swig");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Cookies = require("cookies");
var app = express();
var User = require("./modules/User");
app.use(bodyParser.urlencoded({extended: true}));

app.engine("html", swig.renderFile);
app.set("views","./views");
app.set("view engine", "html");
swig.setDefaults({cache: false});

app.use("/public", express.static(__dirname + "/public"));


app.use(function(req, res, next){
	//后续所有的页面上都可以通过 req.cookies调用cookie
	req.cookies = new Cookies(req, res);
	/*
		每一次加载页面的时候，都会先来加载app.js，在这里判断用户是否已经登录
		再将数据，分发到各个页面
	 */
	req.userInfo = {};
	if(req.cookies.get("userInfo")){
		try{
			req.userInfo = JSON.parse(req.cookies.get("userInfo"));
			User.findById(req.userInfo._id).then(function(userInfo){
				//将是否为 admin存到req.userInfo里面
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
				next();
			})
		}catch(error){
			console.log(error);
			next();
		}
	}else{
		next();
	}

})
app.use("/api", require("./routers/api"));
app.use("/admin", require("./routers/admin"))
app.use("/", require("./routers/main"));


mongoose.connect("mongodb://127.0.0.1:27017/test", function(err){
	if(err){
		console.log("数据库链接失败：" + err);
	}else{
		console.log("数据库链接成功");
		//监听端口号
		app.listen("8090");
		console.log("listen to http://localhost:8090");
	}
})