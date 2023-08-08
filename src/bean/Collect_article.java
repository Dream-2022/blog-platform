package bean;

public class Collect_article {
    private int id;
    private String article_id;
    private int collect_id;
//新加
    private String nickname;
    private String picture;
    private String articleTitle;
    private String user_id;
    public Collect_article() {
    }

    public Collect_article(int id, String article_id, int collect_id, String nickname, String picture, String articleTitle, String user_id) {
        this.id = id;
        this.article_id = article_id;
        this.collect_id = collect_id;
        this.nickname = nickname;
        this.picture = picture;
        this.articleTitle = articleTitle;
        this.user_id = user_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
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
                ", nickname='" + nickname + '\'' +
                ", picture='" + picture + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                ", user_id='" + user_id + '\'' +
                '}';
    }
}
