var mysql = require('mysql');
var dbConfig = require('../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  
function usermsg(admin){
    this.username = admin.username;
    this.phone = admin.phone;
    this.email = admin.email;
    this.qq = admin.qq;
};
module.exports =usermsg;

pool.getConnection(function(err, connection) {
    //查询数据
    usermsg.getmsg= function getmsg(username,callback) {       
        pool.getConnection(function(err, connection) { 
            var getmsg_sql =  "SELECT * FROM login WHERE username = ? order by id desc";
            var getmsg_sql1 = "SELECT * FROM login order by id desc";
            if(username!='undefined'){
                connection.query(getmsg_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getmsg_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getmsg_sql1, function (err, result) {  
                    if (err) {
                        console.log("getmsg_sql1 Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };
    //修改数据
    usermsg.prototype.updateData = function updateData(username,data,callback){
        pool.getConnection(function(err,connection){            
            var upusermsg_Sql = "UPDATE login SET phone = ?,email = ?,qq =? where username =?";
            connection.query(upusermsg_Sql,[data.phone,data.email,data.qq,username],function (err, result) {              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        })
    }
});