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
    //插入专栏文章关系
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
    //通过专栏id找到所有的article_id，逐个从articles表中找到文章
    public static void selectColumnArticleByColumnId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectColumnArticleByColumnId");
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String id=req.getParameter("id");
        System.out.println("专栏id:"+id);

        Map<String, Object> params = new HashMap<>();
        params.put("column_id",id);
        List<Column_article>  columnArticles=sqlSession.selectList("selectColumnArticleByColumnId",params);
        System.out.println("columnArticleList:"+columnArticles);

        List<Articles> articlesList = new ArrayList<>();
        for (Column_article columnArticle : columnArticles) {
            String article_id=columnArticle.getArticle_id();
            //通过article_id找到文章对象
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",article_id);
            Articles article =sqlSession.selectOne("selectArticlesUserIdByArticleIdAndState",params1);
            if(article!=null){
                articlesList.add(article);
            }
        }
        System.out.println("序列化前："+articlesList);
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(articlesList);

        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
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
    //找到属于这个分类的文章id,根据这个文章id，从column_article表中找这篇文章是否还属于其他分类
    public static void selectAndDeleteColumnArticleByUser_idAndCollect_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String column_id1=req.getParameter("column_id1");
        String column_id2=req.getParameter("column_id2");
        System.out.println("column_id1:"+column_id1+"column_id2:"+column_id2);
        Map<String, Object> params = new HashMap<>();
        params.put("column_id",column_id1);
        List<Column_article> column_articles =sqlSession.selectList("selectColumnArticleByColumnId",params);
        System.out.println("column_articles:"+column_articles);

        //遍历找到的所有文章id，找这篇文章是否还属于其他分类
        for (Column_article columnArticle : column_articles) {
            String  article_id=columnArticle.getArticle_id();
            Map<String, Object> params3 = new HashMap<>();
            params3.put("article_id",article_id);
            List<Articles>articlesList=sqlSession.selectList("selectColumnArticleByArticleId",params3);
            System.out.println("articlesList:"+articlesList);
                //说明只有一个分类（特判）
                if(articlesList.size()==1){
                    //要将这篇文章article_id所在的地方改为column_id2
                    Map<String, Object> params1 = new HashMap<>();
                    params1.put("article_id",article_id);
                    params1.put("column_id2",column_id2);
                    int result=sqlSession.update("updateColumnArticleByColumn_idAndArticle_id",params1);
                    System.out.println("更新专栏column_id1改为column_id2："+result);
                    break;
                }
                //否则的话就将记录删除（article_id和column_id1）
                else{
                    Map<String, Object> params2 = new HashMap<>();
                    params2.put("column_id1",column_id1);
                    params2.put("article_id",article_id);
                    int result1=sqlSession.delete("deleteColumnArticleByColumn_idAndArticle_id",params2);
                    System.out.println("删除对应专栏文章关系："+result1);
                    break;
                }

        }
        //接下来在columns表中删除对应的collect_id1
        SqlSession sqlSession1= ObtainSqlSession.obtainSqlSession();
        int result=sqlSession1.delete("deleteColumnsByColumn_id",params);
        System.out.println("删除专栏："+result);
    }
}
