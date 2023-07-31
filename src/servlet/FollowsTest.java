package servlet;

import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class FollowsTest {
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
}
