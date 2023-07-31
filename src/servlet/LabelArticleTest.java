package servlet;

import bean.Columns;
import bean.LabelList;
import bean.Label_article;
import bean.Labels;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LabelArticleTest {
    //插入文章信息
    public static void insertLabelArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入insertLabelArticle方法");

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

        System.out.println("删除原有标签中："+article_id);
        //删除原有已经保存的label_id对应有的标签
        Map<String, Object> params1 = new HashMap<>();
        params1.put("article_id",article_id);

        int result1=sqlSession1.delete("deleteLabelArticleByArticleId",params1);
        System.out.println("deleteLabelArticleByArticleId结果:"+result1);
        //提交事务
        sqlSession1.commit();
        //处理结果
        System.out.println("删除原有标签："+result1);
        sqlSession1.close();

        //通过labelName从labels表中找label_id
        for (String labelName : selectElement) {
            SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
            System.out.println(labelName);
            Map<String, Object> params = new HashMap<>();
            params.put("labelName",labelName);
            Labels label=sqlSession.selectOne("selectLabelByLabelName", params);
            int label_id=label.getId();
            //再将找到的label_id和articles_id存入label_articles表
            Map<String, Object> params2 = new HashMap<>();
            params2.put("label_id",label_id);
            params2.put("article_id",article_id);
            int result=sqlSession.insert("insertLabelArticleById",params2);
            System.out.println("插入LabelArticle表："+result);
            sqlSession.close();
        }
    }

    //通过articleId找到label_id,然后从labels表中找labelName
    public static  void selectLabelArticleByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入selectLabelArticleByArticleId");
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        System.out.println("article_id:"+article_id);
        Label_article label_article=new Label_article();
        label_article.setArticle_id(article_id);
        System.out.println("label_article:"+label_article);
        System.out.println("article_id:"+article_id);
        List<Label_article> label_articlesList =sqlSession.selectList("selectLabelArticleByArticleId",label_article);
        System.out.println("label_articlesList:"+label_articlesList);

        List<Labels> labels = new ArrayList<>();
        for (Label_article labelArticle : label_articlesList) {
            int id=labelArticle.getLabel_id();
            System.out.println("id:"+id);
            //通过id从labels表中拿到label表的list集合，在前端获取labelName
            Map<String, Object> params1 = new HashMap<>();
            params1.put("id",id);
            Labels label =sqlSession.selectOne("selectLabelsByArticleId",params1);
            labels.add(label);
        }
        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(labels);
        System.out.println("序列化前："+labels);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
}
