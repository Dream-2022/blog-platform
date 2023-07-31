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
    public void insertCollectsCollectName(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("insertCollectsCollectName.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CollectTest.insertCollectsCollectName(req,resp);
    }

}
