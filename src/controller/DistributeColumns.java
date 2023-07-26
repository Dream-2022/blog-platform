package controller;

import servlet.ColumnTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/Columns/*")

public class DistributeColumns extends BaseServletColumns{
    public void ObtainColumnTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ObtainColumnTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ColumnTest.selectColumnName(req,resp);
    }
}
