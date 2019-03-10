var dbutil = require("./DButil");


//添加评论
function insertSuggest(name,email,message,ctime,utime,success) {
    var insertSql = "insert into suggest (`suggest_name`,`suggest_email`,`suggest_comments`,`suggest_ctime`,`suggest_utime`) values (?, ?, ?, ?, ?)";
    var params = [name,email,message,ctime,utime];
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

//查询所有新评论
function queryNewSuggest(success) {
    var querySql = "select * from suggest where suggest_notice = 1 order by id desc";
    var params = [];
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

//查询评论
function queryAllSuggest(success) {
    var querySql = "select * from suggest order by id desc";
    var params = [];
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

module.exports.insertSuggest = insertSuggest;
module.exports.queryNewSuggest = queryNewSuggest;
module.exports.queryAllSuggest = queryAllSuggest;
