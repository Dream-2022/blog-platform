let key=localStorage.getItem("key")
console.log(key)
let blog;
let isLiked = false;//是否点赞了
let isCollected = false;//是否收藏了
let likeCount ;//点赞数
let collectCount ;//收藏数
let viewCount;//浏览量
let collectId;//收藏id
//打开页面时，将文章信息导入
//还有从articles表中读出点赞数，收藏数，浏览量
//作者名得改成文章作者（通过user_id从user表中拿数据）
window.addEventListener('DOMContentLoaded', function() {
    //从likes表查找该用户是否点赞(通过user_id,article_id查找是否存在）
    let article_id=localStorage.getItem("key")
    let user_id=localStorage.getItem("id")
    var likeElement = document.querySelector(".detail-give");
    var collectElement = document.querySelector(".detail-collect");
    //页面显示的文章信息
    axios({
        url:'/Blog/Articles/BlogTest',
        params:{
            article_id
        }
    }).then(result => {
            console.log("Blog/Articles/BlogTest:"+result);
            articles=result.data;

            // 进行后续处理，根据实际需求操作--------------从数据库中拿article_id对应的文章（修改）
            for (let articlesKey in articles) {
                if(articles[articlesKey].id===key){
                    blog=articles[articlesKey];
                    console.log(blog)
                    console.log("找到了")
                    console.log(blog)
                    console.log(blog.title)

                    viewCount=blog.view
                    console.log("blog.view:"+blog.view)
                    console.log("blog.give:"+blog.give)
                    console.log("viewCount:"+viewCount)

                    //打开页面之后让浏览量自增
                    console.log("viewCount:"+viewCount)
                    view=parseInt(viewCount)+1
                    console.log("parseInt(viewCount)+1:"+parseInt(viewCount)+1)

                    console.log("article_id"+article_id+";view"+view)
                    console.log(viewCount)
                    axios({
                        url:'/Blog/Articles/giveView',
                        method: 'post',
                        params:{
                            id:article_id,
                            view
                        }
                    }).then(result=>{
                        console.log(result)
                        console.log("新增浏览量结果："+result.data);
                    })

                    //如果文章状态不是’发布‘，就禁用点赞和收藏
                    if(blog.state!=='发布'){
                        let divElementGive=document.querySelector('.detail-give')
                        let divElementCollect=document.querySelector('.detail-collect')
                        divElementGive.removeAttribute('onclick');
                        outlineCollectElement.setAttribute('data-bs-toggle', null);
                    }

                    document.querySelector('.content-title ').innerHTML=blog.title
                    document.querySelector('.content-author').innerHTML=localStorage.getItem("nickname")
                    let time=blog.update_at
                    // 将字符串解析为Date对象
                    let date = new Date(time);
                    // 定义日期格式化选项
                    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    // 格式化日期
                    let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);
                    console.log(formattedDate); // 输出：2023/07/10
                    document.querySelector('.content-time').innerHTML='发布于'+formattedDate
                    document.querySelector('.content-view').innerHTML=view
                    console.log("blog.give:"+blog.give)
                    document.querySelector('.content-give').innerHTML=blog.give
                    document.querySelector('.article-give').innerHTML=blog.give
                    document.querySelector('.content-state').innerHTML=blog.state
                    document.querySelector('.content-content').innerHTML=blog.htmlText
                    likeCount=blog.give
                    collectCount=blog.collect

                    console.log("likeCount:"+likeCount+"collectCount:"+collectCount)
                }
            }

        })
        .catch(error => {
            console.error(error);
        });

    //文章获赞信息（该用户是否给这篇文章点赞了）
    axios({
        url:'/Blog/Likes/selectLikeByUserIdAndArticleId',
        params:{
            user_id,
            article_id
        }
    }).then(result=>{
        console.log(result)
        console.log(result.data)
        console.log(result.data.success)
        if(result.data.success=='1'){
            console.log("找到了,该用户已经给文章点过赞了")
            //将点赞处的状态改为已点赞
            isLiked=!isLiked;
            //修改点赞的样式
            document.querySelector('.content-give').innerHTML=likeCount+''
            document.querySelector(".outline-give").innerHTML='<i class="thumbs up icon"></i>点赞'
            likeElement.classList.add("liked");
        }
        else{
            console.log("该用户没有给文章点过赞")
        }
    })



    //判断该用户是否收藏,显示显示该文章的收藏次数
    axios({
        url:'/Blog/CollectArticle/selectCollectsByUserIdAndArticleId',
        params:{
            user_id,
            article_id
        }
    }).then(result=>{
        console.log(result)
        console.log(result.data)
        console.log(result.data.success)
        console.log(result.data.count)

        if(result.data.success=='1'){
            console.log("找到了,该用户已经收藏文章了")

            collectId=result.data.collectId
            console.log("result.data.collectId:"+result.data.collectId)
            document.querySelector('.article-collect').innerHTML=result.data.count
            collectCount=result.data.count

            //将点赞处的状态改为已收藏
             isCollected=!isCollected;
             document.querySelector(".outline-collect").innerHTML='<i class="star icon"></i>收藏'
             collectElement.classList.add("collected");

            outlineCollectElement.setAttribute('data-bs-toggle', null);
        }
        else{
            console.log("该用户没有给文章点过赞")
        }
    })


    //显示文章标签，分类
    axios({
        url:'/Blog/LabelArticle/selectLabelArticleByArticleId',
        params:{
            article_id
        }
    }).then(result=>{
        console.log(result)
        console.log(result.data)

        //把标签显示在页面上
        result.data.forEach(item => {
            const parentElement = document.querySelector('.container-detail2');
            const newElement = document.createElement('span');
            newElement.className = 'content-label';
            newElement.textContent = item.labelName;
            parentElement.appendChild(newElement);
        });

    })


    //显示文章专栏
    axios({
        url:'/Blog/ColumnArticle/selectColumnArticleByArticleId',
        params:{
            article_id
        }
    }).then(result=>{
        console.log(result)
        console.log(result.data)

        //把标签显示在页面上
        result.data.forEach(item => {
            const parentElement = document.querySelector('.container-detail1');
            const newElement = document.createElement('span');
            newElement.className = 'content-column';
            newElement.textContent = item.columnName;
            parentElement.appendChild(newElement);
        });

    })


    //显示文章作者
    axios({
        url:'/Blog/Articles/selectArticlesUserIdByArticleId',
        params:{
            article_id
        }
    }).then(result=>{
        console.log(result)
        console.log(result.data)
        console.log("作者："+result.data.nickname);
        document.querySelector('.content-author').innerHTML=result.data.nickname
        document.querySelector('.detail-author-nickname').innerHTML=result.data.nickname
        document.querySelector('.detail-author-id').innerHTML=result.data.id
        console.log("result:"+result.data.picture)
        if(result.data.picture!==null){
            console.log("result:"+result.data.picture)
            document.querySelector('.detail-author-avatar').src='/upload/'+result.data.picture
        }
    })

    //显示文章 的收藏夹
    //在collects表中根据user_id获取所有的collectName
    axios({
        url:'/Blog/Collects/selectCollectsByUserId',
        params:{
            user_id
        }
    }).then(result => {
        console.log(result)
        console.log(result.data);
        const collects = result.data;

        // 获取用于插入数据的父元素
        const contentCollectList = document.querySelector('.content-collectList');

        // 使用 innerHTML 插入数据
        collects.forEach(item => {//如果没有收藏夹就新增一个收藏夹
            const containerCollect = document.createElement('div');
            containerCollect.classList.add('container-collect');

            //时间转换
            let time=item.create_at
            // 将字符串解析为Date对象
            let date = new Date(time);
            // 定义日期格式化选项
            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            // 格式化日期
            let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);
            console.log(formattedDate); // 输出：2023/07/10
            // 新增收藏夹盒子
            console.log("item.collectName:"+item.collectName)
            containerCollect.innerHTML = `
                    <table>
                      <tr>
                        <td>
                          <span class="collect-name">${item.collectName}</span>
                        </td>
                        <td rowspan="2" class="right">
                          <span class="confirm-button">收藏</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="collect-number grey">${formattedDate}</span><span class="grey">创建</span>
                        </td>
                      </tr>
                    </table>
                `;
            contentCollectList.appendChild(containerCollect);
        });

    }) .catch(error => {
        console.error(error);
    });
});


//点击作者头像时，进入作者的个人主页
document.querySelector('.detail-author').addEventListener('click',function (){
    let detailId=document.querySelector('.detail-author-id').innerText
    console.log(detailId)
    localStorage.setItem('detail-author-id',detailId)
    window.location.href ='Detail.html';
})


//给文章点赞
//把点赞user_id,article_id，时间插入likes表
//把articles表中的give字段+1
function toggleLike() {
    var likeElement = document.querySelector(".detail-give");
    const user_id=localStorage.getItem("id")
    let article_id=localStorage.getItem("key")
    if (!isLiked) {
        likeCount++;

        //把上端的点赞数自增
        document.querySelector('.content-give').innerHTML=likeCount+''

        //把点赞user_id,article_id，时间插入likes表
        document.querySelector(".outline-give").innerHTML='<i class="thumbs up icon"></i>点赞'
        likeElement.classList.add("liked");

        axios({
            url:'/Blog/Likes/giveLike',
            method: 'post',
            params:{
                user_id,article_id
            }
        }).then(result=>{
            console.log("新增点赞结果："+result.data);
        })

        //把articles表中的give字段+1
        axios({
            url:'/Blog/Articles/articlesGiveLike',//deleteLike
            method: 'post',
            params:{
                article_id,
                give:likeCount
            }
        }).then(result=>{
            console.log("结果："+result.data);
        })
    } else {
        likeCount--;

        //把上端的点赞数更新
        document.querySelector('.content-give').innerHTML=likeCount+''
        //删除点赞的那一行信息
        axios({
            url:'/Blog/Likes/deleteLike',
            method: 'post',
            params:{
                user_id,article_id
            }
        }).then(result=>{
            console.log("删除点赞结果："+result.data);
        })
        //把articles表中的give字段-1
        document.querySelector(".outline-give").innerHTML='<i class="thumbs up outline icon"></i>点赞'
        likeElement.classList.remove("liked");
    }
    isLiked = !isLiked;
    document.querySelector(".article-give").textContent = likeCount;
}



// 点击收藏按钮
const contentCollectList = document.querySelector('.content-collectList');
contentCollectList.addEventListener('click', function (){
    const targetButton = event.target;
    if (targetButton.classList.contains('confirm-button')) {
        const collectName = targetButton.closest('.container-collect').querySelector('.collect-name').innerText;
        console.log('收藏夹名称：', collectName);
        const user_id=localStorage.getItem("id")
        //将收藏夹名称发送到服务器(先通过collectName获取到collect_id)
        const key=localStorage.getItem("key")
        axios({
            url:'/Blog/Collects/selectCollectsByCollectNameAndUserId',
            params:{
                collectName,user_id,key
            }
        }).then(result => {
            console.log(result)
            console.log(result.data);
            collectId=result.data
            document.querySelector('.prompt').innerHTML=`已收藏至 ${collectName}`
             setTimeout(() => {
                document.querySelector('.btn-close').click()
                 document.querySelector('.prompt').innerHTML='&nbsp'
                // 这里可以执行进一步操作，比如将收藏夹名称发送到服务器或显示在页面上等等
             }, 1000);

            //设置收藏按钮处于点击状态
            document.querySelector(".outline-collect").innerHTML='<i class="star icon"></i>收藏'
            document.querySelector('.detail-collect').classList.add("collected");
            let count=document.querySelector('.article-collect').textContent
            collectCount=parseInt(count)+1
            document.querySelector('.article-collect').innerHTML=collectCount
            // 设置为已经收藏状态
            isCollected=!isCollected
            console.log('isCollected:'+isCollected)
        }) .catch(error => {
            console.error(error);
        });

    }
});




    const outlineCollectElement = document.querySelector('.outline-collect');
    //如果处于收藏状态，继续点击为取消收藏
    if(isCollected){
        outlineCollectElement.setAttribute('data-bs-toggle', 'modal');
        console.log("isCollected:"+isCollected)
    }

    const modal = document.querySelector(".my-box");
    document.querySelector('.detail-collect').addEventListener('click',function (event){

        document.querySelector('.my-box').addEventListener('click', function (event) {
            // Stop the event from propagating to parent elements (e.g., .detail-collect)
            event.stopPropagation();

        });
        console.log("isCollected"+isCollected)
         if(isCollected){
            collectCount--;
            console.log('is'+isCollected)
            const collectElement=document.querySelector('.detail-collect')
            collectElement.classList.remove("collected");
            document.querySelector(".outline-collect").innerHTML='<i class="star outline icon"></i>收藏'
            isCollected = !isCollected;
            document.querySelector(".article-collect").textContent = collectCount;
            outlineCollectElement.setAttribute('data-bs-toggle', 'modal');


            console.log("1111111:"+collectId+":"+key)
            //接下来从数据库删除收藏的记录
             axios({
                 url:'/Blog/CollectArticle/deleteCollectArticleByCollectIdAndArticleId',
                 params:{
                     collect_id:collectId,article_id:key
                 }
             }).then(result => {
                 console.log(result)
                 console.log(result.data);
             }) .catch(error => {
                 console.error(error);
             });
         }
         else{
             console.log("NO")
             outlineCollectElement.setAttribute('data-bs-toggle', null);
             document.querySelector('.detail-collect').click()
         }
    })





// 点击输入按钮
function toggleInputBox() {
    const button = document.getElementById('toggleButton');
    const inputBox = document.getElementById('inputBox');
    const textInput = document.getElementById('textInput');

    if (inputBox.style.display === 'none') {
        // 切换到输入框模式
        button.style.display = 'none';
        inputBox.style.display = 'inline';
        textInput.value = ''; // 清空输入框
    } else {
        // 切换回按钮模式
        button.style.display = 'inline';
        inputBox.style.display = 'none';
    }
}
// 点击其他地方时，将输入框切换回按钮模式
document.addEventListener('click', function (event) {
    const inputBox = document.getElementById('inputBox');
    const container = document.querySelector('.modal-content-collect');
    const button = document.getElementById('toggleButton');
    if (!container.contains(event.target)) {
        button.style.display = 'inline';
        inputBox.style.display = 'none';
    }
});


// 添加收藏夹
function addContentCollect() {
    const textInput = document.getElementById('textInput');
    const content = textInput.value.trim();
    if (content !== '') {
        //判断是否存在相同的收藏夹
        function getExistingContents() {

            const output = document.getElementById('output');
            const contentLabels = output.querySelectorAll('.content-label');

            let flag=false;
            contentLabels.forEach((label) => {
                if(content===label.textContent.trim()){
                    console.log("相等")
                    flag=!flag;
                }
            });
            return flag
        }

        if(!getExistingContents()) {
            console.log("content:"+content)
            // 获取用于插入数据的父元素
            const contentCollectList = document.querySelector('.content-collectList');
            const containerCollect = document.createElement('div');
            containerCollect.classList.add('container-collect');
            containerCollect.innerHTML = `
                    <table>
                      <tr>
                        <td>
                          <span class="collect-name">${content}</span>
                        </td>
                        <td rowspan="2" class="right">
                          <span class="confirm-button">收藏</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="collect-number grey">0</span><span class="grey">条收藏内容</span>
                        </td>
                      </tr>
                    </table>
                `;
            contentCollectList.appendChild(containerCollect);
            const user_id=localStorage.getItem("id")
            //向数据库插入收藏夹
            axios({
                url:'/Blog/Collects/insertCollectsCollectName',
                params:{
                    user_id,collectName:content
                }
            }).then(result => {
                console.log(result)
                console.log(result.data);

            }) .catch(error => {
                console.error(error);
            });
        }
        // 隐藏输入框，显示按钮
        const inputBox = document.getElementById('inputBox');
        const button = document.getElementById('toggleButton');
        inputBox.style.display = 'none';
        button.style.display = 'inline';
    }
}



