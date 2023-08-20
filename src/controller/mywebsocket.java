//package controller;
//
//import javax.websocket.*;
//import javax.websocket.server.ServerEndpoint;
//
//@ServerEndpoint(value="/mywebsocket")
//public class mywebsocket {
//    @OnOpen
//    public void onOpen(Session session, EndpointConfig endpointConfig)
//    {
//        System.out.println("建立连接了");
//
//    }
//
//    @OnMessage
//    public void onMessage(String message,Session session)
//    {
//        System.out.println("收到了"+message);
//
//        try {
//            String returnMessage="服务器给你发消息";
//            session.getBasicRemote().sendText(returnMessage);
//        }catch (Exception e)
//        {
//            e.printStackTrace();
//        }
//    }
//    @OnClose
//    public void onClose(Session session)
//    {
//        System.out.println("socket关闭了");
//    }
//
//}
