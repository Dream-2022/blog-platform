package bean;

import java.sql.Timestamp;
import java.util.Date;

public class Likes {
    private int id;
    private int article_id;
    private int user_id;
    private Date create_at;

    public Likes() {
    }

    public Likes(int id, int article_id, int user_id, Date create_at) {
        this.id = id;
        this.article_id = article_id;
        this.user_id = user_id;
        this.create_at = create_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getArticle_id() {
        return article_id;
    }

    public void setArticle_id(int article_id) {
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
