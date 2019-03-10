var publicService = require("../service/publicService");
var timeUtil = require("../util/TimeUtil");
var respUtil = require(".././util/RespUtil");
var url = require("url");


var path = new Map();


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


//把nowview的值赋给lastview
//
// function updataLastviewPublic(request,response) {
//     // var params = url.parse(request.url,true).query;
//     publicService.updataLastviewPublic(num,function (result) {
//         response.writeHead(200);
//         response.write(respUtil.writeResult("success","查询成功",result));
//         response.end();
//     })
// }
// path.set("/updataLastviewPublic",updataLastviewPublic);


module.exports.path = path;
