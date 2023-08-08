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
    //发布的全部文章
    public void selectArticleByState(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticleByState.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticleByState(req,resp);
    }
    //管理员页面的未审核的全部文章
    public void selectArticleByStateUnpublished(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticleByStateUnpublished.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticleByStateUnpublished(req,resp);
    }
    //管理员页面的发布的全部文章
    public void selectArticleByStatePublished(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticleByStatePublished.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticleByStatePublished(req,resp);
    }
    //筛选user_id文章中的下拉框
    public void selectArticlesForYearAndLabelAndColumn(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticlesForYearAndLabelAndColumn.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesForYearAndLabelAndColumn(req,resp);
    }
    //管理员页面筛选未审核的文章
    public void selectArticlesForYearAndLabel(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticlesForYearAndLabel.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesForYearAndLabel(req,resp);
    }
    //管理员页面筛选审核文章
    public void selectArticlesForYearAndLabelAndState(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticlesForYearAndLabelAndState.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesForYearAndLabelAndState(req,resp);
    }
    public void selectArticlesForYearAndLabelAndColumnAndState(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticlesForYearAndLabelAndColumnAndState.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesForYearAndLabelAndColumnAndState(req,resp);
    }
    //通过user_id找用户发布原创文章的数量
    public void selectArticleByUser_id(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticleByUser_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticleByUser_id(req,resp);
    }
    //渲染主页的用户（根据用户的原创个数）
    public void selectArticlesByCount(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("selectArticlesByCount.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesByCount(req,resp);
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
    //通过文章id查找文章
    public void selectArticlesByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectArticlesByArticleId.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesByArticleId(req,resp);
    }

    //搜索
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
    //修改文章状态，从未审核到为通过
    public void updateArticleByArticle_idForState(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("updateArticleByArticle_idForState.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.updateArticleByArticle_idForState(req,resp);
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
    //找到user_id的文章中‘未通过’和‘删除’的文章
    public void selectArticlesByUser_idForAdmin(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("HttpServletRequest req, HttpServletResponse resp.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ArticlesTest.selectArticlesByUser_idForAdmin(req,resp);
    }
}
