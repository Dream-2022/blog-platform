package bean;

public class Labels {
    private int id;
    private String labelName;

    public Labels() {
    }

    public Labels(int id, String labelName) {
        this.id = id;
        this.labelName = labelName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
                ", labelName='" + labelName + '\'' +
                '}';
    }
}
