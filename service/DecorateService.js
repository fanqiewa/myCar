var decorateDao = require("../dao/DecorateDao");


//添加

function insertDecorate(product_id,decorate_title,decorate_image,decorate_introduction,decorate_ctime,decorate_utime,success) {
    decorateDao.insertDecorate(product_id,decorate_title,decorate_image,decorate_introduction,decorate_ctime,decorate_utime,success);
}


//根据product_id查询
function queryDecorateById(product_id,success) {
    decorateDao.queryDecorateById(product_id,success);
}


module.exports = {
    "insertDecorate": insertDecorate,
    "queryDecorateById" : queryDecorateById
}
