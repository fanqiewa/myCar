(function () {
   var list = {
       init: function () {
           this.sliderList()
       },
       sliderList: function () {
           var flag = false;
           var slider = $("#slider");
           var box_left = $(".box_left");
           var box_right = $(".box_right");
           slider.on("click",function () {
               if(flag) {
                   changeClass();
               }else {
                   originalClass();
               }
           })

           function changeClass() {
                box_left.css({
                    display:"none"
                });
                box_right.removeClass("col-md-10").addClass("col-md-12");
                flag = false;
           };
           function originalClass() {
               box_left.css({
                   display:"block"
               });
               box_right.removeClass("col-md-12").addClass("col-md-10");
               flag = true;
           }

       }
   }
   list.init();

}())
