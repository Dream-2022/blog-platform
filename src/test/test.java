package test;

import bean.*;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class test {

    @Test
    public void selectAll() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<User> list=sqlSession.selectList("selectAll");
        //处理结果
        for(User user:list){
            System.out.println(user);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectById() throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        User user = sqlSession.selectOne("selectById", 1);
        //处理结果
        System.out.println(user);
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectByUsernameAndPassword() throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        Map<String, Object> params = new HashMap<>();
        params.put("username", "12345678910");
        params.put("password", "1");

        User user = sqlSession.selectOne("selectByUsernameAndPassword", params);
        //处理结果
        System.out.println(user);
        //释放资源
        sqlSession.close();
        is.close();
    }

    @Test
    public void insertUser() throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession(true);
        //执行映射配置文件中的sql语句，并接收结果
        User user = new User(5,"1","1","1","1","1","1",new Timestamp(System.currentTimeMillis()),"1","1","1");
        int result=sqlSession.insert("insert",user);
        //提交事务
        //sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void updateUser() throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        User user = new User(5,"1","223461","1","1","1","1",new Timestamp(System.currentTimeMillis()),"1","1","1");
        int result=sqlSession.update("update",user);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void delete() throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        int result=sqlSession.delete("delete",3);
        //提交事务
        sqlSession.commit();
        //处理结果
        System.out.println(result);
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectArticle() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Articles> lists=sqlSession.selectList("selectArticle");
        //处理结果
        for(Articles articles:lists){
            System.out.println(articles);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectCollect() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Collects> lists=sqlSession.selectList("selectCollect");
        //处理结果
        for(Collects collects:lists){
            System.out.println(collects);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectColumn_article() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Column_article> lists=sqlSession.selectList("selectColumn_article");
        //处理结果
        for(Column_article column_article:lists){
            System.out.println(column_article);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectColumn() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Columns> lists=sqlSession.selectList("selectColumn");
        //处理结果
        for(Columns column:lists){
            System.out.println(column);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectComment() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Comments> lists=sqlSession.selectList("selectComment");
        //处理结果
        for(Comments comment:lists){
            System.out.println(comment);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectLabel_article() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Label_article> lists=sqlSession.selectList("selectLabel_article");
        //处理结果
        for(Label_article labelArticle:lists){
            System.out.println(labelArticle);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectLabel() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Labels> lists=sqlSession.selectList("selectLabel");
        //处理结果
        for(Labels label:lists){
            System.out.println(label);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectFollow() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Follows> lists=sqlSession.selectList("selectFollow");
        //处理结果
        for(Follows follows:lists){
            System.out.println(follows);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
    @Test
    public void selectLike() throws IOException {
        //加载核心配置文件
        InputStream is= Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession();
        //执行映射配置文件中的sql语句，并接收结果
        List<Likes> lists=sqlSession.selectList("selectLike");
        //处理结果
        for(Likes likes:lists){
            System.out.println(likes);
        }
        //释放资源
        sqlSession.close();
        is.close();
    }
}
