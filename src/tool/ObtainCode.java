package tool;

import javax.mail.MessagingException;
import java.util.Random;

public class ObtainCode {
    public static String obtainCode(String emailField) throws MessagingException {
        Random r=new Random();
        int random = r.nextInt(1000000);
        String strCode=String.format("%06d", random);
        String str="您正在获取的验证码为："+strCode+"，此验证码三分钟内有效。";
        System.out.println("发送邮箱前");
        SendEmail.sendEmail(emailField,"博客园",str,emailField);
        System.out.println(strCode);
        return strCode;
    }

}
