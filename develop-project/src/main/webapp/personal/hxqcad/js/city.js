(function($){
    $.fn.extend({
        cityList: function(options){
            //参数默认值
            var defaults = {
                city: [],
                curr:"",
                pro:"province",
                citys:"city",
                district:"district"
            };
            var options = $.extend(defaults, options);
            var dataObj = eval(options.city.provinces);//转化JSON
            var cp = options.pro;//转化JSON
            var cc = options.citys;//转化JSON
            var cd = options.district;//转化JSON

            var address = options.curr.split(",");
            $("#"+cp).empty();
            $("#"+cp).append("<option value='0'>请选择</option>");

            $(dataObj).each(function(){
                //已选中省市区
                if(address[0]==this.name){
                    $("#"+cp).append("<option value=" + this.name + "  selected=\"selected\">"+this.name + "</option>");
                }else{
                    $("#"+cp).append("<option value=" + this.name + ">"+this.name + "</option>");
                }
            })

            $("#"+cp).change(function(){
                var cityText = $(this).find("option:selected").text();//获取省的值
                $("#"+cc).empty();
                $("#"+cc).append("<option value='0'>请选择</option>");
                $("#"+cd).empty();
                $("#"+cd).append("<option value='0'>请选择</option>");
                city(cityText,"");
            })

            $("#"+cc).change(function(){
                var cityText = $(this).find("option:selected").text();//获取省的值
                $("#"+cd).empty();
                $("#"+cd).append("<option value='0'>请选择</option>");
                district(cityText,"");

            })

            $("#"+cc).empty();
            $("#"+cc).append("<option value='0'>请选择</option>");
            city(address[0],address[1]);
            $("#"+cd).empty();
            $("#"+cd).append("<option value='0'>请选择</option>");
            district(address[1],address[2]);

            //选中城市
            function city(obj,address){
                for(i=0;i<dataObj.length;i++){
                    if(dataObj[i]['name']==obj){
                        for(j=0;j<dataObj[i]['cities'].length;j++){
                            if(dataObj[i]['cities'][j]['name']==address){
                                $("#"+cc).append("<option value=" + dataObj[i]['cities'][j]['name'] + "   selected='selected'>"+dataObj[i]['cities'][j]['name'] + "</option>");
                            }else{
                                $("#"+cc).append("<option value=" + dataObj[i]['cities'][j]['name'] + ">"+dataObj[i]['cities'][j]['name'] + "</option>");
                            }

                        }
                    }
                }

            }
            //选中区
            function district(obj,address){
                for(i=0;i<dataObj.length;i++){
                    for(j=0;j<dataObj[i]['cities'].length;j++){
                        if(dataObj[i]['cities'][j]['name']==obj){
                            for(m=0;m<dataObj[i]['cities'][j]['quxian'].length;m++){
                                if(dataObj[i]['cities'][j]['quxian'][m]['name']==address){
                                    $("#"+cd).append("<option value=" + dataObj[i]['cities'][j]['quxian'][m]['name'] + " selected='selected'>"+dataObj[i]['cities'][j]['quxian'][m]['name'] + "</option>");
                                }else{
                                    $("#"+cd).append("<option value=" + dataObj[i]['cities'][j]['quxian'][m]['name'] + ">"+dataObj[i]['cities'][j]['quxian'][m]['name'] + "</option>");
                                }
                            }
                        }
                    }
                }
            }
        }
    });
})(jQuery);