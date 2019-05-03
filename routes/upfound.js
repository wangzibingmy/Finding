var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/db');
var userSQL = require('../db/usersql');
var AdminR = require('../db/user-recruit');
router.get('/sth', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var title=req.query.title;   
    var found=req.query.found;
    console.log('title'+title);
    console.log('found'+found);
    var newUser = new AdminR({
        title: title,
        found: found
    });
    //获取用户信息
    newUser.upSthfoundData(newUser.title,newUser,function(err,results){
        res.send(results);
    });
});
module.exports = router;