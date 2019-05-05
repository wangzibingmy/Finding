var mysql = require('mysql');
var dbConfig = require('../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function lostR(admin){
    this.username = admin.username;
    this.lookforpic = admin.lookforpic;
    this.pubtime = admin.pubtime;
    this.found = admin.found;
    this.sthcont = admin.sthcont;
    this.lookforplace =admin.lookforplace; 
    this.losttime = admin.losttime;
    this.title = admin.title;
    this.classify = admin.classify;
    this.lostcity = admin.lostcity;
    this.lianxi = admin.lianxi;
};
module.exports =lostR;

pool.getConnection(function(err, connection) {
    //保存数据
    lostR.prototype.save = function save(title,data,callback){
        pool.getConnection(function(err,connection){
            var saveSthSql = "UPDATE look_for_sth SET username =?,pubtime =?,found =?,sthcont =?,lookforplace =?,losttime =?,lostcity =?,lianxi =?,classify=? WHERE title =?";
            connection.query(saveSthSql,[data.username,data.pubtime,data.found,data.sthcont,data.lookforplace,data.losttime,data.lostcity,data.lianxi,data.classify,title],function(err,result){
                if(err){
                    console.log('[UPDATE ERROR]-',err.message);
                    return;
                }
                console.log('UPDATE affectedRows',result.affectedRows);
                callback(err,result);
            });
        });
    };
    //查询数据
    // lostR.getsth= function getsth(title,callback) {       
    //    pool.getConnection(function(err, connection) { 
    //         var getsth_sql =  "SELECT * FROM look_for_sth WHERE title = ? order by id desc";
    //         var getsth_sql1 = "SELECT * FROM look_for_sth order by id desc";
    //         if(title!='undefined'){
    //             connection.query(getsth_sql , [title], function (err, result) {  
    //                 if (err) {
    //                     console.log("getsth_sql Error: " + err.message);
    //                     return;
    //                 }
    //                 callback(err, result);
    
    //                 //当连接不再使用时，用connection对象的release方法将其归还到连接池中
    //                 connection.release();
    //             });
    //         }
    //         else{
    //             connection.query(getsth_sql1, function (err, result) {  
    //                 if (err) {
    //                     console.log("getsth_sql1 Error: " + err.message);
    //                     return;
    //                 }
    //                 callback(err, result);   
    //                 //当连接不再使用时，用connection对象的release方法将其归还到连接池中
    //                 connection.release();
    //             });
    //         }
    //     });
    //};
    //lostdetail
    // lostR.getsthdetail= function getsthdetail(title,callback) {
        
    //     pool.getConnection(function(err, connection) { 
    //          var getsthdetail_sql =  "SELECT * FROM look_for_sth WHERE title = ? order by id desc";
    //          var getsthdetail_sql1 = "SELECT * FROM look_for_sth order by id desc";
    //          if(title!='undefined'){
    //              connection.query(getsthdetail_sql , [title], function (err, result) {  
    //                  if (err) {
    //                      console.log("getsthdetail_sql Error: " + err.message);
    //                      return;
    //                  }
    //                  callback(err, result);
     
    //                  //当连接不再使用时，用connection对象的release方法将其归还到连接池中
    //                  connection.release();
    //              });
    //          }
    //          else{
    //              connection.query(getsthdetail_sql1, function (err, result) {  
    //                  if (err) {
    //                      console.log("getsthdetail_sql1 Error: " + err.message);
    //                      return;
    //                  }
    //                  callback(err, result);
     
    //                  //当连接不再使用时，用connection对象的release方法将其归还到连接池中
    //                  connection.release();
    //              });
    //          }
    //      });
    //  };

    //删除数据
    lostR.prototype.deleteData = function deleteData(title,callback){
        pool.getConnection(function(err,connection){
            var deletelost_Sql = "DELETE FROM look_for_sth WHERE title = ?";
            connection.query(deletelost_Sql, [title] , function (err, result) {              
                if(err){
                    console.log('[DELETE ERROR] - ',err.message);
                    return;
                }
                callback(err,result);           
                console.log('----------DELETE-------------');
                console.log('DELETE affectedRows',result.affectedRows);
                console.log('******************************');
                connection.release();
            });
        })
    }

    //修改数据
    lostR.prototype.updateData = function updateData(username,data,callback){
        pool.getConnection(function(err,connection){
            
            var updateLost_Sql = "UPDATE look_for_sth SET found = ?,lookforpic = ?,sthcont =?,lookforplace =?,losttime =?,title =?,classify =?,lostcity =?,lianxi =? where username =?";

            connection.query(updateLost_Sql,[data.found,data.lookforpic,data.sthcont,data.lookforplace,data.losttime,data.title,data.classify,data.lostcity,username],function (err, result) {            
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }

   
    // AdminR.getPeople = function(sort,callback){

    //     pool.getConnection(function(err,connection){
    //         var getPeople_sql = 'select * from msg_seeker where sort = ?';
    //         connection.query(getPeople_sql, [sort], function (err, result) { 
    //             if (err) {
    //                 console.log("getUserByUserName Error: " + err.message);
    //                 return;
    //             }
    //             callback(err, result);

    //             connection.release();
    //         })
    //     })

    // }

    // AdminR.Label = function Label(callback){

    //     pool.getConnection(function(err,connection){
    //         var Label_sql = "select * from label";
    //         connection.query(Label_sql,function(err,result){
    //             connection.release();

    //             if(err){
    //                 console.log("Label Error:" + err.message);
    //                 return;
    //             }               
    //             callback(err,result);
    //         });
    //     });

    // }


    
 
});