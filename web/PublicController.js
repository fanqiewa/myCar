var publicService = require("../service/publicService");
var timeUtil = require("../util/TimeUtil");
var respUtil = require(".././util/RespUtil");
var url = require("url");


var path = new Map();


//添加公告
function addPublic(request,response) {
    var params = url.parse(request.url,true).query;
    request.on("data",function (data) {
       var  obj=data.toString()
        publicService.insertPublic(params.title,obj,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",result));
            response.end();
        })
    })


}

path.set("/addPublic",addPublic);
//查询被重新浏览过的公告

function queryNewPublic(request,response) {
    // var params = url.parse(request.url,true).query;
    publicService.queryNewPublic(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryNewPublic",queryNewPublic);

//更新动态
function updateNoticePublic(request,response) {
    var params = url.parse(request.url,true).query;
    publicService.updateNoticePublic(params.id,function (result) {
        publicService.queryPublicById(params.id,function (result) {
            var public_nowview = result[0].public_nowview;
            var public_lastview = result[0].public_lastview;
            var _rusult = {"public_nowview" : public_nowview,"public_lastview" : public_lastview}
            publicService.updateLastviewPublic(public_nowview,params.id,function (result) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success","查询成功",_rusult));
                response.end();
            })
        })
    });
}
path.set("/updateNoticePublic",updateNoticePublic);


//查询所有公告

function queryAllPublic(request,response) {
    publicService.queryAllPublic(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","查询成功",result));
        response.end();
    })
}
path.set("/queryAllPublic",queryAllPublic);

//游客查看，更新动态

function updateNoticePublicById(request,response) {
    var params = url.parse(request.url,true).query;
    publicService.updateNoticePublicById(params.id,function (result) {
        publicService.updateNowviewById(params.id,function (result) {
            publicService.queryPublicById(params.id,function (result) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success","查询成功",result));
                response.end();
            })
        })
    })
}
path.set("/updateNoticePublicById",updateNoticePublicById);


//模糊查询
function queryPublicByBlur(request,response) {
    var params = url.parse(request.url,true).query;
    publicService.queryPublicByBlur(params.text,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","查询成功",result,result.length));
        response.end();
    })
}
path.set("/queryPublicByBlur",queryPublicByBlur);


//查询页数
function queryPublicByPage(request,response) {
    var params = url.parse(request.url,true).query;
    publicService.queryAllPublic(function (result) {
        var count = result.length;
        publicService.queryPublicByPage(parseInt(params.page),parseInt(params.limit),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("200","查询成功",result,count));
            response.end();
        })
    })
}


path.set("/queryPublicByPage",queryPublicByPage);

//根据id删除单个公告
function deletePublicById(request,response) {
    var params = url.parse(request.url,true).query;
    publicService.deletePublicById(parseInt(params.id),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","删除成功",result));
        response.end();
    })
}
path.set("/deletePublicById",deletePublicById)

//根据id更新content
function updatePublicConById(request, response) {
    var params = url.parse(request.url,true).query;
    publicService.updatePublicConById(parseInt(params.id),params.content,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","更新成功",result));
        response.end();
    })
}

path.set("/updatePublicConById",updatePublicConById)


//更新很多字段
function updatePublicById(request,response) {
    var params = url.parse(request.url,true).query;
    publicService.updatePublicById(parseInt(params.id),params.change,params.value,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","更新成功",result));
        response.end();
    });
}
path.set("/updatePublicById",updatePublicById);


//删除多行
function deleteAllPublic(request,response) {
    var params = url.parse(request.url,true).query;
    var arr = params.listContentId.split(",");
    publicService.deleteAllPublic(arr,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","删除成功",result));
        response.end();
    })
}

path.set("/deleteAllPublic",deleteAllPublic)

module.exports.path = path;
