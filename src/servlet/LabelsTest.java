package servlet;

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
import java.util.*;

public class LabelsTest {
    public static void selectLabelName(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        List<Labels> labels =sqlSession.selectList("selectLabel");
        System.out.println("label:"+labels);

        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(labels);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static void insertLabel(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入insertLabel方法");
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
        String articleId = String.valueOf(articleTagRequest.getArticleId());
        String[] selectElement = articleTagRequest.getSelectLabel();

        //全部标签(用于过滤已有标签)
        List<Labels> labels =sqlSession.selectList("selectLabel");

        for (String labelName : selectElement) {
            int flag=0;
            for (Labels label : labels) {
                System.out.println("label.getLabelName:"+label.getLabelName());
                if(label.getLabelName().equals(labelName)){
                    flag=1;
                }
            }
            System.out.println(labelName);
            if(flag==0){
                //插入标签
                Map<String, Object> params = new HashMap<>();
                params.put("labelName",labelName);
                int result=sqlSession.insert("insertLabel",params);
                System.out.println(result);
            }

        }
        // 获取前端传递的字符串数组
//        String selectElementArray = req.getParameter("selectElement");
//
//        System.out.println("selectElementArray:"+selectElementArray);
        // 将字符串数组转换为List<String>类型
//        List<String> selectElement = Arrays.asList(selectElementArray);
//        System.out.println("selectElement:"+selectElement);

//        System.out.println("selectElement:"+selectElement);
        // 执行映射配置文件中的sql语句，并接收结果
//        Map<String, Object> params = new HashMap<>();
//        params.put("articleId", articleId);
//        params.put("selectElement", selectElement);

//        int result = sqlSession.insert("insert", params);
    }
}
