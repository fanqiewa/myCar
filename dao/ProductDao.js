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

//查询全部产品
function queryAllProduct(success) {
    var querySql = "select * from product order by id desc";
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


//根据分页查询
function queryProductByPage(page,pageSize,success) {
    if(page == 1) {
        page = page - 1;
    } else {
        page = page * pageSize - pageSize;
    }
    var querySql = "select * from product order by id desc limit ?, ?";
    var params = [page,pageSize];
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


//根据类别查询产品
function queryProductByCategory(category_name,success) {
    var querySql = "select * from product where category_name = ?";
    var params = [category_name];
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

//根据id删除产品
function deleteProductById(id,success) {
    var deleteSql = "delete from product where id = ?";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(deleteSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

//根据id更新数据
function updateProductById(id,change,value,success) {
    var updateSql = "update product set " + change + "= '" + value + "' where id =" + id;
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

//更新产品简介
function updateProductConById(id,value,success) {
    var updateSql = "update product set product_introduction = '" + value + "' where id =" + id;
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

//模糊查询
function queryProductByBlur(text,success){
    var querySql = "select * from product where category_name like '%"+ text +"%'";
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


//批量删除
function deleteAllProduct (arr,success) {
    var deleteSql = "DELETE FROM product WHERE id IN ("+ arr.toString() +")";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(deleteSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

module.exports.insertProduct = insertProduct;
module.exports.queryProductById = queryProductById;
module.exports.queryProductByVersion = queryProductByVersion;
module.exports.queryAllProduct = queryAllProduct;
module.exports.queryProductByCategory = queryProductByCategory;
module.exports.queryProductByPage = queryProductByPage;
module.exports.deleteProductById = deleteProductById;
module.exports.updateProductById = updateProductById;
module.exports.updateProductConById = updateProductConById;
module.exports.queryProductByBlur = queryProductByBlur;
module.exports.deleteAllProduct = deleteAllProduct;

