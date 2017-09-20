package com.develop.service.Impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.develop.dao.AssessMapper;
import com.develop.entity.Assess;
import com.develop.service.AssessService;
import org.springframework.stereotype.Service;

@Service
public class AssessServiceImpl extends ServiceImpl<AssessMapper,Assess> implements AssessService {
}
