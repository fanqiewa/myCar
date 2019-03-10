
var dbutil = require("./DButil");

//查询所有动态公告
function queryNewPublic(success) {
    var querySql = "select * from public where public_notice = 1 order by id desc";
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

//更新动态

function updateNoticePublic(id,success) {
    var updateSql = "update public set public_notice = 0 where id =" + id;
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

//把nowview的值赋给lastview
function updateLastviewPublic(num,id,success) {
    var updateSql = "update public set public_lastview = ? where id = ?";
    var params = [num,id];
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

//根据id查询公告
function queryPublicById(id,success) {
    var querySql = "select public_nowview,public_lastview from public where id = ?";
    var params = [id];
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


module.exports.queryNewPublic = queryNewPublic;
module.exports.updateNoticePublic = updateNoticePublic;
module.exports.updateLastviewPublic = updateLastviewPublic;
module.exports.queryPublicById = queryPublicById;
