var mongoose = require("mongoose");

var featuredSchema = require("../schemas/featured");

//完成了一个模型类
module.exports = mongoose.model("Featured", featuredSchema);
/*
	【注】后期可以通过这个模型类创建对象
	直接对表中的数据进行操作。
*/
