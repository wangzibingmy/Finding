var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/db');
var PetR = require('../../db/test-recruit');


router.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var title= req.body.title;
    var date = req.body.date; 
    var info = req.body.info;    
    console.log('-----------------');
    console.log('title:'+title);
    console.log('date:'+date);
    console.log('info:'+info);
    console.log('-----------------');
    
    var newPet = new PetR({
      title: title,
      date: date,
      info: info
    });
    // console.log('param1:'+newPet.status);
    // console.log('petname:'+newPet.petname);
    // console.log('phone:'+newPet.phone);
    // console.log('address:'+newPet.address);
    // console.log('petimage:'+newPet.petimage);
    // console.log('petinformation:'+newPet.petinformation);
  
    //向数据库存储数据
    if(newPet.title!=='undefined'&&newPet.date!== 'undefined'&&newPet.info!=='undefined'){
        newPet.save({title:newPet.title,date:newPet.date,info:newPet.info},function(err,results){
          
          if(err){
            res.locals.error = err;
            return;
          }
        })
        //返回响应数据
        res.send('1');
        console.log('发布成功');
      }
      else{
        res.send('2');
      }
  });     
module.exports = router;