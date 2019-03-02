var facadeDao = require("../dao/FacadeDao");


//添加

function insertFacade(product_id,facade_title,facade_image,product_introduction,facade_ctime,facade_utime,success) {
    facadeDao.insertFacade(product_id,facade_title,facade_image,product_introduction,facade_ctime,facade_utime,success);
}

module.exports = {
    "insertFacade": insertFacade
}
