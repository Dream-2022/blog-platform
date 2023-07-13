package bean;

import java.sql.Timestamp;

public class Articles {
    private int id;
    private int user_id;
    private String htmlTest;
    private String plainTest;
    private String original;
    private String state;
    private String view;
    private String like;
    private String collect;
    private Timestamp release_at;
    private Timestamp update_at;
    public Articles(){}
    public Articles(int id, int user_id, String htmlTest, String plainTest, String original, String state, String view, String like, String collect, Timestamp release_at,Timestamp update_at) {
        this.id = id;
        this.user_id = user_id;
        this.htmlTest = htmlTest;
        this.plainTest = plainTest;
        this.original = original;
        this.state = state;
        this.view = view;
        this.like = like;
        this.collect = collect;
        this.release_at = release_at;
        this.update_at=update_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getHtmlTest() {
        return htmlTest;
    }

    public void setHtmlTest(String htmlTest) {
        this.htmlTest = htmlTest;
    }

    public String getPlainTest() {
        return plainTest;
    }

    public void setPlainTest(String plainTest) {
        this.plainTest = plainTest;
    }

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getView() {
        return view;
    }

    public void setView(String view) {
        this.view = view;
    }

    public String getLike() {
        return like;
    }

    public void setLike(String like) {
        this.like = like;
    }

    public String getCollect() {
        return collect;
    }

    public void setCollect(String collect) {
        this.collect = collect;
    }

    public Timestamp getRelease_at() {
        return release_at;
    }

    public void setRelease_at(Timestamp release_at) {
        this.release_at = release_at;
    }

    public Timestamp getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(Timestamp update_at) {
        this.update_at = update_at;
    }

    @Override
    public String toString() {
        return "articles{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", htmlTest='" + htmlTest + '\'' +
                ", plainTest='" + plainTest + '\'' +
                ", original='" + original + '\'' +
                ", state='" + state + '\'' +
                ", view='" + view + '\'' +
                ", like='" + like + '\'' +
                ", collect='" + collect + '\'' +
                ", collect='" + release_at + '\'' +
                ", release_at=" + update_at +'\''+
                '}';
    }
}
