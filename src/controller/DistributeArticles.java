package controller;

import bean.Articles;
import com.google.gson.Gson;
import servlet.ArticlesTest;
import servlet.UserTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.List;

@WebServlet("/Articles/*")
@MultipartConfig
public class DistributeArticles extends BaseServletArticles{
    public static List<Articles> lists;
    //主页显示文章列表
    public void MainPageTest(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("MainPageTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        lists=ArticlesTest.selectByArticles(req,resp);
    }
    //查看文章
    public void BlogTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // String articleId=req.getParameter("articleId");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");

        List<Articles> articles=lists;
        Gson gson=new Gson();
        PrintWriter out=resp.getWriter();
        String dataJson = gson.toJson(articles);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public void selectArticlesByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectArticlesByArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesByArticleId(req,resp);
    }
    public void likeSelectArticles(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("likeSelectArticles.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.likeSelectArticles(req,resp);
    }
    //修改文章
    public void updateArticleTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("updateArticleTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.updateArticleTest(req,resp);
    }
    //插入文章内容(保存文章）
    public void InsertArticleTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入insertArticleTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.insertArticle(req,resp);
    }
    //将点赞数自增
    public void articlesGiveLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("articlesGiveLike.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.updateArticleGiveLike(req,resp);
    }
    //将浏览量自增
    public void giveView(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入方法");
        System.out.println("giveView.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        System.out.println("进入前");
        ArticlesTest.updateArticleGiveView(req,resp);
        System.out.println("进入后");
    }
    //新增博客封面
    public void Avatar(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        System.out.println("进入方法");
        System.out.println("Avatar.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        System.out.println("进入前");
        ArticlesTest.updateAvatar(req,resp);
        System.out.println("进入后");
    }
    //查找文章作者（在articles表通过文章id（id）查找user_id,然后再user表通过用户id（id）查找nickname
    public void selectArticlesUserIdByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectArticlesUserIdByArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesUserIdByArticleId(req,resp);
    }
    //通过user_id找他写的所有文章展示在个人页面
    public void selectArticlesByUser_idDetail(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectArticlesByUser_idDetail.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesByUser_idDetail(req,resp);
    }
}
