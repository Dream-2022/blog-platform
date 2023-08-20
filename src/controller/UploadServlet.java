package controller;

import com.google.gson.Gson;
import tool.ImageWatermark;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet("/upload_image")
@MultipartConfig
public class UploadServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("uuu");
        // 设置请求字符集
        request.setCharacterEncoding("UTF-8");

        String userid=request.getParameter("userid");
        // 获取上传的文件
        Part part = request.getPart("wangeditor-uploaded-image");
        String fileName=getFileName(part);
        Map<String,Object> map=new HashMap<>();
        System.out.println(part==null);
        // 判断是否选择了文件
        if (part != null && part.getSize() > 0) {
            // 获取文件信息
            System.out.println("不为空");
            String header=part.getHeader("content-disposition");

            String contentType = part.getContentType();

            // 设置上传目录
            String uploadDirectory = "D:\\javaj\\upload";

            // 构造文件保存路径
            String savePath = uploadDirectory + File.separator + fileName;
            String path="http://localhost:8080/upload/";
            // 将文件写入保存路径
            part.write(savePath);
            System.out.println(savePath);
            ImageWatermark.setSY(savePath,"author_id:"+userid);
            // 返回上传成功信息
            System.out.println(path+fileName);
            Map<String,Object> data=new HashMap<>();
            map.put("errno",0);
            data.put("url",path+fileName);
            data.put("alt",fileName);
            data.put("href",path+fileName);

            map.put("data",data);
        } else {
            // 如果没有选择文件，返回错误信息
            map.put("errno",1);
            map.put("message","图片上传失败");
        }

        Gson gson=new Gson();
        String message=gson.toJson(map);

        response.setContentType("text/html;charset=UTF-8");

        response.getWriter().write(message);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
    private String getFileName(Part part) {
        String contentDisposition = part.getHeader("content-disposition");
        Pattern pattern = Pattern.compile("filename=\"(.*)\"");
        Matcher matcher = pattern.matcher(contentDisposition);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

}