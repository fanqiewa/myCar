$(function	()	{
	//scrollable sidebar
	$('.scrollable-sidebar').slimScroll({
		height: '100%',
		size: '0px'
	});
	
	//Collapsible Sidebar Menu
	$('.sidebar-menu .openable > a').click(function()	{
		
		if(!$('aside').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 991px)'))	{
			if( $(this).parent().children('.submenu').is(':hidden') ) {
				$(this).parent().siblings().removeClass('open').children('.submenu').slideUp(200);
				$(this).parent().addClass('open').children('.submenu').slideDown(200);
			}
			else	{
				$(this).parent().removeClass('open').children('.submenu').slideUp(200);
			}
		}
		
		return false;
	});

	//Open active menu
	if(!$('.sidebar-menu').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 767px)'))	{
		$('.openable.open').children('.submenu').slideDown(200);
	}
	
	
	$('#sidebarToggleLG').click(function()	{
		if($('.wrapper').hasClass('display-right'))	{
			$('.wrapper').removeClass('display-right');
			$('.sidebar-right').removeClass('active');
		}
		else	{
			//$('.nav-header').toggleClass('hide');
			$('.top-nav').toggleClass('sidebar-mini');
			$('aside').toggleClass('sidebar-mini');
			$('footer').toggleClass('sidebar-mini');
			$('.main-container').toggleClass('sidebar-mini');
			
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}		
	});
	
	$('#sidebarToggleSM').click(function()	{
		$('aside').toggleClass('active');
		$('.wrapper').toggleClass('display-left');
	});
	
	$('.sidebarRight-toggle').click(function()	{
		$('.sidebar-right').toggleClass('active');
		$('.wrapper').toggleClass('display-right');
		$('footer').toggleClass('display-right');

		return false;
	});
	
	$('.dropdown-menu input').click(function(e) {
        e.stopPropagation(); //This will prevent the event from bubbling up and close the dropdown when you type/click on text boxes.
    });
	
	//to do list
	$('.task-finish').click(function()	{ 
		if($(this).is(':checked'))	{
			$(this).parent().parent().addClass('selected');					
		}
		else	{
			$(this).parent().parent().removeClass('selected');
		}
	});

	//Delete to do list
	// $('.task-del').click(function()	{			
	// 	var activeList = $(this).parent().parent();

	// 	activeList.addClass('removed');
				
	// 	setTimeout(function() {
	// 		activeList.remove();
	// 	}, 1000);
			
	// 	return false;
	// });
	
	// var $activeWidget = '';
	// var $activeWidgetHeader;
	// var $headerHeight;
	// var $screenHeight;
	// var $widgetHeight;
	// var $borderHeight = 3;

	//Scroll to Top
	$(".scroll-to-top").click(function()	{
		$("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	});

	// Popover
    $("[data-toggle=popover]").popover();
	
	// Tooltip
    // $("[data-toggle=tooltip]").tooltip();
	// $("[rel=tooltip]").tooltip();
});


$(window).load(function() {
	$('body').removeClass('overflow-hidden');

	//Enable animation
	$('.wrapper').removeClass('preload');
});

// Toggle Scroll to Top button
$(window).scroll(function(){
		
	 var position = $(window).scrollTop();
	
	 if(position >= 200)	{
		$('.scroll-to-top').addClass('active')
	 }
	 else	{
		$('.scroll-to-top').removeClass('active')
	 }
});