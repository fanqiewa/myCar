(function($){
    var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
    if(searchUrlParams == "") {
        return;
    }
    var bid = -1;
    for(var i = 0; i < searchUrlParams.length; i ++) {
        if(searchUrlParams[i].split("=")[0] == "id") {
            try {
                bid = parseInt(searchUrlParams[i].split("=")[1])
            } catch (e) {
                console.log(e)
            }
        }
    }
    var list = {
        init: function(){
          this.welcome();
          this.facade();
          this.decorate();
          this.technology();
        },
        welcome : function () {
            $.ajax({
                type:"get",
                url:"/queryProductById?id=" + bid,
                success : function (data) {
                    renderWelcome(JSON.parse(data).data)
                },
                error: function (error) {
                    console.log(error)
                }
            })
        },
        facade: function () {
            $.ajax({
                type:"get",
                url:"/queryFacadeById?id=" + bid,
                success : function (data) {
                    renderFacade(JSON.parse(data).data);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        },
        decorate: function () {
            $.ajax({
                type:"get",
                url:"/queryDecorateById?id=" + bid,
                success : function (data) {
                    renderDecorate(JSON.parse(data).data);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        },
        technology: function () {
            $.ajax({
                type:"get",
                url:"/queryTechnologyById?id=" + bid,
                success : function (data) {
                    renderTechnology(JSON.parse(data).data);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }
    }
    list.init();

    function renderWelcome(dataList) {
        var str = "";
        var len = dataList.length;
        for (var i = 0; i < len; i++){
            dataList[i].product_introduction = dataList[i].product_introduction.replace(/<img[\w\W]*">/,"");
            dataList[i].product_introduction = dataList[i].product_introduction.replace(/<[^>]+>/g,"");
            dataList[i].product_introduction = dataList[i].product_introduction.substring(0,300);
        }
        for(var i = 0; i < len; i ++) {
            str += "<div class=\"col-md-6 wel_left\">\n" +
                "                <h3>Welcome</h3>\n" +
                "                <span></span>\n" +
                "                <h4>简介：</h4>\n" +
                "                <div class=\"text\"> " + dataList[i].product_introduction +"</div>" +
                "                <a href=''>Read More</a>\n" +
                "            </div>\n" +
                "            <div class=\"col-md-6 wel_right\">\n" +
                "                <h2>" + dataList[i].category_name + "</h2>\n" +
                "                <span>型号: " + dataList[i].product_version + "</span>\n" +
                "                <img src=\"../"+ dataList[i].product_image +"\" alt=\"\">\n" +
                "                <h3>" + dataList[i].product_describe + "</h3>\n" +
                "            </div>"
        }
        $(".wel_top").append(str)
    };
    function renderFacade(dataList) {
        var str = "";
        var len = dataList.length;
        for(var i = 0; i < len; i ++) {
            str += " <div class=\"col-md-4 facade_img\">\n" +
                "                <img src=\"../"+ dataList[i].facade_image +"\" alt=\"\">\n" +
                "                <div class=\"facade_text\">\n" +
                "                    <h4>"+ dataList[i].facade_title +"</h4>\n" +
                "                    <span>"+ dataList[i].facade_introduction +"</span>\n" +
                "                </div>\n" +
                "            </div>"
        }
        $(".facade_top").append(str);
    };
    function renderDecorate(dataList) {
        var str = "";
        var len = dataList.length;
        for(var i = 0; i < len; i ++) {
            str += " <div class=\"col-md-4 decorate_img\">\n" +
                "                <img src=\"../"+ dataList[i].decorate_image +"\" alt=\"\">\n" +
                "                <div class=\"decorate_text\">\n" +
                "                    <h4>"+ dataList[i].decorate_title +"</h4>\n" +
                "                    <span>"+ dataList[i].decorate_introduction +"</span>\n" +
                "                </div>\n" +
                "            </div>"
        }
        $(".decorate_top").append(str);
    };
    function renderTechnology(dataList) {
        var str = "";
        var len = dataList.length;
        for(var i = 0; i < len; i ++) {
            str += "<div class=\"col-md-4 technology_img\">\n" +
                "                <div class='hidden_img'><img src=\"../"+ dataList[i].technology_image +"\" alt=\"\"></div>\n" +
                "                <div class=\"technology_text\">\n" +
                "                    <h4>"+ dataList[i].technology_title +"</h4>\n" +
                "                    <span>"+ dataList[i].technology_introduction +"</span>\n" +
                "                </div>\n" +
                "            </div>"
        }
        $(".technology_top").append(str);
    }


}($))
