var dbutil = require("./DButil");

//添加新闻
function insertNews(title,author,content,image,ctime,utime,success) {
    var insertSql = "insert into news (`news_title`,`news_author`,`news_content`,`news_image`,`news_ctime`,`news_utime`) values (?, ?, ?, ?, ?, ?)";
    var params = [title,author,content,image,ctime,utime];
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

//查询4条新闻
function queryAllNews(success) {
    var querySql = "select * from news order by id desc limit 0,4";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            alert("查询失败")
            console.log(error)
        }
    })
    connection.end();
}

//查询全部新闻
function queryAll(success) {
    var querySql = "select * from news order by id desc";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            alert("查询失败")
            console.log(error)
        }
    })
    connection.end();
}

//根据ID查询新闻
function queryNewsById(bid,success) {
    var querySql = "select * from news where id = ?";
    var params = [bid];
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

//根据热度查询新闻
function queryNewsByViews(size,success) {
    var querySql = "select * from news order by news_views desc limit ?";
    var params = [size];
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

//更新浏览次数

function addViews(id,success) {
    var updateSql = "update news set news_views = news_views + 1 where id = ?";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql,params,function (error,result) {
        if(error == null){
            success(result)
        }else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports.insertNews = insertNews;
module.exports.queryAllNews = queryAllNews;
module.exports.queryNewsById = queryNewsById;
module.exports.queryNewsByViews =queryNewsByViews;
module.exports.addViews = addViews;
module.exports.queryAll = queryAll;
