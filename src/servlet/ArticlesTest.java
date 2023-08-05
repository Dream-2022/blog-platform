package servlet;

import bean.*;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import tool.ObtainSqlSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

public class ArticlesTest {
    //查找全部文章（修改为根据id找文章）
    public static List<Articles> selectByArticles(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Articles> lists=sqlSession.selectList("selectArticle");
        //处理结果
        for(Articles articles:lists){
            System.out.println(articles);
        }
        Gson gson=new Gson();
        String articleJson=gson.toJson(lists);
        System.out.println("序列化后："+articleJson);
        PrintWriter out=resp.getWriter();
        out.print(articleJson);
        //释放资源
        sqlSession.close();
        return lists;
    }
    //查找文章作者（在articles表通过文章id（id）查找user_id,然后再user表通过用户id（id）查找nickname
    public static void selectArticlesUserIdByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        System.out.println("article_id:"+article_id);
        Map<String, Object> params = new HashMap<>();
        params.put("id",article_id);
        Articles article =sqlSession.selectOne("selectArticlesUserIdByArticleId",params);

        String user_id=article.getUser_id();
        System.out.println("user_id:"+user_id);
        int id= Integer.parseInt(user_id);
        User user=sqlSession.selectOne("selectById",id);

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(user);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static int getYearFromDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }
    //搜索下拉框中选择的内容
    public static void selectArticlesForYearAndLabelAndColumn(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        String state=req.getParameter("state");
        String selectedYear=req.getParameter("selectedYear");
        String selectedLabelId=req.getParameter("selectedLabelId");
        String selectedColumnId=req.getParameter("selectedColumnId");
        String selectedSearch=req.getParameter("selectedSearch");
        System.out.println("user_id:"+user_id+"state:"+state+"selectedYear:"+selectedYear+"selectedLabelId:"+selectedLabelId+"selectedColumnId:"+selectedColumnId+"selectedSearch:"+selectedSearch);

        //找到这个人（user_id）满足state的全部文章，然后通过年，标签，专栏的筛选
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        params.put("selectedSearch",selectedSearch);
        List<Articles> articles =sqlSession.selectList("selectArticlesArticleIdByUserId",params);
        System.out.println(articles);

        List<Articles>articlesList=articles;
        System.out.println(articlesList);
        //接下来通过年，标签和专栏筛选
        Iterator<Articles> iterator = articles.iterator();
        while (iterator.hasNext()) {
            Articles article = iterator.next();
            System.out.println(article.getRelease_at());
            String year = String.valueOf(getYearFromDate(article.getRelease_at()));
            System.out.println("年份：" + year);
            if (!selectedYear.equals("年") && !year.equals(selectedYear)) {
                System.out.println("年不满足,移除");
                iterator.remove();
            }
        }
        if(!selectedLabelId.equals("标签")){
            Iterator<Articles> iterator1 = articles.iterator();
            while (iterator1.hasNext()) {
                Articles article = iterator1.next();

                //查找文章的全部标签，与selectLabel比较
                String article_id=article.getId();
                System.out.println(article_id);
                Map<String, Object> params1 = new HashMap<>();
                params1.put("article_id",article_id);

                List<Label_article> label_articles=sqlSession.selectList("selectLabelArticleByArticleId",params1);
                int flag=0;
                for (Label_article labelArticle : label_articles) {
                    String labelId= String.valueOf(labelArticle.getLabel_id());
                    System.out.println(labelId);
                    if(labelId.equals(selectedLabelId)){
                        flag=1;
                    }
                }
                if(flag==0) {
                    iterator1.remove();
                } // 使用迭代器的remove方法移除元素
            }
        }
        if(!selectedColumnId.equals("分类")){
            Iterator<Articles> iterator2 = articles.iterator();
            while (iterator2.hasNext()) {
                Articles article = iterator2.next();

                //查找文章的全部标签，与selectLabel比较
                String article_id=article.getId();
                System.out.println(article_id);
                Map<String, Object> params2 = new HashMap<>();
                params2.put("article_id",article_id);

                List<Column_article> columnArticles=sqlSession.selectList("selectColumnArticleByArticleId",params2);
                int flag=0;
                for (Column_article labelArticle : columnArticles) {
                    String columnId= String.valueOf(labelArticle.getColumn_id());
                    System.out.println(columnId);
                    if(columnId.equals(selectedColumnId)){
                        flag=1;
                    }
                }
                if(flag==0) {
                    iterator2.remove();
                } // 使用迭代器的remove方法移除元素
            }
        }


        System.out.println(articles);

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(articles);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    public static void selectArticlesForYearAndLabelAndColumnAndState(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        String state=req.getParameter("state");
        String selectedYear=req.getParameter("selectedYear");
        String selectedLabelId=req.getParameter("selectedLabelId");
        String selectedColumnId=req.getParameter("selectedColumnId");
        String selectedSearch=req.getParameter("selectedSearch");
        System.out.println("user_id:"+user_id+"state:"+state+"selectedYear:"+selectedYear+"selectedLabelId:"+selectedLabelId+"selectedColumnId:"+selectedColumnId+"selectedSearch:"+selectedSearch);

        //找到这个人（user_id）满足state的全部文章，然后通过年，标签，专栏的筛选
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        params.put("state",state);
        params.put("selectedSearch",selectedSearch);
        List<Articles> articles =sqlSession.selectList("selectArticlesArticleIdByUserIdAndState",params);
        System.out.println(articles);

        List<Articles>articlesList=articles;
        System.out.println(articlesList);
        //接下来通过年，标签和专栏筛选
        Iterator<Articles> iterator = articles.iterator();
        while (iterator.hasNext()) {
            Articles article = iterator.next();
            System.out.println(article.getRelease_at());
            String year = String.valueOf(getYearFromDate(article.getRelease_at()));
            System.out.println("年份：" + year);
            if (!selectedYear.equals("年") && !year.equals(selectedYear)) {
                System.out.println("年不满足,移除");
                iterator.remove();
            }
        }
//        //筛选标题
//        Iterator<Articles> iterator3 = articles.iterator();
//        while (iterator3.hasNext()) {
//            Articles article = iterator3.next();
//            System.out.println(article.getTitle());
//            System.out.println("标题：" + article.getTitle());
//            if (!selectedSearch.equals("") && !article.getTitle().equals(selectedSearch)) {
//                System.out.println("标题不满足,移除");
//                iterator3.remove();
//            }
//        }
        System.out.println("article:"+articles);
        if(!selectedLabelId.equals("标签")){
            Iterator<Articles> iterator1 = articles.iterator();
            while (iterator1.hasNext()) {
                Articles article = iterator1.next();

                //查找文章的全部标签，与selectLabel比较
                String article_id=article.getId();
                System.out.println(article_id);
                Map<String, Object> params1 = new HashMap<>();
                params1.put("article_id",article_id);

                List<Label_article> label_articles=sqlSession.selectList("selectLabelArticleByArticleId",params1);
                int flag=0;
                for (Label_article labelArticle : label_articles) {
                    String labelId= String.valueOf(labelArticle.getLabel_id());
                    System.out.println(labelId);
                    if(labelId.equals(selectedLabelId)){
                        flag=1;
                    }
                }
                if(flag==0) {
                    iterator1.remove();
                } // 使用迭代器的remove方法移除元素
            }
        }
        if(!selectedColumnId.equals("分类")){
            Iterator<Articles> iterator2 = articles.iterator();
            while (iterator2.hasNext()) {
                Articles article = iterator2.next();

                //查找文章的全部标签，与selectLabel比较
                String article_id=article.getId();
                System.out.println(article_id);
                Map<String, Object> params2 = new HashMap<>();
                params2.put("article_id",article_id);

                List<Column_article> columnArticles=sqlSession.selectList("selectColumnArticleByArticleId",params2);
                int flag=0;
                for (Column_article labelArticle : columnArticles) {
                    String columnId= String.valueOf(labelArticle.getColumn_id());
                    System.out.println(columnId);
                    if(columnId.equals(selectedColumnId)){
                        flag=1;
                    }
                }
                if(flag==0) {
                    iterator2.remove();
                } // 使用迭代器的remove方法移除元素
            }
        }


        System.out.println(articles);

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(articles);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //通过文章id获取文章的详细信息
    public static void selectArticlesByArticleId(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String article_id=req.getParameter("article_id");
        Map<String, Object> params = new HashMap<>();
        params.put("id",article_id);
        Articles article =sqlSession.selectOne("selectArticlesUserIdByArticleId",params);
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(article);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //通过user_id找他写的所有文章展示在个人页面
    public static void selectArticlesByUser_idDetail(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        System.out.println("user_id:"+user_id);
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        List<Articles> articles =sqlSession.selectList("selectArticlesByUser_idDetail",params);

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(articles);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //通过user_id找用户发布原创文章的数量
    public static void selectArticleByUser_id(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String user_id=req.getParameter("user_id");
        System.out.println("user_id:"+user_id);
        Map<String, Object> params = new HashMap<>();
        params.put("user_id",user_id);
        List<Articles> articles =sqlSession.selectList("selectArticlesUserIdByUserIdAndState",params);

        int count=articles.size();
        PrintWriter out=resp.getWriter();
        System.out.println("："+count);
        out.print(count);
    }
    //渲染主页的用户（根据用户的原创个数）
    public static  void selectArticlesByCount(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("selectArticlesByCount");
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        List<Integer> userIdList =sqlSession.selectList("selectArticlesByCount");
        System.out.println("userIdList:"+userIdList);

        List<User> users=new ArrayList<>();
        for (Integer integer : userIdList) {
            //根据user_id找user
            Map<String, Object> params = new HashMap<>();
            int user_id=integer;
            params.put("id",user_id);
            User user=sqlSession.selectOne("selectById",params);
            users.add(user);
        }
        //序列化传过去
        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(users);
        System.out.println("序列化前："+users);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //搜索（content）
    public static void likeSelectArticles(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        SqlSession sqlSession= ObtainSqlSession.obtainSqlSession();
        String content=req.getParameter("content");
        System.out.println("content:"+content);
        Map<String, Object> params = new HashMap<>();
        params.put("content",content);
        List<Articles> articles =sqlSession.selectList("likeSelectArticles",params);

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(articles);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //插入数据（保存文章)
    public static void insertArticle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入方法");
        String articleId=req.getParameter("articleId");
        String user_id= req.getParameter("user_id");
        String title= req.getParameter("title");
        String textarea= req.getParameter("textarea");
        String htmlText= req.getParameter("htmlText");
        System.out.println("htmlText"+htmlText);
        String plainText= req.getParameter("plainText");
        System.out.println("plainText"+plainText);
        String original= req.getParameter("original");
        System.out.println("original"+original);
        String avatar= req.getParameter("avatar");
        String state= req.getParameter("state");
        String view= req.getParameter("view");
        String give= req.getParameter("give");
        String collect= req.getParameter("collect");
        Date release_at= new Date();
        Date update_at= new Date();

        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();

        System.out.println(articleId+":"+user_id+":"+title+":"+textarea+":"+htmlText+":"+plainText+":"+original+":"+
                avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at);
//        Map<String, Object> params = new HashMap<>();
//        params.put("user_id",user_id);
//        params.put("title", title);
//        params.put("textarea", textarea);
//        params.put("htmlText", htmlText);
//        params.put("plainText", plainText);
//        params.put("original", original);
//        params.put("avatar", avatar);
//        params.put("state", state);
//        params.put("view", view);
//        params.put("give", give);
//        params.put("collect", collect);
//        params.put("release_at", release_at);
//        params.put("update_at", update_at);
        //执行映射配置文件中的sql语句，并接收结果
        Articles article=new Articles();
        //根据时间和用户生成唯一文章id
        String id=user_id+ System.currentTimeMillis();
        System.out.println(id);

        article.setId(id);
        System.out.println("文章id："+id);
        System.out.println("文章article.getId："+article.getId());
        article.setUser_id(user_id);
        article.setTitle(title);
        article.setTextarea(textarea);
        article.setHtmlText(htmlText);
        article.setPlainText(plainText);
        if(original.equals("original")){
            original="原创";
        }else if(original.equals("transshipment")){
            original="转载";
        }else if(original.equals("translation")){
            original="翻译";
        }
        article.setOriginal(original);
        article.setAvatar(avatar);
        article.setState(state);
        article.setView(view);
        article.setGive(give);
        article.setCollect(collect);
        article.setRelease_at(release_at);
        article.setUpdate_at(update_at);
        System.out.println("set");
        int result=sqlSession.insert("insertArticle",article);
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();

        PrintWriter out=resp.getWriter();
        Gson gson=new Gson();
        String dataJson = gson.toJson(article);
        System.out.println("序列化后："+dataJson);
        out.print(dataJson);
    }
    //给文章的点赞数自增
    public static void updateArticleGiveLike(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id=req.getParameter("article_id");
        String give= req.getParameter("give");
        System.out.println(id+":"+give);
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
//        Articles articles=new Articles();
//        articles.setUser_id(id);
//        articles.setGive(give);
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("give", give);
        int result = sqlSession.update("updateArticleGiveLike", params);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
    //将文章的浏览量自增
    public static void updateArticleGiveView(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("进入updateArticleGiveView方法");
        String id=req.getParameter("id");
        String view= req.getParameter("view");
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
//        Articles articles=new Articles();
//        articles.setUser_id(id);
//        articles.setGive(give);
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("view", view);
        System.out.println("id:"+id+"view:"+view);
        int result = sqlSession.update("updateArticleGiveView", params);
        System.out.println("事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
    //修改文章，就是点了保存（发布）之后，再次点击保存
    public static void updateArticleTest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("updateArticleTest");
        String id=req.getParameter("id");
        String title=req.getParameter("title");
        String textarea=req.getParameter("textarea");
        String htmlText=req.getParameter("html");
        String plainText=req.getParameter("content");
        String original=req.getParameter("original");
        Date update_at=new Date();
        if(original.equals("original")){
            original="原创";
        }
        else if(original.equals("transshipment")){
            original="转载";
        }
        else if(original.equals("translation")){
            original="翻译";
        }
        String avatar= req.getParameter("avatar");
        String state=req.getParameter("state");
        SqlSession sqlSession = ObtainSqlSession.obtainSqlSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("id",id);
        params.put("title", title);
        params.put("textarea", textarea);
        params.put("plainText", plainText);
        params.put("htmlText", htmlText);
        params.put("original", original);
        params.put("avatar", avatar);
        params.put("state", state);
        params.put("update_at", update_at);
        System.out.println("id:"+id+"update_at:"+update_at+"title:"+title+"textarea:"+textarea+"plainText:"+plainText+"htmlText:"+htmlText+"original:"+original+"avatar:"+avatar+"state:"+state);
        int result = sqlSession.update("updateArticleTest", params);
        System.out.println("修改文章，就是点了保存（发布）之后，再次点击保存：事务提交："+result);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
    }
    //插入图片
    public static void updateAvatar(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final String AVATAR_BASE_PATH = "D:\\javaj\\upload";
        Part avatarPart = req.getPart("avatar");
        System.out.println(req.getParts());
        System.out.println("”avatarPar:"+avatarPart);
        String avatar = null;
        if (avatarPart != null && avatarPart.getSize() > 0) {
            String disposition = avatarPart.getHeader("content-disposition");
            String fileName = null;
            if (disposition != null) {
                String[] parts = disposition.split(";");
                for (String part : parts) {
                    if (part.trim().startsWith("filename")) {
                        fileName = part.substring(part.indexOf('=') + 1).trim().replace("\"", "");
                        break;
                    }
                }
            }

            if (fileName != null) {
                fileName = Paths.get(fileName).getFileName().toString();
                File file = new File(AVATAR_BASE_PATH, fileName);
                // 判重
                if (!file.exists()) {
                    try (InputStream input = avatarPart.getInputStream()) {
                        System.out.println("下载成功：");
                        Files.copy(input, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }
                    avatar = fileName;
                } else {
                    avatar = fileName;
                    System.out.println("文件重复.");
                }
            }
        }

        // 创建一个 Gson 对象
        Gson gson = new Gson();

        // 将 User 对象转换为 JSON 字符串
        String avatar1 = gson.toJson(avatar);

        // 设置响应的内容类型为 JSON
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        System.out.println("avatar1"+avatar1);
        // 将 JSON 字符串写入响应
        resp.getWriter().write(avatar1);
    }

}
