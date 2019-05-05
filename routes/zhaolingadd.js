var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/db');
var zhaolingR = require('../db/zhaoling-recruit');

router.post('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var username=req.body.username;
    // var zhaolingpic = req.body.zhaolingpic;
    var pubtime = req.body.pubtime;
    var found = req.body.found;
    var zhaolingcont = req.body.zhaolingcont;
    var zhaolingplace = req.body.zhaolingplace;
    var zhaolingtime = req.body.zhaolingtime;
    var title = req.body.title;
    var classify = req.body.classify;
    var lostcity = req.body.lostcity;
    var lianxi = req.body.lianxi;

    console.log('username:'+username);
    // console.log('zhaolingpic:'+zhaolingpic);
    console.log('found:'+found);
    console.log('pubtime:'+pubtime);
    console.log('zhaolingcont:'+zhaolingcont);
    console.log('zhaolingplace:'+zhaolingplace);
    console.log('zhaolingtime:'+zhaolingtime);
    console.log('title:'+title);
    console.log('classify:'+classify);
    console.log('lostcity:'+lostcity);
    console.log('lianxi:'+lianxi);

    var newlost = new zhaolingR({
        username:username,
        // zhaolingpic:zhaolingpic,
        pubtime:pubtime,
        found:found,
        zhaolingcont:zhaolingcont,
        zhaolingplace:zhaolingplace,
        zhaolingtime:zhaolingtime,
        title:title,
        classify:classify,
        lostcity:lostcity,
        lianxi:lianxi
    });
    // if(newlost.zhaolingpic!=='undefined' && newlost.found!=='undefined' && newlost.pubtime!=='undefined' && newlost.zhaolingcont!=='undefined' && newlost.zhaolingplace!=='undefined' && newlost.zhaolingtime!=='undefined' && newlost.title!=='undefined' && newlost.classify!=='undefined' && newlost.lostcity!=='undefined' && newlost.lianxi!=='undefined'){
        newlost.save(newlost.title,newlost,function(err,results){          
            res.send(results);
        });
         //返回响应数据
    //      res.send('1');
    //      console.log('发布成功');
    // }
    // else{
    //     res.send('2');
    // }
    // newPublish.deleteData(newPublish.date,function(err,results){
    //     if(err){
    //       return;
    //     }
    //     res.send(results);
    // })
});
module.exports = router;