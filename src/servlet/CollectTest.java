package servlet;

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
}
