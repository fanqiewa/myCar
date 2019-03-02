(function($){
    function init(){
        var url = "/queryProductById?id=11";
        $.ajax({
            type:"get",
            url:url,
            success : function (data) {
                renderWelcome(JSON.parse(data).data)
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
    init();

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
    }

}($))
