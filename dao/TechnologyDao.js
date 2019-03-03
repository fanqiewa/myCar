var dbutil = require("./DButil");


//添加
function insertTechnology(product_id,technology_title,technology_image,technology_introduction,technology_ctime,technology_utime,success) {
    var insertSql = "insert into technology (`product_id`,`technology_title`,`technology_image`,`technology_introduction`,`technology_ctime`,`technology_utime`) values ( ?, ?, ?, ?, ?, ?);";
    var params = [product_id,technology_title,technology_image,technology_introduction,technology_ctime,technology_utime];
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
function queryTechnologyById(product_id,success) {
    var querySql = "select * from technology where product_id = ?";
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




module.exports.insertTechnology = insertTechnology;
module.exports.queryTechnologyById = queryTechnologyById;
