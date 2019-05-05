var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var lostpeopR = require('../../db/peopsear-recruit');

router.post('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var username=req.body.username;
    // var peoplepic = req.body.peoplepic;
    var peoppubtime = req.body.peoppubtime;
    var peopfound = req.body.peopfound;
    var peopcont = req.body.peopcont;
    var peoplesearplace = req.body.peoplesearplace;
    var peoplosttime = req.body.peoplosttime;
    var peoptitle = req.body.peoptitle;
    var peoplostcity = req.body.peoplostcity;
    var peoplianxi = req.body.peoplianxi;

    console.log('username:'+username);
    // console.log('peoplepic:'+peoplepic);
    console.log('peopfound:'+peopfound);
    console.log('peoppubtime:'+peoppubtime);
    console.log('peopcont:'+peopcont);
    console.log('peoplesearplace:'+peoplesearplace);
    console.log('peoplosttime:'+peoplosttime);
    console.log('peoptitle:'+peoptitle);
    console.log('peoplostcity:'+peoplostcity);
    console.log('peoplianxi:'+peoplianxi);

    var newpeoplost = new lostpeopR({
        username:username,
        // peoplepic:peoplepic,
        peoppubtime:peoppubtime,
        peopfound:peopfound,
        peopcont:peopcont,
        peoplesearplace:peoplesearplace,
        peoplosttime:peoplosttime,
        peoptitle:peoptitle,
        peoplostcity:peoplostcity,
        peoplianxi:peoplianxi
    });
    // if(newpeoplost.username!=='undefined' && newpeoplost.peopfound!=='undefined' && newpeoplost.peoppubtime!=='undefined' && newpeoplost.peopcont!=='undefined' && newpeoplost.peoplesearplace!=='undefined' && newpeoplost.peoplosttime!=='undefined' && newpeoplost.peoptitle!=='undefined' && newpeoplost.peoplostcity!=='undefined' && newpeoplost.peoplianxi!=='undefined'){
    newpeoplost.updatepeo(newpeoplost.peoptitle,newpeoplost,function(err,results){          
        // if(err){
        //   res.locals.error = err;
        //   return;
        // }
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