package servlet;

import bean.Columns;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class ColumnTest {
    public static  void selectColumnName(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        List<Columns> columns =sqlSession.selectList("selectColumn");
        System.out.println("label:"+columns);

        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(columns);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
}
