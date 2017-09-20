package com.develop.service.Impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.develop.dao.OrderInfoMapper;
import com.develop.entity.OrderInfo;
import com.develop.service.OrderInfoService;
import org.springframework.stereotype.Service;

@Service
public class OrderInfoServiceImpl extends ServiceImpl<OrderInfoMapper,OrderInfo> implements OrderInfoService{
}
