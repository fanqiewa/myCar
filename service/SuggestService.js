var suggestDao = require("../dao/SuggestDao");


//添加留言

function insertSuggest(name,email,comment,ctime,utime,success) {
    suggestDao.insertSuggest(name,email,comment,ctime,utime,success);
}

//查询新的留言
function queryNewSuggest(success) {
    suggestDao.queryNewSuggest(success);
}

//查询所有留言
function queryAllSuggest(success) {
    suggestDao.queryAllSuggest(success);
}


module.exports = {
    "insertSuggest": insertSuggest,
    "queryNewSuggest" : queryNewSuggest,
    "queryAllSuggest" : queryAllSuggest
}
