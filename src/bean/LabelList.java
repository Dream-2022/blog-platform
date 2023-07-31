package bean;

import java.util.Arrays;

public class LabelList {
    private String[] selectElement;
    private String  articleId ;


    public LabelList(String[] selectElement, String articleId) {
        this.selectElement = selectElement;
        this.articleId = articleId;
    }

    public LabelList() {
    }

    public String getArticleId() {
        return articleId;
    }

    public void setArticleId(String articleId) {
        this.articleId = articleId;
    }

    public String[] getSelectLabel() {
        return selectElement;
    }

    public void setSelectElement(String[] selectLabel) {
        this.selectElement = selectLabel;
    }

    public String[] getSelectElement() {
        return selectElement;
    }

    @Override
    public String toString() {
        return "LabelList{" +
                "selectLabel=" + Arrays.toString(selectElement) +
                ", articleId=" + articleId +
                '}';
    }
}
