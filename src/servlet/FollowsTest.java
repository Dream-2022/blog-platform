package servlet;

import bean.Articles;
import bean.Follows;
import bean.User;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

public class FollowsTest {
    public static void selectFollowsByBlogger_idAndFans_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String blogger_id=req.getParameter("blogger_id");
        String fans_id= req.getParameter("fans_id");
        System.out.println(blogger_id+":"+fans_id);
        Map<String, Object> params = new HashMap<>();
        params.put("blogger_id",blogger_id);
        params.put("fans_id", fans_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Follows> follows=sqlSession.selectList("selectFollowsByBlogger_idAndFans_id",params);
        int flag=0;
        if(follows.size()!=0){
            flag=1;
        }
        PrintWriter out=resp.getWriter();
        out.print(flag);
    }
    //根据fans_id查找blogger_id
    public static void selectFollowsByFans_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String fans_id= req.getParameter("user_id");
        System.out.println(fans_id);
        Map<String, Object> params = new HashMap<>();
        params.put("fans_id", fans_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Follows> follows=sqlSession.selectList("selectFollowsByFans_id",params);
        System.out.println("follows:"+follows);
        List<User> users=new ArrayList<>();
        SqlSession sqlSession1 = ObtainSqlSession.obtainSqlSession();
        for (Follows follow : follows) {
            //通过用户id查找用户信息
            int blogger_id=follow.getBlogger_id();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id", blogger_id);
            User user=sqlSession1.selectOne("selectUserById",params1);
            users.add(user);
        }
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(users);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //根据blogger_id查找fans_id
    public static void selectFollowsByBlogger_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入selectFollowsByBlogger_id");
        String blogger_id= req.getParameter("user_id");
        System.out.println(blogger_id);
        Map<String, Object> params = new HashMap<>();
        params.put("blogger_id", blogger_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Follows> follows=sqlSession.selectList("selectFollowsByBlogger_id",params);
        System.out.println("follows:"+follows);
        List<User> users=new ArrayList<>();
        for (Follows follow : follows) {
            //通过用户id查找用户信息
            int fan_id=follow.getFans_id();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id", fan_id);
            User user=sqlSession.selectOne("selectUserById",params1);
            users.add(user);
        }
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(users);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //首页查看我的关注发布的文章
    public static void MainPageFollowCountTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("MainPageFollowCountTest");
        String fan_id= req.getParameter("user_id");
        System.out.println(fan_id);
        Map<String, Object> params = new HashMap<>();
        params.put("fans_id", fan_id);
        System.out.println("P:"+params);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Follows> follows=sqlSession.selectList("selectFollowsByFans_id",params);
        System.out.println("follows:"+follows);
        List<Articles> articles=new ArrayList<>();
        SqlSession sqlSession1 = ObtainSqlSession.obtainSqlSession();
        for (Follows follow : follows) {
            //通过用户id查找用户信息
            int blogger_id=follow.getBlogger_id();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("user_id", blogger_id);
            List<Articles> article=sqlSession1.selectList("selectArticlesUserIdByUserIdAndState",params1);
            articles.addAll(article);
        }
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(articles);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static void insertFollowsByBlogger_idAndFans_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String blogger_id=req.getParameter("blogger_id");
        String fans_id= req.getParameter("fans_id");
        System.out.println(blogger_id+":"+fans_id);
        Map<String, Object> params = new HashMap<>();
        params.put("blogger_id",blogger_id);
        params.put("fans_id", fans_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        int result=sqlSession.insert("insertFollowsByBlogger_idAndFans_id",params);
        System.out.println("insertFollowsByBlogger_idAndFans_id：result"+result);
    }
    public static void deleteFollowsByBlogger_idAndFans_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入deleteFollowsByBlogger_idAndFans_id方法");
        String blogger_id=req.getParameter("blogger_id");
        String fans_id= req.getParameter("fans_id");
        System.out.println(blogger_id+":"+fans_id);
        Map<String, Object> params = new HashMap<>();
        params.put("blogger_id",blogger_id);
        params.put("fans_id", fans_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        int result=sqlSession.delete("deleteFollowsByBlogger_idAndFans_id",params);
        System.out.println("deleteFollowsByBlogger_idAndFans_id：result"+result);
    }
}
