const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test')

// 为这次连接绑定事件
const db = mongoose.connection




module.exports = Models