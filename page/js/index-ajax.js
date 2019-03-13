(function ($,layui) {
    var layer = layui.layer;
    var list = {
        init: function () {
            this.news();
            this.suggest();
            this.product();
            this.category();
            this.public();
        },
        news: function () {
            var url = "/queryAllNews";
            $.ajax({
                type:"get",
                url:url,
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderNews(dataList);
                },
                error: function (error) {
                    console.log(error)
                }
            });

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
            function renderNews(data) {
                var str_content = "";
                var str_right = "";
                for (var i = 0; i < data.length; i++){
                    data[i].news_content = data[i].news_content.replace(/<img[\w\W]*">/,"");
                    data[i].news_content = data[i].news_content.replace(/<[^>]+>/g,"");
                    data[i].news_content = data[i].news_content.substring(0,300);
                    if(data[i].news_content.length >= 300) {
                        data[i].news_content +=  "...";
                    }
                }
               for(var i = 0; i < data.length; i ++) {
                   if(i == 2) {
                       break;
                   }
                    var time =  timestampToTime(data[i].news_ctime);
                   str_content += " <div class='artical_info\'>\n\
                                               <div class=\"post_head clearfix\">\n\
                                                   <div class=\"post_head_left_black\">\n\
                                                      <h4>\n\
                                                          <a href=\"/frontstage/news_detail.html?bid="+ data[i].id +"\" target='_blank'> "+ data[i].news_title + "</a>\n\
                                                       </h4>\n\
                                                      <p class=\"author\">\n\
                                                         作者:\n\
                                                           <a href=\"#\">" + data[i].news_author + "</a>\n\
                                                       </p>\n\
                                                   </div>\n\
                                                   <div class=\"post_head_right_white\">\n\
                                                       <span>"+ time.D +"</span>\n\
                                                       <label for=\"\">"+time.Y + time.M +"</label>\n\
                                                   </div>\n\
                                               </div>\n\
                                              <div class=\"post_text\">" + data[i].news_content + "</div>\n\
                                              <div class=\"post_bottom clearfix\">\n\
                                                   <div class=\"post_bottom_left_black\">\n\
                                                       <p>\n\
                                                           <a href=\"\">浏览："+ data[i].news_views + "</a>\n\
                                                       </p>\n\
                                                   </div>\n\
                                                   <div class=\"post_bottom_right_white\">\n\
                                                       <a href=\"/frontstage/news_index.html\" target='_blank'>Read More</a>\n\
                                                   </div>\n\
                                               </div>\n\
                                           </div>";
                }
               for(var i = 2; i < data.length; i ++) {
                        if(i == 4) {
                            break;
                        }
                       var time =  timestampToTime(data[i].news_ctime);
                       str_right += " <div class='artical_info\'>\n\
                                               <div class=\"post_head clearfix\">\n\
                                                   <div class=\"post_head_left_black\">\n\
                                                      <h4>\n\
                                                          <a href=\"/frontstage/news_detail.html?bid=" + data[i].id + "\" target='_blank'> "+ data[i].news_title + "</a>\n\
                                                       </h4>\n\
                                                      <p class=\"author\">\n\
                                                         作者:\n\
                                                           <a href=\"#\">" + data[i].news_author + "</a>\n\
                                                       </p>\n\
                                                   </div>\n\
                                                   <div class=\"post_head_right_white\">\n\
                                                       <span>"+ time.D +"</span>\n\
                                                       <label for=\"\">"+time.Y + time.M +"</label>\n\
                                                   </div>\n\
                                               </div>\n\
                                              <div class=\"post_text\">" + data[i].news_content + "</div>\n\
                                              <div class=\"post_bottom clearfix\">\n\
                                                   <div class=\"post_bottom_left_black\">\n\
                                                       <p>\n\
                                                           <a href=\"\">浏览："+ data[i].news_views + "</a>\n\
                                                       </p>\n\
                                                   </div>\n\
                                                   <div class=\"post_bottom_right_white\">\n\
                                                       <a href=\"/frontstage/news_index.html\" target='_blank'>Read More</a>\n\
                                                   </div>\n\
                                               </div>\n\
                                           </div>";

                }
               $(".news_content").append(str_content);
               $(".news_right").append(str_right);
            }
            var size = 1;
            $.ajax({
                url:"/queryNewsByViews?size=" + size,
                type:"get",
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderHotNews(dataList)
                },
                error: function (error) {
                    console.log(error)
                }
            });
            function renderHotNews(data) {
                var time = timestampToTime(data[0].news_ctime);
                for (var i = 0; i < data.length; i++){
                    data[i].news_content = data[i].news_content.replace(/<img[\w\W]*">/,"");
                    data[i].news_content = data[i].news_content.replace(/<[^>]+>/g,"");
                    data[i].news_content = data[i].news_content.substring(0,300);
                    if(data[i].news_content.length = 300) {
                        data[i].news_content +=  "...";
                    }
                }
                var str = "<a href=\"#\" class=\"post_pic\">\n" +
                    "                        <img src=\"" + data[0].news_image + "\" alt=\"\">\n" +
                    "                    </a>\n" +
                    "                    <div class=\"artical_info\">\n" +
                    "                        <div class=\"post_head clearfix\">\n" +
                    "                            <div class=\"post_head_left\">\n" +
                    "                                <h4>\n" +
                    "                                    <a href=\"/frontstage/news_detail.html?bid="+ data[0].id +"\" target='_blank'>" + data[0].news_title + "</a>\n" +
                    "                                </h4>\n" +
                    "                                <p class=\"author\">\n" +
                    "                                    By\n" +
                    "                                    <a href=\"#\">" + data[0].news_author + "</a>\n" +
                    "                                </p>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"post_head_right\">\n" +
                    "                                <span>"+ time.D +"</span>\n" +
                    "                                <label for=\"\">"+ time.Y + time.M +"</label>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                        <div class=\"post_text\">" + data[0].news_content + "</div>\n" +
                    "                        <div class=\"post_bottom clearfix\">\n" +
                    "                            <div class=\"post_bottom_left\">\n" +
                    "                                <p>\n" +
                    "                                    <a href=\"\">浏览：" + data[0].news_views + "</a>\n" +
                    "                                </p>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"post_bottom_right\">\n" +
                    "                                <a href=\"/frontstage/news_index.html\" target='_blank'>Read More</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>";
                $(".news_left").append(str)
            }
        },
        suggest : function () {

            var send_button = $("#send_button");
            send_button.on("click",function () {
                var send_name = $("#send_name").val();
                var send_email = $("#send_email").val();
                var send_message = $("#message").val();
                if(send_name == "" ||send_email == "" || send_message =="" ) {
                    alert("名字或邮箱或评论内容不能为空！请重新输入！");
                    return;
                }
                var realemail = checkemail(send_email);
                if(realemail) {
                    $.ajax({
                        type:"post",
                        url:"/addSuggest?name=" + send_name + "&email=" + realemail + "&comment=" + send_message,
                        success: function (data) {
                            var dataList = JSON.parse(data);
                            alert(dataList.msg);
                            $("#send_name").val("");
                            $("#send_email").val("");
                            $("#message").val("");
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }

            });
            function checkemail(email) {
                var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
                if(!reg.test(email)) {
                    alert("邮箱格式不正确！请重新输入！");
                    return;
                }else {
                    return email;
                }

            }
        },
        product : function() {
            var url = "/queryAllProduct";
            $.ajax({
                type:"get",
                url:url,
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderProduct(dataList);
                },
                error: function (error) {
                    console.log(error)
                }
            });
        },
        category: function() {
            var url = "/queryAllCategory";
            $.ajax({
                url:url,
                type: "get",
                success: function (data) {
                    renderCategory(JSON.parse(data).data)
                },
                error: function (error) {
                    console.log(error)
                }
            });
            function renderCategory(dataList) {
                var str = "";
                var len = dataList.length;
                for( var i = 0; i < len; i ++) {
                    str += "<li>/<span>"+ dataList[i].category_name +"</span></li>\n"
                }
                $(".product_list").append(str);
            }
        },
        public : function () {
            $.ajax({
                url: "/queryAllPublic",
                type: "get",
                success: function (data) {
                    var dataList = JSON.parse(data).data;
                    renderPublic(dataList)
                },
                error: function (error) {
                    console.log(error)
                }
            });
            function renderPublic(dataList) {
                var len = dataList.length;
                var str = "";
                for(var i = 0; i < len; i ++) {
                    str += " <li class='scroll_li' data='"+ dataList[i].id +"' style=\"height: 23px; line-height: 23px; overflow: hidden;\">\n" +
                        "                                <a href=\"javascript:;\">" + dataList[i].public_title + "</a>\n" +
                        "                            </li>"
                };
                $(".scroll-con").append(str);
                var liList = $(".scroll_li");
                var len = liList.length;
                for(var i = 0; i < len; i ++) {
                    (function (j) {
                        var id = $(liList[i]).attr("data");
                        $(liList[i]).on("click", function (e) {
                          $.ajax({
                              url: "/updateNoticePublicById?id=" + id,
                              type: "get",
                              success: function (data) {
                                  var dataList = JSON.parse(data).data;
                                  layer.alert(dataList[0].public_content,{title:"最新公告!",icon: 6})
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
    }
    list.init();

    //改变product连接样式
    var oSpan =  $(".product_list");
    oSpan.on("click","li",function (e) {
        oSpan.find("li span").removeClass("active");
        $(this).find("span").addClass("active");
        var spanText = $(e.target).text();
        if(spanText == "最新产品") {
            $(".product_content_wrapper").html("");
            list.product();
        } else {
            $(".product_content_wrapper").html("");
            queryProductByCategory(spanText);
        }
    })

    //根据条件渲染产品
    function queryProductByCategory(category_name) {
        $.ajax({
            url: "/queryProductByCategory?category_name=" + category_name,
            type: "get",
            success: function(data) {
                renderProduct(JSON.parse(data).data)
            },
            error: function(error){
                console.log(error)
            }
        })
    }
    //根据数据渲染产品
    function renderProduct(dataList){
        var str = "";
        for(var i = 0; i < 3; i ++){
            if(dataList[i] == undefined) {
                break;
            } else {
                str += "<div class=\"col-md-4 col-xs-6 product_box\">\n" +
                    "                        <div class=\"product_box_wrap\">\n" +
                    "                            <div class=\"product_img\">\n" +
                    "                                <img src=\"./"+ dataList[i].product_image +"\" alt=\"\">\n" +
                    "                                <span class=\"bottom-to-top\">\n" +
                    "                                    <h1>"+ dataList[i].product_describe +"</h1>\n" +
                    "                                </span>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"product_describe\">\n" +
                    "                                <h4 class=\"product_title\">"+ dataList[i].category_name +"</h4>\n" +
                    "                                <p>"+ dataList[i].product_version +"</p>\n" +
                    "                                <a href=\"./frontstage/product_detail.html?id="+ dataList[i].id +"\" target='_blank'>Read more</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>"
            }
        }
        $(".product_content_wrapper").append(str);
    }

}($,layui))
