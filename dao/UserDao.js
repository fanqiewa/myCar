var dbutil = require("./DButil");



//根据用户名和密码查询
function queryUser(username,password,success) {
    var querySql = "select * from user where username = ? and password = ?";
    var params = [username,password];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}


module.exports.queryUser = queryUser;
