package controller;

import bean.Labels;
import servlet.LabelArticleTest;
import servlet.LabelsTest;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet("/Labels/*")
public class DistributeLabels extends BaseServletLabels{
    public void ObtainLabelTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ObtainLabelTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LabelsTest.selectLabelName(req,resp);
    }
    public void InsertLabel(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入InsertLabel.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        LabelsTest.insertLabel(req,resp);
    }
}
