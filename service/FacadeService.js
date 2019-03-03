var facadeDao = require("../dao/FacadeDao");


//添加

function insertFacade(product_id,facade_title,facade_image,product_introduction,facade_ctime,facade_utime,success) {
    facadeDao.insertFacade(product_id,facade_title,facade_image,product_introduction,facade_ctime,facade_utime,success);
}


//根据product_id查询
function queryFacadeById(product_id,success) {
    facadeDao.queryFacadeById(product_id,success);
}


module.exports = {
    "insertFacade": insertFacade,
    "queryFacadeById" : queryFacadeById
}
