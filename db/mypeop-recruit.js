var mysql = require('mysql');
var dbConfig = require('../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  
function LostR(admin){
    this.username = admin.username;
    this.lookforpic = admin.lookforpic;
    this.pubtime = admin.pubtime;
    this.found = admin.found;
    this.sthcont = admin.sthcont;
    this.lookforplace = admin.lookforplace;
    this.losttime = admin.losttime;
    this.title = admin.title;
    this.lianxi = admin.lianxi;
};
module.exports =LostR;

pool.getConnection(function(err, connection) {
    //查询数据
   LostR.getpeopLost= function getpeopLost(username,callback) {      
       pool.getConnection(function(err, connection) { 
            var getpeopLost_sql =  "SELECT * FROM people_search WHERE username = ? order by id desc";
            var getpeopLost_sql1 = "SELECT * FROM people_search order by id desc";
            if(username!='undefined'){
                connection.query(getpeopLost_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getpeopLost_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getpeopLost_sql1, function (err, result) {  
                    if (err) {
                        console.log("getpeopLost_sql1 Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };

    //删除数据
    LostR.prototype.deleteData = function deleteData(title,callback){
        pool.getConnection(function(err,connection){
            var deleteLost_Sql = "DELETE FROM people_search WHERE title = ?";

            connection.query(deleteLost_Sql, [title] , function (err, result) {
                
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
    // AdminR.prototype.updateData = function updateData(username,data,callback){
    //     pool.getConnection(function(err,connection){
            
    //         var updateUser_Sql = "UPDATE user_recruit SET phone = ?,email = ?,password =? where username =?";

    //         connection.query(updateUser_Sql,[data.phone,data.email,data.password,username],function (err, result) {
              
    //             if(err){
    //                   console.log('[UPDATE ERROR] - ',err.message);  
    //                   return;
    //             }            
    //            console.log('UPDATE affectedRows',result.affectedRows);
    //            callback(err,result);
    //         })
    //     })
    // }
});