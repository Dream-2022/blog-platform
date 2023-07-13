package server;

import java.sql.*;

public class DatabaseConnection {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/blog?useUnicode=true&characterEncoding=utf-8"; // 定义数据库 URL，用于连接本地 MySQL 数据库的数据库
    private static final String USER = "root";   // 定义连接数据库的用户名 不可被修改
    private static final String PASSWORD = "501021";   // 定义连接数据库的密码

    // 建立数据库连接
    public static Connection connect() {
        try {
            // 使用 DriverManager 的 getConnection 方法尝试连接数据库,如果连接成功，返回 Connection 对象
            return DriverManager.getConnection(DB_URL, USER, PASSWORD);
        } catch (SQLException e) {
            // 如果连接过程中发生异常，打印异常堆栈信息
            e.printStackTrace();
            System.out.println("失败连接");
            // 返回 null，表示连接失败
            return null;
        }
    }

    public static void main(String[] args) throws SQLException {
        Connection connection=connect();
        String  sql="SELECT * FROM user WHERE username = ? AND password = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, "12345678910");
        preparedStatement.setString(2, "1234567q");
        ResultSet rs = preparedStatement.executeQuery();

        if(rs.next()) {
            System.out.println("成功");
            System.out.println(rs.getString(2));
        }
    }
}
