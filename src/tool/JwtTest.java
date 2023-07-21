package tool;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class JwtTest {
    public static String KEY="!Q@#E$RF%WE#!";
    public static int time=5*24*1200;
    public static int longTime=10*24*1200;
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
}
