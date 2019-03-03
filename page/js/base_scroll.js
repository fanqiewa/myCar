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

}())
