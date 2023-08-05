package controller;

import servlet.ColumnTest;
import servlet.CommentTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/Comments/*")
public class DistributeComments extends BaseServletComments{
    //通过文章id找一级评论
    public void selectCommentsByArticle_id(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("selectCommentsByArticle_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CommentTest.selectCommentsByArticle_id(req,resp);
    }
    //通过up_level是否与comments表中的id匹配
    public void selectCommentsByUp_level(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("selectCommentsByUp_level.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CommentTest.selectCommentsByUp_level(req,resp);
    }
    //通过文章id找评论总数
    public void selectCommentsForCountByArticle_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectCommentsForCountByArticle_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CommentTest.selectCommentsForCountByArticle_id(req,resp);
    }
    //插入评论信息
    public void insertComments(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("insertComments.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        CommentTest.insertComments(req,resp);
    }
}
