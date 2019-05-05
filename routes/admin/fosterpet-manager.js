var express = require('express');

var mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'wangzibing',
    password: 'rootroot',
    database: 'finding'
});

var pathLib = require('path');
var fs = require('fs');

module.exports=function(){
    var router = express.Router();

    router.get('/',function(req,res){
        switch(req.query.act){
            case 'del':
            //！！！！！！！！！
                db.query(`select * from people_search where  
                id=${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误1'+err).end();
                    }else{
                        if(data.length==0){
                            res.status(404).send('没有这条数据2'+err).end();
                        }else{
                //!!!!!!!!!!!
                            // fs.unlink('public/upload/'+data[0].petshopimage,(err)=>{
                            //     if(err){
                            //         res.status(500).send('文件操作失败3'+err).end();
                            //     }else{
                        //!!!!!!!!!!
                                    db.query(`delete from people_search where
                                    id=${req.query.id}`,(err,data)=>{
                                        if(err){
                                            res.status(500).send('数据库错误4'+err).end();
                                        }else{
                                //!!!!!!!!!!!
                                            res.redirect('/admin/fosterpet-manager');
                                        }
                                    });
                                // }
                            // });
                        }
                    }
                });
        
            break;
            case 'mod':
                db.query(`select * from people_search where
                id =  ${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('数据库错误5'+err).end();
                    }else if(data.length==0){
                        res.status(404).send('没有6'+err).end();
                    }else{
                        db.query(`select * from people_search`,(err,fosterpet_manager)=>{
                            if(err){
                                req.status(500).send('数据库错误，错误信息7：'+err).end();
                            }else{
                                res.render('admin/fosterpet-manager.ejs',{fosterpet_manager,mod_data:data[0]});
                            }
                        });
                    }
                });
            break;
            default:
            db.query(`select * from people_search`,(err,fosterpet_manager)=>{
                if(err){
                    req.status(500).send('数据库错误，错误信息8：'+err).end();
                }else{
                    res.render('admin/fosterpet-manager.ejs',{fosterpet_manager});
                }
            });
            break;
        }
      
    });

    router.post('/',(req,res)=>{
       //！！！！！！！！！！！ 
        var id = req.body.id;
        var username = req.body.username;
        var peopfound = req.body.peopfound;
        var peoplesearplace = req.body.peoplesearplace;
        var peoplostcity = req.body.peoplostcity;
        var peoptitle = req.body.peoptitle;
        var peoplianxi = req.body.peoplianxi;

        if(req.files[0]){
            
            var ext =pathLib.parse(req.files[0].originalname).ext;
            var oldPath = req.files[0].path; 
            var newPath = req.files[0].path + ext;
            var newFileName = req.files[0].filename+ext;
        }else{
            var newFileName = null;
        }
        if(newFileName){
            fs.rename(oldPath,newPath,(err)=>{
                if(err){
                    res.status(500).send('文件错误，错误原因9：'+err).end();
                }else{
                    if(req.body.mod_iddd){ 
                        //1111111111111111111
                        //修改
                        //先删除老的
                        //!!!!!!!!!!!!!!
                        db.query(`select * from people_search where
                        id=${req.body.mod_iddd}`,(err,data)=>{
                            //11111111111111111111
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误0'+err).end();
                            }else if(data.length==0){
                                res.status(404).send('老文件无法找到11'+err).end();
                            
                            }else{
                                fs.unlink('public/upload/'+data[0].petshopimage,(err)=>{
                                    if(err){
                                        res.status(500).send('文件操作失败22'+err).end();
                                    }else{
                                        //!!!!!!!!!!!!!!!!!!!!!!
                                        db.query(`update people_search set \
                                        id = '${id}',username='${username}',peopfound='${peopfound}',peoplesearplace = '${peoplesearplace}', \
                                        petshopimage='${newFileName}' \
                                        
                                        where id = ${req.body.mod_iddd}`,(err)=>{
                                            ///////////1111111111111111111111111
                                            if(err){
                                                console.error(err);
                                                res.status(500).send('数据库错误33'+err).end();
                                            }else{
                                    //!!!!!!!!!!!!!!!!!!!!!!
                                                res.redirect('/admin/fosterpet-manager');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }else{      //添加  
                        
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            db.query(`insert into people_search (id, username,peopfound,peoplesearplace,peoplostcity,peoptitle,peoplianxi)
                            values('${id}','${newFileName}','${username}','${peopfound}','${peoplesearplace}','${peoplostcity}','${peoptitle}','${peoplianxi}') `,(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('数据库错误44'+err).end();
                            }else{
                            //!!!!!!!!!!!!!!!!!
                                res.redirect('/admin/fosterpet-manager');
                            }
                        });
                    } 
                }
            });
        }else{
            if(req.body.mod_iddd){   
                //111111111111111111111111111111111111111
                //修改
                    //直接改
            //!!!!!!!!!!!!!!!!!!!
                db.query(`update people_search set \
                id = '${id}',username='${username}',peopfound = '${peopfound}',peoplesearplace='${peoplesearplace}',peoplostcity='${peoplostcity}',peoptitle='${peoptitle}',,peoplianxi='${peoplianxi}' \
                where id = ${req.body.mod_iddd} `,(err)=>{
                    // 
                    if(err){
                        console.error(err);
                        res.status(500).send('数据库错误55'+err).end();
                    }else{
                //!!!!!!!!!!!!!!!!!
                        res.redirect('/admin/fosterpet-manager');
                    }
                });
            }else{      //添加   
            //!!!!!!!!!!!!!!!!!!!!!!!! 
                        db.query(`insert into people_search (id, username,username,peopfound,peoplesearplace,peoplostcity,peoptitle,peoplianxi)
                        values('${id}','${newFileName}','${username}','${peopfound}','${peoplesearplace}','${peoplostcity}','${peoptitle}','${peoplianxi}')`,(err,data)=>{
                        if(err){
                            console.error(err);
                            res.status(500).send('数据库错误66'+err).end();
                        }else{
            //!!!!!!!!!!!!!!!!!!!
                            res.redirect('/admin/fosterpet-manager');
                        }
                    });
                }               
            }           
    });
    return router;
};

