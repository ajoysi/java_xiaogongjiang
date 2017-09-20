package com.develop.controller;


import com.alibaba.fastjson.JSONObject;
import com.develop.util.ResultVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Random;

@Controller
@RequestMapping("/index")
public class IndexControl {

    @ResponseBody
    @RequestMapping("/")
    public ResultVo index(HttpServletRequest request,
                                HttpServletResponse response) {
        ResultVo resultVo = new ResultVo();

        return resultVo;
    }

    /**
     * 请求样例代码
     * reqData = {};
     * reqData["userName"] = "***";
     * reqData["password"] = "***";
     *
     * $.ajax({
     *     url:"localhost:8080/index/login",
     *     type:"post",
     *     data:{data:Json.stringify(reqData)},
     *     success:function(data){}
     *
     * })
     *
     * /index/login 登录页
     *
     * @param request
     * 请求数据
     *  data:{
     *     reqData:{
     *        userPhone:用户手机号,
     *        userPassword:用户密码,
     *        checkCode:验证码
     *      }
     * }
     *@param response
     * 返回数据
     * {
     *     status:状态码 1-成功,0-失败
     *     Msg：返回提示消息
     *     code：验证码
     * }
     */
    @ResponseBody
    @RequestMapping(value = "/login",method= RequestMethod.POST)
    public ResultVo login(HttpServletRequest request,
                          HttpServletResponse response) {
        ResultVo resultVo = new ResultVo();
        String data = request.getParameter("data");
        JSONObject paramJSON = JSONObject.parseObject(data);
        JSONObject reqData = paramJSON.getJSONObject("reqData");

        String userPhone = reqData.getString("userPhone");
        String userPsd = reqData.getString("userPassword");
        String checkCode = reqData.getString("checkCode");
        String code = (String) request.getSession().getAttribute("code");

        return resultVo;
    }

    /**
     *
     * @param request
     * 请求数据
     *  data:{
     *     reqData:{
     *        userType:用户类型,
     *        userPhone:用户手机号,
     *        phoneCode:手机验证码,
     *        userPassword:密码,
     *        againPassword:确认密码,
     *        checkCode:验证码
     *      }
     * }
     * @param response
     * 返回数据
     * {
     *     status:状态码 1-成功,0-失败
     *     Msg：返回提示消息
     *     code：验证码
     * }
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/regist",method=RequestMethod.POST)
    public ResultVo regist(HttpServletRequest request,
                          HttpServletResponse response) {
        ResultVo resultVo = new ResultVo();
        String data = request.getParameter("data");
        JSONObject paramJSON = JSONObject.parseObject(data);
        JSONObject reqData = paramJSON.getJSONObject("reqData");

        String userType = reqData.getString("userType");
        String userPhone = reqData.getString("userPhone");
        String phoneCode = reqData.getString("phoneCode");
        String userPsd = reqData.getString("userPassword");
        String againPsd = reqData.getString("againPassword");
        String checkCode = reqData.getString("checkCode");
        String code = (String) request.getSession().getAttribute("code");


        return resultVo;
    }

    @ResponseBody
    @RequestMapping("/requestCode")
    public ResultVo requestCode(HttpServletRequest request,
                           HttpServletResponse response) {
        ResultVo resultVo = new ResultVo();
        char[] codeChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456".toCharArray();
        String captcha = ""; // 存放生成的验证码
        Random random = new Random();
        for(int i = 0; i < 4; i++) {
            int index = random.nextInt(codeChar.length);
            captcha += codeChar[index];
        }
        request.getSession().setAttribute("code", captcha);
        resultVo.setStatus(1);
        HashMap map = new HashMap();
        map.put("code", captcha);
        resultVo.setData(map);
        return resultVo;
    }
}
