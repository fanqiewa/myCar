var dbutil = require("./DButil");

//添加用户
function addUser(username,password,image,ctime,utime,success) {
    var insertSql = "insert into user (`username`,`password`,`image`,`ctime`,`utime`) values (?, ?, ?, ?, ?)";
    var params = [username,password,image,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

module.exports.addUser = addUser;


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

//根据用户名查找
function queryUserByUsername(username,success) {
    var querySql = "select * from user where username = ?";
    var params = [username];
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

//修改密码

function updatePasswordById(id,password,success) {
    var updateSql = "update user set password= "+ password +" where id =" + id;
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

module.exports.queryUser = queryUser;
module.exports.queryUserByUsername = queryUserByUsername;
module.exports.updatePasswordById = updatePasswordById;
