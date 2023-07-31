package servlet;

import bean.Columns;
import bean.LabelList;
import bean.Labels;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ColumnTest {
    public static  void selectColumnName(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        System.out.println("user_id:"+user_id);
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        List<Columns> columns =sqlSession.selectList("selectColumn",params);
        System.out.println("columns:"+columns);

        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(columns);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static void InsertColumn(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入insertColumn方法");
        //调用工具类
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        // 获取前端传递的JSON数据
        StringBuilder requestBody = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {

                requestBody.append(line);
            }
        }

        // 将JSON数据转换为Java对象
        ObjectMapper objectMapper = new ObjectMapper();
        LabelList articleTagRequest = objectMapper.readValue(requestBody.toString(), LabelList.class);

        // 获取articleId和selectElement
        String user_id = String.valueOf(articleTagRequest.getArticleId());//前端传过来的是user_id
        String[] selectElement = articleTagRequest.getSelectLabel();

        //全部标签(用于过滤已有分类)
        System.out.println("user_id:"+user_id);
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        List<Columns> columns=sqlSession.selectList("selectColumn",params);
        Date create_at= new Date();
        for (String columnName : selectElement) {
            int flag=0;
            for (Columns column : columns) {
                System.out.println("column.getColumnName:"+column.getColumnName());
                if(column.getColumnName().equals(columnName)){
                    flag=1;
                }
            }
            System.out.println(columnName);
            if(flag==0){
                //插入标签
//                Map<String, Object>  params1 = new HashMap<>();
//                params1.put("columnName",columnName);
//                params1.put("user_id",user_id);
//                params1.put("create_at",create_at);
                Columns column=new Columns();
                column.setUser_id(Integer.parseInt(user_id));
                column.setColumnName(columnName);
                column.setCreate_at(create_at);
                int result=sqlSession.insert("insertColumn",column);
                System.out.println(result);
            }
        }
    }
}
