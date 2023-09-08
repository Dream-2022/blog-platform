window.addEventListener('DOMContentLoaded', function(){
      console.log('打开页面')
      document.querySelector('.content-comment').click()
})

//点击评论按钮
document.querySelector('.content-comment').addEventListener('click',function (){
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.content-comment').classList.add('active')
      let user_id=localStorage.getItem('id')
      //获取用户发布的所有文章，然后再comment表中查找是否有评论
      axios({
            url: '/Blog/Comments/selectCommentsByUser_id',
            method: 'get',
            params:{
               user_id
            }
      }).then(result => {
            console.log(result)
            console.log(result.data)
            //先清空，将盒子放在页面上
            document.querySelector('.message-content').innerHTML=''
            result.data.forEach(item=>{
                  let contentBox = document.createElement('div');
                  let MessageBox=document.querySelector('.message-content')
                  contentBox.classList.add('message-box-comment');
                  let time=item.create_at
                  const dateObject = new Date(time);
                  const year = dateObject.getFullYear();
                  const month = dateObject.getMonth() + 1; // Months are 0-indexed, so we add 1 to get the correct month
                  const day = dateObject.getDate();
                  const hours = dateObject.getHours();
                  const minutes = dateObject.getMinutes();
                  const seconds = dateObject.getSeconds();
                  const addLeadingZero = (value) => {
                        return value < 10 ? `0${value}` : value;
                  };
                  const formattedDate = `${year}年${addLeadingZero(month)}月${addLeadingZero(day)}日 ${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
                  //获取到评论发布者的nickname，picture和文章标题

                  if(item.picture===''){
                        item.picture="../image/headSculpture.jpeg"
                  }else{
                        item.picture='/upload/'+item.picture
                  }
                  let content
                  console.log(user_id)
                  console.log(item.receiver_id)
                  if(item.receiver_id==user_id){
                        content='回复了你的评论'
                  }else{
                        content='评论了你的文章'
                  }
                  contentBox.innerHTML = `
                      <table>
                          <tr>
                              <td rowspan="3"><img src='${item.picture}' alt="" class="headSculpture"></td>
                              <td>
                                  <span class="nickname">${item.nickname}</span>
                                  <span class="message-content">${content}</span>
                                  <span class="comment-id">${item.article_id}</span>
                                  <span class="comment-id">${item.user_id}</span>
                              </td>
                              <td rowspan="2" class="timestampRight">${formattedDate}</td>
      
                          </tr>
                          <tr>
                              <td>
                                  <span class="comment-content">${item.content}</span>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="blog-name">${item.articleTitle}</span>
                              </td>
      
                          </tr>
                      </table>
                  `;
                  MessageBox.appendChild(contentBox);
                  contentBox.addEventListener('click',function (event){
                        console.log('点击盒子')
                        if (event.target.classList.contains('headSculpture')) {
                              console.log('点击头像');
                              //进入个人主页，获取他的user_id
                              localStorage.setItem('detail-author-id',item.user_id)
                              window.location.href='Detail.html'
                        }
                        else{
                              console.log('点击进入博客')
                              localStorage.setItem('key',item.article_id)
                              window.location.href='BlogPage.html'

                        }
                  })
            })
      })
})


//点击点赞按钮
document.querySelector('.content-give').addEventListener('click',function (){
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.content-give').classList.add('active')
      document.querySelector('.message-content').innerHTML=''
      const user_id=localStorage.getItem('id')
      //获取他的所有文章，并从likes表中列出点赞的人
      axios({
            url: '/Blog/Likes/selectLikesArticlesByUser_id',
            method: 'get',
            params:{
                  user_id
            }
      }).then(result => {
            console.log(result)
            console.log(result.data)
            result.data.forEach(item=> {
                  let contentBox = document.createElement('div');
                  let MessageBox = document.querySelector('.message-content')
                  contentBox.classList.add('message-box-give');
                  let time = item.create_at
                  const dateObject = new Date(time);
                  const year = dateObject.getFullYear();
                  const month = dateObject.getMonth() + 1; // Months are 0-indexed, so we add 1 to get the correct month
                  const day = dateObject.getDate();
                  const hours = dateObject.getHours();
                  const minutes = dateObject.getMinutes();
                  const seconds = dateObject.getSeconds();
                  const addLeadingZero = (value) => {
                        return value < 10 ? `0${value}` : value;
                  };
                  const formattedDate = `${year}年${addLeadingZero(month)}月${addLeadingZero(day)}日 ${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
                  //获取到评论发布者的nickname，picture和文章标题

                  if (item.picture === '') {
                        item.picture = "../image/headSculpture.jpeg"
                  } else {
                        item.picture = '/upload/' + item.picture
                  }
                  contentBox.innerHTML = `
                      <table>
                          <tr>
                              <td rowspan="2"><img src="${item.picture}" alt="" class="headSculpture"></td>
                              <td>
                                  <span class="nickname">用户</span>
                                  <span class="give-content">点赞了你</span>
                                  <span class="give-id">${item.article_id}</span>
                                  <span class="give-user_id">${item.user_id}</span>
                              </td>
                              <td rowspan="2" class="timestampRight">${formattedDate}</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="blog-name">${item.articleTitle}</span>
                              </td>
                          </tr>
                      </table>
                  `;
                  MessageBox.appendChild(contentBox);
                  contentBox.addEventListener('click',function (event){
                        console.log('点击盒子')
                        if (event.target.classList.contains('headSculpture')) {
                              console.log('点击头像');
                              //进入个人主页，获取他的user_id
                              localStorage.setItem('detail-author-id',item.user_id)
                              window.location.href='Detail.html'
                        }
                        else{
                              console.log('点击进入博客')
                              localStorage.setItem('key',item.article_id)
                              window.location.href='BlogPage.html'

                        }
                  })
            })
      })
})


//点击收藏按钮
document.querySelector('.content-collect').addEventListener('click',function (){
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.content-collect').classList.add('active')
      document.querySelector('.message-content').innerHTML=''
      const user_id=localStorage.getItem('id')
      //获取他的所有文章，并从collects表中列出收藏的人
      axios({
            url: '/Blog/Collects/selectCollectsArticlesByUser_id',
            method: 'get',
            params:{
                  user_id
            }
      }).then(result => {
            console.log(result)
            console.log(result.data)
            result.data.forEach(item=> {
                  let contentBox = document.createElement('div');
                  let MessageBox = document.querySelector('.message-content')
                  contentBox.classList.add('message-box-collect');
                  //获取到评论发布者的nickname，picture和文章标题

                  if (item.picture === '') {
                        item.picture = "../image/headSculpture.jpeg"
                  } else {
                        item.picture = '/upload/' + item.picture
                  }
                  //查找文章标题
                  contentBox.innerHTML = `
                      <table>
                          <tr>
                              <td rowspan="2"><img src="${item.picture}" alt="" class="headSculpture"></td>
                              <td>
                                  <span class="nickname">${item.nickname}</span>
                                  <span class="give-content">收藏了你的博客</span>
                                  <span class="give-id">${item.article_id}</span>
                                  <span class="give-user_id">${item.user_id}</span>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="blog-name">${item.articleTitle}</span>
                              </td>
                          </tr>
                      </table>
                  `;
                  MessageBox.appendChild(contentBox);
                  contentBox.addEventListener('click',function (event){
                        console.log('点击盒子')
                        if (event.target.classList.contains('headSculpture')) {
                              console.log('点击头像');
                              //进入个人主页，获取他的user_id
                              localStorage.setItem('detail-author-id',item.user_id)
                              window.location.href='Detail.html'
                        }
                        else{
                              console.log('点击进入博客')
                              localStorage.setItem('key',item.article_id)
                              window.location.href='BlogPage.html'

                        }
                  })
            })
      })
})


//如果点击了粉丝按钮
document.querySelector('.content-fan').addEventListener('click',function (){
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.content-fan').classList.add('active')
      document.querySelector('.message-content').innerHTML=''
      const user_id=localStorage.getItem('id')
      axios({
            url: '/Blog/Follows/selectFollowsByBlogger_id',
            method: 'get',
            params:{
                  user_id
            }
      }).then(result => {
            console.log(result)
            console.log(result.data)
            //将盒子插入
            result.data.forEach(item=> {
                  let contentBox = document.createElement('div');
                  let MessageBox = document.querySelector('.message-content')
                  contentBox.classList.add('message-box-fan');
                  //获取到评论发布者的nickname，picture和文章标题

                  if (item.picture === '') {
                        item.picture = "../image/headSculpture.jpeg"
                  } else {
                        item.picture = '/upload/' + item.picture
                  }
                  contentBox.innerHTML = `
                     <table>
                          <tr>
                              <td rowspan="2"><img src="${item.picture}" alt="" class="headSculpture"></td>
                              <td>
                                  <span class="nickname">${item.nickname}</span>
                                  <span class="fan-user_id">${item.id}</span>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="fan">关注了你</span>
                              </td>
                          </tr>
                      </table>
                  `;
                  MessageBox.appendChild(contentBox);
                  contentBox.addEventListener('click',function (event){
                        console.log('点击盒子')
                        console.log('点击进入主页')
                        localStorage.setItem('detail-author-id',item.id)
                        window.location.href='Detail.html'

                  })
            })
      })

})


//如果点击了博客按钮
document.querySelector('.content-blog').addEventListener('click',function () {
      console.log('点击了博客按钮')
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.content-blog').classList.add('active')
      document.querySelector('.message-content').innerHTML = ''
      const user_id = localStorage.getItem('id')
      //通过user_id找到state为未通过或者为删除的博客
      axios({
            url: '/Blog/Articles/selectArticlesByUser_idForAdmin',
            method: 'get',
            params: {
                  user_id
            }
      }).then(result => {
            console.log(result)
            console.log(result.data)
            result.data.forEach(item=>{
                  //加入页面
                  let contentBox = document.createElement('div');
                  let MessageBox = document.querySelector('.message-content')
                  contentBox.classList.add('message-box-blog');
                  //获取到评论发布者的nickname，picture和文章标题
                  let time=item.update_at
                  const dateObject = new Date(time);
                  const year = dateObject.getFullYear();
                  const month = dateObject.getMonth() + 1; // Months are 0-indexed, so we add 1 to get the correct month
                  const day = dateObject.getDate();
                  const hours = dateObject.getHours();
                  const minutes = dateObject.getMinutes();
                  const seconds = dateObject.getSeconds();
                  const addLeadingZero = (value) => {
                        return value < 10 ? `0${value}` : value;
                  };
                  const formattedDate = `${year}年${addLeadingZero(month)}月${addLeadingZero(day)}日 ${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
                  //获取到评论发布者的nickname，picture和文章标题
                  if (item.avatar === '') {
                        item.avatar = "../image/headSculpture.jpeg"
                  } else {
                        item.avatar = '/upload/' + item.avatar
                  }
                  if(item.state==='删除'){
                        item.state='因涉及到隐私内容，被删除'
                  }if(item.state==='未通过'){
                        item.state==='审核未通过'
                  }
                  contentBox.innerHTML = `
                    <table>
                          <tr>
                              <td rowspan="3"><img src="../image/headSculpture.jpeg" alt="" class="headSculpture"></td>
                              <td>
                                  <span class="blog-content1">你</span>
                                  <span class="blog-content2">发布</span>
                                  <span class="blog-content3">的博客</span>
                              </td>
                              <td rowspan="2" class="timestampRight">${formattedDate}</td>
      
                          </tr>
                          <tr>
                              <td>
                                  <span class="blog-name">${item.title}</span>
                                  <span class="blog-result">${item.state}</span>
                                  <span class="blog-id">${item.id}</span>
                              </td>
                          </tr>
                      </table>
                  `;
                  MessageBox.appendChild(contentBox);
                  contentBox.addEventListener('click',function (event){
                        console.log('点击盒子')
                        console.log('编辑博客')
                        localStorage.setItem('edit-key',item.id)
                        window.location.href='EditorPage.html'

                  })
            })

      })
      console.log('举报博客信息')
      //举报博客信息
      axios({
            url: '/Blog/Reports/selectReportsByReceive_id',
            method: 'get',
            params: {
                  user_id
            }
      }).then(result => {
            console.log(result)
            console.log(result.data)
            result.data.forEach(item=>{
                  //加入页面
                  let contentBox = document.createElement('div');
                  let MessageBox = document.querySelector('.message-content')
                  contentBox.classList.add('message-box-blog');
                  //获取到评论发布者的nickname，picture和文章标题
                  let time=item.create_at
                  const dateObject = new Date(time);
                  const year = dateObject.getFullYear();
                  const month = dateObject.getMonth() + 1; // Months are 0-indexed, so we add 1 to get the correct month
                  const day = dateObject.getDate();
                  const hours = dateObject.getHours();
                  const minutes = dateObject.getMinutes();
                  const seconds = dateObject.getSeconds();
                  const addLeadingZero = (value) => {
                        return value < 10 ? `0${value}` : value;
                  };
                  const formattedDate = `${year}年${addLeadingZero(month)}月${addLeadingZero(day)}日 ${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
                  const picture='/upload/'+localStorage.getItem('picture')

                  if(item.report_content===''){
                        item.report_content='经管理员核实，暂无违规信息'
                  }
                  contentBox.innerHTML = `
                    <table>
                          <tr>
                              <td rowspan="3"><img src="${picture}" alt="" class="headSculpture"></td>
                              <td>
                                  <span class="blog-content1">你发布的博客被用户</span>
                                  <span class="blog-content2">${item.userNickname}</span>
                                  <span class="blog-content3">举报</span>
                              </td>
                              <td rowspan="2" class="timestampRight">${formattedDate}</td>
      
                          </tr>
                          <tr>
                              <td>
                                  <span class="blog-content">${item.report_content}</span>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="blog-article_title">${item.article_title}</span>
                                  <span class="blog-id">${item.article_id}</span>
                              </td>
                          </tr>
                         
                      </table>
                  `;
                  MessageBox.appendChild(contentBox);
                  contentBox.addEventListener('click',function (event){
                        console.log('点击盒子')
                        console.log('编辑博客')
                        console.log(item.article_id)
                        localStorage.setItem('edit-key',item.article_id)
                        window.location.href='EditorPage.html'

                  })
            })
      })
})



//添加左侧好友列表

let list//左侧好友列表
let myFriendData=new Map();
let curToUserid;
let userid=localStorage.getItem('id')
function myFriend(searchImage,searchNickname,searchId){
      //将该用户加入好友框,如果聊天框中已经有该好友，就直接右侧进入聊天框就好，左侧不需要重复加入
      //判重
      let friendList=document.querySelectorAll('.message-box1-user')
      var flag=0
      friendList.forEach(item=>{
            let leftFriendListId=item.querySelector('.searchId').innerHTML
            console.log(leftFriendListId)
            if(searchId==leftFriendListId){
                  flag=1
            }
      })
      console.log(flag)
      var leftContent=document.createElement('div')
      console.log(leftContent)
      if(flag==0){
            leftContent=document.createElement('div')
            var messageUsers=document.querySelector('.message-box1-users')
            leftContent.classList.add('message-box1-user')
            leftContent.innerHTML=`
                                  <div>
                                      <img src=${searchImage} class="user-headSculpture" alt="">
                                  </div>
                                  <div class="user-nickname">
                                      <span class="searchNickname">${searchNickname}</span>
                                      <span class="searchId">${searchId}</span>
                                  </div>
                              `;
            messageUsers.appendChild(leftContent);
            console.log(list)
      }
      return leftContent
}
//如果点击了私信按钮
document.querySelector('.content-private').addEventListener('click',function (){
      console.log('点击了私信按钮')
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.content-private').classList.add('active')
      document.querySelector('.message-content').innerHTML = ''

      //获取该用户的用户列表

      axios({
            url: '/Blog/Fail/getMessageList',
            method: 'get',
            params:{
                  id:userid
            }
      })
          .then(result => {
            console.log(result)
            console.log(result.data)
            if(result.data.isSuccess==1){
                  console.log('连接成功')
                  //设置左边界面
                  list=result.data.list
                  for(let i=0;i<list.length;i++)
                  {
                        myFriendData.set(list[i].receiver_id,list[i]);
                  }

                  console.log(list)
                  //把数据放进去
                  for(let i=0;i<list.length;i++){
                        //将好友加入左侧列表
                        let contentUserBox = document.createElement('div');
                        let MessageUserBox=document.querySelector('.message-box1-users')
                        contentUserBox.classList.add('message-box1-user');
                        if(list[i].picture===''){
                              list[i].picture="../image/headSculpture.jpeg"
                        }else{
                              list[i].picture='/upload/'+list[i].picture
                        }
                        console.log(list[i].picture)
                        contentUserBox.innerHTML = `
                              <div>
                                  <img src=${list[i].picture} class="user-headSculpture" alt="">
                              </div>
                              <div class="user-nickname">
                                  <span class="searchNickname">${list[i].nickname}</span>
                                  <span class="searchId">${list[i].id}</span>
                              </div>
                        `;
                        MessageUserBox.appendChild(contentUserBox)

                  }
            }else{
                  console.log('连接错误')
            }
      })



      // 创建WebSocket连接
      const socket = new WebSocket('ws://localhost:8080/Blog/mywebsocket');

      // 监听连接打开事件
      socket.onopen = function() {
            console.log('WebSocket连接已打开');
            // 发送消息给服务器
      };

      let receiver_id
      //点击了消息页面(处理点击左侧好友列表，处理点击发送消息)
      document.querySelector('.message-content').addEventListener('click',function (event){
            console.log('点击了message-content页面')
            console.log('点击处理点击左侧好友列表')
            //判断是不是点击了左侧聊天好友
            if(event.target.classList.contains('message-box1-user')){
                  //点击用户，进入相应聊天框，先清空右侧
                  console.log(event.target)
                  console.log(event.target.querySelector('.searchId').innerHTML)

                  //将右侧聊天框添加好,先清除
                  // document.querySelector('.message-box-private-right').innerHTML=''

                  let searchNickname=event.target.querySelector('.searchNickname').innerHTML
                  let searchId=event.target.querySelector('.searchId').innerHTML
                  let searchImage=event.target.querySelector('.user-headSculpture').src
                  var rightContent=document.createElement('div')
                  var messagePrivate=document.querySelector('.message-box-private-right')
                  rightContent.innerHTML=`
                                              <div class="message-box2-user">正在和<div class="message-box2-user-nickname">${searchNickname}</div>聊天</div>
                                              <span class="message-box2-userId">${searchId}</span>
                                              <span class="message-box2-userImage">${searchImage}</span>
                                                  <div class="message-box2-record">
                  <!--                      发的消息-->
                                                  </div>
                                                  
                                                  <div class="message-box2-sending">
                                                        <textarea class="message-box2-input"
                                                                  maxlength="200"
                                                                  οnchange="this.value=this.value.substring(0, 200)"
                                                                  οnkeydοwn="this.value=this.value.substring(0, 200)"
                                                                  οnkeyup="this.value=this.value.substring(0, 200)"
                                                                  placeholder="请输入……"></textarea>
                                                      <div class="message-box2-confirm">发送</div>
                                                  </div>
                                              </div>
                                          `;
                  console.log(1)
                  messagePrivate.appendChild(rightContent);
                  console.log('点击了');
                  //清除右边，加上右侧盒子
                  //将右侧聊天框添加好,先清除
                  document.querySelector('.message-box-private-right').innerHTML=''
                  console.log(2)
                  //获取用户信息
                  axios({
                        url: '/Blog/user/selectUserById',
                        method: 'get',
                        params:{
                              id:event.target.querySelector('.searchId').textContent
                        }
                  }).then(result1 => {
                        console.log(result1)
                        console.log(result1.data)
                        let picture = '/upload/' + result1.data.picture
                        var rightContent=document.createElement('div')
                        var messagePrivate=document.querySelector('.message-box-private-right')
                        rightContent.innerHTML=`
                                              <div class="message-box2-user">正在和<div class="message-box2-user-nickname">${searchNickname}</div>聊天</div>
                                              <span class="message-box2-userId">${result1.data.id}</span>
                                              <span class="message-box2-userImage">${picture}</span>
                                                  <div class="message-box2-record">
<!--                                   发的消息-->
                                                  </div>
                                                  
                                                  <div class="message-box2-sending">
                                                        <textarea class="message-box2-input"
                                                                  maxlength="200"
                                                                  οnchange="this.value=this.value.substring(0, 200)"
                                                                  οnkeydοwn="this.value=this.value.substring(0, 200)"
                                                                  οnkeyup="this.value=this.value.substring(0, 200)"
                                                                  placeholder="请输入……"></textarea>
                                                      <div class="message-box2-confirm">发送</div>
                                                  </div>
                                              </div>
                                          `;
                        messagePrivate.appendChild(rightContent);
                        //获取消息（先从sessionStock中获取，然后没有就从数据库中读取）
                        console.log(event.target.querySelector('.searchId').textContent)
                        let searchId=event.target.querySelector('.searchId').textContent
                        if(sessionStorage.getItem(event.target.querySelector('.searchId').textContent)){
                              console.log('log')
                              console.log(sessionStorage.getItem(searchId))
                              document.querySelector('.message-box2-record').innerHTML=sessionStorage.getItem(searchId)


                        }
                        else{
                              axios({
                                    url: '/Blog/Fail/selectMessagesBySender_idAndReceiver_id',
                                    method: 'get',
                                    params:{
                                          receiver_id:event.target.querySelector('.searchId').textContent,
                                          sender_id:localStorage.getItem('id')
                                    }
                              })
                                  .then(result => {
                                        console.log(result)
                                        console.log(result.data)
                                        result.data.forEach(item=>{
                                              console.log(item)
                                              //如果本人是发送者,聊天记录在右侧
                                              let ChildMessage=document.querySelector('.message-box2-record')
                                              console.log(event.target.querySelector('.searchId').textContent)
                                              //console.log(receiver_id)
                                              console.log(item.receiver_id)
                                              console.log(item.sender_id)
                                              if(localStorage.getItem('id')==item.sender_id){
                                                    console.log('如果本人是发送者,聊天记录在右侧')
                                                    let rightChildMessage=document.createElement('div')
                                                    let picture='/upload/'+localStorage.getItem('picture')
                                                    rightChildMessage.classList.add('message-box2-right')
                                                    rightChildMessage.innerHTML=`
                                                                      <div class="message-box2-time">${item.timeStr}</div>
                                                                      <div class="message-box2-content-right">
                                                                          <span class="message-box2-content2">${item.content}</span>
                                                                          <img src=${picture} class="message-box2-image" alt="">
                                                                      </div>
                                                                  `;
                                                    ChildMessage.appendChild(rightChildMessage)
                                                    let sessionStockRecord=sessionStorage.getItem(item.receiver_id)+rightChildMessage.innerHTML
                                                    console.log("11111222"+sessionStorage.getItem(item.receiver_id))
                                                    console.log(item.receiver_id)
                                                    if(sessionStorage.getItem(item.receiver_id)){
                                                          sessionStorage.setItem(item.receiver_id,sessionStockRecord)
                                                    }
                                                    else{
                                                          sessionStorage.setItem(item.receiver_id,rightChildMessage.innerHTML)
                                                    }
                                              }
                                             else {
                                                    //本人是接受者
                                                    console.log('本人是接受者.')
                                                    let picture=document.querySelector('.message-box2-userImage').textContent
                                                    console.log(picture)
                                                    let leftChildMessage=document.createElement('div')
                                                    leftChildMessage.classList.add('message-box2-left')
                                                    leftChildMessage.innerHTML=`
                                                                      <div class="message-box2-time">${item.timeStr}</div>
                                                                      <div class="message-box2-content-left">
                                                                          <img src="${picture}" class="message-box2-image" alt="">
                                                                          <span class="message-box2-content1">${item.content}</span>
                                                                      </div>
                                                                  `;
                                                    ChildMessage.appendChild(leftChildMessage)

                                                    let sessionStockRecord=sessionStorage.getItem(item.sender_id)+leftChildMessage.innerHTML
                                                    console.log("11111"+sessionStorage.getItem(item.sender_id))
                                                    console.log(item.sender_id)
                                                    if(sessionStorage.getItem(item.sender_id)){
                                                          sessionStorage.setItem(item.sender_id,sessionStockRecord)
                                                    }
                                                    else{
                                                          sessionStorage.setItem(item.sender_id,leftChildMessage.innerHTML)
                                                    }
                                              }
                                        })

                                  })
                        }
                  })
            }
            //判断是不是点击了发送消息
            if(event.target.classList.contains('message-box2-confirm')){
                  console.log('点击了发送消息')
                  //此时收集发送者id和接受者id
                  receiver_id=document.querySelector('.message-box2-userId').innerHTML
                  let sender_id=localStorage.getItem('id')
                  let content=document.querySelector('.message-box2-input').value
                  if(content===''){
                        alert('发送的消息不能为空')
                  }
                  else{
                        //发送请求实现消息
                        const message=JSON.stringify({receiver_id,content:content,messageType:1})
                        document.querySelector('.message-box2-input').value=''
                        console.log(message)
                        socket.send(message)
                  }
            }





      })



      // 监听接收到消息事件
      socket.onmessage = function(event) {
            const message = event.data;
            console.log('接收到服务器的消息: ' + message);
            //判断消息类型
            const data=JSON.parse(message)
            //成功发送给列表中不存在的人
            if(data.messageType===2){

                  //接收到一条消息需要显示出来,判断好友列表里面没有的用户
                  if(data.receiver_id===userid){
                        //说明要显示的是发送者的信息
                        document.querySelector('.message-box1-users').innerHTML+=`  
                                      <li data-id="${data.sender_id}" data-name="${data.receiver_name}">
                                          <div class="avatar">
                                              <img src="${data.receiver_avatar}" alt="">
                                          </div>
                                          <div class="right_name">
                                              ${data.receiver_name}
                                          </div>
                                      </li>
                                    `;
                        myFriendData.set(data.sender_id,data);
                  }
                  else{
                        console.log('这是是如果是别人给你发消息你需要刷新列表')
                        //说明是接收者的信息
                        document.querySelector('.message-box1-users').innerHTML+=`  
                                      <li data-id="${data.receiver_id}" data-name="${data.receiver_name}">
                                           <div class="avatar">
                                               <img src="${data.receiver_avatar}" alt="">
                                           </div>
                                           <div class="right_name">
                                               ${data.receiver_name}
                                           </div>
                                      </li>
                                    `;
                        myFriendData.set(data.receiver_id,data);
                  }

            }
            //此人不存在
            else if(data.messageType===3){
                  //发送消息的人不存在
                  alert('此用户不存在!!请检查用户id是否正确');
            }
            //成功接收到消息，需要判断是自己发送的，还是别人发过来的
            else if(data.messageType===4){
                  //这是消息成功发送过来了,把消息记录存储到,如果有当前有就实时显示出来
                  console.log('成功发送消息了')
                  let str=''
                  console.log(data.sender_id+":"+data.receiver_id+":"+userid)
                  if(data.sender_id==userid){
                        console.log('进入1')
                        //如果是自己发送过去的,渲染界面应该是
                        var picture
                        if(localStorage.getItem('picture')==''){
                              picture="../image/headSculpture.jpeg"
                        }
                        else{
                              picture='/upload/'+localStorage.getItem('picture')
                        }
                        str=`
                              <div class="message-box2-right">
                                  <div class="message-box2-time">${data.timeStr}</div>
                                  <div class="message-box2-content-right">
                                      <span class="message-box2-content2">${data.content}</span>
                                      <img src=${picture} class="message-box2-image" alt="">
                                  </div>
                              </div>
                        `;
                  }
                  else if(data.receiver_id==userid){
                        //如果我是接收者,先判断是否存在聊天框（存在——判断发送者是不是当前聊天的好友（不是这个人——(要加入左侧聊天列表，不用更换聊天框)，是这个人——添加聊天信息（后面写了）），不存在——不用管）
                        console.log(document.querySelector('.message-box2-user'))
                        // if(document.querySelector('.message-box2-user')){
                        //       console.log("存在聊天框")
                        //       var friendCur=document.querySelector('.message-box2-userId').innerHTML
                        //       if(friendCur!=data.receiver_id){
                        //             //加入左侧聊天列表
                        //
                        //       }
                        // }
                        //获取发送者信息
                        axios({
                              url: '/Blog/user/selectUserById',
                              method: 'get',
                              params:{
                                    id:data.sender_id
                              }
                        }).then(result1 => {
                              console.log(result1)
                              console.log(result1.data)
                              let picture='/upload/'+result1.data.picture
                              myFriend(picture,result1.data.nickname,result1.data.id)
                        })//message
                        console.log(data.receiver_avatar)
                        let picture=document.querySelector('.message-box2-userImage').textContent

                        console.log('进入2')
                        str=`
                              <div class="message-box2-left">
                                  <div class="message-box2-time">${data.timeStr}</div>
                                  <div class="message-box2-content-left">
                                      <img src=${picture} class="message-box2-image" alt="">
                                      <span class="message-box2-content1">${data.content}</span>
                                  </div>
                              </div>
                        `;
                  }
                  console.log(userid)
                  console.log(data.receiver_id!=userid)
                  console.log(data.sender_id!=userid)
                  console.log(data)
                  console.log(data.receiver_id)
                  console.log(data.sender_id)

                  if(data.receiver_id!=userid&&sessionStorage.getItem(data.receiver_id)){
                        console.log('data.receiver_id!==userid&&sessionStorage.getItem(data.receiver_id)')
                        //如果sessionStorage里面有(我是发送者)
                        console.log('如果sessionStorage里面有receiver_id')
                        let pp=sessionStorage.getItem(data.receiver_id);
                        pp+=str;
                        sessionStorage.setItem(data.receiver_id,pp)
                        console.log('000000000000000000发送者，')
                  }
                  else if(data.sender_id!=userid&&sessionStorage.getItem(data.sender_id)){
                        console.log('data.sender_id!==userid&&sessionStorage.getItem(data.sender_id)')
                        //如果sessionStorage里面有（我是接收者）
                        console.log('如果sessionStorage里面有sender_id')
                        let pp=sessionStorage.getItem(data.sender_id);
                        pp+=str;
                        console.log('000000000000000000接受者，')
                        sessionStorage.setItem(data.sender_id,pp)
                  }
                  else if(data.receiver_id!=userid){
                        console.log('000000000000000000发送者')
                        sessionStorage.setItem(data.receiver_id,str)
                  }
                  else if(data.sender_id!=userid){
                        console.log('000000000000000000接受者')
                        console.log('sessionStorage.setItem(data.receiver_id,str)')
                        sessionStorage.setItem(data.sender_id,str)
                  }



                  console.log('receiver_id:'+receiver_id+"data.sender_id"+data.sender_id+"data.receiver_id:"+data.receiver_id)
                  let user_id=localStorage.getItem('id')
                  if(user_id==data.sender_id){
                       //如果自己发送給别人的也需要显示出来
                        console.log('如果自己发送給别人的也需要显示出来')
                        document.querySelector('.message-box2-record').innerHTML+=str;
                  }
                  else if(user_id==data.receiver_id&&document.querySelector('.message-box2-user-nickname')&&document.querySelector('.message-box2-userId').innerHTML==data.sender_id){
                        //如果当前就是和这个聊天,也就是说是别人发给你的
                        console.log("如果当前就是和这个聊天,也就是说是别人发给你的")
                        document.querySelector('.message-box2-record').innerHTML+=str;
                  }
            }
            //客户端得到消息记录
            else if(data.messageType===5){
                  //设置界面
                  const list=data.list;
                  console.log('当前的list长度')
                  console.log(list)
                  console.log(list.length)

                  let listStr=list.map(item=>{
                        if(item.sender_id===userid)
                              return `<div class="message">
                               <div class="messageTime">
                                   ${item.timeStr}
                               </div>
                               <div class="messageRight">
                                   <div class="messageContent">
                                           ${item.content}
                                   </div>
                                   <div class="message_avatar">
                                       <img src="${user_avatar}" alt="">
                                   </div>
                               </div>
                           </div>
                               `;
                        else
                              return `<div class="message">
                              <div class="messageTime">
                                  ${item.timeStr}
                              </div>
                              <div class="messageLeft">
                                  <div class="message_avatar">
                                      <img src="${myFriendData.get(item.sender_id).receiver_avatar}" alt="">
                                  </div>
                                  <div class="messageContent">
                                      ${item.content}
                                  </div>
                              </div>
                          </div>
                        `;
                  }).join('')

                  if(sessionStorage.getItem(curToUserid))
                  {
                        console.log('是不是在等我')
                        const nodeList = document.querySelectorAll('.chat .chat_right .appearArea .message');
                        const messageArr = Array.from(nodeList);
                        listStr =listStr +sessionStorage.getItem(curToUserid);

                  }

                  document.querySelector('.chat .chat_right .appearArea').innerHTML=listStr;

                  //存储到sessionStorage里面
                  sessionStorage.setItem(curToUserid,listStr);
                  //设置点击事件,发送消息
            }

            // 在此处处理从服务器接收到的消息
      };


      // 监听连接关闭事件
      socket.onclose = function(event) {
            console.log('WebSocket连接已关闭');
            // 在此处进行处理连接关闭事件的逻辑
      };

      // 当不再需要连接时，关闭WebSocket连接
      function closeWebSocket() {
            console.log('当不再需要连接时，关闭WebSocket连接')
            socket.close();
      }

      const user_id = localStorage.getItem('id')
      //将页面显示出来
      let contentBox = document.createElement('div');
      let MessageBox=document.querySelector('.message-content')
      contentBox.classList.add('message-box-private');
      contentBox.innerHTML = `
                  <div class="message-box-private-left">
                      <div class="message-box1-search">
                          <span class="message-box1-search-button" type="button" data-bs-toggle="modal" data-bs-target=".my-box"><i class="search icon"></i>搜索用户</span>
                                    <!--    弹框标签-->
                                    <!--    bootstrap的modal弹框：添加modal类名（默认隐藏）-->
                                    <div class="modal my-box" tabindex="-1">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">搜索用户</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <span>查找用户关键词：</span><br>
                                                    <input placeholder="请输入用户id或昵称" class="content-search">
                                                    <span class="button-search">搜索</span><br>
                                                    <span class="wen-search">搜索到的用户:</span>
                                                    <div class="users-search"></div>
                                                   
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" id="exit-login-email" data-bs-dismiss="modal">关闭</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                      </div>
                      <div class="message-box1-users">
<!--                            这里放好友列表的盒子<div class="message-box1-user">-->
                      </div>
                  </div>
      
                  <div class="message-box-private-right">
<!--                       这里放右侧整个的聊天框<div class="message-box2-user"><div>正在和昵称聊天</div></div>-->
                  </div>
            `;
      MessageBox.appendChild(contentBox);

      //点击搜索按钮!!!(发私信是时要判断是否存在该用户的聊天框，此时就不用创建右侧列表，然后从左侧打开聊天)
      var searchButton = document.querySelector('.button-search');
      searchButton.addEventListener('click', function() {
            console.log(document.querySelector('.content-search').value)
            //如果内容为空
            if(document.querySelector('.content-search').value===''){
                  document.querySelector('.content-search').placeholder='内容不能为空'
            }
            else{
                  console.log('点击搜索');
                  var searchContent=document.querySelector('.content-search').value
                  console.log(searchContent)
                  axios({
                        url: '/Blog/user/likeSelectUsers',
                        method: 'get',
                        params:{
                              content:searchContent
                        }
                  }).then(result1 => {
                        console.log(result1)
                        console.log(result1.data)
                        //先清空，将盒子放在页面上
                        document.querySelector('.users-search').innerHTML=''
                        result1.data.forEach(item=>{

                              let contentBox = document.createElement('div');
                              let MessageBox=document.querySelector('.users-search')
                              contentBox.classList.add('user-search');
                              if(item.picture==''){
                                    item.picture="../image/headSculpture.jpeg"
                              }
                              else{
                                    item.picture='/upload/'+item.picture
                              }
                              contentBox.innerHTML = `
                                    <img src=${item.picture} class="user-search-image" alt="">
                                    <span class="user-search-username">${item.username}</span>
                                    <span class="user-search-nickname">${item.nickname}</span>
                                    <span class="user-search-private">发私信</span>
                                    <span class="user-search-id">${item.id}</span>
                              `;
                              MessageBox.appendChild(contentBox);
                              //不能显示自己
                              if(item.id==localStorage.getItem('id')){
                                    contentBox.querySelector('.user-search-private').style.display='none'
                              }

                              //如果点击发私信，将该用户加入好友框，并且将聊天框填好
                              contentBox.querySelector('.user-search-private').addEventListener('click',function (event){

                                    //将弹框关闭
                                    document.querySelector('#exit-login-email').click()
                                    console.log(event.target.parentElement)
                                    var searchImage=event.target.parentElement.querySelector('.user-search-image').src
                                    var searchNickname=event.target.parentElement.querySelector('.user-search-nickname').innerHTML
                                    var searchId=event.target.parentElement.querySelector('.user-search-id').innerHTML
                                    console.log(searchImage)
                                    console.log(searchNickname)
                                    console.log(searchId)
                                    //将该用户加入好友框,如果聊天框中已经有该好友，就直接右侧进入聊天框就好，左侧不需要重复加入
                                    var leftContent=myFriend(searchImage,searchNickname,searchId)



                                    //将右侧聊天框添加好,先清除
                                    document.querySelector('.message-box-private-right').innerHTML=''

                                    var rightContent=document.createElement('div')
                                    var messagePrivate=document.querySelector('.message-box-private-right')
                                    rightContent.innerHTML=`
                                              <div class="message-box2-user">正在和<div class="message-box2-user-nickname">${searchNickname}</div>聊天</div>
                                              <span class="message-box2-userId">${searchId}</span>
                                              <span class="message-box2-userImage">${searchImage}</span>
                                                  <div class="message-box2-record">
                  <!--                      发的消息-->
                                                  </div>
                                                  
                                                  <div class="message-box2-sending">
                                                        <textarea class="message-box2-input"
                                                                  maxlength="200"
                                                                  οnchange="this.value=this.value.substring(0, 200)"
                                                                  οnkeydοwn="this.value=this.value.substring(0, 200)"
                                                                  οnkeyup="this.value=this.value.substring(0, 200)"
                                                                  placeholder="请输入……"></textarea>
                                                      <div class="message-box2-confirm">发送</div>
                                                  </div>
                                              </div>
                                          `;
                                    messagePrivate.appendChild(rightContent);

                                    const receiver_id=document.querySelector('.message-box2-userId').textContent
                                    console.log(receiver_id)
                                    let sender_id=localStorage.getItem('id')//本人
                                    let sessionReceiverData=sessionStorage.getItem(receiver_id)
                                    //console.log(sessionReceiverData)
                                    console.log(sessionStorage.getItem(receiver_id))
                                    if(sessionStorage.getItem(receiver_id)){
                                          //将数据取出来,显示在页面上
                                          console.log('有值')
                                          document.querySelector('.message-box2-record').innerHTML= sessionReceiverData
                                    }

                                    //在数据库中找到是否有聊天记录
                                    else{
                                          axios({
                                                url: '/Blog/Fail/selectMessagesBySender_idAndReceiver_id',
                                                method: 'get',
                                                params:{
                                                      receiver_id,
                                                      sender_id
                                                }
                                          })
                                              .then(result => {
                                                    console.log(result)
                                                    console.log(result.data)
                                                    result.data.forEach(item=>{
                                                          console.log(item)
                                                          //如果本人是发送者,聊天记录在右侧
                                                          let ChildMessage=document.querySelector('.message-box2-record')
                                                          console.log(sender_id)
                                                          console.log(receiver_id)
                                                          console.log(item.receiver_id)
                                                          console.log(item.sender_id)
                                                          if(localStorage.getItem('id')===item.sender_id){
                                                                console.log('如果本人是发送者,聊天记录在右侧')
                                                                let rightChildMessage=document.createElement('div')
                                                                let picture='/upload/'+localStorage.getItem('picture')
                                                                rightChildMessage.classList.add('message-box2-right')
                                                                rightChildMessage.innerHTML=`
                                                                      <div class="message-box2-time">${item.timeStr}</div>
                                                                      <div class="message-box2-content-right">
                                                                          <span class="message-box2-content2">${item.content}</span>
                                                                          <img src=${picture} class="message-box2-image" alt="">
                                                                      </div>
                                                                  `;
                                                                ChildMessage.appendChild(rightChildMessage)
                                                                let sessionStockRecord=sessionStorage.getItem(receiver_id)+rightChildMessage.innerHTML
                                                                console.log("11111222"+sessionStorage.getItem(receiver_id))
                                                                console.log("11111222"+receiver_id)
                                                                if(sessionStorage.getItem(receiver_id)){
                                                                      sessionStorage.setItem(receiver_id,sessionStockRecord)
                                                                }
                                                                else{
                                                                      sessionStorage.setItem(receiver_id,rightChildMessage.innerHTML)
                                                                }
                                                          }
                                                          else {
                                                                //本人是接受者
                                                                console.log('本人是接受者.')
                                                                let picture=document.querySelector('.message-box2-userImage').textContent
                                                                console.log(picture)
                                                                console.log('/upload/'+picture)
                                                                let leftChildMessage=document.createElement('div')
                                                                leftChildMessage.classList.add('message-box2-left')
                                                                leftChildMessage.innerHTML=`
                                                                      <div class="message-box2-time">${item.timeStr}</div>
                                                                      <div class="message-box2-content-left">
                                                                          <img src=${picture} class="message-box2-image" alt="">
                                                                          <span class="message-box2-content1">${item.content}</span>
                                                                      </div>
                                                                  `;
                                                                ChildMessage.appendChild(leftChildMessage)
                                                                let sessionStockRecord=sessionStorage.getItem(receiver_id)+leftChildMessage.innerHTML
                                                                console.log("11111"+sessionStorage.getItem(receiver_id))
                                                                console.log("11111"+receiver_id)
                                                                if(sessionStorage.getItem(receiver_id)){
                                                                      sessionStorage.setItem(receiver_id,sessionStockRecord)
                                                                }
                                                                else{
                                                                      sessionStorage.setItem(receiver_id,leftChildMessage.innerHTML)
                                                                }
                                                          }
                                                    })

                                              })
                                    }

                              })
                        })
                  })
            }
      });
})


