package controller;

import bean.User;
import org.apache.ibatis.session.SqlSession;
import servlet.UserTest;
import tool.ObtainCode;
import tool.ObtainSqlSession;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;

@WebServlet("/user/*")
@MultipartConfig
public class DistributeUser extends BaseServletUser {
    public static List<User> users;
    private static String Str;//邮箱:验证码
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
    //发邮件
    public void EmailTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
            code= ObtainCode.obtainCode(email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        Str=code+":"+email;

        System.out.println("你获得的验证码为："+code);
        System.out.println("Str："+Str);
        resp.getWriter().println("获取验证码success");
        myDate=  LocalDateTime.now().plusMinutes(3);
    }
    //修改个人资料
    public void ModificationTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ModificationTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.updateUser(req,resp);
    }
    //修改个人资料(头像)
    public void ModificationAvatarTest(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        System.out.println("ModificationAvatarTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        System.out.println("有东西吗");
        System.out.println("req:"+req);
        System.out.println("resp:"+req);
        System.out.println(req.getParts());
        UserTest.updateAvatar(req,resp);//方法
    }
    //显示个人信息
    public void DetailTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入DetailTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.selectByUsername(req,resp);
    }
    public void selectUserById(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectUserById.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.selectUserById(req,resp);
    }
}
