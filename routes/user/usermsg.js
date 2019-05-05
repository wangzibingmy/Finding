var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var UmsgR = require('../../db/usermsg-recruit');

router.get('/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var username=req.query.username;
    console.log('username'+username);

    var newUmsg = new UmsgR({
        username: username,
    });

    //获取用户信息
    UmsgR.getmsg(newUmsg.username,function(err,results){
        res.send(results);
    });     
});
module.exports = router;
