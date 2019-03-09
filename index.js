var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var multer = require("multer");
var multerConfig = require("./multerConfig");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = new express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// var uploadSingle = multer({dest:"./file/"})
var uploadSingle1 = multer({
    storage: multerConfig.storage1
})
var uploadSingle2 = multer({
    storage: multerConfig.storage2
})
var uploadSingle3 = multer({
    storage: multerConfig.storage3
})
var uploadSingle4 = multer({
    storage: multerConfig.storage4
})
var uploadSingle5 = multer({
    storage: multerConfig.storage5
})

app.use(express.static("./page/"))
app.use(cookieParser());


app.get("/api/*",loader.get("/getCookie"))

//添加新闻，上传图片
app.post("/addNews",uploadSingle1.single("file"),loader.get("/addNews"));

//添加产品
app.post("/addProduct",uploadSingle2.single("product_image"),loader.get("/addProduct"));

//添加外观
app.post("/addFacade",uploadSingle3.single("facade_image"),loader.get("/addFacade"));

//添加内饰
app.post("/addDecorate",uploadSingle4.single("decorate_image"),loader.get("/addDecorate"));

//添加科技
app.post("/addTechnology",uploadSingle5.single("technology_image"),loader.get("/addTechnology"));

//查询全部新闻
app.get("/queryAllNews",loader.get("/queryAllNews"));
//根据ID查询新闻
app.get("/queryNewsById",loader.get("/queryNewsById"));
//根据热度查询新闻
app.get("/queryNewsByViews",loader.get("/queryNewsByViews"));
//查询全部新闻
app.get("/queryAll",loader.get("/queryAll"));
//模糊查询新闻
app.get("/queryNewsByBlur",loader.get("/queryNewsByBlur"));
//根据page查询新闻
app.get("/api/queryNewsByPage",loader.get("/queryNewsByPage"));
//根据Id删除新闻
app.get("/deleteNewsById",loader.get("/deleteNewsById"))
//根据id更新作者新闻
app.post("/updateNewsById",loader.get("/updateNewsById"));
//批量删除
app.get("/deleteAllNews",loader.get("/deleteAllNews"));
//更新新闻内容
app.get("/updateNewsConById",loader.get("/updateNewsConById"));


//查询产品类别
app.get("/api/queryAllCategory",loader.get("/queryAllCategory"));

//根据id查询产品
app.get("/queryProductById",loader.get("/queryProductById"));

//查询全部version
app.get("/queryAllVersion",loader.get("/queryAllVersion"));

//根据product_id查询facade
app.get("/queryFacadeById",loader.get("/queryFacadeById"));
//根据product_id查询decorate
app.get("/queryDecorateById",loader.get("/queryDecorateById"))
//根据product_id查询technology
app.get("/queryTechnologyById",loader.get("/queryTechnologyById"));
//查询全部产品
app.get("/queryAllProduct",loader.get("/queryAllProduct"));
//根据类别查询产品
app.get("/queryProductByCategory",loader.get("/queryProductByCategory"));
//根据分页查询
app.get("/api/queryProductByPage",loader.get("/queryProductByPage"));
//根据id删除单行
app.get("/deleteProductById",loader.get("/deleteProductById"));
//更新产品介绍
app.get("/updateProductConById",loader.get("/updateProductConById"));
//更新产品的其他内容
app.post("/updateProductById",loader.get("/updateProductById"));
//模糊查询
app.get("/queryProductByBlur",loader.get("/queryProductByBlur"));
//批量删除
app.get("/deleteAllProduct",loader.get("/deleteAllProduct"));

//添加评论
app.post("/addSuggest",loader.get("/addSuggest"));
//获取验证码
app.get("/queryRandomCode",loader.get("/queryRandomCode"));
//查询登录
app.get("/queryUser",loader.get("/queryUser"));


app.listen(globalConfig.port,function () {
    console.log("服务器已启动");
})
