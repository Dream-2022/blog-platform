package controller;

import servlet.CollectArticleTest;
import servlet.LikesTest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/CollectArticle/*")
public class DistributeCollectArticle extends BaseServletCollectArticle{
    public void selectCollectsByUserIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectCollectsByUserIdAndArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CollectArticleTest.selectCollectsByUserIdAndArticleId(req,resp);
    }
    public void deleteCollectArticleByCollectIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("deleteCollectArticleByCollectIdAndArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CollectArticleTest.deleteCollectArticleByCollectIdAndArticleId(req,resp);
    }
}
