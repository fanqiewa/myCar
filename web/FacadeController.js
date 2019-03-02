var facadeService = require("../service/FacadeService");
var productService = require("../service/ProductService")
var respUtil = require(".././util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");

var path = new Map();


function addFacade(request,response){
    var params = url.parse(request.url,true).query;
    // var imagePath = request.file.path.substring(5);
    // var content = request.body.content;
    productService.queryProductByVersion(params.category_name,params.product_version,function (result) {
        if(result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","该车型不存在，请重新选择",null));
            response.end();
        } else {
            console.log("哈哈" )
        }
    })

    // facadeService.insertFacade(product_id,params.facade_title,params.facade_name,imagePath,content,content,function (result) {
    //     response.writeHead(200);
    //     response.write(respUtil.writeResult("success","添加成功",null));
    //     response.end();
    // })
}




path.set("/addFacade",addFacade);


module.exports.path = path;
