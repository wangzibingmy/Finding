var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/db');
var lostR = require('../db/peopsear-recruit');

router.post('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var username=req.body.username;
    var peoplepic = req.body.peoplepic;
    var pubtime = req.body.pubtime;
    var found = req.body.found;
    var peopcont = req.body.peopcont;
    var peoplesearplace = req.body.peoplesearplace;
    var losttime = req.body.losttime;
    var title = req.body.title;
    var lostcity = req.body.lostcity;
    var lianxi = req.body.lianxi;

    console.log('username:'+username);
    console.log('peoplepic:'+peoplepic);
    console.log('found:'+found);
    console.log('pubtime:'+pubtime);
    console.log('peopcont:'+peopcont);
    console.log('peoplesearplace:'+peoplesearplace);
    console.log('losttime:'+losttime);
    console.log('title:'+title);
    console.log('lostcity:'+lostcity);
    console.log('lianxi:'+lianxi);

    var newpeoplost = new lostR({
        username:username,
        // peoplepic:peoplepic,
        pubtime:pubtime,
        found:found,
        peopcont:peopcont,
        peoplesearplace:peoplesearplace,
        losttime:losttime,
        title:title,
        lostcity:lostcity,
        lianxi:lianxi
    });
    if(newpeoplost.peoplepic!=='undefined' && newpeoplost.found!=='undefined' && newpeoplost.pubtime!=='undefined' && newpeoplost.peopcont!=='undefined' && newpeoplost.peoplesearplace!=='undefined' && newpeoplost.losttime!=='undefined' && newpeoplost.title!=='undefined' && newpeoplost.lostcity!=='undefined' && newpeoplost.lianxi!=='undefined'){
        newpeoplost.save({username:newpeoplost.username,peoplepic:newpeoplost.peoplepic,pubtime:newpeoplost.pubtime,found:newpeoplost.found,peopcont:newpeoplost.peopcont,peoplesearplace:newpeoplost.peoplesearplace,losttime:newpeoplost.losttime,title:newpeoplost.title,lostcity:newpeoplost.lostcity,lianxi:newpeoplost.lianxi},function(err,results){          
            if(err){
              res.locals.error = err;
              return;
            }
        });
         //返回响应数据
         res.send('1');
         console.log('发布成功');
    }
    else{
        res.send('2');
    }
    // newPublish.deleteData(newPublish.date,function(err,results){
    //     if(err){
    //       return;
    //     }
    //     res.send(results);
    // })
});
module.exports = router;