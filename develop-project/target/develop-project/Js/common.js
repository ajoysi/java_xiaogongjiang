$(function(){
    // 下拉菜单
    $(".nav-list").mouseover(function(){
        $(this).children("#downmenu").show();
    });
    $(".nav-list").mouseout(function(){
        $(this).children("#downmenu").hide();
    });
    $(".nav-list").mouseover(function () {
        $(this).children("#downmenu1").show();
    });
    $(".nav-list").mouseout(function () {
        $(this).children("#downmenu1").hide();
    });
    $(".nav-list").mouseover(function () {
        $(this).children("#downmenu2").show();
    });
    $(".nav-list").mouseout(function () {
        $(this).children("#downmenu2").hide();
    });

$(".select-city").mouseover(function(){
		$(this).children(".selectbox").stop().show();
	});$(".select-city").mouseout(function(){
		$(this).children(".selectbox").stop().hide();
	})
})


//tab选项卡
function TabChange(tabhd,event,cur,tabhd){
	var $tab_nav=$(tabhd).children();
	$tab_nav.bind(event,function(){
		$(this).addClass(cur).siblings().removeClass(cur);
		var index=$(this).index();
		$(tabhd).hide().eq(index).show();
	})
}

function TabControl(tabnav,hov,tabbd,eventName){
		var tabtit=$(tabnav).children();
		tabtit.bind(eventName,function(){
			var index=$(this).index();
			var tabtxt=$(this).parent().parent().next(tabbd);
			$(this).addClass(hov).siblings().removeClass(hov);
			$(tabbd).hide().eq(index).show();
			$(tabbd).find('img.lazy_ranklist').trigger('lazy_ranklist');
		});		
};

$(function () {
    var $tab_nav = $("#js_tab1 li a");
    $tab_nav.click(function () {
        $(this).parent().addClass("active").siblings().removeClass("active");
        var index = $(this).parent().index();
        $("#js_tab_cnt_1 .tab-pane").hide().eq(index).show();
    });

    var $tab_nav = $("#js_tab2 li a");
    $tab_nav.click(function () {
        $(this).parent().addClass("active").siblings().removeClass("active");
        var index = $(this).parent().index();
        $("#js_tab_cnt_2 .tab-pane").hide().eq(index).show();
    })
})