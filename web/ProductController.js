var productService = require("../service/ProductService");
var versionService = require("../service/VersionService");
var respUtil = require(".././util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");

var path = new Map();

//添加
function addProduct(request,response) {
    var params = url.parse(request.url,true).query;
    var imagePath = request.file.path.substring(5);
    var content = request.body.content;
    //先查询category和version，看看存不存在
    productService.queryProductByVersion(params.category_name,params.product_version,function (result) {
        if(result.length > 0 ) {
            console.log(222)
            response.writeHead(200);
            response.write(respUtil.writeResult("success","该车型已存在","null"));
            response.end();
        } else {
            productService.insertProduct(params.category_name,params.product_price,params.product_describe,params.product_version,imagePath,content,timeUtil.getNow(),timeUtil.getNow(),function (result) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success","添加成功","null"));
                response.end();
                versionService.queryVersionByVersion(params.product_version,function (result) {
                    if(result == null || result.length == 0) {
                        versionService.insertVersion(params.product_version,function (result) {

                        })
                    }
                })
            })
        }
    })

}

//查询根据id查询产品

function queryProductById(request,response) {
    var params = url.parse(request.url,true).query;
    productService.queryProductById(params.id,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

//查询全部product
function queryAllProduct(request,response) {
    productService.queryAllProduct(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

//根据类别查询product
function queryProductByCategory(request,response) {
    var params = url.parse(request.url,true).query;
    productService.queryProductByCategory(params.category_name,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}


path.set("/addProduct",addProduct);
path.set("/queryProductById",queryProductById);
path.set("/queryAllProduct", queryAllProduct);
path.set("/queryProductByCategory", queryProductByCategory);

module.exports.path = path;
