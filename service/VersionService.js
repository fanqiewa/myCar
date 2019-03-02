var versionDao = require("../dao/VersionDao");


//添加version

function insertVersion(version,success) {
    versionDao.insertVersion(version,success);
}


//根据version查询version
function queryVersionByVersion(version,success) {
    versionDao.queryVersionByVersion(version,success);
}

//查询全部version

function queryAllVersion(success) {
    versionDao.queryAllVersion(success);
}




module.exports = {
    "insertVersion": insertVersion,
    "queryVersionByVersion" : queryVersionByVersion,
    "queryAllVersion" : queryAllVersion

}
