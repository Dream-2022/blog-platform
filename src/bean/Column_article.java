package bean;

import org.junit.Test;

import java.sql.Timestamp;

public class Column_article {
    private int id;
    private int column_id;
    private String  article_id;

    public Column_article() {
    }

    public Column_article(int id, int column_id, String article_id) {
        this.id = id;
        this.column_id = column_id;
        this.article_id = article_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getColumn_id() {
        return column_id;
    }

    public void setColumn_id(int column_id) {
        this.column_id = column_id;
    }

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    @Override
    public String toString() {
        return "Column_article{" +
                "id=" + id +
                ", column_id=" + column_id +
                ", article_id=" + article_id +
                '}';
    }
}
