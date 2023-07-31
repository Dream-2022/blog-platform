package controller;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

public class BaseServletCollectArticle extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("BaseServletCollectArticle");
        String uri = req.getRequestURI();
        // 最后一个'/'后的内容
        String methodName = uri.substring(uri.lastIndexOf('/') + 1);
        System.out.println("选择到的methodName为："+methodName);
        // 获取方法
        try {
            // 此处的this不是BaseServlet，而是调用者本身（Base的子类）
            Method method = this.getClass().getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            // 执行方法
            method.invoke(this, req, resp);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
