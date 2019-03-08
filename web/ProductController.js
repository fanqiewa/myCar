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
    // 先查询category和version，看看存不存在
    productService.queryProductByVersion(params.category_name,params.product_version,function (result) {
        if(result.length > 0 ) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","该车型已存在,请重新选择！","null"));
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

//根据Page查询

function queryProductByPage(request,response) {
    var params = url.parse(request.url,true).query;
    productService.queryAllProduct(function (result) {
        var count = result.length;
        productService.queryProductByPage(parseInt(params.page),parseInt(params.limit),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("200","查询成功",result,count));
            response.end();
        })
    })
}

//根据id删除
function deleteProductById(request,response) {
    var params = url.parse(request.url,true).query;
    productService.deleteProductById(parseInt(params.id),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","删除成功",result));
        response.end();
    })
}

//更新作者
function updateProductById(request,response) {
    var params = url.parse(request.url,true).query;
    productService.updateProductById(parseInt(params.id),params.change,params.value,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","更新成功",result));
        response.end();
    })
}
path.set("/updateProductById",updateProductById)

//更新简介

function updateProductConById(request,response) {
    var params = url.parse(request.url,true).query;
    productService.updateProductConById(parseInt(params.id),params.content,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","更新成功",result));
        response.end();
    })
}


//模糊查询
function queryProductByBlur(request,response) {
    var params = url.parse(request.url,true).query;
    productService.queryProductByBlur(params.text,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","查询成功",result,result.length));
        response.end();
    })

};

//删除多行
function deleteAllProduct(request,response) {
    var params = url.parse(request.url,true).query;
    var arr = params.listContentId.split(",");
    productService.deleteAllProduct(arr,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200","删除成功",result));
        response.end();
    })
}

path.set("/addProduct",addProduct);
path.set("/queryProductById",queryProductById);
path.set("/queryAllProduct", queryAllProduct);
path.set("/queryProductByCategory", queryProductByCategory);
path.set("/queryProductByPage", queryProductByPage);
path.set("/deleteProductById", deleteProductById);
path.set("/updateProductConById", updateProductConById);
path.set("/queryProductByBlur", queryProductByBlur);
path.set("/deleteAllProduct", deleteAllProduct);

module.exports.path = path;
