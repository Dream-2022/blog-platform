package controller;

import servlet.LabelArticleTest;
import servlet.LikesTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/LabelArticle/*")
public class DistributeLabelArticle extends BaseServletLabelArticle{
    public void insertLabelArticle(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("InsertLabelArticle.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LabelArticleTest.insertLabelArticle(req,resp);
    }
    //通过article_id读取文章的label_id，然后从labels表中读取labelName
    public void selectLabelArticleByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectLabelArticleByArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LabelArticleTest.selectLabelArticleByArticleId(req,resp);
    }
    //找到标签数最多的，传四个
    public void selectLabelArticleByCount(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectLabelArticleByCount.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LabelArticleTest.selectLabelArticleByCount(req,resp);
    }
    //搜索标签
    public void likeSelectLabelArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("likeSelectLabelArticle.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LabelArticleTest.likeSelectLabelArticle(req,resp);
    }
}
