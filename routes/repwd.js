var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/db');
var userSQL = require('../db/usersql');
var AdminR = require('../db/user-recruit');
router.get('/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var username=req.query.username;
    console.log('username'+username);
    var password=req.query.password;
    console.log('password'+password);
   var newUser = new AdminR({
      username: username,
      password:password,
   });
    //获取用户信息
    newUser.updatePwd(newUser.username,newUser,function(err,results){
    res.send(results);
    });
});
module.exports = router;