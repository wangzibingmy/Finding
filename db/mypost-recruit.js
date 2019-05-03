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
    this.classify = admin.classify;
    this.lianxi = admin.lianxi;
};
module.exports =LostR;

pool.getConnection(function(err, connection) {
    //保存数据
    LostR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {
            var insertLookforsth_Sql = "INSERT INTO look_for_sth(username,lookforpic,pubtime,found,sthcont,lookforplace,losttime,title,classify,lianxi) VALUES(?,?,?,?,?,?,?,?,?,?)";
            connection.query(insertLookforsth_Sql, [admin.username,admin.lookforpic,admin.pubtime,admin.found,admin.sthcont,admin.lookforplace,admin.losttime,admin.title,admin.classify,admin.lianxi], function (err, result) {
                connection.release();
                if (err) {
                    console.log("insertLookforsth_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };
    //查询数据
   LostR.getLost= function getLost(username,callback) {
        
       pool.getConnection(function(err, connection) { 
            var getLost_sql =  "SELECT * FROM look_for_sth WHERE username = ? order by id desc";
            var getLost_sql1 = "SELECT * FROM look_for_sth order by id desc";
            if(username!='undefined'){
                connection.query(getLost_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getLost_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getLost_sql1, function (err, result) {  
                    if (err) {
                        console.log("getLost_sql1 Error: " + err.message);
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
            var deleteLost_Sql = "DELETE FROM look_for_sth WHERE title = ?";

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