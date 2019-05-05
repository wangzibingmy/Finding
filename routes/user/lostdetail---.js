var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var LostR = require('../../db/lostthing-recruit');


router.get('/', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    
    var title=req.query.title;
    console.log('title'+title);

    var newLost = new LostR({
        title: title
    });
    // 从连接池获取连接 
    newLost.getdetail(newLost.title,function(err,results){
        res.send(results);
    }); 

});
module.exports = router;