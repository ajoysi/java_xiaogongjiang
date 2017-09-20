$(document).ready(function () {
    $("#close").click(function () {
        $("#error").html("");
        $("#error").hide();
        $("#TC_OName").val("");
        $("#TC_OMobile").val("");
        $(".dialog-view").hide();
        $(".Yue").hide();
    });
    $(".tybox a").click(function () {
        $(".dialog-view").height("270px");
        $("#error").hide();
        $(".dialog-view").show();
        $(".Yue").show();
    });
});

function addOrder_tanchuang() {
    $("#error").css("color", "red");
    var mobeilReg = /^1[3|5|7|8|4][0-9]\d{8}$/;
    var nameReg = /^[\u4E00-\u9FA5]{1,6}$/;

    var oname = $("#TC_OName").val();
    var omobile = $("#TC_OMobile").val();
    var otype = 4;
    var sourcetype = 46;

    if (!nameReg.test(oname)) {
        $(".dialog-view").height("300px");
        $("#error").text("请输入您的称呼(例:王先生)！");
        $("#error").show();
        $("#TC_OName").focus();
        return false;
    }
    else if (!mobeilReg.test(omobile)) {
        $(".dialog-view").height("300px");
        $("#error").text("请输入正确的手机号！");
        $("#error").show();
        $("#TC_OMobile").focus();
        return false;
    }
        $("#error").text("");
        $("#error").hide();
        $.ajax({
            async: false,
            url: "/Ajax/Userhandle.ashx",
            type: "post",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: { "type": "addorder", "OName": oname, "OMobile": omobile, "OType": otype, "SourceType": sourcetype },
            success: function (re) {
                if (re == "1") {
                    //成功
                    $(".dialog-view").height("330px");
                    $("#error").text("恭喜您报名成功，客服24小时内联系您！");
                    $("#error").css("color", "#13ae6a");
                    $("#error").show();
                    $("#TC_OName").val("");
                    $("#TC_OMobile").val("");
                    //setTimeout("$('.dialog-view').hide()", 5000);
                    $("#error").append("<p><span id=\"timeCount\">5</span>秒后页面自动关闭</p>");
                    time_5();

                } else if (re == "0") {
                    //预约失败
                    $("#error").text("非常抱歉预约失败，请您重新预约！");
                    $("#error").show();
                }
                else if (re == "-1") {
                    $(".dialog-view").height("330px");
                    $("#error").text("非常抱歉预约失败，预约数已达到上限！");
                    $("#error").show();
                    $("#TC_OName").val("");
                    $("#TC_OMobile").val("");
                }
                else if (re == "-4") {
                    $("#error").text("请输入真实电话号码！");
                    $("#error").show();
                    $("#TC_OMobile").focus();
                }

            }

        });
}

/*5秒倒计时*/
function time_5()
{
    var tDom = document.getElementById("timeCount");
    var t = parseInt(tDom.innerHTML, 10);
    function timer() {
        setTimeout(function () {
            tDom.innerHTML = --t;
        if (t == 0) {
                $(".dialog-view").hide();
            }
            timer();
        }, 1000);
    }
    timer();
}

    

