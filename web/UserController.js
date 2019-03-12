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

//添加用户
function addUser(request,response) {
    var params = url.parse(request.url,true).query;
    var arr = request.files;
    var len = arr.length;
    var path = "";
    for(var i = 0; i < len; i ++) {
        var str = arr[i].path.substring(10);
        if(i == len - 1) {
            path += str;
        }else {
            path += str+ "++";
        }

    }
    userService.queryUserByUsername(params.username,function (result) {
        if(result.length > 0 ) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","用户名已存在","null"));
            response.end();
        } else {
            userService.addUser(params.username,params.password,path,timeUtil.getNow(),timeUtil.getNow(),function (result) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success","添加成功","null"));
                response.end();
            })
        }
    })
}

//更新密码

function updatePasswordById(request,response) {
    var params = url.parse(request.url,true).query;
    userService.updatePasswordById(params.id,params.password,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","修改成功",result));
        response.end();
    })
}

path.set("/queryRandomCode", queryRandomCode);
path.set("/queryUser", queryUser);
path.set("/getCookie", getCookie);
path.set("/addUser", addUser);
path.set("/updatePasswordById", updatePasswordById);

module.exports.path = path;
