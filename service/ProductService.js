var productDao = require("../dao/ProductDao");


//添加
function insertProduct(category_name,category_price,category_describe,category_version,category_image,product_introduction,product_ctime,product_utime,success) {
    productDao.insertProduct(category_name,category_price,category_describe,category_version,category_image,product_introduction,product_ctime,product_utime,success);
}

//根据Id查询产品

function queryProductById(id,success) {
    productDao.queryProductById(id,success)
}



//根据类别和version查询，看看是否存在
function queryProductByVersion(category_name,product_version,success) {
    productDao.queryProductByVersion(category_name,product_version,success)
}

//查询全部product
function queryAllProduct(success) {
    productDao.queryAllProduct(success);
}

//根据类别查询Product
function queryProductByCategory(category_name,success) {
    productDao.queryProductByCategory(category_name,success)
}

module.exports = {
    "insertProduct" : insertProduct,
    "queryProductById" : queryProductById,
    "queryProductByVersion" : queryProductByVersion,
    "queryAllProduct" : queryAllProduct,
    "queryProductByCategory" : queryProductByCategory
}
