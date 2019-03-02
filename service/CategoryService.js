var categoryDao = require("../dao/CategoryDao");

function insertCategory(category_name,success) {
    categoryDao.insertCategory(category_name,success);
}

//查询
function queryAllCategory(success) {
    categoryDao.queryAllCategory(success);
}



module.exports = {
    "insertCategory" : insertCategory,
    "queryAllCategory" : queryAllCategory
}


