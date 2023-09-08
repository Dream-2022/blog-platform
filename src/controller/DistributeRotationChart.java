package controller;

import servlet.RotationChartTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/RotationChart/*")
public class DistributeRotationChart extends BaseServletRotationChart{
    //查询所有的轮播图图片
    public void selectRotationChart(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectRotationChart.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        RotationChartTest.selectRotationChart(req,resp);
    }
    //向上调整
    public void updateRotationChartUpState(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("updateRotationChartUpState.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        RotationChartTest.updateRotationChartUpState(req,resp);
    }
    //更换照片(数据库)
    public void updateRotationChartContent(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        System.out.println("进入方法");
        System.out.println("updateRotationChartContent.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        System.out.println("进入前");
        RotationChartTest.updateRotationChartContent(req,resp);
        System.out.println("进入后");
    }
    //insertRotationChart
    public void insertRotationChart(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("insertRotationChart.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        RotationChartTest.insertRotationChart(req,resp);
    }
    //删除图片
    public void deleteRotationChart(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("deleteRotationChart.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        RotationChartTest.deleteRotationChart(req,resp);

    }
}
