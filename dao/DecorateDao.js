var dbutil = require("./DButil");


//添加
function insertDecorate(product_id,decorate_title,decorate_image,decorate_introduction,decorate_ctime,decorate_utime,success) {
    var insertSql = "insert into decorate (`product_id`,`decorate_title`,`decorate_image`,`decorate_introduction`,`decorate_ctime`,`decorate_utime`) values ( ?, ?, ?, ?, ?, ?);";
    var params = [product_id,decorate_title,decorate_image,decorate_introduction,decorate_ctime,decorate_utime];
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


//根据product_id查询
function queryDecorateById(product_id,success) {
    var querySql = "select * from decorate where product_id = ?";
    var params = [product_id];
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




module.exports.insertDecorate = insertDecorate;
module.exports.queryDecorateById = queryDecorateById;
