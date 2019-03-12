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

//更新notice
function updateNoticeById(id,success) {
    suggestDao.updateNoticeById(id,success);
}

//根据ID查询
function querySuggestById(id,success) {
    suggestDao.querySuggestById(id,success)
}

//根据page查询
function querySuggestByPage(page, pageSize,success) {
    suggestDao.querySuggestByPage(page,pageSize,success)
}


//根据id删除留言

function deleteSuggestById(id,success) {
    suggestDao.deleteSuggestById(id,success)
}


module.exports = {
    "insertSuggest": insertSuggest,
    "queryNewSuggest" : queryNewSuggest,
    "queryAllSuggest" : queryAllSuggest,
    "updateNoticeById" : updateNoticeById,
    "querySuggestById" : querySuggestById,
    "querySuggestByPage" : querySuggestByPage,
    "deleteSuggestById" : deleteSuggestById
}
