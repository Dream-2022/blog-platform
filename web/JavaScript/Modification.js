
    // 设置头像点击事件
    window.onload = function() {
    // 设置头像点击事件
    document.getElementById('avatarImage').onclick = function() {
        document.getElementById('upload').click();
    };

    document.getElementById('upload').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                document.getElementById('avatarImage').src = reader.result;
                console.log(reader.result)

                // 创建一个 FormData 对象
                const formData = new FormData();
                formData.append('username', creator);
                formData.append('avatar', file);

                //上传到数据库
                axios({
                    url:'/Blog/user/ModificationAvatarTest',
                    method:'POST',
                    data: formData
                }).then(result=> {
                    console.log(result)
                    const userObj = result.data
                    console.log(userObj)
                    localStorage.setItem("pricture",userObj.picture);
                    console.log("洒水："+userObj.picture)
                    document.querySelector('.ui.avatar.image').src="/upload/"+userObj.picture;
                    document.querySelector('.ui.medium.circular.image.headSculpture').src="/upload/"+userObj.picture;
                    localStorage.setItem("picture",userObj.picture)
                })
            };
        }
    };
};




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
        url:'/Blog/user/ModificationTest',
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
        update();

    })
})
