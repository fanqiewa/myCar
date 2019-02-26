var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var multer = require("multer");

var app = new express();
// var uploadSingle = multer({dest:"./file/"})

var storage = multer.diskStorage({
    //设置上传后文件路径
    destination: function (req, file, cb) {
        cb(null, './page/public/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var uploadSingle = multer({
    storage: storage
})

app.use(express.static("./page/"))

//添加新闻
app.post("/addNews",uploadSingle.single("file"),loader.get("/addNews"));

//查询全部新闻
app.get("/queryAllNews",loader.get("/queryAllNews"));
//根据ID查询新闻
app.get("/queryNewsById",loader.get("/queryNewsById"));
//根据热度查询新闻
app.get("/queryNewsByViews",loader.get("/queryNewsByViews"));
//查询全部新闻
app.get("/queryAll",loader.get("/queryAll"));


//添加评论
app.post("/addSuggest",loader.get("/addSuggest"));


app.listen(globalConfig.port,function () {
    console.log("服务器已启动");
})
