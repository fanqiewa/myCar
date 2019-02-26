(function(){
    var flag = true;
    $(".btn-menu").on("click",function(){
        if(flag){
            $(this).find("span").css({opacity:"0"}).end().addClass("active");
            $("#mainnav-mobi").slideDown();
            flag = false;
        }else {
            $(this).find("span").css({opacity:"1"}).end().removeClass("active");
            $("#mainnav-mobi").slideUp("fast");
            flag = true;
        }
    });
    // scroll
    var slider = $(".header");
    var  _top = $(".top");
    $(window).scroll(function () {
        if ($(window).scrollTop() >= _top.offset().top + (_top.height()) -2 ) {
            slider.addClass("downscrolled");
        }else{
            slider.removeClass("downscrolled");
        }
    })
    //锚点
    $(".maodian").on("click",function(){
        $("html,body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 80 + "px"
        },500)
        return false;
    })

}())
