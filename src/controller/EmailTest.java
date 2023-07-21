package controller;

import bean.User;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainCode;
import tool.ObtainSqlSession;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
//获取验证码
@WebServlet("/EmailTest")
public class EmailTest extends HttpServlet {
    public static List<User> users;
    private static String Str;
    private static LocalDateTime myDate;

    public static LocalDateTime getMyDate() {
        return myDate;
    }

    public static String getStr() {
        return Str;
    }

    public static List<User> getUsers() {
        return users;
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入EmailTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        String email=req.getParameter("email");

        System.out.println("发送的邮箱地址为："+email);

        //找是否存在当前邮箱注册的账号，执行映射配置文件中的sql语句，并接收结果
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        users=sqlSession.selectList("selectAll");
        System.out.println("users:"+users);

        String code="";
        try {
            code=ObtainCode.obtainCode(email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        Str=code+":"+email;

        System.out.println("你获得的验证码为："+code);
        System.out.println("Str："+Str);
        resp.getWriter().println("获取验证码success");
        myDate=  LocalDateTime.now().plusMinutes(3);
    }
}
