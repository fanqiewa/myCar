(function($){
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
    })
    // scroll
    var slider = $(".header");
    var  _top = $(".top");
    var _grids = $(".about-grids");
    $(window).scroll(function () {
            if ($(window).scrollTop() >= _top.offset().top + (_top.height()) -2 ) {
                slider.addClass("downscrolled");
            }else{
                slider.removeClass("downscrolled");
            }
            if($(window).scrollTop() + $(window).height() >= _grids.offset().top + _grids.height()/2){
                _grids.css({
                    // "visibility": "visible"
                    "opacity": "1"
                })
            }
    })
    //锚点
    $(".maodian").on("click",function(){
        $("html,body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 80 + "px"
        },500)
        return false;
    })

     /*公告滚动*/
         $(function(){
                var len = $(".scroll-con li").length;
                if(len > 1){
                    textRoll=function(){
                        $(".scroll-wrap").find(".scroll-con").animate({
                            marginTop : "-23px"
                        },500,function(){
                            $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
                        });
                    };
                    var roll= setInterval('textRoll()',1500);
                    $(".scroll-con li a").mouseenter(function() {
                        clearInterval(roll);
                    }).mouseout(function(){
                        clearInterval(roll);
                        roll= setInterval('textRoll()',1500);
                    });
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

})($)
