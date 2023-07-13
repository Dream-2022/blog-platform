package bean;

public class Labels {
    private int id;
    private int article_id;
    private String labelName;

    public Labels() {
    }

    public Labels(int id, int article_id, String labelName) {
        this.id = id;
        this.article_id = article_id;
        this.labelName = labelName;
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

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    @Override
    public String toString() {
        return "Labels{" +
                "id=" + id +
                ", article_id=" + article_id +
                ", labelName='" + labelName + '\'' +
                '}';
    }
}
