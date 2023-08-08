package servlet;

import bean.*;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

public class CollectTest {
    public static void selectCollectsByUserId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        System.out.println("user_id:"+user_id);
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        List<Collects> collects =sqlSession.selectList("selectCollectsByUserId",params);
        System.out.println("Collects:"+collects);

        //如果收藏夹list为空，则为该用户新建一个默认收藏夹
        System.out.println("collects.size():"+collects.size());
        if(collects.size()==0){
            Collects collect=new Collects();
            collect.setUser_id(Integer.parseInt(user_id));
            collect.setCollectName("默认收藏夹");
            Date create_at=new Date();
            collect.setCreate_at(create_at);
            int result =sqlSession.insert("insertCollectCollectName",collect);
            System.out.println("添加默认收藏夹成功："+result);
            //获取插入的id是多少
            params.put("collectName","默认收藏夹");
            Collects collect1=sqlSession.selectOne("selectCollectsByUserIdAndCollectName",params);
            collects.add(collect1);
        }


        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(collects);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static Collects selectCollectsByCollectNameAndUserId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String collectName=req.getParameter("collectName");
        String user_id=req.getParameter("user_id");
        System.out.println("collectNameAndUser_id:"+collectName+":"+user_id);
        Map<String, Object> params = new HashMap<>();
        params.put("collectName",collectName);
        params.put("user_id",user_id);
        Collects collect =sqlSession.selectOne("selectCollectsByCollectNameAndUserId",params);
        System.out.println("11111111Collects:"+collect);
        //传过去
        return collect;
    }
    //将收藏夹中的内容放到默认收藏夹中，然后删除这个收藏夹
    public static Collects selectAndDeleteCollectsByUser_idAndCollect_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        String collect_id=req.getParameter("collect_id");
        System.out.println("user_id:"+user_id+"collect_id:"+collect_id);
        Map<String, Object> params = new HashMap<>();
        params.put("collectName","默认收藏夹");
        params.put("user_id",user_id);
        Collects collect =sqlSession.selectOne("selectCollectsByCollectNameAndUserId",params);
        System.out.println("Collects:"+collect);

        //更改
        int collect_id2=collect.getId();
        String collect_id1=req.getParameter("collect_id");
        //将collect_article表中的collect_id1改为collect_id2
        Map<String, Object> params2 = new HashMap<>();
        params2.put("collect_id1",collect_id1);
        params2.put("collect_id2",collect_id2);
        int result=sqlSession.update("updateCollectArticleByCollect_id",params2);
        System.out.println("更新收藏夹："+result);

        //删除collect_id对应的收藏夹
        SqlSession sqlSession1= ObtainSqlSession.obtainSqlSession();
        Map<String, Object> params1 = new HashMap<>();
        params1.put("id",collect_id);
        int result2=sqlSession1.delete("DeleteCollectsByCollect_id",params1);
        System.out.println("删除收藏夹："+result2);
        return collect;
    }
    //根据user_id的所有文章，找到所有的收藏记录
    public static void selectCollectsArticlesByUser_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user_id=req.getParameter("user_id");
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        System.out.println(user_id);

        PrintWriter out=resp.getWriter();
        List<Articles> articles = sqlSession.selectList("selectArticlesByUser_idDetail", params);


        List<Collect_article> collectArticleList=new ArrayList<>();
        //根据文章找到收藏记录
        for (Articles article : articles) {
            String article_id=article.getId();
            Map<String, Object> params1 = new HashMap<>();
            params1.put("article_id",article_id);
            //根据article_id查找likes中的点赞记录
            List<Collect_article> collect_articles=sqlSession.selectList("selectCollectsByArticleId",params1);
            collectArticleList.addAll(collect_articles);
        }
        for (Collect_article collect_article : collectArticleList) {
            //从collect_article中找到collect_id，找到user_id，然后找到user
            int collect_id=collect_article.getCollect_id();
            Map<String, Object> params2 = new HashMap<>();
            params2.put("collect_id",collect_id);
            System.out.println(params2);
            Collects collects=sqlSession.selectOne("selectCollectByCollect_id",params2);
            int userId=collects.getUser_id();
            Map<String, Object> params3 = new HashMap<>();
            params3.put("id",userId);
            User user=sqlSession.selectOne("selectUserById",params3);
            collect_article.setNickname(user.getNickname());
            collect_article.setPicture(user.getPicture());
            collect_article.setUser_id(String.valueOf((user.getId())));

            //找到article中的title
            params.remove("id");
            params.put("id",collect_article.getArticle_id());
            Articles article=sqlSession.selectOne("selectArticlesUserIdByArticleId",params);
            collect_article.setArticleTitle(article.getTitle());

        }
        System.out.println(collectArticleList);
        Gson gson=new Gson();
        String dataJson = gson.toJson(collectArticleList);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static void insertCollectsCollectName(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        String collectName=req.getParameter("collectName");
        System.out.println("user_id:"+user_id+"collectName:"+collectName);
        Collects collect=new Collects();
        collect.setUser_id(Integer.parseInt(user_id));
        collect.setCollectName(collectName);
        Date create_at=new Date();
        collect.setCreate_at(create_at);
        int result =sqlSession.insert("insertCollectCollectName",collect);
        System.out.println("Collects:"+result);

        //序列化传过去
        PrintWriter out=resp.getWriter();
        out.print(result);
    }
    //更新收藏夹名字
    public static void updateCollectsByCollectNameAndCollect_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String collectName=req.getParameter("collectName");
        int collect_id= Integer.parseInt(req.getParameter("collect_id"));
        System.out.println("collectNameAndCollect_id:"+collectName+":"+collect_id);
        Map<String, Object> params = new HashMap<>();
        params.put("collectName",collectName);
        params.put("id",collect_id);
        int result=sqlSession.update("updateCollectsByCollectNameAndCollect_id",params);
        System.out.println("更新收藏夹名字"+result);
        resp.getWriter().print(result);
    }
}
