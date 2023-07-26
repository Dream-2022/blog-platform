package bean;

import java.util.Arrays;

public class LabelList {
    private String[] selectElement;
    private int articleId ;


    public LabelList(String[] selectLabel, int articleId) {
        this.selectElement = selectLabel;
        this.articleId = articleId;
    }

    public LabelList() {
    }

    public String[] getSelectLabel() {
        return selectElement;
    }

    public void setSelectElement(String[] selectLabel) {
        this.selectElement = selectLabel;
    }

    public int getArticleId() {
        return articleId;
    }

    public void setArticleId(int articleId) {
        this.articleId = articleId;
    }

    @Override
    public String toString() {
        return "LabelList{" +
                "selectLabel=" + Arrays.toString(selectElement) +
                ", articleId=" + articleId +
                '}';
    }
}
