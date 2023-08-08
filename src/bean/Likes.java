package bean;

import java.sql.Timestamp;
import java.util.Date;

public class Likes {
    private int id;
    private String article_id;
    private int user_id;
    private Date create_at;

//    新加
    private String nickname;
    private String picture;
    private String articleTitle;
    public Likes() {
    }

    public Likes(int id, String article_id, int user_id, Date create_at, String nickname, String picture, String articleTitle) {
        this.id = id;
        this.article_id = article_id;
        this.user_id = user_id;
        this.create_at = create_at;
        this.nickname = nickname;
        this.picture = picture;
        this.articleTitle = articleTitle;
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

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    @Override
    public String toString() {
        return "Likes{" +
                "id=" + id +
                ", article_id=" + article_id +
                ", user_id=" + user_id +
                ", create_at=" + create_at +
                '}';
    }
}
