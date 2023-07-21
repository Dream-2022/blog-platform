// 登录页面忘记密码和注册页面的获取邮箱验证码
// 正则判断邮箱
const email=document.querySelector('#abc')
const Span=document.querySelector('.red')
email.addEventListener('change',verifyEmail)
function verifyEmail() {
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(regex.test(email.value)) {
        Span.innerHTML='&nbsp;'
        return true
    }
    Span.innerHTML='邮箱格式不正确'
    return false
}
//正则判断密码
const password=document.querySelector('#bcd')
password.addEventListener('change',verifyPassword)
function verifyPassword() {
    const regex=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
    if(regex.test(password.value)) {
        Span.innerHTML='&nbsp;'
        return true
    }
    Span.innerHTML='密码应是6-18字母、数字和字符，包含两种及以上'
    return false
}

//判断两次输入密码是否相同
const confirm=document.querySelector('#cde')
confirm.addEventListener('change',verifyConfirm)
function verifyConfirm(){
    if(confirm.value==password.value){
        Span.innerHTML='&nbsp;'
        return true
    }
    if(confirm.value !== password.value){
        Span.innerHTML='两次输入的密码不相等'
        return false
    }
}

//点击获取验证码按钮
const ObtainCode = document.querySelector('.obtainCode');
ObtainCode.addEventListener('click', e=> {
    // 处理表单数据的逻辑
    const email = document.querySelector('#abc').value

    if(verifyEmail()===false||email===""){
        alert("请填写正确的邮箱")
        return;
    }
    //倒计时（不可点击事件）
    let i=60;
    let n=setInterval(function (){
        ObtainCode.setAttribute('disabled', true);
        i--;
        ObtainCode.innerHTML=`<span style="color: #cbcbcb">${i}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`
        if(i===0){
            clearInterval(n)//关闭定时器
            ObtainCode.innerHTML='重新获取'
            ObtainCode.disabled=false
        }
    },1000)
    axios({
        url: '/Blog/EmailTest',
        method: 'post',
        params: {email}
    }).then(result => {
        console.log("result:" + result.data)
    }).catch(error => {
        console.log("error:" + error.response.data.message)
    })
})

//点击保存按钮(修改密码)
const saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', e => {

    const email=document.querySelector("#abc").value
    const code=document.querySelector(".input-code").value
    let password =document.querySelector("#bcd").value
    const confirm=document.querySelector("#cde").value
    // 遍历每个输入框元素

    if (email === ""||verifyEmail()===false) {
        alert("邮箱为空或格式不正确")
        return;
    }
    if (code === "") {
        alert("验证码不能为空")
        return;

    }
    if (password === "" ||verifyPassword()===false) {
        alert("密码为空或密码格式不正确")
        return;
    }
    if(confirm===""){
        alert("密码为空或密码格式不正确")
        return;
    }

    //用MD5加密
    password=CryptoJS.MD5(password).toString();


    axios({
        url: '/Blog/PasswordTest',
        method: 'post',
        params: {email,code,password}
    }).then(result => {
        const button2=document.querySelector('#exit-login-email')
        console.log(result.data)
        button2.click();
        const div=document.querySelector('.alert')
        console.log(result.data=='1')
        if(result.data=='1'){
            console.log('div.classList.add(\'success\')')
            div.classList.add('success')
            div.style.backgroundColor = "#bde7b5";
            div.innerHTML='修改成功'
        }
        else {
            console.log('div.classList.add(\'fail\')')
            div.classList.add('success')
            div.style.backgroundColor = "#e5b098";
            div.innerHTML=result.data;
        }

        div.classList.add('show')
        setTimeout(()=>
        {
            div.innerHTML=''
            div.classList.remove('.show')
            div.style.backgroundColor = "transparent";
            div.classList.add('.disappear')

        },2000)
    }).catch(error => {
        console.log("error:" + error.response.data.message)
    })
})