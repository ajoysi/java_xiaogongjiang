package com.develop.service.Impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.develop.dao.UserMapper;
import com.develop.entity.User;
import com.develop.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService{
}
