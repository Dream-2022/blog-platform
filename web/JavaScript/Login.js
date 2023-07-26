const count=document.querySelector('.text')
count.addEventListener('change',verifyName)
const SpanAcc=document.querySelector('.redDiv')

//判断用户名是否正确
function verifyName(){
    // const regex=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,12}$/
    const regex=/^[0-9]{8,12}$/
    if(regex.test(count.value)){
        SpanAcc.innerHTML='&nbsp;'
        return true
    }
    SpanAcc.innerHTML='用户名是8-12位的数字'
    return false
}

//点击登录按钮
const button = document.querySelector('.bu');
button.addEventListener('click', e => {
    // 处理表单数据的逻辑
    const username = document.querySelector('.text').value
    let password = document.querySelector('#password').value

    if(verifyName()===false||password===""){
        alert("请检查后登录")
        return;
    }

    //md5加密
    password=CryptoJS.MD5(password).toString();
    const div=document.querySelector('.alert')
    axios({
        url: '/Blog/Fail/LoginTest',
        method: 'post',
        params: {username, password}
    }).then(result => {
        console.log(result.data);
        const success=result.data.success;
        if(success=='1'){
            console.log('div.classList.add(\'success\')')
            div.classList.add('success')
            div.style.backgroundColor = "#bde7b5";
            div.innerHTML="登录成功，即将跳转"
        }
        else {
            console.log('div.classList.add(\'fail\')')
            div.classList.add('success')
            div.style.backgroundColor = "#e5b098";
            div.innerHTML="账号或密码不正确，请重新输入"
        }
        div.classList.add('show')
        setTimeout(()=>
        {
            div.innerHTML=''
            div.classList.remove('.show')
            div.style.backgroundColor = "transparent";
            div.classList.add('.disappear')

        },2000)


        // 获取请求头中的所有键值对
        function getRequestHeaders() {
            var headers = {};
            var headerStrings = Object.keys(result.headers).map(function(key){
                return key + ': ' + result.headers[key];
            });

            // 将键值对字符串分割为键和值，并存储在headers对象中
            headerStrings.forEach(function(headerString) {
                var separatorIndex = headerString.indexOf(':');
                var key = headerString.substr(0, separatorIndex).trim();
                var value = headerString.substr(separatorIndex + 1).trim();
                headers[key] = value;
            });
            return headers;
        }

        // 调用函数获取请求头中的键值对
        var headers = getRequestHeaders();
        if(success=='1'){
            setTimeout(()=>{

                var headers = getRequestHeaders(); // 使用前面的函数获取请求头中的所有键值对
                var token = headers["token"];
                var longt = headers["longt"];
                localStorage.setItem("token",token)
                localStorage.setItem("longt",longt)
                const user=result.data.user;
                localStorage.setItem("id",user.id)
                localStorage.setItem("username",user.username)
                localStorage.setItem("email",user.email)
                localStorage.setItem("nickname",user.nickname);
                localStorage.setItem("gender",user.gender)
                localStorage.setItem("phone",user.phone)
                localStorage.setItem("picture",user.picture)
                localStorage.setItem("profile",user.profile)
                localStorage.setItem("admin",user.admin)
                localStorage.setItem("birthday",user.birthday)
                console.log("页面跳转")
                window.location.href = 'MainPage.html';

            },1000)
        }
    })
})




