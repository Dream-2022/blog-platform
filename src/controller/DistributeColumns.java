package controller;

import servlet.ColumnTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/Columns/*")

public class DistributeColumns extends BaseServletColumns{
    //根据User_id查询全部专栏
    public void ObtainColumnTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ObtainColumnTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ColumnTest.selectColumnName(req,resp);
    }
    public void InsertColumn(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("InsertColumn.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ColumnTest.InsertColumn(req,resp);
    }

}
