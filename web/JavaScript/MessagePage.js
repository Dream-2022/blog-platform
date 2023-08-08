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
                  contentBox.innerHTML = `
                      <table>
                          <tr>
                              <td rowspan="3"><img src='${item.picture}' alt="" class="headSculpture"></td>
                              <td>
                                  <span class="nickname">${item.nickname}</span>
                                  <span class="message-content">评论了你</span>
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
})