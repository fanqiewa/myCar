var suggestService = require("../service/suggestService");
var timeUtil = require("../util/TimeUtil");
var respUtil = require(".././util/RespUtil");
var url = require("url");

var path = new Map();

//添加留言
function addSuggest(request,response) {
    var params = url.parse(request.url,true).query;
    suggestService.insertSuggest(params.name,params.email,params.comment,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end();
    })
}
path.set("/addSuggest",addSuggest);

//查询新的留言
function queryNewSuggest(request,response) {
    // var params = url.parse(request.url,true).query;
    suggestService.queryNewSuggest(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryNewSuggest",queryNewSuggest);

//查询所有留言

function queryAllSuggest(request,response) {
    // var params = url.parse(request.url,true).query;
    suggestService.queryAllSuggest(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryAllSuggest",queryAllSuggest);

module.exports.path = path;
