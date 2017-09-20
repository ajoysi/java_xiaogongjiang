/* selectBox */
(function($){
	$.fn.Selectbox = function(options){
		//常量设定
        var NOW_PADDING = 40;     //当前选择的PADDING补齐
        var LI_HEIGHT = 30;       //每个下拉元素的高度
        
        var defaultOption = {
            id: false,           //是否设置ID
            zindex: 1,           //z-index
            css: '',             //额外的CSS
            width: 80,          //宽度
            maxheight:1000,      //最大高度
            wheelstep: 15,       //鼠标滚轮步进
            defaultName: ''      //默认下拉栏值
        };
        
        var sendOption = $.extend(defaultOption, options);
        
		return this.each(function(){
			var $thisDom = $(this);
            
            $thisDom.hide();
            
            //获得选项总数
            var optionCount = $thisDom.children('option').length;
            //列表的实际高度
            var listRealHeight = optionCount * LI_HEIGHT;
            //input的名称
            var formName = $thisDom.attr('name');
            //生成选项的HTML代码
            var htmlOption = '';
            $thisDom.children('option').each(function(){
                var $thisOption = $(this);
                var insertHtml = '';
                var addClass = '';
                if ($thisOption.attr('selected')!= undefined){
                    //选中的
                    insertHtml = ' attr-selected="selected"';
                    addClass = ' class="sb_sel_selected"';
                }
                htmlOption += '<li class="sb_sel_li"' + insertHtml + '><a' + addClass + ' title="' + $thisOption.html() + '" attr-value="' + $thisOption.attr('value').toString() + '" href="javascript:" hidefocus="true">' + $thisOption.html() + '</a></li>';
            });
            //默认值
            var $tempDom = $thisDom.children('option[selected=selected]');
            var defaultValue = '';
            var defaultName = '...';
            if ($tempDom.length!= 0){
                defaultValue = $tempDom.val();
                defaultName = $tempDom.html();
            }else if(sendOption.defaultName!= ''){
                defaultValue = '';
                defaultName = sendOption.defaultName;
            }
            
            //计算总高度和滚动条高度（是否需要滚动条）
            var listContainerHeight;
            var scrollHeight = 0;
            var htmlScroll = '';
            if (listRealHeight> sendOption.maxheight){
                //列表容器高度
                listContainerHeight = sendOption.maxheight;
                //计算滚动条高度
                scrollHeight = Math.ceil(sendOption.maxheight / listRealHeight * listContainerHeight);
                //添加滚动条
                htmlScroll = '<div onselectstart="return false" class="sb_sel_tract" style="height:' + listContainerHeight + 'px"><a href="javascript:" hidefocus="true" class="sb_sel_scroll" style="height:' + scrollHeight + 'px"></a></div>';
            }else{
                listContainerHeight = listRealHeight;
            }
            
			//删除重复select
			if($('#sb_sel_box_'+ formName)) $('#sb_sel_box_'+ formName).remove();
			
            $thisDom.after('<div class="sb_sel_box" id="sb_sel_box_'+ formName +'" style="width:' + sendOption.width + 'px;z-index:' + sendOption.zindex + (sendOption.css!= '' ? (';' + sendOption.css) : '') +'"><a class="sb_sel_now" style="width:' + (sendOption.width - NOW_PADDING) + 'px">' + defaultName + '</a><div class="sb_sel_drop" style="display:none;width:' + sendOption.width + 'px;height:' + listContainerHeight + 'px"><ul class="sb_sel_ul" style="width:' + sendOption.width + 'px;height:' + listContainerHeight + 'px">' + htmlOption + '</ul>' + htmlScroll + '</div></div>');
            
            //得到生成的对象
            var $targetDom = $thisDom.next();
            //设置ID
            if (sendOption.id!== false){
                $targetDom.attr('id', sendOption.id);
            }
            //滚动条对象
            var $scrollDom = $targetDom.children('.sb_sel_drop').children('.sb_sel_tract').children('.sb_sel_scroll');
            //列表对象
            var $listDom = $targetDom.children('.sb_sel_drop').children('.sb_sel_ul');
            
            //绑定选中
            $listDom.children('.sb_sel_li').children('a').click(function(event){
                event.preventDefault();
                
                //更改列表中的选中状态
                $listDom.children('.sb_sel_li').children('a').removeClass('sb_sel_selected');
                $(this).addClass('sb_sel_selected');
                
                //更改显示值和隐藏值
                $targetDom.children('.sb_sel_now').html($(this).html());
				
                //$targetDom.children('.sb_sel_input').val($(this).attr('attr-value'));
                
				var selectedValue=$(this).attr('attr-value');
				
				//联动改版select的选中项
				$thisDom.children('option').each(function(){
					 $(this).attr('selected',  $(this).attr('value') == selectedValue );
				});
				
                //选择回调函数
                if (sendOption.callback){
                    sendOption.callback($(this).attr('attr-value'), $targetDom);
                }
                
                //关闭选项框
                $targetDom.children('.sb_sel_drop').hide();
                $targetDom.children('.sb_sel_drop').stop(true, false).fadeOut(300);
				
                return false;
            });
            
            
            //绑定滚动条移动
            $targetDom.children('.sb_sel_drop').children('.sb_sel_tract').mousedown(function(event){
                event =  event || window.event;
                
                event.preventDefault();
                
                var scrollStartY = parseInt($scrollDom.position().top);
                var scrollHeight = parseInt($scrollDom.height());
                var trackMaxHeight = parseInt($(this).height());
                
                //鼠标位置
                var mouseStartY = event.pageY;
                var mouseY;
                $(document).mousemove(function(event){
                    event =  event || (window.event || '');
                    
                    event.preventDefault();
                    mouseY = parseInt(event.pageY);
                });
                
                var interEvent = setInterval(function(){
                    //更新滚动条位置
                    var scrollNewY = parseInt(scrollStartY + (mouseY - mouseStartY));
                    //限制
                    if (scrollNewY> (trackMaxHeight - scrollHeight)){
                        scrollNewY = trackMaxHeight - scrollHeight;
                    }else if(scrollNewY< 0){
                        scrollNewY = 0;
                    }
                    var reallyMove = scrollNewY - scrollStartY;
                    
                    $scrollDom.css('top', (scrollStartY + reallyMove) + 'px');
                    
                    //更新内容位置
                    var listNewY = (-(scrollStartY + reallyMove) / (trackMaxHeight - scrollHeight) * (listRealHeight - listContainerHeight));
                    
                    $listDom.css('top', listNewY + 'px');
                    
                }, 35);
                
                $(document).mouseup(function(){
                    event =  event || (window.event || '');
                    clearInterval(interEvent);
                    $(document).unbind('mouseup mousemove');
                });
                
                return false;
            });
            
            //绑定鼠标滚动
            if ($.event.special.mousewheel!== undefined){
                $targetDom.mousewheel(function(event, delta, deltaX, deltaY) {
                    if ($targetDom.find('.sb_sel_tract').length== 0){
                        return true;
                    }
                    
                    event.stopPropagation();
                    event.preventDefault();
                    
                    //方向
                    var direction = (delta> 0 || deltaY> 0) ? 1 : -1;
                    
                    //开始的列表位置
                    var listStartY = parseInt($listDom.position().top);
                    
                    var listNewY = $listDom.position().top + (direction * sendOption.wheelstep);
                    var maxListRange = -(listRealHeight - sendOption.maxheight);
                    
                    if (listNewY< maxListRange){
                        listNewY = maxListRange;
                    }else if(listNewY> 0){
                        listNewY = 0;
                    }
                    
                    $listDom.css('top', listNewY + 'px');
                    
                    //计算滚动条位置
                    var scrollNewY = Math.abs(listNewY / maxListRange) * ($scrollDom.parent().height() - $scrollDom.height());
                    
                    $scrollDom.css('top', scrollNewY + 'px');
                    
                });
            }
            
            
            //绑定hover显示
            $targetDom.hover(
                function(){
                    $targetDom.children('.sb_sel_drop').stop(true, true).fadeIn(300);
                },
                function(){
                    $targetDom.children('.sb_sel_drop').stop(true, true).fadeOut(400);
                }
            );
            
			
            //删除DOM
            //$thisDom.remove();
           // $thisDom.unbind().hide();
		});
	}
})(jQuery);