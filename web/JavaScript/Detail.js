//判断有无token令牌
const token=localStorage.getItem('token')
if(!token){
    location.href='../Login.html'
}

//点击编辑资料时，通过数据库内容渲染
const creator=localStorage.getItem("username")
const editButtonModify=document.querySelector(".edit-button")
editButtonModify.addEventListener("click",function (){
    document.getElementById('avatarImage').src ='/upload/headSculpture.jpeg'
    document.querySelector('.collect-avatar').src = '/upload/headSculpture.jpeg'

    axios({
        url:'/Blog/user/DetailTest',
        params:{
            username:creator
        }
    }).then(result=>{
        console.log(result)
        const userObj=result.data
        console.log(userObj)
        //回显数据到标签上
        Object.keys(userObj).forEach(key=>{
            if(key==='avatar'){
                //赋予默认头像
                document.querySelector('#headSculpture').src="/upload/"+localStorage.getItem("picture")
            }
            else if(key==='gender'){
                //赋予默认性别，获取性别单选框
                const gRadioList=document.querySelectorAll('.collect-gender')
                console.log(gRadioList)
                console.log(userObj[key])
                if(userObj[key]=="男"){
                    gRadioList[0].checked=true
                }else if(userObj[key]=="女"){
                    gRadioList[1].checked=true
                }
            }
            else{
                document.querySelector('.collect-nickname').value=userObj.nickname
                document.querySelector('.collect-phone').value=userObj.phone
                document.getElementById('avatarImage').src ="/upload/"+userObj.picture
                console.log(userObj.birthday)
                var collectBirthdayInput = document.querySelector(".collect-birthday");
                // 将日期字符串转换为时间对象
                var dateObject = new Date(userObj.birthday);

                // 获取年、月、日转换为对应的字符串格式
                var year = dateObject.getFullYear().toString();
                var month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
                var day = dateObject.getDate().toString().padStart(2, "0");
                // 设置日期输入框的值
                collectBirthdayInput.value = `${year}-${month}-${day}`;
                document.querySelector('.collect-desc').value=userObj.profile
            }
        })
    })
})

//Detail上方的资料显示
function update(){
    console.log("资料修改")
    //页面上方的资料
    document.querySelector('.content-nickname').innerHTML=localStorage.getItem("nickname")
    // 给定的日期字符串
    const dateString = localStorage.getItem("birthday")
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - givenDate.getFullYear();
    document.querySelector('.content-age').innerHTML=age+'岁'
    document.querySelector('.content-gender').innerHTML=localStorage.getItem("gender")
    document.querySelector('.username').innerHTML=localStorage.getItem("username")
    document.querySelector('.email').innerHTML=localStorage.getItem("email")
    document.querySelector('.content-detail3').innerHTML=localStorage.getItem("profile")
    document.querySelector('#headSculpture').src="/upload/"+localStorage.getItem("picture")
    document.querySelector('.headSculpture').src="/upload/"+localStorage.getItem("picture")
    const fan=document.querySelector('.fans')
    const follow=document.querySelector('.follow')
    const picture=document.querySelector("picture")
}
const buttonSave=document.querySelector(".save-button")
const buttonExit=document.querySelector(".exit")
update();
buttonSave.addEventListener('click',e=>{
    update();
})
buttonExit.addEventListener('click',e=>{
    update();
})







