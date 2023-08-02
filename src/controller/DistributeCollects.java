package controller;

import bean.Collects;
import servlet.CollectArticleTest;
import servlet.CollectTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/Collects/*")
public class DistributeCollects extends BaseServletCollects{
    //查询出用户的收藏夹（如果没有则新建一个默认收藏夹）!!!!!!!!
    public void selectCollectsByUserId(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("selectCollectsByUserId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CollectTest.selectCollectsByUserId(req,resp);
    }
    //通过CollectName获取collect_id，然后插入collect_article表（collect_id，article_id）
    public void selectCollectsByCollectNameAndUserId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectCollectsByCollectName.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        Collects collect=CollectTest.selectCollectsByCollectNameAndUserId(req,resp);
        int collect_id=collect.getId();
        CollectArticleTest.insertCollectsByCollectIdAndArticleId(collect_id,req,resp);
    }
    //先将收藏夹中的内容放到默认收藏夹中，然后删除这个收藏夹
        //根据user_id在collects表中找到’默认收藏夹‘对应的collect_id2
        //然后删除在collects表中collect_id1对应的数据
        //然后在collect_article表中将前端传来的collect_id1更新为collect_id2
    public void selectAndDeleteCollectsByUser_idAndCollect_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectAndDeleteCollectsByUser_idAndCollect_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        Collects collect=CollectTest.selectAndDeleteCollectsByUser_idAndCollect_id(req,resp);
    }
    //插入收藏夹
    public void insertCollectsCollectName(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("insertCollectsCollectName.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CollectTest.insertCollectsCollectName(req,resp);
    }
    //更新收藏夹名字
    public void updateCollectsByCollectNameAndCollect_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("updateCollectsByCollectNameAndCollect_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CollectTest.updateCollectsByCollectNameAndCollect_id(req,resp);
    }
}
