package tool;


import servlet.UserTest;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.logging.LogRecord;

@WebFilter("/user/*")
public class TokenFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig){
        System.out.println("TokenFilter正在拦截");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("user正在过滤");
        HttpServletRequest req=(HttpServletRequest) servletRequest;
        HttpServletResponse resp=(HttpServletResponse) servletResponse;
        String token=req.getHeader("token");
        String longt=req.getHeader("longt");

        int flag=0;
        try {
            System.out.println("try语句进入");
            flag = JwtTest.isToken(token, longt);
            System.out.println("try语句出来,flag="+flag);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("长短token都过期了,flag:"+flag);
            throw e;
        }
        if(flag==0){
            System.out.println("拦截：401错误");
            resp.setStatus(401);
        }
        else if(flag==1){
            Map<String,Object> map=JwtTest.getToken(UserTest.user.getUsername(),UserTest.user.getAdmin());
            System.out.println("短token更新");
            System.out.println("token"+map.get("token"));
            System.out.println("longt"+map.get("longt"));
        }
        filterChain.doFilter(req,resp);
    }

    @Override
    public void destroy() {
        System.out.println("TokenFilter destroy");
    }

}

