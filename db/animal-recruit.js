var mysql = require('mysql');
var dbConfig = require('./db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function animalR(admin){
    this.username = admin.username;
    this.animalpic = admin.animalpic;
    this.pubtime = admin.pubtime;
    this.found = admin.found;
    this.animalcont = admin.animalcont;
    this.animalplace =admin.animalplace; 
    this.animaltime = admin.animaltime;
    this.title = admin.title;
    this.lostcity = admin.lostcity;
    this.lianxi = admin.lianxi;
    this.classify = admin.classify;
};
module.exports =animalR;

pool.getConnection(function(err, connection) {
    //保存数据
    animalR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {
            var insertanimalsearch_Sql = "INSERT INTO animal_search(username,animalpic,pubtime,found,animalcont,animalplace,animaltime,title,lostcity,lianxi,classify) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            connection.query(insertanimalsearch_Sql, [admin.username,admin.animalpic,admin.pubtime,admin.found,admin.animalcont,admin.animalplace,admin.animaltime,admin.title,admin.lostcity,admin.lianxi,admin.classify], function (err, result) {
                connection.release();
                if (err) {
                    console.log("insertanimalsearch_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };
    //查询数据
    animalR.getanimal= function getanimal(username,callback) {       
       pool.getConnection(function(err, connection) { 
            var getanimal_sql =  "SELECT * FROM animal_search WHERE username = ? order by id desc";
            var getanimal_sql1 = "SELECT * FROM animal_search order by id desc";
            if(username!='undefined'){
                connection.query(getanimal_sql , [username], function (err, result) {  
                    if (err) {
                        console.log("getanimal_sql Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            else{
                connection.query(getanimal_sql1, function (err, result) {  
                    if (err) {
                        console.log("getanimal_sql1 Error: " + err.message);
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
    animalR.prototype.deleteData = function deleteData(title,callback){
        pool.getConnection(function(err,connection){
            var deleteanimal_Sql = "DELETE FROM animal_search WHERE title = ?";
            connection.query(deleteanimal_Sql, [title] , function (err, result) {              
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
    animalR.prototype.updateData = function updateData(username,data,callback){
        pool.getConnection(function(err,connection){
            
            var updateAnimal_Sql = "UPDATE updateAnimal_Sql SET found = ?,animalpic = ?,animalcont =?,animalplace =?,animaltime =?,title =?,lostcity =?,lianxi =?,classify =? where username =?";

            connection.query(updateAnimal_Sql,[data.found,data.animalpic,data.animalcont,data.animalplace,data.animaltime,data.title,data.lianxi,data.classify,username],function (err, result) {            
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            })
        });
    }

   
    // AdminR.getanimalle = function(sort,callback){

    //     pool.getConnection(function(err,connection){
    //         var getanimalle_sql = 'select * from msg_seeker where sort = ?';
    //         connection.query(getanimalle_sql, [sort], function (err, result) { 
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