package bean;

public class Collect_article {
    private int id;
    private String article_id;
    private int collect_id;

    public Collect_article() {
    }

    public Collect_article(int id, String article_id, int collect_id) {
        this.id = id;
        this.article_id = article_id;
        this.collect_id = collect_id;
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

    public int getCollect_id() {
        return collect_id;
    }

    public void setCollect_id(int collect_id) {
        this.collect_id = collect_id;
    }

    @Override
    public String toString() {
        return "Collect_article{" +
                "id=" + id +
                ", article_id='" + article_id + '\'' +
                ", collect_id=" + collect_id +
                '}';
    }
}
