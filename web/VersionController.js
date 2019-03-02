var versionService = require("../service/VersionService");
var timeUtil = require("../util/TimeUtil");
var respUtil = require(".././util/RespUtil");
var url = require("url");

var path = new Map();

function queryAllVersion(request,response){
    versionService.queryAllVersion(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryAllVersion",queryAllVersion);


module.exports.path = path;
