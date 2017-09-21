	   	// 提示层msg:加入的信息；callback:回调刷新当前页面；time:自动关闭的时间按秒算，0为不自动关闭；url:关闭后跳转的链接,内容中的提示图片是根据状态动态赋值路径，提示语也是动态赋值
		// 根据提示语不同加载不同的图片
	function showAlert(msg,type,callback,time,url){
                $('.modalAlert').remove();
		var icon = (type===1)?'<img src="img/success.png" class="showalertImg"/>':((type===0)?'<img src="img/defeated.png" class="showalertImg"/>':'');
		var box='<div class="modal in modalAlert" data-backdrop="false" aria-hidden="false" id="msg_show" style="z-index:1041"><div class="modal-backdrop fade in"></div>';
			box+='<div class="modal-dialog" ><div class="modal-content" style="margin-top:300px;" ><div class="modal-header"><h4>提示</h4><a  class="close" data-dismiss="modal"></a></div>';
			box+='<div class="modal-body showAlertBody" id="modal-body_public" >'+icon;
			box+='<p>'+msg+'</p></div>';
			box+='<div class="modal-footer" id="modal-footer_public"><button type="button" class="btn" id="msg_show_close">关闭</button>';
			box+='</div></div></div></div>';
			$('body').append(box);
		$('#msg_show').modal(true);
		$('#msg_show_close').click(function(){
			removeAlert(url,callback);
		});
		if(!!time){
			 setTimeout(function(){
				removeAlert(url,callback);
			},time*1000);   	
		}
		
	}

	// 关闭提示层
	function removeAlert(url,callback){
		$('#msg_show').modal('hide');
		if(url){
			location.href=url;
		}
		if(typeof callback != 'function'){
			//当callback没作为参数不执行后面
			return false;
		}
		callback && callback();
	}
	