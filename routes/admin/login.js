var express = require('express');

var mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'wangzibing',
    password: 'rootroot',
    database: 'finding'
});

module.exports = function(){
    var router = express.Router();

        //接收login页面的数据
        router.get('/',(req,res)=>{
            res.render('admin/login.ejs',{});
        });

        router.post('/',(req,res)=>{

            console.log(req.body);

            var username = req.body.username;
            var password = req.body.password;

            //匹配数据库
            db.query(`select * from admin_tb where username='${username}'`,(err,data)=>{
                if(err){
                    res.status(500).send(err).end();
                }else{
                    if(data.length==0){
                        res.status(400).send('您的用户名有误！').end();
                    }else{
                        if(data[0].password==password){
                            //成功,data[0].ID就是admin_tb表里的 ID字段
                            req.session['admin_id'] = data[0].id;
                            //跳转页面
                            res.redirect('/admin/');
                        }else{
                            res.status(400).send('您的密码有误！'+err).end();
                        }
                    }
                }
            });
        });   


    return router;
}

