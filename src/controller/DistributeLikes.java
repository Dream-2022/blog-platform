package controller;

import servlet.ArticlesTest;
import servlet.LabelsTest;
import servlet.LikesTest;
import servlet.UserTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/Likes/*")
public class DistributeLikes extends BaseServletLikes{
    //给文章点赞(在likes表中新增一条数据)
    public void giveLike(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("giveLike.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LikesTest.giveLike(req,resp);
    }
    //查询该user_id是否给该文章点了赞
    public void selectLikeByUserIdAndArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectLikeByUserIdAndArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LikesTest.selectLikeByUserIdAndArticleId(req,resp);
    }
    //查询该user_id所有点赞记录
    public void selectLikesByUser_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectLikesByUser_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LikesTest.selectLikesByUser_id(req,resp);
    }
    //查询user_id的所有文章，查看其他人给他文章的点赞情况
    public void selectLikesArticlesByUser_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectLikesArticlesByUser_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LikesTest.selectLikesArticlesByUser_id(req,resp);
    }
    //在主页根据点赞的个数排序
    public void MainPageGiveCountTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("MainPageGiveCountTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LikesTest.MainPageGiveCountTest(req,resp);
    }
    //删除点赞
    public void deleteLike(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("deleteLike.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LikesTest.deleteLike(req,resp);

    }

    //撤回给文章的点赞(未写)
//    public void withdrawGive(HttpServletRequest req, HttpServletResponse resp) throws UnsupportedEncodingException {
//        System.out.println("withdrawGive.java");
//        req.setCharacterEncoding("UTF-8");
//        resp.setContentType("application/json");
//        resp.setHeader("content-type","text/html;charset=UTF-8");
//        LikesTest.withdrawGiveLike(req,resp);
//    }
}
