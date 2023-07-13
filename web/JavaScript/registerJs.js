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
