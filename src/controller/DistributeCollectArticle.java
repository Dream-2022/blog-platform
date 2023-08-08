package controller;

import servlet.CollectArticleTest;
import servlet.LikesTest;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/CollectArticle/*")
public class DistributeCollectArticle extends BaseServletCollectArticle {
    public void selectCollectsByUserIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectCollectsByUserIdAndArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        CollectArticleTest.selectCollectsByUserIdAndArticleId(req, resp);
    }
    //通过collect_id找article_id，然后再articles表中查找文章
    public void selectCollectArticleByCollectId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectCollectArticleByCollectId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        CollectArticleTest.selectCollectArticleByCollectId(req, resp);
    }
    //首页获取收藏最多
    public void MainPageCollectArticleCountTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("MainPageCollectArticleCountTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        CollectArticleTest.MainPageCollectArticleCountTest(req, resp);
    }
    public void deleteCollectArticleByCollectIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("deleteCollectArticleByCollectIdAndArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        CollectArticleTest.deleteCollectArticleByCollectIdAndArticleId(req, resp);
    }

}
