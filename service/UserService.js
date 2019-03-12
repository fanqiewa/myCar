var userDao = require("../dao/UserDao");


//添加用户
function addUser(username,password,image,ctime,utime,success) {
    userDao.addUser(username,password,image,ctime,utime,success);
}



//查询用户

function queryUser(username,password,success) {
    userDao.queryUser(username,password,success);
}

//根据用户名查找
function queryUserByUsername(username,success) {
    userDao.queryUserByUsername(username,success);
}

//更新密码
function updatePasswordById(id,password,success) {
    userDao.updatePasswordById(id,password,success);
}

module.exports = {
    "queryUser": queryUser,
    "addUser" : addUser,
    "queryUserByUsername" : queryUserByUsername,
    "updatePasswordById" : updatePasswordById
}
