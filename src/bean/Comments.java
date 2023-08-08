package bean;

import java.sql.Timestamp;
import java.util.Date;

public class Comments {
    private int id;
    private String article_id;
    private int user_id;
    private String content;
    private String nickname;
    private String picture;
    private String articleTitle;
    private int up_level;
    private int num;
    private int receiver_id;
    private Date create_at;


    public Comments() {
    }

    public Comments(int id, String article_id, int user_id, String content, String nickname, String picture, String articleTitle, int up_level, int num, int receiver_id, Date create_at) {
        this.id = id;
        this.article_id = article_id;
        this.user_id = user_id;
        this.content = content;
        this.nickname = nickname;
        this.picture = picture;
        this.articleTitle = articleTitle;
        this.up_level = up_level;
        this.num = num;
        this.receiver_id = receiver_id;
        this.create_at = create_at;
    }

    public int getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(int receiver_id) {
        this.receiver_id = receiver_id;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUp_level() {
        return up_level;
    }

    public void setUp_level(int up_level) {
        this.up_level = up_level;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    @Override
    public String toString() {
        return "Comments{" +
                "id=" + id + '\'' +
                ", article_id='" + article_id + '\'' +
                ", user_id=" + user_id +
                ", content='" + content + '\'' +
                ", nickname='" + nickname + '\'' +
                ", picture='" + picture + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                ", up_level=" + up_level + '\'' +
                ", num=" + num + '\'' +
                ", receiver_id=" + receiver_id + '\'' +
                ", create_at=" + create_at +
                '}';
    }
}
