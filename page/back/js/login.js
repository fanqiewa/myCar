(function ($) {

    //清除所有cookie

    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        console.log(exp.toGMTString())
        var cval=getCookie(name);
        if(cval!=null){
            document.cookie= name + "="+cval+";max-age= -1" + ";path=/";
        }
    }
    function getsec(str) {
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
            return str1*1000;
        }
        else if (str2=="h")
        {
            return str1*60*60*1000;
        }
        else if (str2=="d")
        {
            return str1*24*60*60*1000;
        }
    }
    //这是有设定过期时间的使用示例：
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30


    function setCookie(name,value,time,path) {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = name + "="+  value + ";expires=" + exp.toGMTString() + ";path=" + path;
    }
    delCookie("username");
    delCookie("password");





    layui.use(['layer'], function(){
        var layer = layui.layer;
        var list = {
            init: function () {
                this.changeCode();
                this.bindEvent();
            },
            bindEvent: function(){
                $(".comfir_img").on("click",function (e) {
                    this.changeCode();
                }.bind(this));
                $(".submit_btn").on("click",function () {
                    this.sendLand();
                }.bind(this));
                $("#com").on("keypress",function (e) {
                    this.submit(e)
                }.bind(this))
            },
            submit: function(e) {
                if(e.keyCode == 13) {
                    $(".submit_btn").trigger("click");
                }
            },
            text:{
                rightCode:""
            },
            changeCode: function () {
                $.ajax({
                    url: "/queryRandomCode",
                    type: "get",
                    success:function (data) {
                        console.log(JSON.parse(data).data.text.toLowerCase())
                        var img = JSON.parse(data).data.data;
                        list.text.rightCode = JSON.parse(data).data.text.toLowerCase();
                        $(".comfir_img"). html("").append(img)
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            sendLand: function () {
                var code = document.getElementById("com").value.toLowerCase();
                if(code == this.text.rightCode) {
                    var username = $("#username").val();
                    var password = $("#password").val();
                    $.ajax({
                        url:"/queryUser?username=" + username + "&password=" + password,
                        type: "get",
                        success: function (data) {
                            var dataList = JSON.parse(data);
                            if(dataList.data <= 0) {
                                layer.msg("用户名不存在或密码错误！");
                                $("#com").val("");
                                $("#password").val("");
                                $("#username").val("");
                            }else {
                                var username = dataList.data[0].username;
                                var password = dataList.data[0].password;
                                setCookie("username",username,"d1","/");
                                setCookie("password",password,"d1","/");
                                // document.cookie= "username="+password + ";path=/";
                                // document.cookie= "password=" + password + ";path=/";
                                layer.msg("登录成功！",{icon:6});
                                setTimeout(function () {
                                    window.location.href = "./back_newsList.html"
                                },1000)
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                } else {
                    layer.msg("验证码不正确，请重新输入！！");
                    $("#com").val("");
                }
            }
        }
        list.init()

    });

}($))
