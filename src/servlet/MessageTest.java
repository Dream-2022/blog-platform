package servlet;

import bean.Message;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MessageTest {
    public static List<Message> selectMessageList(Message mess) throws IOException {
        int receiver_id=mess.getReceiver_id();
        int sender_id=mess.getSender_id();
        Map<String, Object> params = new HashMap<>();
        params.put("receiver_id",receiver_id);
        params.put("sender_id", sender_id);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        List<Message> messageList=sqlSession.selectList("selectMessageList",params);
        System.out.println("messageList:"+messageList);
        return messageList;
    }

}
