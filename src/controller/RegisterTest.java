
package controller;

import bean.User;
import com.google.gson.Gson;
import javafx.scene.control.Alert;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import tool.ObtainSqlSession;
import tool.ObtainUsername;
import tool.RegisterAccount;
import tool.SnowflakeIdGenerator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@WebServlet("/RegisterTest")
public class RegisterTest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入RegisterTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        insertUsernamePasswordEmail(req,resp);
    }
    public void insertUsernamePasswordEmail(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //调用工具类
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();

        String email=req.getParameter("email");
        String code= req.getParameter("code");
        String password=req.getParameter("password");

        List<User>users=EmailTest.getUsers();


        //处理结果
        int flag=0;
        for(User user:users){
            String E=user.getEmail();
            System.out.println("遍历数据库中的email:"+E);
            if(E.equals(email)){
                flag=1;
                break;
            }
        }
        PrintWriter out=resp.getWriter();
        Map<String,Object> data=new HashMap<>();
        Gson gson=new Gson();
        if(flag==1){
            System.out.println("该账号重复注册");
            data.put("status","repeat");
            data.put("message","该账号重复注册");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            resp.getWriter().println("register fail：该账号重复注册");
//            resp.getWriter().print("{\"success\":\"repeat\",\"message\":\"该账号重复注册\"}");
            return;
        }

        //判断验证码是否正确
        String Str=EmailTest.getStr() ;
        System.out.println("email:"+email);
        System.out.println("code："+code);
        String[] str =Str.split(":", 2);
        System.out.println(str[1]);
        System.out.println(str[0]);
        if(!email.equals(str[1])||!code.equals(str[0])){
            System.out.println("验证码错误");
            data.put("status","codeFail");
            data.put("message","验证码错误");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
            return;
        }
//        out.print("{\"success\":\"codeFail\",\"message\":\"验证码错误\"}");
//        out.print("{\"success\":\"codeFail\",\"message\":\"验证码错误\"}");

        //判断验证码是否过期
        if (LocalDateTime.now().isAfter(EmailTest.getMyDate())) {
            System.out.println("验证码过期");
            data.put("status","codeExpire");
            data.put("message","验证码过期");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            out.print("{\"success\":\"codeExpire\",\"message\":\"验证码过期\"}");
            return;
        }

        //注册一个账号（使用工具类）
        String result = RegisterAccount.registerAccount(params, password, email, sqlSession);
        if(result.equals("register success")){
            System.out.println("注册成功");
            data.put("status","register success");
            data.put("message","注册成功");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            out.print("{\"success\":\"register success\",\"message\":\"注册成功\"}");
        }
        else if(result.equals("register fail")){
            System.out.println("注册失败");
            data.put("status","register fail");
            data.put("message","注册失败");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            out.print("{\"success\":\"register fail\",\"message\":\"注册失败\"}");
        }
    }
}


