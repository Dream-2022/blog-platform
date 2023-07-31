package controller;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.nio.file.Paths;
//@WebServlet("/upload_image")
public class ImageUploadServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println(111222);
        Map<String,Object> map=new HashMap<>();
        try {
            // 获取上传的文件流
            InputStream inputStream = request.getInputStream();

            // 生成唯一的文件名
            String filename = UUID.randomUUID().toString() + ".jpg";

            // 指定保存目录
            String saveDirectory = "http://localhost:9999/image/";

            // 创建保存目录（如果不存在）
            Files.createDirectories(Paths.get(saveDirectory, filename));

            // 完整的保存路径
            String filePath = saveDirectory + "/" + filename;

            // 保存文件
            OutputStream outputStream = new FileOutputStream(filePath);
            Files.copy(inputStream, Paths.get(saveDirectory, filename), StandardCopyOption.REPLACE_EXISTING);

            // 返回成功响应
            Map<String,Object> data=new HashMap<>();
            map.put("errno",0);
            data.put("url",filePath);
            data.put("alt",filename);
            data.put("href",filePath);

            map.put("data",data);

        } catch (Exception e) {
            e.printStackTrace();

            map.put("errno",1);
            map.put("message","图片上传失败");
            // 返回错误响应

        }

        Gson gson=new Gson();
        String message=gson.toJson(map);

        response.setContentType("text/html;charset=UTF-8");

        response.getWriter().write(message);
    }
}
