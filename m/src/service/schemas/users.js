var mongoose = require("mongoose");

//定义用户的表结构，并对外暴露

module.exports = new mongoose.Schema({
	//用户名
	username: String,
	//密码
	password: String,
	isAdmin: {
		type: Boolean,
		default: true
	}
})