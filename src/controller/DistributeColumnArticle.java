package controller;

import servlet.ColumnArticleTest;
import servlet.LabelArticleTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ColumnArticle/*")
public class DistributeColumnArticle extends BaseServletColumnArticle{
    //通过article_id读取文章的column_id，然后从columns表中读取columnName
    public void selectColumnArticleByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectColumnArticleByArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ColumnArticleTest.selectColumnArticleByArticleId(req,resp);
    }
    //插入文章id（article_id和column_id）
    public void insertColumnArticle(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("insertColumnArticle.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ColumnArticleTest.insertColumnArticle(req,resp);
    }

}
