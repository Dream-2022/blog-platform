package bean;

public class RotationChart {
    private int id;
    private String content;
    private int state;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public RotationChart() {
    }

    public RotationChart(int id, String content, int state) {
        this.id = id;
        this.content = content;
        this.state = state;
    }

    @Override
    public String toString() {
        return "RotationChart{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", state=" + state +
                '}';
    }
}
