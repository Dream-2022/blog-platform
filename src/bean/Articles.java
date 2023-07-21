package bean;

import java.sql.Timestamp;
import java.util.Date;

public class Articles {
    private String id;
    private String user_id;
    private String title;
    private String textarea;
    private String htmlText;
    private String plainText;
    private String original;
    private String state;
    private String avatar;
    private String view;
    private String give;
    private String collect;
    private Date release_at;
    private Date update_at;
    public Articles(){}

    public Articles(String id, String user_id, String title, String textarea, String htmlText, String plainText, String original, String state, String avatar, String view, String give, String collect, Date release_at, Date update_at) {
        this.id = id;
        this.user_id =user_id;
        this.title = title;
        this.textarea = textarea;
        this.htmlText = htmlText;
        this.plainText = plainText;
        this.original = original;
        this.state = state;
        this.avatar = avatar;
        this.view = view;
        this.give = give;
        this.collect = collect;
        this.release_at = release_at;
        this.update_at = update_at;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTextarea() {
        return textarea;
    }

    public void setTextarea(String textarea) {
        this.textarea = textarea;
    }

    public String getHtmlText() {
        return htmlText;
    }

    public void setHtmlText(String htmlText) {
        this.htmlText = htmlText;
    }

    public String getPlainText() {
        return plainText;
    }

    public void setPlainText(String plainText) {
        this.plainText = plainText;
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getView() {
        return view;
    }

    public void setView(String view) {
        this.view = view;
    }

    public String getGive() {
        return give;
    }

    public void setGive(String give) {
        this.give = give;
    }

    public String getCollect() {
        return collect;
    }

    public void setCollect(String collect) {
        this.collect = collect;
    }

    public Date getRelease_at() {
        return release_at;
    }

    public void setRelease_at(Date release_at) {
        this.release_at = release_at;
    }

    public Date getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(Date update_at) {
        this.update_at = update_at;
    }

    @Override
    public String toString() {
        return "Articles{" +
                "id=" + id +
                ", user_id='" + user_id + '\'' +
                ", title='" + title + '\'' +
                ", textarea='" + textarea + '\'' +
                ", htmlText='" + htmlText + '\'' +
                ", plainText='" + plainText + '\'' +
                ", original='" + original + '\'' +
                ", state='" + state + '\'' +
                ", avatar='" + avatar + '\'' +
                ", view='" + view + '\'' +
                ", give='" + give + '\'' +
                ", collect='" + collect + '\'' +
                ", release_at=" + release_at +
                ", update_at=" + update_at +
                '}';
    }
}
