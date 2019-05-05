var express = require('express');
var router = express.Router();
var AdminR = require('../../db/user-recruit');

 /* GET home page. */
router.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var username=req.body.username;
    var password=req.body.password;
    var phone=req.body.phone;
    var email=req.body.email;
    var qq=req.body.qq;

    console.log('username:'+username);
    console.log('password:'+password);
    console.log('phone:'+phone);
    console.log('email:'+email);
    console.log('qq:'+qq);
    
    var newUser = new AdminR({
      username: username,
      password: password,
      phone: phone,
      email: email,
      qq: qq
    });

    AdminR.getUserNumByName(newUser.username,function(err,results){
      if(newUser.username != undefined && newUser.username != ''){
        // if(newUser.status === 'register'){
          if(results[0]['num'] == 0){ 
              //向数据库存储数据
              newUser.save({username:newUser.username,password:newUser.password,phone:newUser.phone,email:newUser.email,qq:newUser.qq},function(err,results){
                if(err){
                  res.locals.error = err;
                  return;
                }
              })
              //返回响应数据
              res.send('1');
              console.log('注册成功');
          }
          if(results[0]['num'] > 0){
            res.send('用户名已存在');
            console.log('用户名已存在');
          }
        // }

    }

    });
});
module.exports = router;
