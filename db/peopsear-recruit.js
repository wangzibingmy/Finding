var mysql = require('mysql');
var dbConfig = require('./db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function lostpeopR(admin){
    this.username = admin.username;
    this.peoplepic = admin.peoplepic;
    this.pubtime = admin.pubtime;
    this.found = admin.found;
    this.peopcont = admin.peopcont;
    this.peoplesearplace =admin.peoplesearplace; 
    this.losttime = admin.losttime;
    this.title = admin.title;
    this.lostcity = admin.lostcity;
    this.lianxi = admin.lianxi;
};
module.exports =lostpeopR;

pool.getConnection(function(err, connection) {
    //保存数据
    lostpeopR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {
            var insertpeoplesearch_Sql = "INSERT INTO people_search(username,peoplepic,pubtime,found,peopcont,peoplesearplace,losttime,title,lostcity,lianxi) VALUES(?,?,?,?,?,?,?,?,?,?)";
            connection.query(insertpeoplesearch_Sql, [admin.username,admin.peoplepic,admin.pubtime,admin.found,admin.peopcont,admin.peoplesearplace,admin.losttime,admin.title,admin.lostcity,admin.lianxi], function (err, result) {
                connection.release();
                if (err) {
                    console.log("insertpeoplesearch_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
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
    lostpeopR.prototype.deleteData = function deleteData(title,callback){
        pool.getConnection(function(err,connection){
            var deletepeop_Sql = "DELETE FROM people_search WHERE title = ?";
            connection.query(deletepeop_Sql, [title] , function (err, result) {              
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
    lostpeopR.prototype.updateData = function updateData(username,data,callback){
        pool.getConnection(function(err,connection){
            
            var updatePeop_Sql = "UPDATE _recruit SET found = ?,peoplepic = ?,peopcont =?,peoplesearplace =?,losttime =?,title =?,lostcity =?,lianxi =? where username =?";

            connection.query(updatePeop_Sql,[data.found,data.peoplepic,data.peopcont,data.peoplesearplace,data.losttime,data.title,data.lianxi,username],function (err, result) {            
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