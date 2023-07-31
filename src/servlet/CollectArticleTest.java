package servlet;

import bean.Collect_article;
import bean.Collects;
import bean.Columns;
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

public class CollectArticleTest {
    //点击收藏之后，插入collect_article表
    public static void insertCollectsByCollectIdAndArticleId(int collect_id,HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("key");
        System.out.println("article_id:"+article_id+"collect_id:"+collect_id);
        Collect_article collect_article=new Collect_article();
        collect_article.setCollect_id(collect_id);
        collect_article.setArticle_id(article_id);
        int result =sqlSession.insert("insertCollectsByCollectIdAndArticleId",collect_article);
        System.out.println("collect_article:"+result);

        //传过去
        PrintWriter out=resp.getWriter();
        System.out.println("获取到collect_id:"+collect_id);
        out.print(collect_id);
    }
    //通过article_id查找这个文章有多少收藏次数
    //通过article_id和user_id查找该用户是否收藏了这篇文章
    public static void selectCollectsByUserIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入selectCollectsByUserIdAndArticleId方法");
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        String user_id=req.getParameter("user_id");
        System.out.println("article_id:"+article_id+"user_id:"+user_id);

        //通过article_id和user_id在collects表中所有的收藏夹id（id），通过id在collect_article表中查找该用户是否收藏了这篇文章
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        List<Collects> collects =sqlSession.selectList("selectCollectsByUserId",params);
        System.out.println("collects:"+collects);


        int flag=0;
        Map<String, Object> params1 = new HashMap<>();
        for (Collects collect : collects) {
            System.out.println("selectCollectsByUserIdAndArticleId:"+collect);
            int collect_id=collect.getId();
            Map <String, Object> params3 = new HashMap<>();
            params3.put("collect_id",collect_id);
            params3.put("article_id",article_id);
            System.out.println("111111111"+collect_id+":"+article_id);



            List<Collect_article> collectArticle =sqlSession.selectList("selectCollectArticleByCollectIdAndArticleId",params3);
            System.out.println("size:"+collectArticle.size());
            if(collectArticle.size()!=0){
                System.out.println("找到了");
                params1.put("collectId",collect.getId());
                flag=1;
                break;
            }
        }

        params1.put("success",flag);
        if(flag==0){
            params1.put("collectId",0);
        }

        //通过article_id查找这个文章有多少收藏次数
        Map<String, Object> params2 = new HashMap<>();
        params2.put("article_id",article_id);
        List<Collect_article> collectArticleList=sqlSession.selectList("selectCollectsByArticleId",params2);
        int sum=0;
        for (Collect_article collectArticle : collectArticleList) {
            sum++;
            System.out.println(collectArticle);
        }
        params1.put("count",sum);
        //传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(params1);
        System.out.println("序列化前："+params1);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //通过article_id和collect_id删除收藏记录
    public static void deleteCollectArticleByCollectIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String collect_id=req.getParameter("collect_id");
        String article_id= req.getParameter("article_id");
        Map<String, Object> params = new HashMap<>();
        params.put("collect_id",collect_id);
        params.put("article_id", article_id);
        System.out.println(collect_id+":"+article_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        int result=sqlSession.delete("deleteCollectArticleByCollectIdAndArticleId",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println("取消收藏："+result);
        //释放资源
        sqlSession.close();
    }
}
