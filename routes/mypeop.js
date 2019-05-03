var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var LostR = require('../db/mypeop-recruit');

router.get('/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var username=req.query.username;
    console.log('username'+username);

    var newLost = new LostR({
        username: username,
    });

    //获取用户信息
    LostR.getpeopLost(newLost.username,function(err,results){
        res.send(results);
    });     
 });
router.get('/del', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var title=req.query.title;
    console.log('title'+title);

    var newLost = new LostR({
        title: title
    });
    
    newLost.deleteData(newLost.title,function(err,results){
        if(err){
            return;
        }
        res.send(results);
    });
});
module.exports = router;