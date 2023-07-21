package controller;

import bean.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import tool.ObtainSqlSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/ModificationTest")
public class ModificationTest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ModificationTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        updateUser(req,resp);
    }
    public void updateUser(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        String username= req.getParameter("username");
        String nickname= req.getParameter("nickname");
        String birthday= req.getParameter("birthday");
        String profile= req.getParameter("profile");
        String phone= req.getParameter("phone");
        String gender= req.getParameter("gender");
        System.out.println("进入Modification:"+username+":"+nickname+":"+birthday+":"+profile+":"+phone);
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("username",username);
        params.put("birthday", birthday);
        params.put("profile", profile);
        params.put("phone", phone);
        params.put("nickname", nickname);
        params.put("gender", gender);

        int result=sqlSession.update("updateUser",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
}
