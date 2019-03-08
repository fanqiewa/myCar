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

//根据Page查询
function queryProductByPage(page,pageSize,success) {
    productDao.queryProductByPage(page,pageSize,success)
}

//根据id删除产品
function deleteProductById(id,success) {
    productDao.deleteProductById(id,success)
}

//根据id更新作者
function updateProductById(id,change,value,success) {
    productDao.updateProductById(id,change,value,success)
}

//根据Id更新产品简介
function updateProductConById(id,value,success){
    productDao.updateProductConById(id,value,success)
}

//模糊查询
function queryProductByBlur(text,success){
    productDao.queryProductByBlur(text,success)
}

//批量删除
function deleteAllProduct(arr,success) {
    productDao.deleteAllProduct(arr,success)
}


module.exports = {
    "insertProduct" : insertProduct,
    "queryProductById" : queryProductById,
    "queryProductByVersion" : queryProductByVersion,
    "queryAllProduct" : queryAllProduct,
    "queryProductByCategory" : queryProductByCategory,
    "queryProductByPage" : queryProductByPage,
    "deleteProductById" : deleteProductById,
    "updateProductConById" : updateProductConById,
    "updateProductById" : updateProductById,
    "queryProductByBlur" : queryProductByBlur,
    "deleteAllProduct" : deleteAllProduct
}
