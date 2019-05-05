var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var lostR = require('../../db/lostthing-recruit');

router.post('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var username=req.body.username;
    // var lookforpic = req.body.lookforpic;
    var pubtime = req.body.pubtime;
    var found = req.body.found;
    var sthcont = req.body.sthcont;
    var lookforplace = req.body.lookforplace;
    var losttime = req.body.losttime;
    var title = req.body.title;
    var classify = req.body.classify;
    var lostcity = req.body.lostcity;
    var lianxi = req.body.lianxi;

    console.log('username:'+username);
    // console.log('lookforpic:'+lookforpic);
    console.log('found:'+found);
    console.log('pubtime:'+pubtime);
    console.log('sthcont:'+sthcont);
    console.log('lookforplace:'+lookforplace);
    console.log('losttime:'+losttime);
    console.log('title:'+title);
    console.log('classify:'+classify);
    console.log('lostcity:'+lostcity);
    console.log('lianxi:'+lianxi);

    var newlost = new lostR({
        username:username,
        // lookforpic:lookforpic,
        pubtime:pubtime,
        found:found,
        sthcont:sthcont,
        lookforplace:lookforplace,
        losttime:losttime,
        title:title,
        classify:classify,
        lostcity:lostcity,
        lianxi:lianxi
    });
    // if(newlost.lookforpic!=='undefined' && newlost.found!=='undefined' && newlost.pubtime!=='undefined' && newlost.sthcont!=='undefined' && newlost.lookforplace!=='undefined' && newlost.losttime!=='undefined' && newlost.title!=='undefined' && newlost.classify!=='undefined' && newlost.lostcity!=='undefined' && newlost.lianxi!=='undefined'){
        newlost.save(newlost.title,newlost,function(err,results){          
            // if(err){
            //   res.locals.error = err;
            //   return;
            // }
            res.send(results);
        });
         //返回响应数据
        //  res.send('1');
        //  console.log('发布成功');
    //}
    // else{
    //     res.send('2');
    // }
});
module.exports = router;