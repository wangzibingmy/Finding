var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var animalR = require('../../db/animal-recruit');

router.get('/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var username=req.query.username;
    console.log('username'+username);

    var newaniaml = new animalR({
        username: username,
    });

    //获取用户信息
    animalR.getanimal(newaniaml.username,function(err,results){
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

    var newaniaml = new animalR({
        title: title
    });
    
    newaniaml.deleteData(newaniaml.title,function(err,results){
        if(err){
            return;
        }
        res.send(results);
    });
});
module.exports = router;