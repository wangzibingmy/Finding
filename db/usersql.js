var UserSQL = {  
                insert:'INSERT INTO login(username,password) VALUES(?,?)', 
                queryAll:'SELECT * FROM login',  
                getUserById:'SELECT * FROM login WHERE id = ? ',
                
              };
 module.exports = UserSQL;