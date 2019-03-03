var facadeService = require("../service/FacadeService");
var productService = require("../service/ProductService")
var respUtil = require(".././util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");

var path = new Map();


function addFacade(request,response){
    var params = url.parse(request.url,true).query;
    var imagePath = request.file.path.substring(5);
    var content = request.body.content;
    productService.queryProductByVersion(params.category_name,params.product_version,function (result) {
        if(result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","该车型不存在，请重新选择",null));
            response.end();
        } else {
            facadeService.insertFacade(result[0].id,params.facade_title,imagePath,content,timeUtil.getNow(),timeUtil.getNow (),function(result) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success","添加成功",null));
                response.end();
            })
        }
    })


}

//根据product_id查询
function queryFacadeById(request,response) {
    var params = url.parse(request.url,true).query;
    facadeService.queryFacadeById(params.id,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}




path.set("/addFacade",addFacade);
path.set("/queryFacadeById",queryFacadeById);

module.exports.path = path;
