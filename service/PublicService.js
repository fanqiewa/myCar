

var publicDao = require("../dao/PublicDao");




//添加新闻
function insertPublic(title,content,ctime,utime,success) {
    publicDao.insertPublic(title,content,ctime,utime,success);
}

//查询新的最新通知记录

function queryNewPublic(success) {
    publicDao.queryNewPublic(success);
}

//更新动态
function updateNoticePublic(id,success) {
    publicDao.updateNoticePublic(id,success);
}

//更新动态，通过游客改变
function updateNoticePublicById(id,success) {
    publicDao.updateNoticePublicById(id,success);
}

//更新lastview

function updateLastviewPublic(num,id,success) {
    publicDao.updateLastviewPublic(num,id,success);
}

//根据id查询公告
function queryPublicById(id,success) {
    publicDao.queryPublicById(id,success)
}

//查询所有公告
function queryAllPublic(success) {
    publicDao.queryAllPublic(success)
}

//更新nowview + 1
function updateNowviewById(id,success) {
    publicDao.updateNowviewById(id,success);
}

//模糊查询
function queryPublicByBlur(text,success) {
    publicDao.queryPublicByBlur(text,success)
}

//根据页数查询
function queryPublicByPage(page, pageSize,success) {
    publicDao.queryPublicByPage(page, pageSize, success)
}
//跟据Id删除
function deletePublicById(id,success) {
    publicDao.deletePublicById(id,success)
}

//根据id更新content
function updatePublicConById(id,value,success) {
    publicDao.updatePublicConById(id,value,success)
}

//根据id更新数据
function updatePublicById(id,change,value,success) {
    publicDao.updatePublicById(id,change,value,success);
}


//批量删除
function deleteAllPublic(arr,success) {
    publicDao.deleteAllPublic(arr,success)
}

module.exports = {
    "insertPublic" : insertPublic,
    "queryNewPublic": queryNewPublic,
    "updateNoticePublic" : updateNoticePublic,
    "updateLastviewPublic" : updateLastviewPublic,
    "queryPublicById" : queryPublicById,
    "queryAllPublic" : queryAllPublic,
    "updateNoticePublicById" : updateNoticePublicById,
    "updateNowviewById" : updateNowviewById,
    "queryPublicByBlur" : queryPublicByBlur,
    "queryPublicByPage" : queryPublicByPage,
    "deletePublicById" : deletePublicById,
    "updatePublicConById" : updatePublicConById,
    "updatePublicById" : updatePublicById,
    "deleteAllPublic" : deleteAllPublic
}
