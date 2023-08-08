package servlet;

import bean.Articles;
import bean.Comments;
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
import java.util.*;

public class LikesTest {
    public static void giveLike(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user_id=req.getParameter("user_id");
        String article_id= req.getParameter("article_id");
        Date create_at= new Date();
        System.out.println(user_id+":"+article_id);
//        Likes likes=new Likes();
//        likes.setArticle_id(Integer.parseInt(user_id));
//        likes.setUser_id(Integer.parseInt(article_id));
//        likes.setCreate_at(create_at);
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        params.put("article_id", article_id);
        params.put("create_at", create_at);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        int result=sqlSession.insert("insertGive",params);
        System.out.println("giveLike：result"+result);
    }
    //新增点赞信息
    public static void selectLikeByUserIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user_id=req.getParameter("user_id");
        String article_id= req.getParameter("article_id");
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        params.put("article_id", article_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        System.out.println(user_id+":"+article_id);

        PrintWriter out=resp.getWriter();
        Map<String, Object> result = new HashMap<>();
        Likes likes = sqlSession.selectOne("selectLikeByUserIdAndArticleId", params);
        if(likes!=null){
            System.out.println(likes);
            System.out.println("该用户已经点过赞");
            result.put("success","1");
        }
        else{
            System.out.println("该用户未点赞");
            result.put("success","0");
        }
        Gson gson=new Gson();
        String dataJson = gson.toJson(result);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //查询该用户的全部点赞记录
    public static void selectLikesByUser_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user_id=req.getParameter("user_id");
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        System.out.println(user_id);

        PrintWriter out=resp.getWriter();
        List<Likes> likes = sqlSession.selectList("selectLikesByUser_id", params);


        List< Articles> articlesList=new ArrayList<>();
        for (Likes like : likes) {
            String article_id=like.getArticle_id();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",article_id);
            //根据article_id查找文章
            Articles article=sqlSession.selectOne("selectArticlesUserIdByArticleId",params1);
            articlesList.add(article);
        }

        Gson gson=new Gson();
        String dataJson = gson.toJson(articlesList);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //查询user_id的所有文章，查看其他人给他文章的点赞情况
    public static void selectLikesArticlesByUser_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user_id=req.getParameter("user_id");
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        System.out.println(user_id);

        PrintWriter out=resp.getWriter();
        List<Articles> articles = sqlSession.selectList("selectArticlesByUser_idDetail", params);


        List<Likes> likesList=new ArrayList<>();
        for (Articles article : articles) {
            String article_id=article.getId();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("article_id",article_id);
            //根据article_id查找likes中的点赞记录
            List<Likes> likes=sqlSession.selectList("selectLikesByArticle_id",params1);
            likesList.addAll(likes);
        }
        for (Likes like : likesList) {
            params.put("id",like.getUser_id());
            System.out.println(user_id);
            params.remove("user_id");
            System.out.println("map:"+params);
            User user=sqlSession.selectOne("selectUserById",params);
            System.out.println(user);
            like.setNickname(user.getNickname());
            like.setPicture(user.getPicture());

            //找到article中的title
            params.remove("id");
            params.put("id",like.getArticle_id());
            Articles article=sqlSession.selectOne("selectArticlesUserIdByArticleId",params);
            like.setArticleTitle(article.getTitle());
        }
        Gson gson=new Gson();
        String dataJson = gson.toJson(likesList);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);

    }
    //在主页根据点赞的个数排序
    public static void MainPageGiveCountTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        PrintWriter out=resp.getWriter();
        List<String> articles_id = sqlSession.selectList("MainPageGiveCountTest");
        System.out.println("articles_id"+articles_id);

        List< Articles> articlesList=new ArrayList<>();
        for (String article_id : articles_id) {
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",article_id);
            //根据article_id查找文章
            Articles article=sqlSession.selectOne("selectArticlesUserIdByArticleId",params1);
            articlesList.add(article);
        }

        Gson gson=new Gson();
        String dataJson = gson.toJson(articlesList);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //删除点赞
    public static void deleteLike(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user_id=req.getParameter("user_id");
        String article_id= req.getParameter("article_id");
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        params.put("article_id", article_id);
        System.out.println(user_id+":"+article_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        int result=sqlSession.delete("deleteLike",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println("取消点赞："+result);
        //释放资源
        sqlSession.close();
    }
}
