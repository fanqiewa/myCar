(function($){
    //请求数据
    function requestData(){
        $.ajax({
            url:"/queryAll",
            type:"get",
            success: function (data) {
                var dataList = JSON.parse(data).data;
                renderNews(dataList);
            },
            error: function (error) {
                console.log(error)
            }
        });
    }
    function renderNews(data) {
        $(".wrapper .container").html("");
        var str = "";
        var len = data.length;
        for(var i = 0; i < len; i ++) {
            str += "<div class=\"content_box\">\n" +
                "                <a href=\"/frontstage/news_detail.html?bid="+ data[i].id+"\">\n" +
                "                    <div class=\"list_box clearfix\">\n" +
                "                        <div class=\"image_box\">\n" +
                "                            <img src=\"../"+ data[i].news_image +"\" alt=\"\">\n" +
                "                        </div>\n" +
                "                        <div class=\"text_box\">"+ data[i].news_title +"</div>\n" +
                "                    </div>\n" +
                "                </a>\n" +
                "            </div>"
        }
        $(".wrapper .container").append(str)

    }
    requestData();

    //模糊查询数据
    function blurNews() {
        var btn = $(".search_btn");
        var errorCode = $(".input_text");
        errorCode.on("keypress",function (e) {
            if(e.keyCode == 13) {
                btn.trigger("click");
            }
        })
        btn.on("click",function (e) {
            var blurText = $(".input_text").val();
            if(blurText == "") {
                requestData();
            } else {
                queryBlurNews(blurText);
            }
        })
        function queryBlurNews(blurText) {
            $.ajax({
                url: "/queryNewsByBlur?text=" + blurText,
                type: "get",
                success: function(data) {
                    if(JSON.parse(data).data.length == 0) {
                        $(".wrapper .container").html("");
                        var str = "<div style='text-align: center'>对不起，没有搜索到类似的新闻！</div>";
                        $(".wrapper .container").append(str)
                    } else {
                        renderNews(JSON.parse(data).data)
                    }

                },
                error: function(error) {
                    console.log(error)
                }

            })
        }
    }
    blurNews();

}($))
