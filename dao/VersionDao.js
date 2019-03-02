var dbutil = require("./DButil");


//添加
function insertVersion(product_version,success) {
    var insertSql = "insert into version (`product_version`) values (?)";
    var params = [product_version];
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

//根据version查询
function queryVersionByVersion(product_version,success) {
    var querySql = "select * from version where product_version = ?";
    var params = [product_version];
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

//查询全部
function queryAllVersion(success) {
    var querySql = "select * from version";
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



module.exports.insertVersion = insertVersion;
module.exports.queryVersionByVersion = queryVersionByVersion;
module.exports.queryAllVersion = queryAllVersion;
