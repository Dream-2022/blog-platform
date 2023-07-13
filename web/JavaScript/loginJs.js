const count=document.querySelector('.text')
count.addEventListener('change',verifyName)
const Span=document.querySelector('.redDiv')
//判断用户名是否正确
function verifyName(){
    const regex=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,12}$/
    if(regex.test(count.value))
    {
        Span.innerHTML='&nbsp;'
        return true
    }
    Span.innerHTML='用户名必须是8-12位字母和数字'
    return false
}
const button = document.querySelector('.bu');

    button.addEventListener('click', e => {
        // 处理表单数据的逻辑
        const username = document.querySelector('.text').value
        const password = document.querySelector('#password').value

        if(verifyName()===false||password===""){
            alert("请检查后登录")
            return;
        }

        axios({
            url: '/Blog/login',
            method: 'post',
            params: {username, password}
        }).then(result => {
            console.log("result:" + result.data)
        }).catch(error => {
            console.log("error:" + error.response.data.message)
        })
    })

