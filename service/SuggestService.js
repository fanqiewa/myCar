var suggestDao = require("../dao/SuggestDao");


//添加留言

function insertSuggest(name,email,comment,ctime,utime,success) {
    suggestDao.insertSuggest(name,email,comment,ctime,utime,success);
}



module.exports = {
    "insertSuggest": insertSuggest
}
