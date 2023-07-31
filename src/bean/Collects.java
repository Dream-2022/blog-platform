package bean;

import java.sql.Timestamp;
import java.util.Date;

public class Collects {
    private int id;
    private String collectName;
    private int user_id;
    private Date create_at;

    public Collects() {
    }

    public Collects(int id, String collectName, int user_id, Date create_at) {
        this.id = id;
        this.collectName = collectName;
        this.user_id = user_id;
        this.create_at = create_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCollectName() {
        return collectName;
    }

    public void setCollectName(String collectName) {
        this.collectName = collectName;
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
        return "Collects{" +
                "id=" + id +
                ", collectName='" + collectName + '\'' +
                ", user_id=" + user_id +
                ", create_at=" + create_at +
                '}';
    }
}
