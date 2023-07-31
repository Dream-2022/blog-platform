//判断有无token令牌
const token=localStorage.getItem('token')
if(!token){
    location.href='../Login.html'
}


const detailId=localStorage.getItem('detail-author-id')
const id=localStorage.getItem('id')
console.log(detailId)
let isFollow=false///////////////////////////////////////////////////记住要在打开页面时判断是否已经关注过该用户
let user_id
//如果是看别人的个人中心，右上角为+关注
if(detailId!==null&&id!==detailId){
    user_id=detailId
    document.querySelector('.edit-button').style.display = "none";
    // //将编辑按钮隐藏
    // document.querySelector('.edit-box').style.display = "none";
}
else{
    // 在页面加载时执行查询请求(加载文章--默认点击是全部)
    user_id=localStorage.getItem("id")
    document.querySelector('.follow-button').style.display = "none";
}
console.log(user_id)
//看自己的个人中心，右上角是编辑资料
// 文章盒子
const blogListContainer = document.querySelector('.blog-box');
//插入文章盒子
function addArticle(blogData){
    // 创建包含博客内容的div元素
    const contentBox = document.createElement('div');
    contentBox.classList.add('content-box');
    if(blogData.avatar===""){
        blogData.avatar="../image/cat.jpeg"
    }
    // 根据数据设置博客内容
    contentBox.innerHTML = `
                    <table>
                      <tr>
                        <td rowspan="2"><img src=${blogData.avatar} class="content-image" alt=""></td>
                        <td>
                          <h3>${blogData.title}</h3>
                          <span class="content-span">${blogData.textarea}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span><i class="eye icon"></i>浏览量</span><span>${blogData.view}</span>
                          <span><i class="thumbs up icon"></i>点赞</span><span>${blogData.give}</span>
                          <span><i class="star icon"></i> 收藏</span><span>${blogData.collect}</span>
                          <span class="content-id">${blogData.id}</span>
                          <button class="content-edit">编辑</button>
                        </td>
                      </tr>
                    </table>
                  `;

    // 将contentBox和blogBox依次添加到blogListContainer中
    blogListContainer.appendChild(contentBox);
}



//如果是其他用户点击博主的页面，此时有些功能和有些地方不能显示
//草稿，未发布的文章看不到（将全部和草稿箱隐藏）


//点击全部
document.querySelector('.nav-all').addEventListener('click',function (){
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')
    document.querySelector('.nav-all').classList.add('active');
    document.querySelector('.nav-all').classList.remove('ordinary');

    console.log('点击全部按钮')
    axios({
        url:'/Blog/Articles/selectArticlesByUser_idDetail',
        params:{
            user_id
        }
    }).then(result => {
        allButton(result);
    })
})
function allButton(result){
    var targetElement = document.querySelector('.blog-box');
    targetElement.innerHTML = '';
    // 遍历数据并将每个博客插入到页面中
    result.data.forEach((blogData, index) => {
        console.log(blogData)
        addArticle(blogData);//默认打开时相当于点击了全部按钮

        // 在每个博客之间添加分隔线
        if (index < result.data.length - 1) {
            const separator = document.createElement('hr');
            blogListContainer.appendChild(separator);
        }

    });
}



//点击草稿箱
document.querySelector('.nav-DraftBin').addEventListener('click',function (){
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')
    document.querySelector('.nav-DraftBin').classList.add('active');
    document.querySelector('.nav-DraftBin').classList.remove('ordinary')
    console.log('点击草稿箱按钮')
    axios({
        url:'/Blog/Articles/selectArticlesByUser_idDetail',
        params:{
            user_id
        }
    }).then(result => {
        AuditButton(result,'草稿');
    })
})
//点击审核
document.querySelector('.nav-Audit').addEventListener('click',function (){
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')

    document.querySelector('.nav-Audit').classList.add('active');
    document.querySelector('.nav-Audit').classList.remove('ordinary');
    console.log('点击审核按钮')
    axios({
        url:'/Blog/Articles/selectArticlesByUser_idDetail',
        params:{
            user_id
        }
    }).then(result => {
        AuditButton(result,'发布');
    })

})
function AuditButton(result,state){
    var targetElement = document.querySelector('.blog-box');
    targetElement.innerHTML = '';
    let articles=[]
    result.data.forEach(item=>{
        if(item.state===state){
            articles.push(item)
        }
    })
    articles.forEach((blogData, index) => {
        addArticle(blogData)

        // 在每个博客之间添加分隔线
        if (index < result.data.length - 1) {
            const separator = document.createElement('hr');
            blogListContainer.appendChild(separator);
        }
    })
}



//点击收藏






window.addEventListener('DOMContentLoaded', function() {
    console.log('点击全部按钮')
    axios({
        url:'/Blog/Articles/selectArticlesByUser_idDetail',
        params:{
            user_id
        }
    }).then(result => {
        document.querySelector('#headSculpture').src="/upload/"+localStorage.getItem("picture")
        console.log("selectArticlesByUser_idDetail:result.data"+result.data);
        console.log(result)
        console.log(result.data)



        //用户打开其他博主的个人页面
        if(localStorage.getItem('detail-author-id')!==null&&localStorage.getItem('detail-author-id')!==id){
            AuditButton(result);//相当于点击审核按钮
            localStorage.removeItem('detail-author-id')//移除
            //设置’审核‘按钮的样式
            document.querySelector('.nav-Audit').classList.remove('ordinary');
            document.querySelector('.nav-Audit').classList.add('active');
            document.querySelector('.nav-Audit').click()
            document.querySelector('.nav-all').style.display='none'
            document.querySelector('.nav-DraftBin').style.display='none'
            // axios.get('/Blog/user/selectUserById')
            axios({
                url:'/Blog/user/selectUserById',
                method:'GET',
                params:{
                    id:user_id
                }
            }).then(result => {
                    console.log(result.data);
                    let user=result.data
                    // 给定的日期字符串
                    const dateString = user.birthday
                    const givenDate = new Date(dateString);
                    const currentDate = new Date();
                    let age = currentDate.getFullYear() - givenDate.getFullYear();
                    document.querySelector('.content-age').innerHTML=age+'岁'
                    document.querySelector('.content-gender').innerHTML=user.gender
                    document.querySelector('.username').innerHTML=user.username
                    document.querySelector('.email').innerHTML=user.email
                    document.querySelector('.content-nickname').innerHTML=user.nickname
                    document.querySelector('.content-detail3').innerHTML=user.profile
                    document.querySelector('.headSculpture').src="/upload/"+user.picture
                    const fan=document.querySelector('.fans')
                    const follow=document.querySelector('.follow')
                    const picture=document.querySelector("picture")
                })
                .catch(error => {
                    console.error(error);
                });
        }



        else{//相当于用户打开自己的个人页面
            allButton(result);//相当于点击全部按钮
            //设置’全部‘按钮的样式
            document.querySelector('.nav-all').classList.remove('ordinary');
            document.querySelector('.nav-all').classList.add('active');
            update();
        }


    })
    .catch(error => {
        console.error(error);
    });
});


//点击文章
document.querySelector('.blog-box').addEventListener('click', function(event) {
    // 检查点击的元素是否为 content-box 盒子
    if (event.target.closest('.content-box')&& !event.target.closest('.content-edit')) {
        var contentBox = event.target.closest('.content-box');
        var contentId = contentBox.querySelector('.content-id');
        var text = contentId.textContent;
        // 执行需要的操作，比如向后端发送请求，更新数据库等
        console.log("Content ID:", text);
        // 进入博客页面
        axios.get('/Blog/Articles/MainPageTest')
            .then(result => {
                console.log(result.data);
                articles=result.data;
                // 传key
                localStorage.setItem("key", text);
                window.location.href = "BlogPage.html";
            })
            .catch(error => {
                console.error(error);
            });
    }
});


//点击编辑文章
document.querySelector('.blog-box').addEventListener('click', function(event) {
    // 检查点击的元素是否为 content-edit 盒子
    if (event.target.closest('.content-edit')) {
        console.log('点击了编辑盒子')
        var contentBox = event.target.closest('.content-box');
        var contentId = contentBox.querySelector('.content-id');
        var text = contentId.textContent;
        console.log("Content ID:", text);
        localStorage.setItem("edit-key", text);
        window.location.href = "EditorPage.html";
    }
})




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


//点击关注
document.querySelector('.follow-button').addEventListener('click',function (){
    let fans_id=localStorage.getItem('id')
    axios({
        url:'/Blog/Follows/insertFollowsByBlogger_idAndFans_id',
        method: 'post',
        params:{
            blogger_id:detailId,fans_id
        }
    }).then(result=>{
        //更改关注样式!!!!!!!!!!!!!!!!!!

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

buttonSave.addEventListener('click',e=>{
    update();
})
buttonExit.addEventListener('click',e=>{
    update();
})







