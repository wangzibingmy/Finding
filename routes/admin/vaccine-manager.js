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

    router.get('/',(req,res)=>{
        switch(req.query.act){
            //添加数据时执行
            case'add':
            db.query(`insert into look_for_sth (username,lookforpic,pubtime,found,sthcont,lookforplace,losttime,title,classify,lostcity,lianxi)
                value(${username}','${lookforpic}','${pubtime}','${found}','${sthcont}','${lookforplace}','${losttime}','${title}','${classify}','${lostcity}','${lianxi}')`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误1'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');

                    }
                });
             //修改数据时执行
            case 'mod':
                db.query(`select * from look_for_sth where id='${req.query.id}'`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误11'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('数据无法找到404'+err).end();   
                    }else{
                        db.query(`select * from look_for_sth `,(err,vaccine_manager)=>{
                            if(err){
                                res.status(500).send('数据库错误111'+err).end();
                            }else{
                                 res.render('admin/vaccine-manager.ejs',{vaccine_manager,mod_data: data[0]});
                            }
                        });
                    }
                });
                break;
            //删除数据时执行
            case 'del':
                db.query(`delete from look_for_sth where id='${req.query.id}'`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('删除数据库错误'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');
                }
            });
            break;
            default:
            db.query(`select * from look_for_sth `,(err,vaccine_manager)=>{
                if(err){
                    res.status(500).send('数据库错误111111'+err).end();
                }else{
                    res.render('admin/vaccine-manager.ejs',{vaccine_manager});
                }
            });
            break;
        }
    });
    //添加数据
    router.post('/',(req,res)=>{
       
        var username=req.body.username;
        var lookforpic=req.body.lookforpic;
        var pubtime=req.body.pubtime;
        var found=req.body.found;
        var sthcont=req.body.sthcont;
        var lookforplace=req.body.lookforplace;
        var losttime=req.body.losttime;
        var title=req.body.title;
        var classify=req.body.classify;
        var lostcity=req.body.lostcity;
        var lianxi=req.body.lianxi;


        if(!username || !lookforpic || !pubtime || !found || !sthcont || !lookforplace || !losttime || !title || !classify || !lostcity || !lianxi){
            res.status(400).send('arg error'+ err).end();
        }else{

            if(req.body.mod_id){
                //修改
                db.query(`update look_for_sth set 
                username='${req.body.username}',lookforpic='${req.body.lookforpic}',pubtime='${req.body.pubtime}',found='${req.body.found}',sthcont='${req.body.sthcont}' ,lookforplace='${req.body.lookforplace}' ,losttime='${req.body.losttime}' ,title='${req.body.title}'  ,classify='${req.body.classify}'  ,lostcity='${req.body.lostcity}'  ,lianxi='${req.body.lianxi}' 
                where id = '${req.body.mod_id}' `,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误222'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');

                    }
                });
            }else{
                //添加
                    db.query(`insert into look_for_sth (username,lookforpic,pubtime,found,sthcont,lookforplace,losttime,title,classify,lostcity,lianxi)
                value(${username}','${lookforpic}','${pubtime}','${found}','${sthcont}','${lookforplace}','${losttime}','${title}','${classify}','${lostcity}','${lianxi}')`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误2222'+err).end();
                    }else{
                        res.redirect('/admin/vaccine-manager');

                    }

                });
            }   
        }
    });
    
    return router;
}