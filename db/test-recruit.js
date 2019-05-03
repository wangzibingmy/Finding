var mysql = require('mysql');
var dbConfig = require('../db/db');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function PetR(admin){

    // this.status = admin.status;
    this.title= admin.title;
    this.date = admin.date; 
    this.info = admin.info; 
};
module.exports =PetR;

pool.getConnection(function(err, connection) {

    PetR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insertPetlist_Sql = "INSERT INTO test(title,date,info) VALUES(?,?,?)";

            connection.query(insertPetlist_Sql, [admin.title,admin.date,admin.info], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insertUser_Sql Error: " + err.message);
                    return;
                }

                console.log("invoked[save]");
                callback(err, result);
            });
        });
    };

 
});