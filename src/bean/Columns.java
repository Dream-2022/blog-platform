package bean;

import java.sql.Timestamp;

public class Columns {
    private int id;
    private int user_id;
    private String columnName;
    private Timestamp create_at;

    public Columns(int id, int user_id, String columnName, Timestamp create_at) {
        this.id = id;
        this.user_id = user_id;
        this.columnName = columnName;
        this.create_at = create_at;
    }

    public Columns() {
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

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public Timestamp getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Timestamp create_at) {
        this.create_at = create_at;
    }

    @Override
    public String toString() {
        return "Column{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", columnName='" + columnName + '\'' +
                ", create_at=" + create_at +
                '}';
    }
}
