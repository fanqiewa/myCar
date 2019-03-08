var newsDao = require("../dao/NewsDao");


//添加新闻
function insertNews(title,author,content,image,ctime,utime,success) {
    newsDao.insertNews(title,author,content,image,ctime,utime,success);
}

//查询全部新闻

function queryAllNews(success) {
    newsDao.queryAllNews(success);
}

//根据ID查询新闻
function queryNewsById(bid,success) {
    newsDao.queryNewsById(bid,success)
}

//根据热度查询新闻
function queryNewsByViews(size,success){
    newsDao.queryNewsByViews(size,success);
}

//查询全部新闻
function queryAll(success) {
    newsDao.queryAll(success);
}

//更新浏览次数
function addViews(id,success) {
    newsDao.addViews(id,success);
}


//模糊查询
function queryNewsByBlur(text,success){
    newsDao.queryNewsByBlur(text,success)
}

//根据page查询
function queryNewsByPage(page, pageSize,success) {
    newsDao.queryNewsByPage(page,pageSize,success)
}

//根据id删除新闻

function deleteNewsById(id,success) {
    newsDao.deleteNewsById(id,success)
}

//根据id更新作者
function updateNewsById(id,change,value,success) {
    newsDao.updateNewsById(id,change,value,success)
}
//批量删除
function deleteAllNews(arr,success) {
    newsDao.deleteAllNew(arr,success)
}

function updateNewsConById(id,value,success) {
    newsDao.updateNewsConById(id,value,success);
}

module.exports = {
    "insertNews": insertNews,
    "queryAllNews" : queryAllNews,
    "queryNewsById" : queryNewsById,
    "queryNewsByViews" : queryNewsByViews,
    "addViews" : addViews,
    "queryAll" : queryAll,
    "queryNewsByBlur" : queryNewsByBlur,
    "queryNewsByPage": queryNewsByPage,
    "deleteNewsById" : deleteNewsById,
    "updateNewsById" : updateNewsById,
    "deleteAllNews" : deleteAllNews,
    "updateNewsConById" : updateNewsConById

}
