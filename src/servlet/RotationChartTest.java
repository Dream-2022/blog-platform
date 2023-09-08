package servlet;

import bean.RotationChart;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

public class RotationChartTest {
    public static void selectRotationChart(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<RotationChart> lists=sqlSession.selectList("selectRotationChart");
        Collections.sort(lists, Comparator.comparingInt(RotationChart::getState));

        // 输出排序后的列表
        for (RotationChart chart : lists) {
            System.out.println("RotationChart"+chart.getState());
            System.out.println("RotationChart"+chart);
        }
        Gson gson=new Gson();
        String Json=gson.toJson(lists);
        PrintWriter out=resp.getWriter();
        out.print(Json);
        //释放资源
        sqlSession.close();
    }
    //updateRotationChartUpState
    public static void updateRotationChartUpState(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        String state= req.getParameter("state");
        int state1=Integer.parseInt(state)-1;
        System.out.println("updateRotationChartUpState:"+state);
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("state1",state1);
        params.put("state2",state);

        int result1=sqlSession.update("updateRotationChartUpState1",params);
        sqlSession.commit();
        int result2=sqlSession.update("updateRotationChartUpState2",params);
        sqlSession.commit();
        int result3=sqlSession.update("updateRotationChartUpState3",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        //释放资源
        sqlSession.close();
    }
    public static void updateRotationChartContent(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        String state= req.getParameter("state");
        String content= req.getParameter("content");
        System.out.println("updateRotationChartUpState:"+state+":"+content);
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("state",state);
        params.put("content",content);

        int result1=sqlSession.update("updateRotationChartContent",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result1);
        resp.getWriter().print(result1);
        //释放资源
        sqlSession.close();
    }
    //插入图片
    public static void insertRotationChart(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String content=req.getParameter("content");
        System.out.println(content);
        Map<String, Object> params = new HashMap<>();
        params.put("content",content);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        int result=sqlSession.insert("insertRotationChart",params);
        System.out.println("insertRotationChart：result"+result);
    }
    //删除图片
//    deleteRotationChart
    public static void deleteRotationChart(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String state=req.getParameter("state");
        Map<String, Object> params = new HashMap<>();
        params.put("state",state);
        System.out.println(state);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        int result=sqlSession.delete("deleteRotationChart",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println("删除图片："+result);
        //还要将state的值更新
        //释放资源
        sqlSession.close();
    }

}

