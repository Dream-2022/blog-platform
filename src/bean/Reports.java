package bean;

import java.util.Date;

public class Reports {
    private int id;
    private int user_id;
    private String userName;
    private String userNickname;
    private int receive_id;
    private String receiveName;
    private String article_id;
    private String report_content;
    private Date create_at;
    private String article_title;
    private String article_content;
    public Reports() {
    }

    public Reports(int id, int user_id, String userName, String userNickname, int receive_id, String receiveName, String article_id, String report_content, Date create_at, String article_title, String article_content) {
        this.id = id;
        this.user_id = user_id;
        this.userName = userName;
        this.userNickname = userNickname;
        this.receive_id = receive_id;
        this.receiveName = receiveName;
        this.article_id = article_id;
        this.report_content = report_content;
        this.create_at = create_at;
        this.article_title = article_title;
        this.article_content = article_content;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getReceiveName() {
        return receiveName;
    }

    public void setReceiveName(String receiveName) {
        this.receiveName = receiveName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public String getArticle_content() {
        return article_content;
    }

    public void setArticle_content(String article_content) {
        this.article_content = article_content;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getReceive_id() {
        return receive_id;
    }

    public void setReceive_id(int receive_id) {
        this.receive_id = receive_id;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public String getReport_content() {
        return report_content;
    }

    public void setReport_content(String report_content) {
        this.report_content = report_content;
    }

    public String getArticle_title() {
        return article_title;
    }

    public void setArticle_title(String article_title) {
        this.article_title = article_title;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    @Override
    public String toString() {
        return "Reports{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", userName='" + userName + '\'' +
                ", userNickname='" + userNickname + '\'' +
                ", receive_id=" + receive_id +
                ", receiveName='" + receiveName + '\'' +
                ", article_id='" + article_id + '\'' +
                ", report_content='" + report_content + '\'' +
                ", create_at=" + create_at +
                ", article_title='" + article_title + '\'' +
                ", article_content='" + article_content + '\'' +
                '}';
    }
}
