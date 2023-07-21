package controller;

import bean.User;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;
import tool.RegisterAccount;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
//登录页面的找回密码
@WebServlet("/PasswordTest")
public class PasswordTest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入PasswordTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        updatePassword(req,resp);
    }
    public void updatePassword(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //调用工具类
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();

        String email=req.getParameter("email");
        String code= req.getParameter("code");
        String password=req.getParameter("password");

        //判断验证码是否正确
        String Str=EmailTest.getStr() ;
        String[] str =Str.split(":", 2);
        if(!email.equals(str[1])||!code.equals(str[0])){
            System.out.println("验证码错误");
            resp.getWriter().println("验证码错误");
            return;
        }

        //判断验证码是否过期
        if (LocalDateTime.now().isAfter(EmailTest.getMyDate())) {
            System.out.println("验证码过期");
            resp.getWriter().println("验证码过期");
            return;
        }

        //先查是否存在该邮箱注册的账号(存在的情况修改)
        List<User> users=EmailTest.getUsers();
        for (User user : users) {
            if(user.getEmail().equals(email)){
                int result=sqlSession.update("updatePassword",user);
                if(result==1){
                    resp.getWriter().println('1');
                    System.out.println("修改密码成功"+result);
                    return;
                }
                else{
                    resp.getWriter().println("还未注册账号，请注册一个新的账号");
                    System.out.println("还未注册账号，请注册一个新的账号"+result);
                    return;
                }
            }
        }

        //不存在的情况，相当于创建一个账号
        //注册一个账号（使用工具类）
        String result = RegisterAccount.registerAccount(params, password, email, sqlSession);
        if(result.equals("register success")){
            resp.getWriter().println("forget register success");
        }
        else if(result.equals("register fail")){
            resp.getWriter().println("forget register fail");
        }
    }
}
