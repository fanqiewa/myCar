var dbutil = require("./DButil");


function insertCategory(category_name,success) {
    var insertSql = "insert into category (`category_name`) values ( ? );";
    var params = [category_name];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryAllCategory(success) {
    var querySql = "select * from category";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}




module.exports.insertCategory = insertCategory;
module.exports.queryAllCategory = queryAllCategory;

