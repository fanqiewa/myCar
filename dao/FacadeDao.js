var dbutil = require("./DButil");


//添加
function insertFacade(product_id,facade_title,facade_image,product_introduction,facade_ctime,facade_utime,success) {
    var insertSql = "insert into facade (`product_id`,`facade_title`,`facade_image`,`facade_introduction`,`facade_ctime`,`facade_utime`) values ( ?, ?, ?, ?, ?, ?);";
    var params = [product_id,facade_title,facade_image,product_introduction,facade_ctime,facade_utime];
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
function queryFacadeById(product_id,success) {
    var querySql = "select * from facade where product_id = ?";
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




module.exports.insertFacade = insertFacade;
module.exports.queryFacadeById = queryFacadeById;
