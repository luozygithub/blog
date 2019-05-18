var express = require("express");
var router = express.Router();
var Featured = require("../models/Featured.js");

let data = {}//返回数据
router.get("/select", (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let paramsPage = Number(req.query.page);
    let page = Number(paramsPage || 1);
    // 创建新的 传递参数对象
    data.page = page;
    data.limit = 6; //限制显示几条
    data.pages = 0;
    data.count = 0;
    data.skip = 0;
    Featured.count()
      .then(count => {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.max(data.page, 1);
        data.page = Math.min(data.page, data.pages);
        data.skip = (data.page - 1) * data.limit;
        // find
        console.log(data.skip)
        Featured.find()
          .limit(data.limit)
          .skip(data.skip)
          .sort({ _id: -1 })
          .then(content => {
            data.content = content;
            console.log("select success");
            res.send(data);
            return;
          })
      })
  });
  // 单篇文章
router.get("/selectOne", (req, res) => {
    console.log("selectOne");
    console.log(req.query);
    var where = {};
    Featured.find({ _id: req.query.id })
      .sort({ _id: -1 })
      .populate(["category", "author"])
      .then(rs => {
        console.log("select success");
        // console.log(rs)
        // 阅读量增加一
        rs[0].views++;
        rs[0].save();
        res.send(rs);
        return;
      });
  });
//导出路由
module.exports = router;