

var publicDao = require("../dao/PublicDao");

//查询新的最新通知记录

function queryNewPublic(success) {
    publicDao.queryNewPublic(success);
}

//更新动态
function updateNoticePublic(id,success) {
    publicDao.updateNoticePublic(id,success);
}

//更新lastview

function updateLastviewPublic(num,id,success) {
    publicDao.updateLastviewPublic(num,id,success);
}

//根据id查询公告
function queryPublicById(id,success) {
    publicDao.queryPublicById(id,success)
}


module.exports = {
    "queryNewPublic": queryNewPublic,
    "updateNoticePublic" : updateNoticePublic,
    "updateLastviewPublic" : updateLastviewPublic,
    "queryPublicById" : queryPublicById
}
