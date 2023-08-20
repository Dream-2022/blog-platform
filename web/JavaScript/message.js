
const userid=localStorage.getItem('id')
const user_avatar=localStorage.getItem('picture')

let myFriendData=new Map();
var curToUserid;
let isEnd=0;

document.querySelector('.footer .kinds ul .chatting').addEventListener('click',async e=>{
    document.querySelector('.footer .kinds ul .active').classList.remove('active')
    document.querySelector('.footer .kinds ul .chatting').classList.add('active')

    document.querySelector('.tail ul').innerHTML=`
                                                <div class="chat">
                                                    <div class="chat_left">
                                                        <div class="chat_left_head">
                                                            私信
                                                            <i class="bi bi-search searchPeople" style="float:right;margin-right:50px;color:#f7a36f;">搜索用户</i>
                                                        </div>
                                                        <ul>

                                                        </ul>
                                                    </div>
                                                    <div class="chat_right">
                                                        <div class="chat_right_head">
                                                            聊天界面
                                                        </div>

                                                    </div>
                                                </div>
                                            `;
    //向后端发送请求
    const result=await axios({
        url:'/search/getMessageList',
        method:'post',
        params:{userid:userid}
    })
    let list;
    if(result.data.isSuccess){
            //设置左边界面
            list=result.data.list
            //把数据放进去
            for(let i=0;i<list.length;i++)
            {
                myFriendData.set(list[i].receiver_id,list[i]);
            }
            setMessageListLeft(list)
    }
    else{
        alert('网络出错啦,请重试');
        return 0;
    }

    //开启websocket连接

    const socket = new WebSocket('ws://localhost:8080/mywebsocket');

    // 监听连接打开事件
        socket.onopen = function() {
          console.log('WebSocket连接已打开');
          // 发送消息给服务器

        };

    setSearchPeople(socket)

    document.querySelectorAll('.tail ul .chat .chat_left ul li').forEach(li=>{
            li.addEventListener('click',e=>{
                console.log('点击了');
                document.querySelector('.footer .tail ul .chat .chat_right .chat_right_head').innerHTML=`正在和${li.dataset.name}聊天`
                //设置旁边的显示
                if(document.querySelector('.tail ul .chat .chat_right .appearArea')==null)
                {
                    document.querySelector('.footer .tail ul .chat .chat_right').innerHTML+=`<div class="appearArea">

                                                                                              </div>
                                                                                              <div class="textarea">
                                                                                                  <textarea class="input_textarea"  maxlength="200" οnchange="this.value=this.value.substring(0, 200)" οnkeydοwn="this.value=this.value.substring(0, 200)" οnkeyup="this.value=this.value.substring(0, 200)" placeholder="请输入……"></textarea>
                                                                                                  <button>
                                                                                                      发送
                                                                                                  </button>
                                                                                              </div>`

                    //设置下面的点击事件
                    console.log('看看我执行了吗,11')
                    document.querySelector('.chat .chat_right .textarea button').addEventListener('click',e=>{
                        //发送消息给服务器
                        const content=document.querySelector('.chat .chat_right .textarea .input_textarea').value;
                        document.querySelector('.chat .chat_right .textarea .input_textarea').value=''

                        if(content==='')
                        {
                            modal('消息为空',0);
                        }
                        else
                        {
                            //发送请求实现消息
                            const message=JSON.stringify({receiver_id:curToUserid,content:content,messageType:1})
                            socket.send(message)
                        }
                    })

                }

                curToUserid=li.dataset.id

                if(sessionStorage.getItem(li.dataset.id))
                {
                    //如果不为空
                    document.querySelector('.appearArea').innerHTML=sessionStorage.getItem(li.dataset.id)
                }
                else
                {
                    //发送请求得到消息记录
                    const message= JSON.stringify({messageType:6,total_size:0,receiver_id:li.dataset.id})
                    socket.send(message)
                }

                document.querySelector('.appearArea').scrollTop=document.querySelector('.appearArea').scrollHeight;
            })
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
            if(data.receiver_id===userid)
            {
                console.log('这是是如果是别人给你发消息你需要刷新列表')
                //说明要显示的是发送者的信息
                document.querySelector('.footer .tail ul .chat .chat_left ul').innerHTML+=`  <li data-id="${data.sender_id}" data-name="${data.receiver_name}">
                                                                                                <div class="avatar">
                                                                                                    <img src="${data.receiver_avatar}" alt="">
                                                                                                </div>
                                                                                                <div class="right_name">
                                                                                                    ${data.receiver_name}
                                                                                                </div>
                                                                                            </li>`
                myFriendData.set(data.sender_id,data);
            }
            else
            {
                //说明是接收者的信息
                document.querySelector('.footer .tail ul .chat .chat_left ul').innerHTML+=`  <li data-id="${data.receiver_id}" data-name="${data.receiver_name}">
                                                                                                 <div class="avatar">
                                                                                                     <img src="${data.receiver_avatar}" alt="">
                                                                                                 </div>
                                                                                                 <div class="right_name">
                                                                                                     ${data.receiver_name}
                                                                                                 </div>
                                                                                             </li>`
                myFriendData.set(data.receiver_id,data);
            }

            console.log(1)
            document.querySelectorAll('.tail ul .chat .chat_left ul li').forEach(li=>{
                        li.addEventListener('click',e=>{
                            console.log('点击了');
                            document.querySelector('.footer .tail ul .chat .chat_right .chat_right_head').innerHTML=`正在和${li.dataset.name}聊天`
                            //设置旁边的显示
                            if(document.querySelector('.tail ul .chat .chat_right .appearArea')===null)
                            {
                                document.querySelector('.footer .tail ul .chat .chat_right').innerHTML+=`<div class="appearArea">

                                                                                                          </div>
                                                                                                          <div class="textarea">
                                                                                                              <textarea class="input_textarea"  maxlength="200" οnchange="this.value=this.value.substring(0, 200)" οnkeydοwn="this.value=this.value.substring(0, 200)" οnkeyup="this.value=this.value.substring(0, 200)" placeholder="请输入……"></textarea>
                                                                                                              <button>
                                                                                                                  发送
                                                                                                              </button>
                                                                                                          </div>`

                                //设置下面的点击事件

                                document.querySelector('.chat .chat_right .textarea button').addEventListener('click',e=>{
                                    //发送消息给服务器
                                    const content=document.querySelector('.chat .chat_right .textarea .input_textarea').value;
                                    document.querySelector('.chat .chat_right .textarea .input_textarea').value=''

                                    if(content==='')
                                    {
                                        modal('消息为空',0);
                                    }
                                    else
                                    {
                                        //发送请求实现消息
                                        const message=JSON.stringify({receiver_id:curToUserid,content:content,messageType:1})
                                        socket.send(message)
                                    }
                                })

                            }

                            curToUserid=li.dataset.id

                            if(sessionStorage.getItem(li.dataset.id))
                            {
                                //如果不为空
                                document.querySelector('.appearArea').innerHTML=sessionStorage.getItem(li.dataset.id)
                            }
                            else
                            {
                                //发送请求得到消息记录
                                const message= JSON.stringify({messageType:6,total_size:0,receiver_id:li.dataset.id})
                                socket.send(message)
                            }
                        })
                    })
            console.log(2)
            document.querySelector('.appearArea').scrollTop=document.querySelector('.appearArea').scrollHeight;
            console.log(3)
            setAddMoreMessage()
       }
       //此人不存在
       else if(data.messageType===3){
            //发送消息的人不存在
            modal('此用户不存在!!请检查用户id是否正确',0);
       }
       //成功接收到消息，需要判断是自己发送的，还是别人发过来的
       else if(data.messageType===4){
            //这是消息成功发送过来了,把消息记录存储到,如果有当前有就实时显示出来
            let str=''
            if(data.sender_id===userid)
            {
                //如果是自己发送过去的,渲染界面应该是
                str=`<div class="message">
                         <div class="messageTime">
                             ${data.timeStr}
                         </div>
                         <div class="messageRight">
                             <div class="messageContent">
                                     ${data.content}
                             </div>
                             <div class="message_avatar">
                                 <img src="${user_avatar}" alt="">
                             </div>
                         </div>
                     </div>`
            }
            else if(data.receiver_id===userid)
            {
                str=`<div class="message">
                         <div class="messageTime">
                             ${data.timeStr}
                         </div>
                         <div class="messageLeft">
                             <div class="message_avatar">
                                 <img src="${myFriendData.get(data.sender_id).receiver_avatar}" alt="">
                             </div>
                             <div class="messageContent">
                                 ${data.content}
                             </div>
                         </div>
                     </div>`
            }

            if(data.receiver_id!==userid&&sessionStorage.getItem(data.receiver_id))
            {
                //如果sessionStorage里面有
                let pp=sessionStorage.getItem(data.receiver_id);
                pp+=str;
                sessionStorage.setItem(data.receiver_id,pp)
            }
            else if(data.sender_id!==userid&&sessionStorage.getItem(data.sender_id))
            {
                let pp=sessionStorage.getItem(data.sender_id);
                pp+=str;
                sessionStorage.setItem(data.receiver_id,pp)
            }
            else
            {
                sessionStorage.setItem(data.receiver_id,str)
            }


            if(curToUserid===data.sender_id)
            {
                //如果当前就是和这个聊天,也就是说是别人发给你的
                document.querySelector('.chat .chat_right .appearArea').innerHTML+=str;
            }
            else if(curToUserid===data.receiver_id)
            {
                //如果自己发送給别人的也需要显示出来
                document.querySelector('.chat .chat_right .appearArea').innerHTML+=str;
            }

            document.querySelector('.appearArea').scrollTop=document.querySelector('.appearArea').scrollHeight;

            setAddMoreMessage()
       }
       //客户端得到消息记录
       else if(data.messageType===5){
            //设置界面
            const list=data.list;
            console.log('当前的list长度')
            console.log(list)
            console.log(list.length)
            if(list.length<10)
            {
                isEnd=1;
            }
            else isEnd=0;

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
                           </div>`
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
                          </div>`
            }).join('')

            if(sessionStorage.getItem(curToUserid))
            {
                console.log('是不是在等我')
                const nodeList = document.querySelectorAll('.chat .chat_right .appearArea .message');
                const messageArr = Array.from(nodeList);
                listStr =listStr +sessionStorage.getItem(curToUserid);

            }

            document.querySelector('.chat .chat_right .appearArea').innerHTML=listStr;

            console.log('此时的长度')
            console.log(document.querySelector('.appearArea').scrollHeight)
            document.querySelector('.appearArea').scrollTop=document.querySelector('.appearArea').scrollHeight;

            //存储到sessionStorage里面

            sessionStorage.setItem(curToUserid,listStr);

            console.log('看看我到了吗,1')
            setAddMoreMessage(socket);
            //设置点击事件,发送消息
       }

      // 在此处处理从服务器接收到的消息
    };

    // 监听连接关闭事件
    socket.onclose = function(event) {
      console.log('WebSocket连接已关闭');

      // 在此处进行处理连接关闭事件的逻辑
    };

    // 监听连接错误事件
    socket.onerror = function(error) {
      console.error('WebSocket连接出现错误:', error);

      // 在此处进行处理连接错误事件的逻辑
    };

    // 当不再需要连接时，关闭WebSocket连接
    function closeWebSocket() {
      socket.close();
    }

})

document.querySelector('.footer .kinds ul .comment').addEventListener('click',e=>{
    document.querySelector('.footer .kinds ul .active').classList.remove('active')
    document.querySelector('.footer .kinds ul .comment').classList.add('active')

    axios({
        url:'/user/getCommentsMessage',
        method:'post',
        params:{userid:userid,total_size:0}
    }).then(result=>{
        console.log(result)
        const list=result.data;

        setCommentsList(list,0);
    }).catch(error=>{
        console.log(error)
    })
})

document.querySelector('.footer .kinds ul .report').addEventListener('click',e=>{
    document.querySelector('.footer .kinds ul .active').classList.remove('active')
    document.querySelector('.footer .kinds ul .report').classList.add('active')

    axios({
        url:'/user/getReportMessage',
        method:'post',
        params:{userid:userid,total_size:0}
    }).then(result=>{
        console.log(result)
        const list=result.data;

        setReportList(list,0);
    }).catch(error=>{
        console.log(error)
    })
})

function setLoveBottom()
{

    document.querySelectorAll('.footer .tail ul li').forEach(li=>{
        li.addEventListener('click',e=>{
            console.log(e.target.tagName)
//          设置点击事件
            if(e.target.classList.contains('avatar')||e.target.tagName==='IMG'||e.target.classList.contains('love_head'))
            {
                location.href=`changeInformation.html?id=${li.dataset.id}`
            }
            else
            {
                location.href=`article.html?id=${li.dataset.articleid}`
            }
        })
    })

    span=document.querySelector('.footer .tail .addMoreLove span')
    span.addEventListener('click',e=>{
         if(span.textContent==='没有更多数据了')
         {
            modal('已经没有更多数据',0);
            return 0;
         }
         else
         {
            //需要更多的数据
            const total_size=document.querySelectorAll('.footer .tail ul li').length

            axios({
                url:'/user/getLoveMessage',
                method:'post',
                params:{userid:userid,total_size:total_size}
            }).then(result=>{
                console.log(result)
                const list=result.data;
                setLoveList(list,1);
            }).catch(error=>{
                console.log(error)
            })
         }
    })
}

function setFansBottom()
{
    document.querySelectorAll('.footer .tail ul li').forEach(li=>{
        li.addEventListener('click',e=>{
            if(e.target.classList.contains('avatar')||e.target.tagName==='IMG'||e.target.classList.contains('follows_id'))
            {
                location.href=`changeInformation.html?id=${li.dataset.id}`
            }
            else if(e.target.tagName==='BUTTON')
            {
                if(e.target.classList.contains('followsButtonActive'))
                {
//                  取消关注
                    console.log(li.dataset.id)
                    console.log(userid)
                    axios({
                        url:'/search/disFollows',
                        method:'post',
                        params:{userid:userid,follows_id:li.dataset.id}
                    }).then(result=>{
                        if(result.data.isSuccess)
                        {
                            e.target.classList.remove('followsButtonActive');
                        }
                        else
                        {
                            modal('失败,请检查网络连接',0);
                        }
                    })
                }
                else
                {
//                  关注
                    axios({
                        url:'/search/follows',
                        method:'post',
                        params:{userid:userid,follow_id:li.dataset.id}
                    }).then(result=>{
                        if(result.data.isSuccess)
                        {
                            e.target.classList.add('followsButtonActive');
                        }
                        else
                        {
                            modal('网络出错,请检查连接',0)
                        }
                    })
                }
            }
        })
    })

    span=document.querySelector('.footer .tail .addMoreFans span')
    span.addEventListener('click',e=>{
         if(span.textContent==='没有更多数据了')
         {
            modal('已经没有更多数据',0)
            return 0;
         }
         else
         {
            //需要更多的数据
            const total_size=document.querySelectorAll('.footer .tail ul li').length

            axios({
                url:'/user/getFansMessage',
                method:'post',
                params:{userid:userid,total_size:total_size}
            }).then(result=>{
                console.log(result)
                const list=result.data;
                setFansList(list,1);
            }).catch(error=>{
                console.log(error)
            })
         }
    })
}

function setCollectionBottom()
{

    //收藏的点击事件
    document.querySelectorAll('.footer .tail ul li').forEach(li=>{
        li.addEventListener('click',e=>{
            if(e.target.classList.contains('avatar')||e.target.classList.contains('collection_head')||e.target.tagName==='IMG')
            {
                location.href=`changeInformation.html?id=${li.dataset.id}`
            }
            else location.href=`article.html?id=${li.dataset.articleid}`


        })

    })

    span=document.querySelector('.footer .tail .addMoreCollection span')
    span.addEventListener('click',e=>{
         if(span.textContent==='没有更多数据了')
         {
            modal('已经没有更多数据',0);
            return 0;
         }
         else
         {
            //需要更多的数据
            const total_size=document.querySelectorAll('.footer .tail ul li').length

            axios({
                url:'/user/getCollectionMessage',
                method:'post',
                params:{userid:userid,total_size:total_size}
            }).then(result=>{
                console.log(result)
                const list =result.data;
                setCollectionList(list,1);
            }).catch(error=>{
                console.log(error)
            })
         }
    })
}

function setCommentsBottom()
{

    document.querySelectorAll('.footer .tail ul li').forEach(li=>{
        li.addEventListener('click',e=>{
            if(e.target.classList.contains('avatar')||e.target.classList.contains('userid')||e.target.tagName==='IMG')
            {
                location.href=`changeInformation.html?id=${li.dataset.id}`
            }
            else
            {
                location.href=`article.html?id=${li.dataset.articleid}`
            }
        })
    })

    span=document.querySelector('.footer .tail .addMoreComments span')
    span.addEventListener('click',e=>{
         if(span.textContent==='没有更多数据了')
         {
            modal('已经没有更多数据',0);
            return 0;
         }
         else
         {
            //需要更多的数据
            const total_size=document.querySelectorAll('.footer .tail ul li').length

            axios({
                url:'/user/getCommentsMessage',
                method:'post',
                params:{userid:userid,total_size:total_size}
            }).then(result=>{
                console.log(result)
                const list =result.data;
                setCommentsList(list,1);
            }).catch(error=>{
                console.log(error)
            })
         }
    })
}

function setReportBottom()
{
    document.querySelectorAll('.footer .tail ul li').forEach(li=>{
        li.addEventListener('click',e=>{
            if(e.target.classList.contains('avatar')||e.target.tagName==='IMG')
            {
                location.href=`changeInformation.html?id=${li.dataset.id}`
            }
        })
    })

    span=document.querySelector('.footer .tail .addMoreReport span')
    span.addEventListener('click',e=>{
         if(span.textContent==='没有更多数据了')
         {
            modal('已经没有更多数据',0);
            return 0;
         }
         else
         {
            //需要更多的数据
            const total_size=document.querySelectorAll('.footer .tail ul li').length

            axios({
                url:'/user/getReportMessage',
                method:'post',
                params:{userid:userid,total_size:total_size}
            }).then(result=>{
                console.log(result)
                const list =result.data;
                setReportList(list,1);
            }).catch(error=>{
                console.log(error)
            })
         }
    })
}


function formatDate(timeString) {
  const date = new Date(timeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function setMessageListLeft(list)
{
    if(list==null||list.length===0)
    {
        document.querySelector('.tail ul .chat .chat_left ul').innerHTML=''
        return 0;
    }

    const str=list.map(item=>{
        return `<li data-id="${item.receiver_id}" data-name="${item.receiver_name}">
                    <div class="avatar">
                        <img src="${item.receiver_avatar}" alt="">
                    </div>
                    <div class="right_name">
                        ${item.receiver_name}
                    </div>
                </li>`
    }).join('')

    document.querySelector('.tail ul .chat .chat_left ul').innerHTML+=str


    //设置完以后设置点击事件
}

// function removeAdd()
// {
//      if(document.querySelector('.footer .tail .addMoreComments'))
//     {
//         document.querySelector('.footer .tail .addMoreComments').parentNode.removeChild(document.querySelector('.footer .tail .addMoreComments'))
//     }
//     if(document.querySelector('.footer .tail .addMoreCollection'))
//     {
//         document.querySelector('.footer .tail .addMoreCollection').parentNode.removeChild(document.querySelector('.footer .tail .addMoreCollection'))
//     }
//     if(document.querySelector('.footer .tail .addMoreFans'))
//     {
//         document.querySelector('.footer .tail .addMoreFans').parentNode.removeChild(document.querySelector('.footer .tail .addMoreFans'))
//     }
//     if(document.querySelector('.footer .tail .addMoreLove'))
//     {
//         document.querySelector('.footer .tail .addMoreLove').parentNode.removeChild(document.querySelector('.footer .tail .addMoreLove'))
//     }
//     if(document.querySelector('.footer .tail .addMoreReport'))
//     {
//         document.querySelector('.footer .tail .addMoreReport').parentNode.removeChild(document.querySelector('.footer .tail .addMoreReport'))
//     }
// }

function setSearchPeople(socket)
{
    //

    document.querySelector('.chat_left .chat_left_head .searchPeople').addEventListener('click',e=>{
        //点击了
        dianwo();

        //点击完之后就是监听事件
        document.querySelector('.tankuang #header .closeButton .ensure').addEventListener('click',e=>{
            //点击确定

            const receiver_id=document.querySelector('.tankuang #header .footer input').value;
            const content=document.querySelector('.tankuang #header .footer textarea').value;

            if(myFriendData.get(receiver_id))
            {
                //此人已经在列表中
                modal('此人已经存在列表中,不可以发送!!',0);
                return 0;
            }

            const message=JSON.stringify({messageType:7,receiver_id:receiver_id,content:content});
            //

            socket.send(message);

            document.querySelector('.tankuang #header .closeButton .close').click();
        })
    })

}

// function setAddMoreMessage(socket) {
//
//     console.log('看看我执行了吗,是否进入到加载更多数据')
//
//     const inputTextarea = document.querySelector('.appearArea');
//
//     // function handleScroll() {
//     //     if (inputTextarea.scrollTop === 0) {
//     //         console.log('滚动条已经在最上方');
//     //         // 执行发送需要更多聊天记录的消息
//     //         console.log(isEnd)
//     //         if (isEnd)
//     //         {
//     //             // 说明没有更多数据了
//     //             console.log('没有更多数据了');
//     //             modal('没有更多数据了', 0);
//     //             // 移除滚动事件监听器
//     //             inputTextarea.removeEventListener('scroll', handleScroll);
//     //             return 0;
//     //         }
//     //         const total_size = document.querySelectorAll('.appearArea .message').length;
//     //         const message = JSON.stringify({ messageType: 6, total_size: total_size, receiver_id: curToUserid });
//     //         socket.send(message)
//     //
//     //     }
//     // }
//     // inputTextarea.addEventListener('scroll', debounce(handleScroll, 300));
// }

// function debounce(func, delay) {
//     let timer;
//     return function() {
//         clearTimeout(timer);
//         timer = setTimeout(func, delay);
//     };
// }