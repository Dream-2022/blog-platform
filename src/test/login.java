package test;

import bean.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/login")
public class login extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入login.java");
        req.setCharacterEncoding("UTF-8");
        resp.setHeader("content-type","text/html;charset=UTF-8");

        selectByUsernameAndPassword(req,resp);


    }
    public void selectByUsernameAndPassword(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();

        String username= req.getParameter("username");
        String password=req.getParameter("password");

        params.put("username",username);
        params.put("password", password);

        System.out.println(username+":"+password);

        User user = sqlSession.selectOne("selectByUsernameAndPassword", params);
        //处理结果
        System.out.println(user);
        //释放资源
        sqlSession.close();
        is.close();
        // 返回响应
        if (user!=null) {
            resp.getWriter().println("success");
        } else {
            resp.getWriter().println("fail");
        }
    }
}