
(function (layui) {
    var layer = layui.layer;
    $(function () {
        //时间转换函数
        function timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
            D = date.getDate() + ' ';
            return {
                Y: Y,
                M: M,
                D: D
            };
        };

        //查询最新留言
        function queryAllNewSuggest(){
            $.ajax({
                url:"/queryNewSuggest",
                type: "get",
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderNewSuggest(dataList);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }
        //渲染最新留言
        function renderNewSuggest(dataList) {
            var len = dataList.length;
            var str = "";
            for(var i = 0; i < len; i++) {
                var ran = parseInt(Math.random() * 5) + 1;
                // if(i == 4) {
                //     break;
                // }
                dataList[i].suggest_comments = dataList[i].suggest_comments.substring(0,15);
                if(dataList[i].suggest_comments.length >= 15) {
                    dataList[i].suggest_comments +=  "...";
                }
                var time = timestampToTime(dataList[i].suggest_ctime);
                str += "  <li class='getAttr-s' data-s='"+ dataList[i].id +"'>\n" +
                    "                                    <a class=\"clearfix\" href=\"#\">\n" +
                    "                                        <img src=\"img/"+ ran +".jpg\" alt=\"User Avatar\">\n" +
                    "                                        <div class=\"detail\">\n" +
                    "                                            <strong>"+ dataList[i].suggest_name +"</strong>\n" +
                    "                                            <p class=\"no-margin\">\n" +
                    "                                               "+ dataList[i].suggest_comments +"\n" +
                    "                                            </p>\n" +
                    "                                            <small class=\"text-muted\"><i class=\"fa fa-check text-success\"></i>"+ time.Y + "year-"+ time.M+ "-month-"+ time.D +"-day</small>\n" +
                    "                                        </div>\n" +
                    "                                    </a>\n" +
                    "                                </li>";

            }
            var viewAllStr = "<li><a href=\"#\">View all messages</a></li>"

            $(".suggest").text(len);
            $(".sug_list").append(str).append(viewAllStr)

        }

        //查询全部留言
        function queryAllSuggest() {
            $.ajax({
                url:"/queryAllSuggest",
                type:"get",
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderAllSuggest(dataList);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }

        //渲染全部浏览数量
        function renderAllSuggest(dataList) {
            var len = dataList.length;
            $(".allSuggest").text(len)
        }

        //查询最新被浏览过的公告

        function queryNewPublic() {
            $.ajax({
                url: "/queryNewPublic",
                type: "get",
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderNewPublic(dataList)
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }
        //渲染最金被浏览过的公告
        function renderNewPublic(dataList) {
            var len = dataList.length;
            var str = "";
            for(var i = 0; i < len; i ++) {
                var classStr = "";
                var ran = parseInt(Math.random() * 3) + 1;
                if( ran == 1 ) {
                    classStr = "fa-bolt";
                }else if(ran == 2) {
                    classStr = "fa-plus";
                } else if(ran == 3) {
                    classStr = "fa-warning";
                }
                dataList[i].public_title = dataList[i].public_title.substring(0,10);
                if(dataList[i].public_title.length >= 10) {
                    dataList[i].public_title +=  "...";
                }
                var views = dataList[i].public_nowview - dataList[i].public_lastview;
                str += "  <li data-p=\'"+ dataList[i].id +"\' class='getAttr-p'>\n" +
                    "                                    <a href=\"#\">\n" +
                    "\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"notification-icon bg-success\">\n" +
                    "\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa "+ classStr +"\"></i>\n" +
                    "\t\t\t\t\t\t\t\t\t\t\t\t</span>\n" +
                    "                                        <span class=\"m-left-xs\">"+ dataList[i].public_title +"</span>\n" +
                    "                                        <span class=\"time text-muted\">view rise"+ views +"</span>\n" +
                    "                                    </a>\n" +
                    "                                </li>"
            };

            var viewAllstr = "<li><a href=\"#\">View all notifications</a></li>\n";

            $(".public").text(len);
            $(".pub_list").append(str).append(viewAllstr);
        }

        //点击公告，设置public_notice为0,设置lastview等于nowview
        window.onload =  function updatePublic() {
            var obj = {
                init: function () {
                    this.getAttrOne();
                    this.getAttrTwo();
                },
                getAttrOne: function () {
                    var liList = $(".getAttr-p");
                    var len = liList.length;
                    for(var i = 0; i < len; i ++ ) {
                        (function (j) {
                            $(liList[j]).on("click",function (e) {
                                var id = $(this).attr("data-p");//获取id
                                console.log(id)
                                var _self = this;
                                $.ajax({
                                    url:"/updateNoticePublic?id=" + id,
                                    type: "get",
                                    success: function(data) {
                                        var listData = JSON.parse(data)
                                        var msg = listData.msg;
                                        var view = listData.data.public_nowview - listData.data.public_lastview;
                                        if(msg == "查询成功") {
                                            layer.alert('距离上次查看，该公告被浏览热度增加' + view, {icon: 6});
                                        }
                                        var num = $($(".public")[0]).text();
                                        $(".public").text(num - 1)
                                        $(_self).remove();
                                    },
                                    error: function (error) {
                                        console.log(error)
                                    }
                                })
                            })
                        }(i))
                    }
                },
                getAttrTwo: function (){
                    var liList = $(".getAttr-s")
                    var len = liList.length;
                    for(var i = 0; i < len; i ++ ) {
                        (function (j) {
                            $(liList[j]).on("click",function (e) {
                                var id = $(this).attr("data-s");//获取id
                                var _self = this;
                                $.ajax({
                                    url:"/updateNoticeById?id=" + id,
                                    type: "get",
                                    success: function(data) {

                                        var listData = JSON.parse(data);
                                        var msg = listData.msg;
                                        var name = listData.data[0].suggest_name;
                                        var comments = listData.data[0].suggest_comments;
                                        if(msg == "查询成功") {
                                            layer.alert(comments, {title:"游客："+ name +"  留下了一条信息",icon: 6});
                                        }
                                        var num = $($(".suggest")[0]).text();
                                        $(".suggest").text(num - 1)
                                        $(_self).remove();
                                    },
                                    error: function (error) {
                                        console.log(error)
                                    }
                                })
                            })
                        }(i))
                    }
                }
            }
            obj.init()

        }

        //查询用户图像
        function queryUser() {
            var arr = document.cookie.split(";");
            var username = "";
            var password = "";
            for ( var i = 0; i < arr.length; i++) {
                var newArr = arr[i].split("=");

                if (newArr[0].trim() == "username"){
                    username = newArr[1];
                }
                if(newArr[0].trim() == "password") {
                    password = newArr[1];
                }
            }
            $.ajax({
                url: "/queryUser?username=" + username + "&password=" + password,
                type: "get",
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderUser(dataList);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }
        function renderUser(dataList) {
            var src = dataList[0].image.split("++")[0];
            var originPassword =  dataList[0].password;
            var str = "<a href=\"#\" id=\"userToggle\" data-toggle=\"dropdown\">\n" +
                "                            <img src=\""+ src +"\" alt=\"\" class=\"img-circle inline-block user-profile-pic\">\n" +
                "                            <div class=\"user-detail inline-block\">\n" +
                "                                "+ dataList[0].username +"\n" +
                "                                <i class=\"fa fa-angle-down\"></i>\n" +
                "                            </div>\n" +
                "                        </a>\n" +
                "                        <div class=\"panel border dropdown-menu user-panel\">\n" +
                "                            <div class=\"panel-body paddingTB-sm\">\n" +
                "                                <ul>\n" +
                "                                    <li id='changePassword'>\n" +
                "                                        <a href=\"javascript:;\">\n" +
                "                                            <i class=\"fa fa-edit fa-lg\"></i><span class=\"m-left-xs\">修改密码</span>\n" +
                "                                        </a>\n" +
                "                                    </li>\n" +
                "                                    <li>\n" +
                "                                        <a href=\"./login.html\">\n" +
                "                                            <i class=\"fa fa-power-off fa-lg\"></i><span class=\"m-left-xs\">Sign out</span>\n" +
                "                                        </a>\n" +
                "                                    </li>\n" +
                "                                </ul>\n" +
                "                            </div>\n" +
                "                        </div>";
            $("#admin").append(str);
            $("#changePassword").on("click",function () {
                layer.prompt({
                    formType: 1,
                    title: '请输入原始密码'
                }, function(value, index, elem){
                    var password = value;
                    if(password != originPassword) {
                        layer.msg("原始密码错误！请重新输入！")
                    } else {
                        layer.close(index)
                        layer.prompt({
                            formType: 1,
                            title: "请输入新密码"
                        },function (value,index,elem) {
                            var newPassword = value;
                            var id = dataList[0].id;
                            $.ajax({
                                url:"/updatePasswordById?id=" + id + "&password=" + newPassword,
                                type: "get",
                                dataType: "JSON",
                                success: function (data) {
                                    layer.msg(data.msg + ",请重新登录！",{icon:6});
                                    setTimeout(function () {
                                        window.location.href = "./login.html"
                                    },1000)
                                },
                                error: function (error) {
                                    console.log(error)
                                }
                            })
                        })
                    }

                });
            })
        }


        queryAllSuggest();
        queryAllNewSuggest();
        queryNewPublic();
        queryUser();
    })
}(layui))
