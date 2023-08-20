package tool;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class ImageWatermark {

    public static void setSY(String filepath, String mark)
    {
        try {
            File sourceImageFile = new File(filepath);
            BufferedImage sourceImage = ImageIO.read(sourceImageFile);

            // 创建一个与源图片相同大小的新图片
            BufferedImage outputImage = new BufferedImage(sourceImage.getWidth(), sourceImage.getHeight(), BufferedImage.TYPE_INT_RGB);

            // 将源图片绘制到新图片中
            Graphics2D graphics = outputImage.createGraphics();
            graphics.drawImage(sourceImage, 0, 0, null);

            // 添加水印
            Font font = new Font("Arial", Font.BOLD, 35); // 水印字体
            graphics.setFont(font);
            graphics.setColor(Color.RED); // 水印颜色
            graphics.drawString(mark, 10, 50); // 水印位置

            // 保存输出图片
            File outputImageFile = new File(filepath);
            ImageIO.write(outputImage, "jpg", outputImageFile);

            System.out.println("水印添加完成！");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {
        String sourceImagePath = "D:\\javaj\\upload"; // 源图片路径
        String watermarkText = "Watermark"; // 水印文字
        String outputImagePath = "D:\\javaj\\upload"; // 输出图片路径

        try {
            File sourceImageFile = new File(sourceImagePath);
            BufferedImage sourceImage = ImageIO.read(sourceImageFile);

            // 创建一个与源图片相同大小的新图片
            BufferedImage outputImage = new BufferedImage(sourceImage.getWidth(), sourceImage.getHeight(), BufferedImage.TYPE_INT_RGB);

            // 将源图片绘制到新图片中
            Graphics2D graphics = outputImage.createGraphics();
            graphics.drawImage(sourceImage, 0, 0, null);

            // 添加水印
            Font font = new Font("Arial", Font.BOLD, 36); // 水印字体
            graphics.setFont(font);
            graphics.setColor(Color.RED); // 水印颜色

            graphics.drawString(watermarkText, 10, 50); // 水印位置

            // 保存输出图片
            File outputImageFile = new File(outputImagePath);
            ImageIO.write(outputImage, "jpg", outputImageFile);

            System.out.println("水印添加完成！");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}