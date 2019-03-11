
var dbutil = require("./DButil");

//添加公告
function insertPublic(title,content,ctime,utime,success) {
    var insertSql = "insert into public (`public_title`,`public_content`,`public_ctime`,`public_utime`) values (?, ?, ?, ?)";
    var params = [title,content,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}


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

//更新动态,把public_notice变为0，表示管理员已经查看过

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
//更新动态,把public_notice变为1，表示有新的游客查看此条信息
function updateNoticePublicById(id,success) {
    var updateSql = "update public set public_notice = 1 where id =" + id;
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
    var querySql = "select * from public where id = ?";
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


//查询所有公告
function queryAllPublic(success) {
    var querySql = "select * from public order by id desc";
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

//更新public_nowview
function updateNowviewById(id,success) {
    var updateSql = "update public set public_nowview = public_nowview + 1 where id =" + id;
    var params = [id];
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

function queryPublicByBlur(text,success){
    var querySql = "select * from public where public_title like '%"+ text +"%'";
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


// 根据page查询

function queryPublicByPage(page,pageSize,success) {
    if(page == 1) {
        page = page;
    } else {
        page = page * pageSize - pageSize;
    }
    var querySql = "select * from public order by id desc limit ?, ?";
    var params = [page-1,pageSize];
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

//删除一条公告

function deletePublicById(id,success) {
    var deleteSql = "delete from public where id = ?";
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

//根据id更新content
function updatePublicConById(id,value,success) {
    var updateSql = "update public set public_content = '" + value + "' where id =" + id;
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

//根据id更新数据
function updatePublicById(id,change,value,success) {
    var updateSql = "update public set " + change + "= '" + value + "' where id =" + id;
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

//批量删除
function deleteAllPublic (arr,success) {
    var deleteSql = "DELETE FROM public WHERE id IN ("+ arr.toString() +")";
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


module.exports.insertPublic = insertPublic;
module.exports.queryNewPublic = queryNewPublic;
module.exports.updateNoticePublic = updateNoticePublic;
module.exports.updateLastviewPublic = updateLastviewPublic;
module.exports.queryPublicById = queryPublicById;
module.exports.queryAllPublic = queryAllPublic;
module.exports.updateNoticePublicById = updateNoticePublicById;
module.exports.updateNowviewById = updateNowviewById;
module.exports.queryPublicByBlur = queryPublicByBlur;
module.exports.queryPublicByPage = queryPublicByPage;
module.exports.deletePublicById = deletePublicById;
module.exports.updatePublicConById = updatePublicConById;
module.exports.updatePublicById = updatePublicById;
module.exports.deleteAllPublic = deleteAllPublic;
