package servlet;

import bean.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ColumnArticleTest {
    public static void insertColumnArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入insertColumnArticle方法");

        //调用工具类
        SqlSession sqlSession1 = ObtainSqlSession.obtainSqlSession();

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
        String article_id = String.valueOf(articleTagRequest.getArticleId());
        String[] selectElement = articleTagRequest.getSelectLabel();

        System.out.println("删除文章的原有分类，文章article_id为："+article_id);



        //删除原有已经保存的column_id对应有的分类
        Map<String, Object> params1 = new HashMap<>();
        params1.put("article_id",article_id);

        int result1=sqlSession1.delete("deleteColumnArticleByArticleId",params1);
        System.out.println("deleteColumnArticleByArticleId结果:"+result1);
        //提交事务
        sqlSession1.commit();
        //处理结果
        System.out.println("删除原有标签："+result1);
        sqlSession1.close();

        //通过columnName从columns表中找column_id
        for (String columnName : selectElement) {
            SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
            System.out.println(columnName);

            Map<String, Object> params = new HashMap<>();
            params.put("columnName",columnName);
            Columns column=sqlSession.selectOne("selectColumnByColumnName", params);
            int column_id=column.getId();

            //再将找到的column_id和articles_id存入column_articles表
            Map<String, Object> params2 = new HashMap<>();
            params2.put("column_id",column_id);
            params2.put("article_id",article_id);
            int result=sqlSession.insert("insertColumnArticleById",params2);
            System.out.println("插入ColumnArticle表："+result);
            sqlSession.close();
        }
    }
    //通过articleId找到label_id,然后从labels表中找labelName
    public static  void selectColumnArticleByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectColumnArticleByArticleId");
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        System.out.println("article_id:"+article_id);
        Column_article column_article=new Column_article();
        column_article.setArticle_id(article_id);
        System.out.println("column_article:"+column_article);
        System.out.println("article_id:"+article_id);
        List<Column_article> column_articlesList =sqlSession.selectList("selectColumnArticleByArticleId",column_article);
        System.out.println("column_articlesList:"+column_articlesList);

        List<Columns> columns = new ArrayList<>();
        for (Column_article columnArticle : column_articlesList) {
            int id=columnArticle.getColumn_id();
            System.out.println("id:"+id);
            //通过id从labels表中拿到label表的list集合，在前端获取labelName
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",id);
            Columns column =sqlSession.selectOne("selectColumnsByArticleId",params1);
            columns.add(column);
        }
        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(columns);
        System.out.println("序列化前："+columns);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
}
