package controller;

import servlet.UserTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/Fail/*")
public class DistributeFail extends BaseFail{
    //登录，忘记密码，注册
    //修改密码（根据邮箱和验证码）
    public void PasswordTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入PasswordTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.updatePassword(req,resp);
    }
    //注册
    public void RegisterTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入RegisterTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.insertUsernamePasswordEmail(req,resp);
    }
    //登录
    public void LoginTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("现在是11点");
        System.out.println("进入LoginTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.selectByUsernameAndPassword(req,resp);//方法
    }

}
