var categoryService = require("../service/CategoryService");
var respUtil = require(".././util/RespUtil");
var url = require("url");


var path = new Map();

//添加
function addCategory(request,response) {
    var params = url.parse(request.url,true).query;
    categoryService.insertCategory(params.name,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功","null"));
        response.end();
    })
}

//查询
function queryAllCategory(request,response) {
    categoryService.queryAllCategory(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/addCategory",addCategory);
path.set("/queryAllCategory",queryAllCategory);

module.exports.path = path;
