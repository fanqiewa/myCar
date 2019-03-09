var userService = require("../service/UserService")
var respUtil = require(".././util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");
var captcha = require("svg-captcha");


var path = new Map();

//验证码
function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34,color: true,noise:2});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "获取成功", img));
    response.end();
}

//查询用户登录

function queryUser(request,response) {
    var params = url.parse(request.url,true).query;
    userService.queryUser(params.username,params.password,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

function getCookie(request,response,next) {
    var username = request.cookies.username;
    var password = request.cookies.password;
    userService.queryUser(username,password,function (result) {
        if(result.length > 0) {
            next();
        }else {
            response.writeHead(200);
            response.write(respUtil.writeResult("false","Fail",result));
            response.end();
        }
    })
}


path.set("/queryRandomCode", queryRandomCode);
path.set("/queryUser", queryUser);
path.set("/getCookie", getCookie);

module.exports.path = path;
