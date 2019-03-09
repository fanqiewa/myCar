var userDao = require("../dao/UserDao");



//查询用户

function queryUser(username,password,success) {
    userDao.queryUser(username,password,success);
}


module.exports = {
    "queryUser": queryUser
}
