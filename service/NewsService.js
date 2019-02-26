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


module.exports = {
    "insertNews": insertNews,
    "queryAllNews" : queryAllNews,
    "queryNewsById" : queryNewsById,
    "queryNewsByViews" : queryNewsByViews,
    "addViews" : addViews,
    "queryAll" : queryAll
}
