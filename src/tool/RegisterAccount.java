package tool;

import bean.User;
import controller.EmailTest;
import org.apache.ibatis.session.SqlSession;

import java.util.List;
import java.util.Map;

public class RegisterAccount {
    public static String registerAccount(Map params, String password, String email, SqlSession sqlSession){

        List<User> users= EmailTest.getUsers();

        //生成一个唯一账号（符合所有条件）用雪花算法生成邀请码
        int Flag=0;
        String username="";
        while(Flag==0){
            Flag=1;
            username= ObtainUsername.obtainUsername();
            //判重(相等的情况跳出循环)
            for(User user:users){
                if(user.getUsername().equals(username)){
                    Flag=0;
                    break;
                }
                System.out.println(user);
            }
        }
        System.out.println("生成的Username为；"+username);

        params.put("username",username);
        params.put("password", password);
        params.put("email", email);

        int result=sqlSession.insert("insert",params);

        //处理结果
        System.out.println(result);

        //释放资源
        sqlSession.close();

        if(result==1){
            return "register success";
        }
        else{
            return "register fail";
        }
    }
}
