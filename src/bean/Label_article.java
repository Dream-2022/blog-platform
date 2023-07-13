package bean;

public class Label_article {
    private int id;
    private int label_id;
    private int article_id;

    public Label_article() {
    }

    public Label_article(int id, int blogger_id, int fans_id) {
        this.id = id;
        this.label_id = blogger_id;
        this.article_id = fans_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLabel_id() {
        return label_id;
    }

    public void setLabel_id(int label_id) {
        this.label_id = label_id;
    }

    public int getArticle_id() {
        return article_id;
    }

    public void setArticle_id(int article_id) {
        this.article_id = article_id;
    }

    @Override
    public String toString() {
        return "Label_article{" +
                "id=" + id +
                ", blogger_id=" + label_id +
                ", fans_id=" + article_id +
                '}';
    }
}
