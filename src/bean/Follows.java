package bean;

public class Follows {
    private int id;
    private int blogger_id;
    private int fans_id;

    public Follows() {
    }

    public Follows(int id, int blogger_id, int fans_id) {
        this.id = id;
        this.blogger_id = blogger_id;
        this.fans_id = fans_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBlogger_id() {
        return blogger_id;
    }

    public void setBlogger_id(int blogger_id) {
        this.blogger_id = blogger_id;
    }

    public int getFans_id() {
        return fans_id;
    }

    public void setFans_id(int fans_id) {
        this.fans_id = fans_id;
    }

    @Override
    public String toString() {
        return "Follows{" +
                "id=" + id +
                ", blogger_id=" + blogger_id +
                ", fans_id=" + fans_id +
                '}';
    }
}
