var technologyDao = require("../dao/TechnologyDao");


//添加

function insertTechnology(product_id,technology_title,technology_image,technology_introduction,technology_ctime,technology_utime,success) {
    technologyDao.insertTechnology(product_id,technology_title,technology_image,technology_introduction,technology_ctime,technology_utime,success);
}


//根据product_id查询
function queryTechnologyById(product_id,success) {
    technologyDao.queryTechnologyById(product_id,success);
}


module.exports = {
    "insertTechnology": insertTechnology,
    "queryTechnologyById" : queryTechnologyById
}
