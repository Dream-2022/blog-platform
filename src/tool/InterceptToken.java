package tool;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

public class InterceptToken {
    public static boolean interceptToken(String token, String longt, HttpServletRequest req, HttpServletResponse resp){
        String KEY=JwtTest.KEY;
        JwtParser jwtParser= Jwts.parser();
        Jws<Claims> claimsJws=jwtParser.setSigningKey(KEY).parseClaimsJws(token);
        Claims claims=claimsJws.getBody();
        Date expirationDate=claims.getExpiration();
        Date currentDate=new Date();

        // 判断 token 是否过期
        if (currentDate.after(expirationDate)) {
            System.out.println("已过期,返回true");
            //再判断长token是否过期

            return true;
        } else {
            System.out.println("Token 未过期，返回false");
            System.out.println(claims.get("username"));
            System.out.println(claims.get("isadmin"));
            System.out.println(claims.get("role"));
            System.out.println(claims.getId());
            System.out.println(claims.getSubject());

            return false;
        }
    }
}
