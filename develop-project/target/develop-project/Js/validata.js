function checkMail(mail) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) return true;
    else {
        return false;
    }
}

function checkMobile(mobile) {
    var reg = /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
    var my = false;
    if (reg.test(mobile)) my = true;
    return my;

}
function checkMobileAjax(mobile) {
    var res = "";
    $.ajax({
        async: false,
        url: "/Ajax/Userhandle.ashx",
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: { "type": "checkMobile", "mobile": mobile },
        success: function (re) {
            res = re;
        }

    });
    return res;
}
function checkMobileMsg(mobile) {
    var res = "";
    $.ajax({
        async: false,
        url: "/Ajax/Userhandle.ashx",
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: { "type": "checkMobileMsg", "mobile": mobile },
        success: function (re) {
            res = re;
        }

    });
    return res;
}
function checkSmsAjax(mobile, sms) {
    var res = "";
    $.ajax({
        async: false,
        url: "/Ajax/Userhandle.ashx",
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: { "type": "smscheck", "mobile": mobile, "sms": sms },
        success: function (re) {
            res = re;
        }

    });
    return res;
}
function AddUser(mobile) {
    var res = "";
    $.ajax({
        async: false,
        url: "/Ajax/Userhandle.ashx",
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: { "type": "adduser", "mobile": mobile },
        success: function (re) {
            res = re;
        }

    });
    return res;
}
var res = true;
function checkmain() {
    $("input[vtype=need]").each(function () {
        $(this).bind("blur", function () {
            clearTimeout(t);
            $(this).parent().find("a").remove();
            if ($(this).attr("datatype") == "m") {

                if ($(this).val().length == 0) {
                    $(this).parent().append("<a class=\"regist\">手机号码不能为空!</a>");
                } else {
                    if (checkMobile($(this).val())) {
                        var result = eval(checkMobileAjax($(this).val()));
                        if (result[0].status == "1") {

                            $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                        } else if (result[0].status == "2") {
                            $(this).parent().append("<a class=\"regist\">手机已被注册!</a>");
                        } else if (result[0].status == "0") {
                            $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                        }
                        else if (result[0].status == "3") {
                            $(this).parent().append("<a class=\"regist\">手机号码审核中!</a>");
                        }
                    } else {
                        $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");

                    }
                }
            }
            else if ($(this).attr("datatype") == "m-ml") {

                if ($(this).val().length == 0) {
                    $(this).parent().append("<a class=\"regist\">手机号码不能为空!</a>");
                } else {
                    if (checkMobile($(this).val())) {
                        var result3 = eval(checkMobileAjax($(this).val()));
                        if (result3[0].status == "1") {
                            var re = AddUser($(this).val());
                            if (re == "1") {
                                $(this).parent().append("<a class=\"regist\">您尚未预约工长报价,<lable id=\"err_go\"></lable></a>");
                                fun_timedowngo(10);
                            } else if (re == "2") {
                                $(this).parent().append("<a class=\"regist\">抱歉，尚未有工长为您报价!</a>");
                            }
                            
                            //$(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                        } else if (result3[0].status == "2") {
                            if (checkMobileMsg($(this).val()) == "1") {
                                $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></b>");
                            } else {
                                $(this).parent().append("<a class=\"regist\">抱歉，尚未有工长为您报价!</a>");
                            }
                            
                        } else if (result3[0].status == "0") {
                            $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                        }
                        else if (result3[0].status == "3") {
                            $(this).parent().append("<a class=\"regist\">手机号码审核中!</a>");
                        }
                    } else {
                        $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");

                    }
                }
            }
            else if ($(this).attr("datatype") == "m-l") {

                if ($(this).val().length == 0) {
                    $(this).parent().append("<a class=\"regist\">手机号码不能为空!</a>");
                } else {
                    if (checkMobile($(this).val())) {
                        var result2 = eval(checkMobileAjax($(this).val()));
                        if (result2[0].status == "1") {
                            $(this).parent().append("<a class=\"regist\">手机未注册!</a>");
                           
                        } else if (result2[0].status == "2") {
                            $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                        } else if (result2[0].status == "0") {
                            $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                           
                        }
                        else if (result2[0].status == "3") {
                            $(this).parent().append("<a class=\"regist\">手机号码审核中!</a>");
                            
                        }
                    } else {
                        $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                        

                    }
                }
            } else if ($(this).attr("datatype") == "p6-16") {
                if ($(this).val().length == 0) {
                    $(this).parent().append("<a class=\"regist\">密码不能为空!</a>");
                    
                } else if ($(this).val().length < 6) {
                    $(this).parent().append("<a class=\"regist\">密码长度应该在6-16位之间!</a>");
                    

                } else {
                    $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                }
            }
            else if ($(this).attr("datatype") == "rp6-16") {
                if ($(this).val().length == 0) {
                    $(this).parent().append("<a class=\"regist\">确认密码不能为空!</a>");
                    
                } else if ($(this).val().length < 6) {
                    $(this).parent().append("<a class=\"regist\">密码长度应该在6-16位之间!</a>");
                } else if ($(this).val() != $("input[datatype=p6-16]").eq(0).val()) {
                    $(this).parent().append("<a class=\"regist\">您两次输入的密码不一致!</a>");
                    
                } else {
                    $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                }
            } else if ($(this).attr("datatype") == "c") {

                if ($(this).val().length == 0) {
                    $(this).parent().append("<a class=\"regist\">验证码不能为空!</a>");
                   
                } else {
                    var result1 = eval(checkSmsAjax($("#mobile").val(), $(this).val()));
                    if (result1[0].status == "0") {
                        $(this).parent().append("<a class=\"regist\">验证码不正确!</a>");
                        
                    } else if (result1[0].status == "1") {
                        $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                    }
                    else if (result1[0].status == "2") {
                        $(this).parent().append("<a class=\"regist\">请发送短信验证码!</a>");
                        
                    }
                }
            }else if ($(this).attr("datatype") == "n") {

            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">工长名不能为空!</a>");
            }
        }
        });

    });
}
function returnCheck() {
    $("input[vtype=need]").each(function () {
        $(this).parent().find("a").remove();
        if ($(this).attr("datatype") == "m") {
            
            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">手机号码不能为空!</a>");
                res = false;
            } else {
                if (checkMobile($(this).val())) {
                    var result = eval(checkMobileAjax($(this).val()));
                   

                    if (result[0].status == "1") {
                        $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                    } else if (result[0].status == "2") {
                        $(this).parent().append("<a class=\"regist\">手机已被注册!</a>");
                        res = false;
                    } else if (result[0].status == "0") {
                        $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                        res = false;
                    }
                    else if (result[0].status == "3") {
                        $(this).parent().append("<a class=\"regist\">手机号码审核中!</a>");
                        res = false;
                    }
                } else {
                    $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                    res = false;

                }
            }
        } else if ($(this).attr("datatype") == "m-l") {

            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">手机号码不能为空!</a>");
                res = false;
            } else {
                if (checkMobile($(this).val())) {
                    var result2 = eval(checkMobileAjax($(this).val()));
                    if (result2[0].status == "1") {

                        $(this).parent().append("<a class=\"regist\">手机未注册!</a>");
                        res = false;
                    } else if (result2[0].status == "2") {
                        $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                    } else if (result2[0].status == "0") {
                        $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                        res = false;
                    }
                    else if (result2[0].status == "3") {
                        $(this).parent().append("<a class=\"regist\">手机号码审核中!</a>");
                        res = false;
                    }
                } else {
                    $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                    res = false;

                }
            }
        } else if ($(this).attr("datatype") == "m-ml") {

            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">手机号码不能为空!</a>");
            } else {
                if (checkMobile($(this).val())) {
                    var result3 = eval(checkMobileAjax($(this).val()));
                    if (result3[0].status == "1") {
                        var re = AddUser($(this).val());
                        if (re == "1") {
                            $(this).parent().append("<a class=\"regist\">您尚未预约工长报价,<lable id=\"err_go\"></lable></a>");
                            fun_timedowngo(10);
                            res = false;

                        } else if (re == "2") {
                            $(this).parent().append("<a class=\"regist\">抱歉，尚未有工长为您报价!");
                            res = false;
                        }
                        //$(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                    } else if (result3[0].status == "2") {
                        if (checkMobileMsg($(this).val()) == "1") {
                            $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                        } else {
                            $(this).parent().append("<a class=\"regist\">抱歉，尚未有工长为您报价!</a>");
                            res = false;
                        }

                    } else if (result3[0].status == "0") {
                        $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                        res = false;
                    }
                    else if (result3[0].status == "3") {
                        $(this).parent().append("<a class=\"regist\">手机号码审核中!</a>");
                        res = false;
                    }
                } else {
                    $(this).parent().append("<a class=\"regist\">手机号码格式不正确!</a>");
                    res = false;

                }
            }
        } else if ($(this).attr("datatype") == "p6-16") {
            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">密码不能为空!</a>");
                res = false;
            } else if ($(this).val().length < 6) {
                $(this).parent().append("<a class=\"regist\">密码长度应该在6-16位之间!</a>");
                res = false;
            }
            else {
                $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");


            }
        }
        else if ($(this).attr("datatype") == "rp6-16") {
            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">确认密码不能为空!</a>");
                res = false;
            } else if ($(this).val().length < 6) {
                $(this).parent().append("<a class=\"regist\">密码长度应该在6-16位之间!</a>");
                res = false;

            } else if ($(this).val() != $("input[datatype=p6-16]").eq(0).val()) {
                $(this).parent().append("<a class=\"regist\">您两次输入的密码不一致!</a>");
                res = false;
            } else {
                $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
            }
        } else if ($(this).attr("datatype") == "c") {

            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">验证码不能为空!</a>");
                res = false;
            }
            else {
                var result1 = eval(checkSmsAjax($("#mobile").val(), $(this).val()));
                if (result1[0].status == "0") {
                    $(this).parent().append("<a class=\"regist\">验证码不正确!</a>");
                    res = false;
                } else if (result1[0].status == "1") {
                    $(this).parent().append("<a class=\"Validform_right\"><img width=\"30\" height=\"30\" src=\"../Images/right.gif\"></a>");
                }
                else if (result1[0].status == "2") {
                    $(this).parent().append("<a class=\"regist\">请发送短信验证码!</a>");
                    res = false;
                }
            }

        }
		else if ($(this).attr("datatype") == "n"&& $("#UserType").val()=="1") {

            if ($(this).val().length == 0) {
                $(this).parent().append("<a class=\"regist\">工长名不能为空!</a>");
                res = false;
            }
        }
    });
    return res;
}

var t;
function fun_timedowngo(time) {
    if (time == 'undefined')
        time = 10;
    $("#err_go").html("" + time + "秒后为您转到预约工长页。</a>");
    
    time = time - 1;
    if (time >= 0) {
        t=setTimeout("fun_timedowngo(" + time + ")", 1000);
    } else {
        window.location.href = "/gongzhang";
    }
}





