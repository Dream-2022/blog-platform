package test;
import io.jsonwebtoken.*;
import org.junit.Test;
import java.util.Date;
import java.util.UUID;

public class jwt {
    private static final String SECRET_KEY = "!Q@#E$RF%WE#!";

    @Test
    public void jwth() {
        String userid="123213";
        String isadmin="2143";
        int time = 20*1200;

        JwtBuilder jwtBuilder = Jwts.builder();
        String token = jwtBuilder
                .setHeaderParam("type","JWT")
                .setHeaderParam("alg","HS256")
                .claim("username",userid)
                .claim("isadmin",isadmin)
                .setSubject("login")
                .setExpiration(new Date(System.currentTimeMillis() + time))
                .setId(UUID.randomUUID().toString())
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        System.out.println(token);
    }
    @Test
    public void test(){
        String token="eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VybmFtZSI6IjEyMzIxMyIsImlzYWRtaW4iOiIyMTQzIiwic3ViIjoibG9naW4iLCJleHAiOjE2ODk2MTYxNDksImp0aSI6ImRhNzcyYjQ2LWVhODEtNDQzMS1hNTdiLWE4MTY1YzA0ODdiNCJ9.pMAnLNjIQ_mxRxrgXukc6YvxbWcbrvxixwtFUsWFs4g";
        JwtParser jwtParser=Jwts.parser();
        Jws<Claims> claimsJws=jwtParser.setSigningKey(SECRET_KEY).parseClaimsJws(token);
        Claims claims=claimsJws.getBody();
        System.out.println(claims.get("username"));
        System.out.println(claims.get("isadmin"));
        System.out.println(claims.get("role"));
        System.out.println(claims.getId());
        System.out.println(claims.getSubject());
        System.out.println(claims.getExpiration());
    }
}
