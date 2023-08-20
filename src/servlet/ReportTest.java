package servlet;

import bean.Articles;
import bean.Collects;
import bean.Reports;
import bean.User;
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

public class ReportTest {
    //查询receive_id是否存在被举报的文章
    public static void selectReportsByReceive_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String receive_id=req.getParameter("user_id");
        System.out.println("receive_id:"+receive_id);
        Map<String, Object> params = new HashMap<>();
        params.put("receive_id",receive_id);
        List<Reports> reports =sqlSession.selectList("selectReportsByReceive_id",params);
        System.out.println("reports:"+reports);

        //找到对应文章id,找到User的nickname
        for (Reports report : reports) {
            String article_id=report.getArticle_id();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",article_id);
            //获取文章
            Articles article=sqlSession.selectOne("selectArticlesUserIdByArticleId",params1);
            //传过去的是Report对象，到时候给Report对象加字段(article_title)
            System.out.println(article);
            System.out.println(article.getTitle());
            report.setArticle_title(article.getTitle());
            report.setArticle_content(article.getTextarea());
            System.out.println("report:"+report);

            Map<String, Object> params2 = new HashMap<>();
            params2.put("id",report.getUser_id());
            User user=sqlSession.selectOne("selectUserById",params2);
            report.setUserNickname(user.getNickname());
        }
        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(reports);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //查找全部的记录
    public static void selectReports(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String receive_id=req.getParameter("user_id");
        System.out.println("receive_id:"+receive_id);
        Map<String, Object> params = new HashMap<>();
        params.put("receive_id",receive_id);
        List<Reports> reports =sqlSession.selectList("selectReports",params);
        System.out.println("reports:"+reports);

        //找到对应文章id,找到User的nickname
        for (Reports report : reports) {
            String article_id=report.getArticle_id();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",article_id);
            //获取文章
            Articles article=sqlSession.selectOne("selectArticlesUserIdByArticleId",params1);
            //传过去的是Report对象，到时候给Report对象加字段(article_title)
            System.out.println(article);
            System.out.println(article.getTitle());
            report.setArticle_title(article.getTitle());
            report.setArticle_content(article.getTextarea());
            System.out.println("report:"+report);

            Map<String, Object> params2 = new HashMap<>();
            params2.put("id",report.getUser_id());
            User user=sqlSession.selectOne("selectUserById",params2);
            report.setUserNickname(user.getNickname());
            report.setUserName(user.getUsername());

            Map<String, Object> params3 = new HashMap<>();
            params3.put("id",report.getReceive_id());
            User user2=sqlSession.selectOne("selectUserById",params3);
            report.setReceiveName(user2.getUsername());
        }
        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(reports);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //忽略举报，将content更新
    public static void updateReportsByReport_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("updateReportsByReport_id");
        String id=req.getParameter("id");
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("report_content", "");
        System.out.println("id:"+id);
        int result = sqlSession.update("updateReportsByReport_id", params);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }

    //新增举报语句
    public static void insertReports(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        String receive_id=req.getParameter("receive_id");
        String article_id=req.getParameter("article_id");
        String report_content=req.getParameter("report_content");
        System.out.println("user_id:"+user_id+"receive_id:"+receive_id+"article_id:"+article_id+"report_content:"+report_content);
        Reports report=new Reports();
        report.setUser_id(Integer.parseInt(user_id));
        report.setReceive_id(Integer.parseInt(receive_id));
        report.setArticle_id(article_id);
        Date create_at=new Date();
        report.setCreate_at(create_at);
        report.setReport_content(report_content);
        int result=sqlSession.insert("insertReports",report);
        System.out.println("insertReports：result"+result);
    }
    //管理员查看所有的举报信息(管理员审核暂未发现违规内容)


}
