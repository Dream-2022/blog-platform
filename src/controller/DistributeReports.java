package controller;

import servlet.ReportTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/Reports/*")
public class DistributeReports extends BaseServletReports{
    //查询receive_id是否存在被举报的文章
    public void selectReportsByReceive_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectReportsByReceive_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ReportTest.selectReportsByReceive_id(req,resp);

    }
    //查询被举报的文章
    public void selectReports(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectReports.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ReportTest.selectReports(req,resp);

    }
    //将content内容清空
    public void updateReportsByReport_id(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("updateReportsByReport_id.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ReportTest.updateReportsByReport_id(req,resp);
    }

    //新增举报信息
    public void insertReports(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("MainPageTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        ReportTest.insertReports(req,resp);
    }

}
