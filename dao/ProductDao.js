var dbutil = require("./DButil");


//添加
function insertProduct(category_name,category_price,category_describe,category_version,category_image,product_introduction,product_ctime,product_utime,success) {
    var insertSql = "insert into product (`category_name`,`product_price`,`product_describe`,`product_version`,`product_image`,`product_introduction`,`product_ctime`,`product_utime`) values ( ?, ?,?, ?,?, ?,?, ? );";
    var params = [category_name,category_price,category_describe,category_version,category_image,product_introduction,product_ctime,product_utime];
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

//根据id查询产品

function queryProductById(id,success) {
    var querySql = "select * from product where id = ?";
    var params = [id];
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

//根据类别和version查询，看看是否存在

function queryProductByVersion(category_name,product_version,success) {
    var querySql = "select * from product where category_name = ? and product_version = ?";
    var params = [category_name,product_version];
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



module.exports.insertProduct = insertProduct;
module.exports.queryProductById = queryProductById;
module.exports.queryProductByVersion = queryProductByVersion;
