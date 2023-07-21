//上传头像
// document.querySelector('.upload').addEventListener('change',e=>{
//     //获取头像文件
//     console.log(e.target.files[0])
//     const avatar=e.target.files[0]
//     const username=creator
//     //提交服务器并更新头像
//     axios({
//         url:'/Blog/ModificationAvatarTest',
//         method:'PUT',
//         params: {avatar,username}
//     }).then(result=>{
//         console.log(result)
//         console.log(result.data)
//         const imUrl=result.data.avatar
//         document.querySelector('.collect-avatar').src=imUrl
//         localStorage.setItem("picture",imUrl);
//     })
// })

//上传图片(图片添加点击事件)
document.querySelector('.collect-avatar').addEventListener("click", function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(e) {
        var file = e.target.files[0];
        var imageRegex = /\.(jpeg|jpg|png|gif)$/i;
        if(imageRegex.test(file.name))
        {
            var imageUrl = URL.createObjectURL(file);
            console.log("这是一个图片")
            console.log(imageUrl)
            document.querySelector('.collect-avatar').src=`${imageUrl}`;
        }
        // 在这里可以对选择的文件进行处理
        console.log("选择的文件: ", file);
        //上传到数据库
        axios({
            url:'/Blog/ModificationAvatarTest',
            method:'PUT',
            params:{
                username:creator,
                avatar:imageUrl
            }
        }).then(result=> {
            console.log(result)
            const userObj = result.data
            console.log(userObj)
            localStorage.setItem("pricture",userObj.picture);
        })
    };
    input.click();
});
//手机号正则判断
const phoneHeZi=document.querySelector('.collect-phone')
phoneHeZi.addEventListener('change',isValidPhoneNumber)
function isValidPhoneNumber() {
    const phoneTi=document.querySelector('.ti')
    // 定义手机号正则表达式
    var phoneRegex = /^[1][3-9][0-9]{9}$/;
    if(phoneRegex.test(phoneHeZi.value)){
        phoneTi.innerHTML='&nbsp;'
        return true
    }
    phoneTi.innerHTML='手机号格式不正确'
    return false
}
//生日日期的判断
const birthdayHeZi=document.querySelector('.collect-birthday')
birthdayHeZi.addEventListener('change',isValidBirthday)
function isValidBirthday(){
    const birthdayTi=document.querySelector('.tiBirthday')
    const birthdayValue = birthdayHeZi.value;
    // 将生日字符串转换为 Date 对象
    const birthdayDate = new Date(birthdayValue);
    // 获取当前时间的 Date 对象
    const currentDate = new Date();
    // 比较生日和当前时间
    if (birthdayDate > currentDate) {
        birthdayTi.innerHTML='生日格式不正确'
    } else {
        birthdayTi.innerHTML='&nbsp;'
    }
}
//保存修改-》点击
document.querySelector('.save-button').addEventListener('click',()=>{
    const gRadioList=document.querySelectorAll('.collect-gender')
    let gender;
    if(gRadioList[0].checked){
        gender='男'
    }else if(gRadioList[1].checked){
        gender='女'
    }
    const nickname=document.querySelector('.collect-nickname').value
    const username=localStorage.getItem("username")
    const birthday=document.querySelector('.collect-birthday').value
    const profile=document.querySelector('.collect-desc').value
    const phone=document.querySelector('.collect-phone').value

    axios({
        url:'/Blog/ModificationTest',
        method: 'put',
        params:{nickname,username,gender,birthday,profile,phone}
    }).then(result=>{
        console.log(result);
        console.log(result.data);

        $('#myToast .toast-body').html("<i class='fas fa-times-circle mr-2'></i>" + "保存成功");
        $('#myToast').toast('show'); // 显示浮窗
        localStorage.setItem("nickname",nickname);
        localStorage.setItem("gender",gender);
        localStorage.setItem("profile",profile);
        localStorage.setItem("birthday",birthday);
        localStorage.setItem("phone",phone);
        const button1=document.querySelector('#exit-modify')
        button1.click;
    })
})
