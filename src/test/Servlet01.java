package test;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//@WebServlet("/ser01")
//@WebServlet(name="Servlet",value = "/ser01")
//@WebServlet(name="Servlet",value = {"/ser01","ser001"})
//@WebServlet(name="Servlet",urlPatterns = "/ser01")
@WebServlet(name="Servlet",urlPatterns = {"/ser01","/ser001"})
public class Servlet01 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.service(req, resp);
        //打印内容
        System.out.println("Hello");
        resp.getWriter().write("Hello Servlet");
    }
}
