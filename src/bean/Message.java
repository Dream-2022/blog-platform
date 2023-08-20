package bean;

import java.util.Date;

public class Message {
    private int id;
    private int sender_id;
    private int receiver_id;
    private String content;
    private Date time;
    private String timeStr;
    private String receiver_name;
    private String receiver_avatar;
    private Integer messageType;
    public Message() {
    }

    public Message(int id, int sender_id, int receiver_id, String content, Date time, String timeStr, String receiver_name, String receiver_avatar, Integer messageType) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.content = content;
        this.time = time;
        this.timeStr = timeStr;
        this.receiver_name = receiver_name;
        this.receiver_avatar = receiver_avatar;
        this.messageType = messageType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSender_id() {
        return sender_id;
    }

    public void setSender_id(int sender_id) {
        this.sender_id = sender_id;
    }

    public int getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(int receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getTimeStr() {
        return timeStr;
    }

    public void setTimeStr(String timeStr) {
        this.timeStr = timeStr;
    }

    public String getReceiver_name() {
        return receiver_name;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public String getReceiver_avatar() {
        return receiver_avatar;
    }

    public void setReceiver_avatar(String receiver_avatar) {
        this.receiver_avatar = receiver_avatar;
    }

    public Integer getMessageType() {
        return messageType;
    }

    public void setMessageType(Integer messageType) {
        this.messageType = messageType;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender_id=" + sender_id +
                ", receiver_id=" + receiver_id +
                ", content='" + content + '\'' +
                ", time=" + time +
                ", timeStr='" + timeStr + '\'' +
                ", receiver_name='" + receiver_name + '\'' +
                ", receiver_avatar='" + receiver_avatar + '\'' +
                ", messageType='" + messageType + '\'' +
                '}';
    }
}
