var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var usermsg = require('../../db/usermsg-recruit');
router.post('/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    var username=req.body.username;
    var phone = req.body.phone;
    var email = req.body.email;
    var qq = req.body.qq;
    console.log('username'+username);
    console.log('phone'+phone);
    console.log('email'+email);
    console.log('qq'+qq);
    var newchangeU = new usermsg({
        username: username,
        phone:phone,
        email:email,
        qq:qq
    });   
    newchangeU.updateData(newchangeU.username,newchangeU,function(err,results){
        if(err){
            return;
        }
        res.send(results);
    });
});
module.exports = router;
