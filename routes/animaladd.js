var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/db');
var animalR = require('../db/animal-recruit');

router.post('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var username=req.body.username;
    // var animalpic = req.body.animalpic;
    var pubtime = req.body.pubtime;
    var found = req.body.found;
    var animalcont = req.body.animalcont;
    var animalplace = req.body.animalplace;
    var animaltime = req.body.animaltime;
    var title = req.body.title;
    var lostcity = req.body.lostcity;
    var classify = req.body.classify;
    var lianxi = req.body.lianxi;

    console.log('username:'+username);
    // console.log('animalpic:'+animalpic);
    console.log('found:'+found);
    console.log('pubtime:'+pubtime);
    console.log('animalcont:'+animalcont);
    console.log('animalplace:'+animalplace);
    console.log('animaltime:'+animaltime);
    console.log('title:'+title);
    console.log('lostcity:'+lostcity);
    console.log('lianxi:'+lianxi);
    console.log('classify:'+classify);

    var newanimal = new animalR({
        username:username,
        // animalpic:animalpic,
        pubtime:pubtime,
        found:found,
        animalcont:animalcont,
        animalplace:animalplace,
        animaltime:animaltime,
        title:title,
        lostcity:lostcity,
        lianxi:lianxi,
        classify:classify
    });
    // if(newanimal.animalpic!=='undefined' && newanimal.found!=='undefined' && newanimal.pubtime!=='undefined' && newanimal.animalcont!=='undefined' && newanimal.animalplace!=='undefined' && newanimal.animaltime!=='undefined' && newanimal.title!=='undefined' && newanimal.lostcity!=='undefined' && newanimal.lianxi!=='undefined' && newanimal.classify!=='undefined'){
        newanimal.save(newanimal.title,newanimal,function(err,results){          
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