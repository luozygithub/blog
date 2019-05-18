const models = require('./db').Login
const express = require('express')
const router = express.Router()
//const util = require("util")//可以使用 util.inspect 代替 JSON.stringify

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models({
        account: req.body.account,
        password: req.body.password
    })
    //查询该账号是否已经被注册
    models.count({"account": newAccount.account },(err,docs) => {
        if(err) {
            console.log("Error:" + err)
            res.send(err)
        }else {
            //console.log("Docs:" + docs)
            if(docs>=1){
                //账号已经被注册，注册失败，返回code = 2
                console.log("注册失败")
                res.send({code:2,msg:'账号已经存在了，不能再次注册'})
            }else{
                // 账号未注册,保存数据newAccount数据进mongoDB，注册成功,返回code=1
                newAccount.save((err, data) => {
                    //console.log('set')
                    if (err) {
                        res.send(err)
                    } else {
                        console.log("注册成功")
                        res.send({code:1,msg:'恭喜您，账号创建成功了'})
                    }
                })
            }
        }
    })
});
// 删除账号接口
router.post('/api/login/deleteAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    //console.log("delete:" + req.body.account)
    //查询该账号是否已经注册
    models.count({"account": req.body.account },(err,docs) => {
        if(err) {
            console.log("Error:" + err)
            res.send(err)
        }else {
            //console.log("Docs:" + docs)
            if(docs>=1){
                // 若注册，在mongoDB中删除该条数据，返回code = -1
                models.remove({"account": req.body.account },(err) => {
                    //console.log('delete')
                    if (err) return handleError(err);
                });
                console.log("删除成功")
                res.send({code:-1,msg:'账号已被删除'});
            }else{
                // 若还未注册，删除失败,返回code = -2，
                console.log("删除失败")
                res.send({code:-2,msg:'账号还未注册，不能删除'});
            }
        }
    })
});
// 登录接口
router.post('/api/login/loginAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models({
        account: req.body.account,
        password: req.body.password
    })
    console.log("login:" + req.body.account)
    console.log(newAccount)
    //查询该账号是否存在
    models.findOne({"account": req.body.account },(err,docs) => {
        if(err) {
            console.log("Error:" + err)
            res.send(err)
        }else {
            console.log("Docs:" + docs)
            if(!docs == ""){
                // 若存在，再验证账号密码是否正确
                //console.log('该验证账号和密码是否正确了')
                if(docs.account === newAccount.account && docs.password === newAccount.password ){
                    // 登录成功，返回code = 1
                    console.log('登录成功')
                    //可以使用 util.inspect 代替 JSON.stringify
                    //res.send(util.inspect(res,{depth:null}))
                    res.send({code:1,msg:'恭喜你，登录成功了'})
                }else {
                    // 登录失败，密码错误，返回code = -1
                    console.log({status:'登录失败', msg :'密码错误'})
                    res.send({code:-1,msg:'密码错误，请重新输入'})
                }
            }else{
                // 若不存在，登录失败，返回code = -2
                console.log({status:'登录失败', msg :'账号不存在'})
                res.send({code:-2,msg:'账号不存在，请先注册账号'})
            }
        }
    })
});
// 更新密码接口
router.post('/api/login/updatedAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models({
        account: req.body.account,
        password: req.body.password,
        newPassword: req.body.newPassword
    })
    console.log("login:" + req.body.account)
    console.log(newAccount)
    //查询该账号是否存在
    models.findOne({"account": req.body.account },(err,docs) => {
        if(err) {
            console.log("Error:" + err)
            res.send(err)
        }else {
            console.log("Docs:" + docs)
            let currId = docs._id
            if(!docs == ""){
                // 若存在，再验证账号密码是否正确
                //console.log('该验证账号和密码是否正确了')
                if(docs.account === newAccount.account && docs.password === newAccount.password ){
                    // 登录成功
                    console.log('登录成功')
                    //判断新密码是否与旧密码一致
                    if(docs.password === newAccount.newPassword) {
                        //更新密码失败，新密码与旧密码一致，不能修改，返回code = -1
                        res.send({code:-1,msg:'修改密码失败，新密码与旧密不能一致'})
                    }else {
                        models.update({_id:currId},{password:newAccount.newPassword},(err) => {
                            if(err){
                                console.log(err);
                            }else{
                                console.log("更新密码成功");
                                res.send({code:1,msg:'恭喜你，密码更新成功了'})
                            }
                        })
                    }
                }else {
                    // 更新密码失败，密码错误，返回code = -2
                    console.log({status:'更新密码失败', msg :'密码错误'})
                    res.send({code:-2,msg:'登录密码错误，不能修改密码'})
                }
            }else{
                // 若不存在，登录失败，更新密码失败，返回code = -3
                console.log({status:'登录失败', msg :'账号不存在'})
                res.send({code:-3,msg:'账号不存在，请先注册账号'})
            }
        }
    })
});
//文章内容接口
//保存
var Content = require("./models/Content");

router.post('/api/content/add', (req, res) => {
    //文章模型
    let content = Content;
    //add
    new Content({
        category: req.body.category,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        content: req.body.content
    }).save().then(function(rs){
        // res.render("admin/success", {
        //     userInfo: req.userInfo,
        //     message: "内容保存成功",
        //     url: "/admin/content"
        // })
        console.log(rs)
        return;
    })
});
//查看内容列表 select
var Content = require("./models/Content");

router.post('/api/content/select', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    // let page= Number(req.query.page || 1);
    //创建新的 传递参数对象
    let data = new Object();
    data.page = 1
    data.limit= 4;
    data.pages= 0;
    data.count= 0;
    data.category = req.query.category || ""
    //根据分类查询列表
    var where = {};
    if(data.category){
        where.category = data.category;
    }
    //文章模型
    let content = Content;

    //find
    Content.find().sort({_id: -1},).then((rs)=>{
        // res.render("admin/success", {
        //     userInfo: req.userInfo,
        //     message: "内容保存成功",
        //     url: "/admin/content"
        // })
        res.send(rs)
        console.log(rs)
        return;
    })
    // Content.where(where).count().then(function(count){
    //     data.count = count;
    //     //计算总页数
    //     data.pages = Math.ceil(data.count / data.limit);
    //     //取值不能超过pages
    //     data.page = Math.min(data.page, data.pages);
    //     //取值不能小于1
    //     data.page = Math.max(data.page, 1);
    //     //要根据page的值动态进行计算
    //     var skip = (data.page - 1) * data.limit;
    //     return Content.find().sort({_id: -1});
    // }).then(function(contents){
    //     data.contents =contents;
    //     //在这里将用户数据分配给各个模板
    //     // console.log(data);
    //     // res.render("main/index", data);
    // })
});

module.exports = router