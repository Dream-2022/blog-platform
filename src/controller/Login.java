package controller;

import bean.User;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import tool.JwtTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.*;

@WebServlet("/LoginTest")
public class Login extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("现在是11点");
        System.out.println("进入LoginTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        selectByUsernameAndPassword(req,resp);
    }
    public void selectByUsernameAndPassword(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();

        String username= req.getParameter("username");
        String password=req.getParameter("password");
        params.put("username",username);
        params.put("password", password);

        System.out.println(username+":"+password);

        User user = sqlSession.selectOne("selectByUsernameAndPassword", params);
        //处理结果
        System.out.println(user);
        //释放资源
        sqlSession.close();
        is.close();


        PrintWriter out=resp.getWriter();

        Gson gson=new Gson();
        Map<String,Object> data=new HashMap<>();
        // 返回响应
        if (user!=null) {
            System.out.println("111");
            data.put("success",1);
            user.setPassword(null);
            data.put("user",user);
            System.out.println(user.getUsername()+":"+user.getPassword()+":"+user.getAdmin());

            Map<String,Object>tokens= JwtTest.getToken(user.getUsername(),user.getAdmin());
            System.out.println((String)tokens.get("token"));
            System.out.println((String)tokens.get("longt"));
            System.out.println(11);
            resp.setHeader("token",(String)tokens.get("token"));
            resp.setHeader("longt",(String)tokens.get("longt"));
        }
        else {
            data.put("success",0);
            System.out.println("登录失败");
        }
        String dataJson = gson.toJson(data);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
}
