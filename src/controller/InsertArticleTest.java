package controller;

import bean.Articles;
import bean.User;
import com.google.gson.Gson;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import tool.ObtainSqlSession;
import tool.SnowflakeIdGenerator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/InsertArticleTest")
public class InsertArticleTest extends HttpServlet  {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入insertArticleTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        insertArticle(req,resp);
    }
    public void insertArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入方法");
        String articleId=req.getParameter("articleId");
        String user_id= req.getParameter("user_id");
        String title= req.getParameter("title");
        String textarea= req.getParameter("textarea");
        String htmlText= req.getParameter("htmlText");
        System.out.println("htmlText"+htmlText);
        String plainText= req.getParameter("plainText");
        System.out.println("plainText"+plainText);
        String original= req.getParameter("original");
        System.out.println("original"+original);
        String avatar= req.getParameter("avatar");
        String state= req.getParameter("state");
        String view= req.getParameter("view");
        String give= req.getParameter("give");
        String collect= req.getParameter("collect");
        Date release_at= new Date();
        Date update_at= new Date();

        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        System.out.println(articleId+":"+user_id+":"+title+":"+textarea+":"+htmlText+":"+plainText+":"+original+":"+
                avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at);

       // System.out.println("time"+Timestamp.valueOf(update_at));

//        Map<String, Object> params = new HashMap<>();
//        params.put("user_id",user_id);
//        params.put("title", title);
//        params.put("textarea", textarea);
//        params.put("htmlText", htmlText);
//        params.put("plainText", plainText);
//        params.put("original", original);
//        params.put("avatar", avatar);
//        params.put("state", state);
//        params.put("view", view);
//        params.put("give", give);
//        params.put("collect", collect);
//        params.put("release_at", release_at);
//        params.put("update_at", update_at);
        //执行映射配置文件中的sql语句，并接收结果
        Articles article=new Articles();
        //根据时间和用户生成唯一文章id

        String id=user_id+ System.currentTimeMillis();
        System.out.println(id);

        article.setId(id);
        article.setUser_id(user_id);
        article.setTitle(title);
        article.setTextarea(textarea);
        article.setHtmlText(htmlText);
        article.setPlainText(plainText);
        if(original.equals("original")){
            original="原创";
        }else if(original.equals("transshipment")){
            original="转载";
        }else if(original.equals("translation")){
            original="翻译";
        }
        article.setOriginal(original);
        article.setAvatar(avatar);
        article.setState(state);
        article.setView(view);
        article.setGive(give);
        article.setCollect(collect);
        article.setRelease_at(release_at);
        article.setUpdate_at(update_at);
        System.out.println("set");
        int result=sqlSession.insert("insertArticle",article);
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(article);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
}
