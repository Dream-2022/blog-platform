package servlet;

import bean.Columns;
import bean.Comments;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommentTest {
    public static void selectCommentsByArticle_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        System.out.println("article_id:"+article_id);
        Map<String, Object> params = new HashMap<>();
        params.put("article_id",article_id);
        List<Comments> comments =sqlSession.selectList("selectCommentsByArticle_idAndUpLevel",params);
        System.out.println("comments:"+comments);

        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(comments);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //通过up_level是否与comments表中的id匹配
    public static void selectCommentsByUp_level(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String up_level=req.getParameter("up_level");
        System.out.println("up_level:"+up_level);//传过来的是item.id
        Map<String, Object> params = new HashMap<>();
        params.put("up_level",up_level);
        List<Comments> comments =sqlSession.selectList("selectCommentsByUp_level",params);
        System.out.println("comments:"+comments);

        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(comments);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //显示评论总数
    public static void selectCommentsForCountByArticle_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        System.out.println("article_id:"+article_id);//传过来的是item.id
        Map<String, Object> params = new HashMap<>();
        params.put("article_id",article_id);
        List<Comments> comments =sqlSession.selectList("selectCommentsForCountByArticle_id",params);
        System.out.println("comments:"+comments);

        //序列化传过去
        PrintWriter out=resp.getWriter();

        out.print(comments.size());
    }
    public static void insertComments(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String article_id=req.getParameter("article_id");
        String receiver_id= req.getParameter("receiver_id");
        String user_id= req.getParameter("user_id");
        String content= req.getParameter("content");
        String num= req.getParameter("num");
        String up_level= req.getParameter("up_level");
        Date create_at= new Date();
        System.out.println("receiver_id:"+receiver_id+"article_id:"+article_id+"user_id:"+user_id+"content："+content+"num:"+num+"up_level:"+up_level);
        Map<String, Object> params = new HashMap<>();
        params.put("article_id",article_id);
        params.put("receiver_id", receiver_id);
        params.put("user_id", user_id);
        params.put("content", content);
        params.put("num", num);
        params.put("up_level", up_level);
        params.put("create_at",create_at);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        int result=sqlSession.insert("insertComments",params);
        System.out.println("insertComments：result"+result);


        //按照刚刚插入的信息，在查找一遍，将找到的信息返回给前端
        params.remove("create_at");
        Comments comments =sqlSession.selectOne("selectCommentsByAll",params);
        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(comments);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
}
