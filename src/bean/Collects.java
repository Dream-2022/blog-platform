package bean;

import java.sql.Timestamp;

public class Collects {
    private int id;
    private int article_id;
    private int user_id;
    private Timestamp create_at;

    public Collects() {
    }

    public Collects(int id, int article_id, int user_id, Timestamp create_at) {
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

    public Timestamp getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Timestamp create_at) {
        this.create_at = create_at;
    }

    @Override
    public String toString() {
        return "Collects{" +
                "id=" + id +
                ", article_id=" + article_id +
                ", user_id=" + user_id +
                ", create_at=" + create_at +
                '}';
    }
}
