package servlet;

import bean.User;
import com.google.gson.Gson;
import controller.DistributeUser;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import tool.JwtTest;
import tool.JwtTest;
import tool.ObtainSqlSession;
import tool.RegisterAccount;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserTest {
    public static User user;
    //登录页面，（通过username和password登录）
    public static void selectByUsernameAndPassword(HttpServletRequest req, HttpServletResponse resp) throws IOException {
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

        user = sqlSession.selectOne("selectByUsernameAndPassword", params);
        //处理结果
        System.out.println(user);
        //释放资源
        sqlSession.close();
        is.close();


        PrintWriter out=resp.getWriter();

        Gson gson=new Gson();
        Map<String,Object> data=new HashMap<>();
        // 返回响应
        if (user!=null) {
            System.out.println("111");
            data.put("success",1);
            user.setPassword(null);
            data.put("user",user);
            System.out.println(user.getUsername()+":"+user.getPassword()+":"+user.getAdmin());

            Map<String,Object>tokens= JwtTest.getToken(user.getUsername(),user.getAdmin());
            System.out.println((String)tokens.get("token"));
            System.out.println((String)tokens.get("longt"));
            System.out.println(11);
            resp.setHeader("token",(String)tokens.get("token"));
            resp.setHeader("longt",(String)tokens.get("longt"));
        }
        else {
            data.put("success",0);
            System.out.println("登录失败");
        }
        String dataJson = gson.toJson(data);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //登录页面的忘记密码（通过邮箱和验证码重置密码）
    public static void updatePassword(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //调用工具类
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();

        String email=req.getParameter("email");
        String code= req.getParameter("code");
        String password=req.getParameter("password");

        //判断验证码是否正确
        String Str= DistributeUser.getStr() ;
        String[] str =Str.split(":", 2);
        if(!email.equals(str[1])||!code.equals(str[0])){
            System.out.println("验证码错误");
            resp.getWriter().println("验证码错误");
            return;
        }

        //判断验证码是否过期
        if (LocalDateTime.now().isAfter(DistributeUser.getMyDate())) {
            System.out.println("验证码过期");
            resp.getWriter().println("验证码过期");
            return;
        }

        //先查是否存在该邮箱注册的账号(存在的情况修改)
        List<User> users=DistributeUser.getUsers();
        for (User user : users) {
            if(user.getEmail().equals(email)){
                int result=sqlSession.update("updatePassword",user);
                if(result==1){
                    resp.getWriter().println('1');
                    System.out.println("修改密码成功"+result);
                    return;
                }
                else{
                    resp.getWriter().println("还未注册账号，请注册一个新的账号");
                    System.out.println("还未注册账号，请注册一个新的账号"+result);
                    return;
                }
            }
        }

        //不存在的情况，相当于创建一个账号
        //注册一个账号（使用工具类）
        String result = RegisterAccount.registerAccount(params, password, email, sqlSession);
        if(result.equals("register success")){
            resp.getWriter().println("forget register success");
        }
        else if(result.equals("register fail")){
            resp.getWriter().println("forget register fail");
        }
    }
    //注册页面（新插入用户名密码邮箱）
    public static void insertUsernamePasswordEmail(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //调用工具类
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();

        String email=req.getParameter("email");
        String code= req.getParameter("code");
        String password=req.getParameter("password");

        List<User>users=DistributeUser.getUsers();


        //处理结果
        int flag=0;
        for(User user:users){
            String E=user.getEmail();
            System.out.println("遍历数据库中的email:"+E);
            if(E.equals(email)){
                flag=1;
                break;
            }
        }
        PrintWriter out=resp.getWriter();
        Map<String,Object> data=new HashMap<>();
        Gson gson=new Gson();
        if(flag==1){
            System.out.println("该账号重复注册");
            data.put("status","repeat");
            data.put("message","该账号重复注册");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
            return;
        }

        //判断验证码是否正确
        String Str=DistributeUser.getStr() ;
        System.out.println("email:"+email);
        System.out.println("code："+code);
        String[] str =Str.split(":", 2);
        System.out.println(str[1]);
        System.out.println(str[0]);
        if(!email.equals(str[1])||!code.equals(str[0])){
            System.out.println("验证码错误");
            data.put("status","codeFail");
            data.put("message","验证码错误");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
            return;
        }
//        out.print("{\"success\":\"codeFail\",\"message\":\"验证码错误\"}");
//        out.print("{\"success\":\"codeFail\",\"message\":\"验证码错误\"}");

        //判断验证码是否过期
        if (LocalDateTime.now().isAfter(DistributeUser.getMyDate())) {
            System.out.println("验证码过期");
            data.put("status","codeExpire");
            data.put("message","验证码过期");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            out.print("{\"success\":\"codeExpire\",\"message\":\"验证码过期\"}");
            return;
        }

        //注册一个账号（使用工具类）
        String result = RegisterAccount.registerAccount(params, password, email, sqlSession);
        if(result.equals("register success")){
            System.out.println("注册成功");
            data.put("status","register success");
            data.put("message","注册成功");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            out.print("{\"success\":\"register success\",\"message\":\"注册成功\"}");
        }
        else if(result.equals("register fail")){
            System.out.println("注册失败");
            data.put("status","register fail");
            data.put("message","注册失败");
            String dataJson = gson.toJson(data);
            System.out.println("序列化后："+dataJson);
            out.print(dataJson);
//            out.print("{\"success\":\"register fail\",\"message\":\"注册失败\"}");
        }
    }
    //修改个人资料
    public static void updateUser(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        String username= req.getParameter("username");
        String nickname= req.getParameter("nickname");
        String birthday= req.getParameter("birthday");
        String profile= req.getParameter("profile");
        String phone= req.getParameter("phone");
        String gender= req.getParameter("gender");
        System.out.println("进入Modification:"+username+":"+nickname+":"+birthday+":"+profile+":"+phone);
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("username",username);
        params.put("birthday", birthday);
        params.put("profile", profile);
        params.put("phone", phone);
        params.put("nickname", nickname);
        params.put("gender", gender);

        int result=sqlSession.update("updateUser",params);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
    //修改个人头像
/*    public static void updateAvatar(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username= req.getParameter("username");
        String picture= req.getParameter("avatar");
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        User user=new User();
        user.setUsername(username);
        user.setPicture(picture);
        int result = sqlSession.update("update", user);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }    //DetailTest获取个人信息，显示到个人资料页面*/

    public static void updateAvatar(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        final String AVATAR_BASE_PATH = "D:\\javaj\\upload";
        String username= req.getParameter("username");
        Part avatarPart = req.getPart("avatar");
        System.out.println(req.getParts());
        System.out.println("”avatarPar:"+avatarPart);
        String avatar = null;
        if (avatarPart != null && avatarPart.getSize() > 0) {
            String disposition = avatarPart.getHeader("content-disposition");
            String fileName = null;
            if (disposition != null) {
                String[] parts = disposition.split(";");
                for (String part : parts) {
                    if (part.trim().startsWith("filename")) {
                        fileName = part.substring(part.indexOf('=') + 1).trim().replace("\"", "");
                        break;
                    }
                }
            }

            if (fileName != null) {
                fileName = Paths.get(fileName).getFileName().toString();
                File file = new File(AVATAR_BASE_PATH, fileName);
                // 判重
                if (!file.exists()) {
                    try (InputStream input = avatarPart.getInputStream()) {
                        System.out.println("进来了吗：");
                        Files.copy(input, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }
                    avatar = fileName;
                } else {
                    avatar = fileName;
                    System.out.println("文件重复.");
                }
            }
        }

        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        System.out.println(username);
        System.out.println(avatar);
        User user=new User();
        user.setUsername(username);
        user.setPicture(avatar); //头像文件名
        System.out.println(user.getUsername());
        System.out.println(user.getPicture());
        int result = sqlSession.update("updateAvatar", user);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
        // 创建一个 Gson 对象
        Gson gson = new Gson();

        // 将 User 对象转换为 JSON 字符串
        String userJson = gson.toJson(user);

        // 设置响应的内容类型为 JSON
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // 将 JSON 字符串写入响应
        resp.getWriter().write(userJson);

    }

    public static void selectByUsername(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        String username=req.getParameter("username");
        System.out.println("DetailTest中获取的username："+username);
        Map<String, Object> params = new HashMap<>();
        params.put("username",username);
        User user = sqlSession.selectOne("selectByUsername", params);
        System.out.println(user);
        Gson gson=new Gson();
        String dataJson = gson.toJson(user);
        PrintWriter out=resp.getWriter();
        out.print(dataJson);
    }
}
