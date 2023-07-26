package servlet;

import bean.Articles;
import bean.Likes;
import bean.User;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ArticlesTest {
    //查找全部文章（修改为根据id找文章）
    public static List<Articles> selectByArticles(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Articles> lists=sqlSession.selectList("selectArticle");
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
        return lists;
    }
    //插入数据（保存文章)
    public static void insertArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
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
    //给文章的点赞数自增
    public static void updateArticleGiveLike(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id=req.getParameter("article_id");
        String give= req.getParameter("give");
        System.out.println(id+":"+give);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
//        Articles articles=new Articles();
//        articles.setUser_id(id);
//        articles.setGive(give);
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("give", give);
        int result = sqlSession.update("updateArticleGiveLike", params);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
    //将文章的浏览量自增
    public static void updateArticleGiveView(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入updateArticleGiveView方法");
        String id=req.getParameter("id");
        String view= req.getParameter("view");
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
//        Articles articles=new Articles();
//        articles.setUser_id(id);
//        articles.setGive(give);
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("view", view);
        System.out.println("id:"+id+"view:"+view);
        int result = sqlSession.update("updateArticleGiveView", params);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
    //修改文章，就是点了保存（发布）之后，再次点击保存
    public static void updateArticleTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("updateArticleTest");
        String id=req.getParameter("id");
        String title=req.getParameter("title");
        String textarea=req.getParameter("textarea");
        String htmlText=req.getParameter("html");
        String plainText=req.getParameter("content");
        String original=req.getParameter("original");
        if(original.equals("original")){
            original="原创";
        }
        else if(original.equals("transshipment")){
            original="转载";
        }
        else if(original.equals("translation")){
            original="翻译";
        }
        String avatar= req.getParameter("avatar");
        String state=req.getParameter("state");
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("title", title);
        params.put("textarea", textarea);
        params.put("plainText", plainText);
        params.put("htmlText", htmlText);
        params.put("original", original);
        params.put("avatar", avatar);
        params.put("state", state);
        System.out.println("id:"+id+"title:"+title+"textarea:"+textarea+"plainText:"+plainText+"htmlText:"+htmlText+"original:"+original+"avatar:"+avatar+"state:"+state);
        int result = sqlSession.update("updateArticleTest", params);
        System.out.println("修改文章，就是点了保存（发布）之后，再次点击保存：事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
}
