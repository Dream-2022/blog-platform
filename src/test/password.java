//package test;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.server.ResponseStatusException;
//
//@RestController
//public class password {
//
//    @PostMapping("/your-api-endpoint")
//    public String handleLogin(@RequestBody LoginForm loginForm) {
//        String username = loginForm.getUsername();
//        String password = loginForm.getPassword();
//
//        // 在这里进行验证和判断逻辑
//        if (username.equals("admin") && password.equals("123456")) {
//            return "登录成功";
//        } else {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "登录失败");
//        }
//    }
//
//    public static class LoginForm {
//        private String username;
//        private String password;
//
//        public String getUsername() {
//            return username;
//        }
//
//        public void setUsername(String username) {
//            this.username = username;
//        }
//
//        public String getPassword() {
//            return password;
//        }
//
//        public void setPassword(String password) {
//            this.password = password;
//        }
//    }
//}