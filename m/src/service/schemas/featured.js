var mongoose = require("mongoose");
//精选的表结构
module.exports = new mongoose.Schema({
	//关联字段
    category:{
        //类型
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    title: String,
    //简介
    description:{
        type: String,
        default: ""
    },
    //内容
    content: {
        type: String,
        default: ""
    },
    //这里定义了一个外键author
    author: {
        //添加外键
        //author为外键
        type: mongoose.Schema.Types.ObjectId,
        //定义了author为User的外键 User->users
        ref: "User"
    },
    addTime: {
        type: Date,
        default: new Date()
    },
    //访问量
    views:{
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    }

})