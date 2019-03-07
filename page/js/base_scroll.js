(function(){
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

    /*回到顶部*/
    $(".go_top").on("click",function () {
        if ($('html').scrollTop()) {
            $('html').animate({ scrollTop: 0 }, 1000);
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 1000);
        return false;
    })
}())
