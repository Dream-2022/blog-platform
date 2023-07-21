package controller;

import bean.User;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/DetailTest")
public class DetailTest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入DetailTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        selectByUsername(req,resp);
    }
    public void selectByUsername(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        String username=req.getParameter("username");
        System.out.println("DetailTest中获取的username："+username);
        Map<String, Object> params = new HashMap<>();
        params.put("username",username);
        User user = sqlSession.selectOne("selectByUsername", params);
        System.out.println(user);
        Gson gson=new Gson();
        String dataJson = gson.toJson(user);
        PrintWriter out=resp.getWriter();
        out.print(dataJson);
    }
}
