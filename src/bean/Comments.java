package bean;

import java.sql.Timestamp;

public class Comments {
    private int id;
    private int article_id;
    private int user_id;
    private String content;
    private int up_level;
    private Timestamp create_at;

    public Comments() {
    }

    public Comments(int id, int article_id, int user_id, String content, int up_level, Timestamp create_at) {
        this.id = id;
        this.article_id = article_id;
        this.user_id = user_id;
        this.content = content;
        this.up_level = up_level;
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

    public Timestamp getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Timestamp create_at) {
        this.create_at = create_at;
    }

    @Override
    public String toString() {
        return "Comments{" +
                "id=" + id +
                ", article_id=" + article_id +
                ", user_id=" + user_id +
                ", content='" + content + '\'' +
                ", up_level=" + up_level +
                ", create_at=" + create_at +
                '}';
    }
}
