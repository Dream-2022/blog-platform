package webSocket;

import bean.Message;
import bean.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import controller.HttpSessionConfigurator;
import org.apache.ibatis.session.SqlSession;
import servlet.MessageTest;
import tool.ObtainSqlSession;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint(value = "/mywebsocket", configurator = HttpSessionConfigurator.class)
public class MyWebSocketEndpoint {
    public static Map<String, Session> userSessions = new ConcurrentHashMap<>();


    private String userid;
    @OnOpen
    public void onOpen(Session session,EndpointConfig config) {
        System.out.println("WebSocket连接建立");
        // 获取用户ID
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());

        if (userSessions == null) {
            userSessions = new ConcurrentHashMap<>();
        }

        userid= (String) httpSession.getAttribute("userid");
        System.out.println("连接成功"+userid);
        // 将用户ID和对应的 WebSocket session 存储到 Map 中
        if(userid!=null) {
            userSessions.put(userid, session);
        }
        // 处理连接逻辑，比如通知其他用户有新用户加入等
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // 处理收到的消息逻辑
        System.out.println("收到了"+message);

        try {
            ObjectMapper mapper = new ObjectMapper();
            Message mess = mapper.readValue(message, Message.class);

            //发送消息给某人，存在与列表中
            if(mess.getMessageType()==1){


                //需要发送消息给某人
                Date time=new Date(System.currentTimeMillis());
                mess.setTime(time);
                mess.setSender_id(Integer.parseInt(userid));
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                mess.setTimeStr(dateFormat.format(mess.getTime()));

                //找到接受者的头像和昵称
                int receive_id=mess.getReceiver_id();
                SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
                User user=sqlSession.selectOne("selectById",receive_id);
                mess.setReceiver_avatar(user.getPicture());
                mess.setReceiver_name(user.getNickname());

                System.out.println("userSessions:"+userSessions);
                //设置消息的状态,给接收者和发送者都显示
                mess.setMessageType(4);//成功接收到消息，需要判断，是自己发送的，还是别人发送的
                System.out.println("userSessions"+userSessions);
                Session receiverSession=userSessions.get(String.valueOf(mess.getReceiver_id()));
                System.out.println("receiverSession:"+receiverSession);



                System.out.println("mess.getReceiver_id:"+mess.getReceiver_id());
                ObjectMapper mapp=new ObjectMapper();
                String returnMessage=mapp.writeValueAsString(mess);
                if(receiverSession!=null){
                    System.out.println("receiverSession:"+returnMessage);
                    receiverSession.getBasicRemote().sendText(returnMessage);
                }

                Session senderSession=userSessions.get(userid);
                System.out.println("senderSession:"+senderSession);
                if(senderSession!=null){
                    System.out.println("senderSession:"+returnMessage);
                    senderSession.getBasicRemote().sendText(returnMessage);
                }
                //存入数据库
                Map<String, Object> params = new HashMap<>();
                params.put("receiver_id",mess.getReceiver_id());
                params.put("sender_id", mess.getSender_id());
                params.put("time", mess.getTime());
                params.put("content", mess.getContent());
                int result=sqlSession.insert("insertMessage",params);
                System.out.println("insertMessage：result"+result);
            }
            //请求得到聊天消息记录
            else if(mess.getMessageType()==6){
                //得到消息记录
                mess.setSender_id(Integer.parseInt(userid));
                List<Message> list= MessageTest.selectMessageList(mess);
                System.out.println("长度为"+list.size());
                for (int i = 0; i < list.size(); i++) {
                    System.out.println(list.get(i));
                }
                Collections.reverse(list);

                ObjectMapper mapp=new ObjectMapper();
                Map<String,Object> data=new HashMap<>();
                data.put("list",list);
                data.put("messageType",5);
                System.out.println(list);

                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                // 将当前时间转换为字符串类型
                for (int i = 0; i < list.size(); i++) {
                    list.get(i).setTimeStr(dateFormat.format(list.get(i).getTime()));
                }

                Session senderSession=userSessions.get(userid);
                senderSession.getBasicRemote().sendText(mapp.writeValueAsString(data));
                System.out.println(mapp.writeValueAsString(data));
            }
            //发送消息给不存在列表中的人
//            else if(mess.getMessageType()==7)
//            {
//                //得到需要查询这个人的消息
//                User userInfo=serviceimp.SelectById(mess.getReceiver_id());
//                if(userInfo!=null){
//                    //找到了往数据库里面插入数据
//                    Date time=new Date(System.currentTimeMillis());
//                    mess.setTime(time);
//                    mess.setSender_id(Integer.parseInt(userid));
////                    int k=serviceimp.insertOneMessage(mess);
//                    //有,这个人设置成功发送给列表中不在的人
//                    mess.setMessageType(2);
//                    mess.setReceiver_name(userInfo.getUsername());
//                    mess.setReceiver_avatar(userInfo.getPicture());
//
//                    //给发送人设置消息
//                    ObjectMapper mapp=new ObjectMapper();
//                    Session senderSession=userSessions.get(userid);
//                    senderSession.getBasicRemote().sendText(mapp.writeValueAsString(mess));
//
//                    //给接收人发送消息
//                    Session receiverSession=userSessions.get(mess.getReceiver_id());
//                    if(receiverSession==null)
//                    {
//                        System.out.println(userInfo.getUsername()+"此人不在线");
//                    }
//                    else
//                    {
//                        System.out.println("此人在线");
//                        //如果存储刷新列表,刷新对方的列表
//                        userInfo=serviceimp.SelectById(userid);
//                        mess.setMessageType(2);
//
//                        mess.setReceiver_avatar(userInfo.getPicture());
//                        mess.setReceiver_name(userInfo.getUsername());
//
//                        receiverSession.getBasicRemote().sendText(mapp.writeValueAsString(mess));
//                    }
//                }
                else{
                    mess.setMessageType(3);

                    ObjectMapper mapp=new ObjectMapper();
                    Session senderSession=userSessions.get(userid);
                    senderSession.getBasicRemote().sendText(mapp.writeValueAsString(mess));
                }
            //}
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("socket关闭了");
    }
}