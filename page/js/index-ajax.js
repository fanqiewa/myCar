(function ($) {
    var list = {
        init: function () {
            this.news();
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

            function renderNews(data) {
                var str_content = "";
                var str_right = "";
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
               for(var i = 0; i < data.length - 2 ; i ++) {
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
                                                       <a href=\"#\">Read More</a>\n\
                                                   </div>\n\
                                               </div>\n\
                                           </div>";
                }
                for(var i = 2; i < data.length; i ++) {
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
                                                       <a href=\"#\">Read More</a>\n\
                                                   </div>\n\
                                               </div>\n\
                                           </div>";

                }
                $(".news_content").append(str_content);
                $(".news_right").append(str_right);
            }
        }
    }
    list.init()
}($))
