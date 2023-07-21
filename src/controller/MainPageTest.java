package controller;

import bean.Articles;
import com.google.gson.Gson;
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
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/MainPageTest")
public class MainPageTest extends HttpServlet {
    public static List<Articles> lists;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("MainPageTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        selectByArticles(req,resp);
    }
    public void selectByArticles(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        lists=sqlSession.selectList("selectArticle");
        //处理结果
        for(Articles articles:lists){
            System.out.println(articles);
        }
        Gson gson=new Gson();
        String articleJson=gson.toJson(lists);
        System.out.println("序列化后："+articleJson);
        PrintWriter out=resp.getWriter();
        out.print(articleJson);
        //释放资源
        sqlSession.close();
    }
}
