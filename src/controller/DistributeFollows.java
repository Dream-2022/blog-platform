package controller;

import servlet.FollowsTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/Follows/*")
public class DistributeFollows extends BaseServletFollows{
    public void insertFollowsByBlogger_idAndFans_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("insertFollowsByBlogger_idAndFans_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        FollowsTest.insertFollowsByBlogger_idAndFans_id(req,resp);
    }
}
