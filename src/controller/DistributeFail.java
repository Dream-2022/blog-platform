package controller;

import bean.Message;
import bean.User;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import servlet.UserTest;
import tool.ObtainSqlSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/Fail/*")
public class DistributeFail extends BaseFail{
    public static Map<String,Object>mapList=new HashMap<>();
    //登录，忘记密码，注册
    //修改密码（根据邮箱和验证码）
    public void PasswordTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入PasswordTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.updatePassword(req,resp);
    }
    //注册
    public void RegisterTest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入RegisterTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.insertUsernamePasswordEmail(req,resp);
    }
    //登录
    public void LoginTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("现在是11点");
        System.out.println("进入LoginTest.java");
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");
        UserTest.selectByUsernameAndPassword(req,resp);//方法
    }
    //私信在线的人存入mapList
    public void getMessageList(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        System.out.println("getMessageList.java");
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");

        String userid=req.getParameter("id");
        HttpSession httpSession=req.getSession();
        httpSession.setAttribute("userid",userid);
        Map<String,Object>params=new HashMap<>();
        params.put("id",userid);

        List<User>users=new ArrayList<>();
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Integer> idList=sqlSession.selectList("selectDistinctIds",params);
        System.out.println(idList);
        for (Integer ID : idList) {
            User user=sqlSession.selectOne("selectById",ID);
            users.add(user);
        }
        System.out.println(users);
        params.put("isSuccess",1);
        params.put("list",users);

        Gson gson=new Gson();
        String articleJson=gson.toJson(params);
        System.out.println("序列化："+articleJson);
        PrintWriter out=resp.getWriter();
        out.print(articleJson);
        //释放资源
        sqlSession.close();
    }
    //根据双方id找到聊天记录(message)
    public void selectMessagesBySender_idAndReceiver_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectMessage.java");
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        resp.setHeader("content-type","text/html;charset=UTF-8");

        String sender_id=req.getParameter("sender_id");
        String receiver_id=req.getParameter("receiver_id");


        Map<String,Object>params=new HashMap<>();
        params.put("sender_id",sender_id);
        params.put("receiver_id",receiver_id);

        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Message> messageList=sqlSession.selectList("selectMessagesBySender_idAndReceiver_id",params);
        System.out.println(messageList);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (Message message : messageList) {
            message.setTimeStr(dateFormat.format(message.getTime()));
        }

        Gson gson=new Gson();
        String articleJson=gson.toJson(messageList);
        System.out.println("序列化："+articleJson);
        PrintWriter out=resp.getWriter();
        out.print(articleJson);
        //释放资源
        sqlSession.close();
    }
}
