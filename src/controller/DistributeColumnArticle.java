package controller;

import servlet.CollectArticleTest;
import servlet.ColumnArticleTest;
import servlet.LabelArticleTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

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
    //通过专栏id找到所有的article_id，逐个从articles表中找到文章
    public void selectColumnArticleByColumnId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectColumnArticleByColumnId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        ColumnArticleTest.selectColumnArticleByColumnId(req, resp);
    }
    //找到属于这个分类的文章id
        //根据这个文章id，从column_article表中找这篇文章是否还属于其他分类
    public void selectAndDeleteColumnArticleByUser_idAndCollect_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectAndDeleteColumnArticleByUser_idAndCollect_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        ColumnArticleTest.selectAndDeleteColumnArticleByUser_idAndCollect_id(req, resp);
    }
}
