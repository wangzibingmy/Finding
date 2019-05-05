var mysql = require('mysql');
var dbConfig = require('./db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function lostpeopR(admin){
    this.username = admin.username;
    // this.peoplepic = admin.peoplepic;
    this.peoppubtime = admin.peoppubtime;
    this.peopfound = admin.peopfound;
    this.peopcont = admin.peopcont;
    this.peoplesearplace =admin.peoplesearplace; 
    this.peoplosttime = admin.peoplosttime;
    this.peoptitle = admin.peoptitle;
    this.peoplostcity = admin.peoplostcity;
    this.peoplianxi = admin.peoplianxi;
};
module.exports =lostpeopR;

pool.getConnection(function(err, connection) {
    //保存数据
    lostpeopR.prototype.updatepeo = function updatepeo(peoptitle,data,callback){
        pool.getConnection(function(err,connection){
            var savePeopSql = "UPDATE people_search SET username =?,peoppubtime =?,peopfound =?,peopcont =?,peoplesearplace =?,peoplosttime =?,peoplostcity =?,peoplianxi =? WHERE peoptitle =?";
            connection.query(savePeopSql,[data.username,data.peoppubtime,data.peopfound,data.peopcont,data.peoplesearplace,data.peoplosttime,data.peoplostcity,data.peoplianxi,peoptitle],function(err,result){
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
    lostpeopR.getpeop= function getpeop(username,callback) {       
       pool.getConnection(function(err, connection) { 
            var getpeop_sql =  "SELECT * FROM people_search WHERE username = ? order by id desc";
            var getpeop_sql1 = "SELECT * FROM people_search order by id desc";
            if(username!='undefined'){
                connection.query(getpeop_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getpeop_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getpeop_sql1, function (err, result) {  
                    if (err) {
                        console.log("getpeop_sql1 Error: " + err.message);
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
    lostpeopR.prototype.deleteData = function deleteData(peoptitle,callback){
        pool.getConnection(function(err,connection){
            var deletepeop_Sql = "DELETE FROM people_search WHERE peoptitle = ?";
            connection.query(deletepeop_Sql, [peoptitle] , function (err, result) {              
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
    // lostpeopR.prototype.uppeopDate = function uppeopDate(username,data,callback){
    //     pool.getConnection(function(err,connection){
            
    //         var updatePeop_Sql = "UPDATE _recruit SET peopfound = ?,peoplepic = ?,peopcont =?,peoplesearplace =?,peoplosttime =?,peoptitle =?,peopcity =?,peoplianxi =? where username =?";

    //         connection.query(updatePeop_Sql,[data.peopfound,data.peoplepic,data.peopcont,data.peoplesearplace,data.peoplosttime,data.peoptitle,data.peoplianxi,username],function (err, result) {            
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