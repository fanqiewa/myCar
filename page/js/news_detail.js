(function ($) {
    var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
    if(searchUrlParams == "") {
        return;
    }
    var bid = -1;
    for(var i = 0; i < searchUrlParams.length; i ++) {
        if(searchUrlParams[i].split("=")[0] == "bid") {
            try {
               bid = parseInt(searchUrlParams[i].split("=")[1])
            } catch (e) {
                console.log(e)
            }
        }
    }
    $.ajax({
        type:"get",
        url:"/queryNewsById?bid=" + bid,
        success: function (data) {
            var dataList = JSON.parse(data).data;
            renderNews(dataList)
        },
        error: function (error) {
            console.log(error);
        }
    });

    function renderNews(dataList) {
        var time = timestampToTime(dataList[0].news_ctime);
        var str = "<h2 class=\"content_title\">" + dataList[0].news_title + "</h2>\n" +
            "                    <div class=\"content_top\">\n" +
            "                        <span class=\"author\">作者：" + dataList[0].news_author + "</span>\n" +
            "                        <span class=\"time\">时间：" + time + "</span>\n" +
            "                    </div>\n" +
            "                    <div class=\"content_box\">\n" +
            "                        <img src=\"../" + dataList[0].news_image + "\" alt=\"\">\n" +
            "                        <div class=\"content_text\">" + dataList[0].news_content + "</div>\n" +
            "                    </div>";
        $(".wrapper_left").append(str)

    }
    function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + "-";
        D = date.getDate() + ' ';
        return Y + M + D
    };
    var size = 5;
    $.ajax({
        url:"/queryNewsByViews?size=" + size,
        type:"get",
        success: function (data) {
            var dataList = JSON.parse(data).data;
            renderHotNews(dataList);
        },
        error: function (error) {
            console.log(error)
        }
    });
    function renderHotNews(dataList) {
        var len = dataList.length;
        var str = "";

        for(var i = 0; i < len; i++){
            var time = timestampToTime(dataList[i].news_ctime);
            str += "<div class=\"news_category clearfix\">\n" +
                "                            <a href=\"?bid=" + dataList[i].id +"\">" + dataList[i].news_title + "</a>\n" +
                "                            <span>[ "+ time + " ]</span>\n" +
                "                        </div>"
        }
        $(".news_box").append(str);
    }
}($))
