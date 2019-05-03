var mysql = require('mysql');
var dbConfig = require('../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function zhaolingR(admin){
    this.username = admin.username;
    this.zhaolingpic = admin.zhaolingpic;
    this.pubtime = admin.pubtime;
    this.found = admin.found;
    this.zhaolingcont = admin.zhaolingcont;
    this.zhaolingplace =admin.zhaolingplace; 
    this.zhaolingtime = admin.zhaolingtime;
    this.title = admin.title;
    this.classify = admin.classify;
    this.lostcity = admin.lostcity;
    this.lianxi = admin.lianxi;
};
module.exports =zhaolingR;

pool.getConnection(function(err, connection) {
    //保存数据
    zhaolingR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {
            var insertzhaoling_Sql = "INSERT INTO zhaoling(username,zhaolingpic,pubtime,found,zhaolingcont,zhaolingplace,zhaolingtime,title,classify,lostcity,lianxi) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            connection.query(insertzhaoling_Sql, [admin.username,admin.zhaolingpic,admin.pubtime,admin.found,admin.zhaolingcont,admin.zhaolingplace,admin.zhaolingtime,admin.title,admin.classify,admin.lostcity,admin.lianxi], function (err, result) {
                connection.release();
                if (err) {
                    console.log("insertzhaoling_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };
    //查询数据
    zhaolingR.getzhaoling= function getzhaoling(username,callback) {       
       pool.getConnection(function(err, connection) { 
            var getzhaoling_sql =  "SELECT * FROM zhaoling WHERE username = ? order by id desc";
            var getzhaoling_sql1 = "SELECT * FROM zhaoling order by id desc";
            if(username!='undefined'){
                connection.query(getzhaoling_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getzhaoling_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getzhaoling_sql1, function (err, result) {  
                    if (err) {
                        console.log("getzhaoling_sql1 Error: " + err.message);
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
    zhaolingR.prototype.deleteData = function deleteData(title,callback){
        pool.getConnection(function(err,connection){
            var deletelost_Sql = "DELETE FROM zhaoling WHERE title = ?";
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
    zhaolingR.prototype.updateData = function updateData(username,data,callback){
        pool.getConnection(function(err,connection){
            
            var updateLost_Sql = "UPDATE zhaoling SET found = ?,lookforpic = ?,sthcont =?,lookforplace =?,losttime =?,title =?,classify =?,lostcity =?,lianxi =? where username =?";

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