package servlet;

import bean.Likes;
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
import java.util.Map;

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
