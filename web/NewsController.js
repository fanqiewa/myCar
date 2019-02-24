var newsService = require("../service/NewsService");
var timeUtil = require("../util/TimeUtil");
var respUtil = require(".././util/RespUtil");
var url = require("url");

var path = new Map();

//添加新闻
function addNews(request,response) {
    var params = url.parse(request.url,true).query;
    var imagePath = request.file.path.substring(5);
    newsService.insertNews(params.title,params.author,params.content,imagePath,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功","null"));
        response.end();
    })
}

path.set("/addNews",addNews);

// 查询新闻4条
function queryAllNews(request,response) {
    newsService.queryAllNews(function (result) {
        for (var i = 0; i < result.length; i++){
            result[i].news_content = result[i].news_content.replace(/<img[\w\W]*">/,"");
            result[i].news_content = result[i].news_content.replace(/<[^>]+>/g,"");
            result[i].news_content = result[i].news_content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })

};

path.set("/queryAllNews",queryAllNews);

//根据ID查询新闻
function queryNewsById(requset,response) {
    var params = url.parse(requset.url,true).query;
    newsService.queryNewsById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
        newsService.addViews(parseInt(params.bid),function (result) {

        })
    })
}

path.set("/queryNewsById",queryNewsById);

//按热度查询新闻
function queryNewsByViews(requset,response){
    var params = url.parse(requset.url,true).query;
    newsService.queryNewsByViews(parseInt(params.size),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

path.set("/queryNewsByViews",queryNewsByViews);

module.exports.path = path;
