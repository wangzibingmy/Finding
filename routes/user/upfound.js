var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var userSQL = require('../../db/usersql');
var AdminR = require('../../db/user-recruit');
router.post('/sth', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    var title=req.body.title;   
    var found=req.body.found;
    console.log('title'+title);
    console.log('found'+found);

    var newfound = new AdminR({
        title: title,
        found: found,
    });
    //获取用户信息
    newfound.upSthfoundData(newfound.title,newfound,function(err,results){
        res.send(results);
    });
});
router.post('/peop', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    var title=req.body.title;   
    var found=req.body.found;
    console.log('title'+title);
    console.log('found'+found);
    var newfound = new AdminR({
        title: title,
        found: found
    });
    //获取用户信息
    newfound.upPeopData(newfound.title,newfound,function(err,results){
        res.send(results);
    });
});
router.post('/animal', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    var title=req.body.title;   
    var found=req.body.found;
    console.log('title'+title);
    console.log('found'+found);
    var newfound = new AdminR({
        title: title,
        found: found
    });
    //获取用户信息
    newfound.upAnimalData(newfound.title,newfound,function(err,results){
        res.send(results);
    });
});
router.post('/zhaoling', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    var title=req.body.title;   
    var found=req.body.found;
    console.log('title'+title);
    console.log('found'+found);
    var newfound = new AdminR({
        title: title,
        found: found
    });
    //获取用户信息
    newfound.upZhaolingData(newfound.title,newfound,function(err,results){
        res.send(results);
    });
});
module.exports = router;