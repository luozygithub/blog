const express = require("express");
const router = express.Router();
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
//文章内容接口
var Content = require("../models/Content.js");
var Category = require("../models/Category.js");
// 引入关联表
require("../models/Category");
require("../models/User");
// 传递对象
let data = {};
router.post("/api/content/add", (req, res) => {
  //文章模型
  let content = Content;
  //add
  new Content({
    category: req.body.category,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    content: req.body.content
  })
    .save()
    .then(function(rs) {
      // res.render("admin/success", {
      //     userInfo: req.userInfo,
      //     message: "内容保存成功",
      //     url: "/admin/content"
      // })
      console.log(rs);
      return;
    });
});
//查看内容列表 select

router.get("/select", (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let paramsPage = Number(req.query.page);
  let page = Number(paramsPage || 1);
  // 创建新的 传递参数对象
  data.page = page;
  data.limit = 2; //限制显示几条
  data.pages = 0;
  data.count = 0;
  data.skip = 0;
  Content.count()
    .then(count => {
      data.count = count;
      data.pages = Math.ceil(data.count / data.limit);
      data.page = Math.max(data.page, 1);
      data.page = Math.min(data.page, data.pages);
      data.skip = (data.page - 1) * data.limit;
      // find
      console.log(data.skip)
      Content.find()
        .limit(data.limit)
        .skip(data.skip)
        .sort({ _id: -1 })
        .populate(["category", "author"])
        .then(content => {
          data.content = content;
          console.log("select success");
          // console.log(content)
          res.send(data);
          return;
        })
    })

      

  data.category = req.query.category || "";
  //根据分类查询列表
  var where = {};
  if (data.category) {
    where.category = data.category;
  }
});
// 单篇文章
router.get("/selectOne", (req, res) => {
  console.log("selectOne");
  console.log(req.query);
  var where = {};
  Content.find({ _id: req.query.id })
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
module.exports = router;
