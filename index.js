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
var uploadSingle6 = multer({
    storage: multerConfig.storage6
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

//添加用户
app.post("/addUser",uploadSingle6.array("file",3),loader.get("/addUser"))


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
app.get("/queryAllCategory",loader.get("/queryAllCategory"));

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
//查询新的评论
app.get("/queryNewSuggest",loader.get("/queryNewSuggest"));
//查询所有评论
app.get("/queryAllSuggest",loader.get("/queryAllSuggest"));
//更新评论notice
app.get("/updateNoticeById",loader.get("/updateNoticeById"));
//根据page查询
app.get("/api/querySuggestByPage",loader.get("/querySuggestByPage"));
//删除评论
app.get("/deleteSuggestById",loader.get("/deleteSuggestById"));

//滚动通知

//添加公告
app.post("/addPublic",loader.get("/addPublic"));
//查询被重新浏览过的公告
app.get("/queryNewPublic",loader.get("/queryNewPublic"));
//更新动态
app.get("/updateNoticePublic",loader.get("/updateNoticePublic"));
//查询所有公告
app.get("/queryAllPublic",loader.get("/queryAllPublic"));
//游客访问，更新动态
app.get("/updateNoticePublicById",loader.get("/updateNoticePublicById"));
//模糊查询
app.get("/queryPublicByBlur",loader.get("/queryPublicByBlur"));
//查询页数
app.get("/api/queryPublicByPage", loader.get("/queryPublicByPage"));
//删除单个数据
app.get("/deletePublicById", loader.get("/deletePublicById"));
//根据id更新公告content
app.get("/updatePublicConById",loader.get("/updatePublicConById"));
//根据id更新很多内容
app.post("/updatePublicById", loader.get("/updatePublicById"));
//删除多行
app.get("/deleteAllPublic",loader.get("/deleteAllPublic"));

//获取验证码
app.get("/queryRandomCode",loader.get("/queryRandomCode"));
//查询登录
app.get("/queryUser",loader.get("/queryUser"));
//修改密码
app.get("/updatePasswordById",loader.get("/updatePasswordById"));




app.listen(globalConfig.port,function () {
    console.log("服务器已启动");
})
