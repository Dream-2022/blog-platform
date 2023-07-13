package test;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/ser05")
public class Servlet05 extends HttpServlet {
    /**
     *就绪/服务方法（处理请求数据）
     * 系统方法，服务器自动调用
     * 当请求到达Servlet时，就会调用该方法
     * 方法可以被调用多次
     * @param req
     * @param resp
     */
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.service(req, resp);
        //打印内容
        System.out.println("Hello");
        resp.getWriter().write("Hello Servlet");


    }
    /**
     * 销毁方法
     * 系统方法，服务器自动调用
     * 当服务器关闭或应用程序停止时，调用该方法
     * 只调用一次
     */
    @Override
    public void destroy() {
        System.out.println("销毁");
        super.destroy();
    }
    /**
     * 初始化方法
     * 系统方法，服务器自动调用
     * 当请求到达Servlet容器时，Servlet同期会判断Servlet对象是否存在，如果不存在则创建并初始化
     * 方法只会调用一次
     * @throws ServletException
     */
    @Override
    public void init() throws ServletException {
        System.out.println("初始化");
        super.init();
    }
}
