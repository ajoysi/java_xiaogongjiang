package com.develop.util;

import java.io.Serializable;

/**

 */
public class ResultVo implements Serializable {

	/**
	 * 请求结果状态0：失败，1：成功 2：重新登录
	 */
	private Integer status = 1;

	/**
	 * 错误提示信息
	 */
	private String msg;

	/**
	 * 返回数据结果对象
	 */
	private Object data;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
