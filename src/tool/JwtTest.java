package tool;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class JwtTest {
    public static String KEY="!Q@#E$RF%WE#!";
    public static int time=10*24*3600;
    public static int longTime=20*24*3600;
    public static Map<String,Object> getToken(String username, String isAdmin){
        Map<String,Object>tokenmap=new HashMap<>();
        JwtBuilder jwtBuilder= Jwts.builder();
        String token = jwtBuilder
                .setHeaderParam("type","JWT")
                .setHeaderParam("alg","HS256")
                .claim("username",username)
                .claim("isAdmin",isAdmin)
                .setSubject("login")
                .setExpiration(new Date(System.currentTimeMillis() + time))
                .setId(UUID.randomUUID().toString())
                .signWith(SignatureAlgorithm.HS256, KEY)
                .compact();
        String longt=jwtBuilder
                .setHeaderParam("type","JWT")
                .setHeaderParam("alg","HS256")
                .claim("username",username)
                .claim("isAdmin",isAdmin)
                .setSubject("login")
                .setExpiration(new Date(System.currentTimeMillis() + longTime))
                .setId(UUID.randomUUID().toString())
                .signWith(SignatureAlgorithm.HS256, KEY)
                .compact();
        tokenmap.put("token",token);
        tokenmap.put("longt",longt);
        return tokenmap;
    }
    //判断token和longt是否过期
    public static int isToken(String token,String longt){
        System.out.println("token:"+token);
        System.out.println("longt:"+longt);
        if(longt==null||longt.equals("")){
            return 0;
        }

        Jws<Claims> claimsJws=null;
        try{
            System.out.println("KEY:"+KEY);
            claimsJws= Jwts.parser().setSigningKey(KEY).parseClaimsJws(longt);
            System.out.println(claimsJws);
        }catch (ExpiredJwtException e){
            e.printStackTrace();
            return 0;
        }

        if(token==null||token.equals("")){
            return 0;
        }
        try{
            claimsJws=Jwts.parser().setSigningKey(KEY).parseClaimsJws(token);
            System.out.println(claimsJws);
        }catch (ExpiredJwtException e){
            e.printStackTrace();
            return 1;//token过期，longt未过期
        }catch (JwtException e) {
            // 其他异常处理
            e.printStackTrace();
            // 进行适当的处理
        }
        return 2;//token,longt未过期
    }
}
