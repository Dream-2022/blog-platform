package tool;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class SendEmail {
    public static void sendEmail(String sendAddress, String title, String contend, String copySendAddress) throws MessagingException {
        Properties properties=new Properties();

        //设置服务器名称
        properties.setProperty("mail.host","smtp.qq.com");
        //设置邮箱的传输协议
        properties.setProperty("mail.transport.protocol","smtp");
        //设置是否要验证服务器用户名和密码
        properties.setProperty("mail.smtp.auth","true");

        //1.创建客户端和邮箱服务器对象
        Session session=Session.getInstance(properties);

        //2.开启session的debug模式，方便查看发送的email的运行状态
        session.setDebug(true);

        //3.用过session得到transport传输对象
        Transport transport=session.getTransport();

        //4.使用用户名密码连接邮箱服务器
        transport.connect("smtp.qq.com","2171204141@qq.com","quydlpssavwwdhhg");

        //5.创建邮件
        Message message=createSimpleMail(session,sendAddress,title,contend,copySendAddress);

        //6.发送邮件
        transport.sendMessage(message,message.getAllRecipients());
        transport.close();
    }
    private static Message createSimpleMail(Session session, String sendAddress, String title, String content, String copySendAddress) throws MessagingException {
        //创建邮件对象
        MimeMessage message=new MimeMessage(session);
        //指明邮件的发件人
        message.setFrom(new InternetAddress("2171204141@qq.com"));
        //指明邮件的收件人
        message.setRecipients(Message.RecipientType.TO, String.valueOf(new InternetAddress(sendAddress)));
        //邮件的标题
        message.setSubject(title);
        //邮件的内容
        message.setContent(content,"text/html;charset=UTF-8");
        //设置抄送人
        message.setRecipients(Message.RecipientType.CC,InternetAddress.parse(copySendAddress));
        return message;
    }

    public  void main(String[] args) throws MessagingException {
        sendEmail("2171204141@qq.com","验证码","con","2171204141@qq.com");
    }
}
