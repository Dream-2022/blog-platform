package servlet;

import bean.LabelList;
import bean.Labels;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Label_ArticleTest {
    public static void insertLabelArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //删除原有已经保存的label_id对应有的标签

        //通过labelName从labels表中找label_id
        System.out.println("进入insertLabelArticle方法");
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
        String article_id = String.valueOf(articleTagRequest.getArticleId());
        String[] selectElement = articleTagRequest.getSelectLabel();

        for (String labelName : selectElement) {
            System.out.println(labelName);
            Map<String, Object> params = new HashMap<>();

            Labels label=sqlSession.selectOne("selectLabelByLabelName", params);
            int label_id=label.getId();
            //再将找到的label_id和articles_id存入label_articles表
            params.put("label_id",label_id);
            params.put("article_id",article_id);
            int result=sqlSession.insert("insertCollectArticleById",params);
            System.out.println("插入LabelArticle表："+result);
        }

    }
}
