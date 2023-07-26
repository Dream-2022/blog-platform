
//正则判断邮箱
const email=document.querySelector('#abc')
email.addEventListener('change',verifyEmail)
function verifyEmail() {
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(regex.test(email.value)) {
        passwordSpan.innerHTML='&nbsp;'
        return true
    }
    passwordSpan.innerHTML='邮箱格式不正确'
    return false
}
//正则判断密码
const password=document.querySelector('#bcd')
password.addEventListener('change',verifyPassword)
const passwordSpan=document.querySelector('.red')
function verifyPassword() {
    const regex=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
    if(regex.test(password.value)) {
        passwordSpan.innerHTML='&nbsp;'
        return true
    }
    passwordSpan.innerHTML='密码应是6-18字母、数字和字符，包含两种及以上'
    return false
}

//判断两次输入密码是否相同
const confirm=document.querySelector('#cde')
confirm.addEventListener('change',verifyConfirm)
function verifyConfirm(){
    if(confirm !== password){
        passwordSpan.innerHTML='两次输入的密码不相等'
        return false
    }
    passwordSpan.innerHTML='&nbsp;'
    return true
}

//点击获取验证码按钮
const ObtainCode = document.querySelector('.obtainCode');
ObtainCode.addEventListener('click', e=> {
    // 处理表单数据的逻辑
    const email = document.querySelector('#abc').value

    if(verifyEmail()===false||email===""){
        alert("请填写邮箱")
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
        url: '/Blog/user/EmailTest',
        method: 'post',
        params: {email}
    }).then(result => {
        console.log("result:" + result.data)
    }).catch(error => {
        console.log("error:" + error.response.data.message)
    })
})

//点击注册按钮(注册事件)
const RegisterButton = document.querySelector('.Register-button');
RegisterButton.addEventListener('click', e => {

    const email=document.querySelector(".email").value
    const code=document.querySelector(".code").value
    let password =document.querySelector("#bcd").value
    const confirm=document.querySelector(".confirm").value
    // 遍历每个输入框元素

    if (email === ""||verifyEmail()===false) {
        //alert("邮箱为空或格式不正确")
        $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + "邮箱为空或格式不正确");
        $('#myToast').toast('show'); // 显示浮窗
        return;
    }
    if (code === "") {
        //alert("验证码不能为空")
        $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + "验证码不能为空");
        $('#myToast').toast('show'); // 显示浮窗
        return;

    }
    if (password === "" ||verifyPassword()===false) {
        //alert("密码为空或密码格式不正确")
        $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" +" 密码为空或密码格式不正确");
        $('#myToast').toast('show'); // 显示浮窗
        return;
    }
    if(confirm===""){
        //alert("密码为空或密码格式不正确")
        $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + "密码为空或密码格式不正确");
        $('#myToast').toast('show'); // 显示浮窗
        return;
    }

    //用MD5加密
    password=CryptoJS.MD5(password).toString();

    axios({
        url: '/Blog/Fail/RegisterTest',
        method: 'post',
        params: {email,code,password}
    }).then(result => {
        const div=document.querySelector('.alert')

        console.log(result.data);
        const status=result.data.status;

        console.log(status)
        function modal(response){
            console.log('进入modal')
            if(status=='repeat'){
/*                div.innerHTML='该账号重复注册'
                console.log('div.classList.add(\'success\')')
                div.classList.add('success')
                div.style.backgroundColor = "#d29d85";*/
                $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + response.message);
                $('#myToast').toast('show'); // 显示浮窗
            }
            else if(status=='codeFail'){
               /* div.innerHTML='验证码错误'
                console.log('div.classList.add(\'codeFail\')')
                div.classList.add('codeFail')
                div.style.backgroundColor = "#d29d85";*/
                $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + response.message);
                $('#myToast').toast('show'); // 显示浮窗
            }
            else if(status=='codeExpire'){
/*                div.innerHTML='验证码过期'
                console.log('div.classList.add(\'codeExpire\')')
                div.classList.add('codeExpire')
                div.style.backgroundColor = "#d29d85";*/
                $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + response.message);
                $('#myToast').toast('show'); // 显示浮窗
            }
            else if(status=='register success'){
/*                div.innerHTML='注册成功'
                console.log('div.classList.add(\'register success\')')
                div.classList.add('register success')
                div.style.backgroundColor = "#bde7b5";*/
                $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + response.message);
                $('#myToast').toast('show'); // 显示浮窗
            }
            else if(status=='register fail'){
/*                div.innerHTML='注册失败'
                console.log('div.classList.add(\'register fail\')')
                div.classList.add('register fail')
                div.style.backgroundColor = "#d29d85";*/
                $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + response.message);
                $('#myToast').toast('show'); // 显示浮窗
            }
            if(status=='register success'){
                $('#myToast .toast-body').html("<i class='fas fa-check-circle mr-2'></i>" + response.message);
                $('#myToast').toast('show'); // 显示浮窗
                setTimeout(()=>{
                    console.log("页面跳转到登录页面")
                    window.location.href = '../Login.html';
                },1000)
            }
        }
        modal(result.data)
    }).catch(error => {
        if (error.response) {
            console.log("error:" + error.response.data)
        } else {
            console.log(error);
        }
    })

})