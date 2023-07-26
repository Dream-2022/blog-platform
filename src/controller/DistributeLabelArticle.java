package controller;

import servlet.Label_ArticleTest;

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
        Label_ArticleTest.insertLabelArticle(req,resp);
    }
}
