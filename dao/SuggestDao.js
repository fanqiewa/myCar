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

module.exports.insertSuggest = insertSuggest;
