package tool;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class ObtainSqlSession {
    public static SqlSession obtainSqlSession() throws IOException {
        //加载核心配置文件
        InputStream is = Resources.getResourceAsStream("UserConfig.xml");
        //获取SqlSession工厂对象
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(is);
        //通过SqlSession工厂对象获取SqlSession对象
        SqlSession sqlSession=sqlSessionFactory.openSession(true);
        is.close();
        return sqlSession;
    }
}
