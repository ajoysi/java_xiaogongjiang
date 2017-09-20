package com.develop.util;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.List;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.internal.DefaultShellCallback;

public class MBGTest {

    public static void main(String[] args) throws Exception {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
        File configFile = new File("mbg.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);

        Configuration config =cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator =new MyBatisGenerator(config, callback, warnings);
        myBatisGenerator.generate(null);
        System.out.println("endgenerator!");
//
//
//            String url = "jdbc:mysql://localhost:3306/develop";
//            String driver = "com.mysql.jdbc.Driver";
//            try{
//                Class.forName(driver);
//            }catch(Exception e){
//                System.out.println("无法加载驱动");
//            }
//
//            try {
//                Connection con = DriverManager.getConnection(url,"root","root");
//                if(!con.isClosed())
//                    System.out.println("success");
//            } catch (Exception e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            }
    }

}
