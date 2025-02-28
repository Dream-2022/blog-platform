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
const styleSheets = document.styleSheets;

// 遍历样式表(删除背景样式)
for (const styleSheet of styleSheets) {
    // 获取样式表中的规则
    const rules = styleSheet.rules || styleSheet.cssRules;

    // 遍历规则
    for (const rule of rules) {
        // 判断是否是 body::before 这个选择器
        if (rule.selectorText === 'body::before') {
            // 删除该选择器的样式（方法一）
            styleSheet.deleteRule(rule);
            // 或者将该选择器的样式设置为空字符串（方法二）
            // rule.style.cssText = '';
        }
    }
}
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
                // if(blog.state!=='发布'){
                //     let divElementGive=document.querySelector('.detail-give')
                //     let divElementCollect=document.querySelector('.detail-collect')
                //     divElementGive.removeAttribute('onclick');
                //     outlineCollectElement.setAttribute('data-bs-toggle', null);
                // }

                document.querySelector('.content-title ').innerHTML=blog.title

                document.querySelector('.content-author').innerHTML=localStorage.getItem("nickname")
                console.log(blog.user_id)
                console.log(blog)
                document.querySelector('.content-author-id ').innerHTML=blog.user_id
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
                if(blog.state==='发布'){
                    document.querySelector('.content-state').innerHTML='公开'
                }
                else{
                    document.querySelector('.content-state').innerHTML=blog.state
                }
                document.querySelector('.content-content').innerHTML=blog.htmlText
                likeCount=blog.give
                collectCount=blog.collect

                //渲染举报弹窗
                document.querySelector('.report-title').innerHTML='<em>"'+blog.title+'"</em>'
                document.querySelector('.report-article_id').innerHTML=blog.id
                document.querySelector('.report-user_id').innerHTML=blog.user_id
                console.log("likeCount:"+likeCount+"collectCount:"+collectCount)

                console.log(document.querySelector('.content-state').innerHTML)
                if(document.querySelector('.content-state').innerHTML!='公开'){
                    document.querySelector('.outline-box').style.display='none'
                    document.querySelector('.comment-ccc').style.display='none'
                }
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
    })
        .then(result=>{
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
    })
        .then(result=>{
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
    })
        .then(result=>{
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
    })
        .then(result=>{
        console.log(result)
        console.log(result.data)
        console.log("作者："+result.data.nickname);
        document.querySelector('.content-author').innerHTML=result.data.nickname
        document.querySelector('.detail-author-nickname').innerHTML=result.data.nickname
        document.querySelector('.detail-author-id').innerHTML=result.data.id
        document.querySelector('.content-author-id ').innerHTML=result.data.id
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
    })
        .then(result => {
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
            let date = new Date(time);
            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
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

    //显示评论总数
    axios({
        url:'/Blog/Comments/selectCommentsForCountByArticle_id',
        params:{
            article_id
        }
    })
        .then(result => {
        console.log(result)
        console.log(result.data)
        document.querySelector('.article-comment').innerHTML=result.data
    })

    const constPicture=localStorage.getItem('picture')
    document.querySelector('.comment-avatar').src='/upload/'+constPicture


    //从数据库选择一级评论,然后往下面找到他的子级评论，如果是回复加上@用户名


    //创建评论盒子
    function createComment(commentBoxContain,item,picture,nickname,id){

        if(picture===''){
            picture='../image/headSculpture.jpeg'
        }else{
            picture='/upload/'+picture
        }
        console.log(item)
        let time = item.create_at;
        let date = new Date(time);
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);

        const htmlContent = `
                        <div class="comment-box">
                            <div class="left">
                                <img src=${picture} class="comment-box-avatar" alt="">
                            </div>
                            <div class="left">
                                <span class="comment-nickname">${nickname}</span>
                                <span class="comment-reply-nickname"></span><br>
                                <span class="comment-element">${item.content}</span><br>
                                <span class="comment-comment_id">${item.id}</span>
                                <span class="comment-wen">发布于</span>
                                <span class="comment-time">${formattedDate}</span>
                                <span class="comment-id">${id}</span>
                            </div>
                            <div class="right">
                                <span class="comment-reply">回复</span>
                            </div>
                        </div>

                        <div class="comment-containBox"></div>

                        <div class="up_level-box"></div>
                     `;

        const tempDiv = document.createElement('div');
        tempDiv.classList.add('comment-boxes')

        let marginLeft
        if(item.num===1){
            marginLeft=0
        }
        else if(item.num===2){
            marginLeft=40
        }else{
            marginLeft=0
        }
        let widthBox
        if(item.num===1){
            widthBox=790
        }
        else{
            widthBox=790-40
        }
        tempDiv.style.marginLeft=marginLeft+'px'
        tempDiv.innerHTML = htmlContent;


        //设置点击回复事件
        const commentReplyBox = tempDiv.querySelector('.comment-reply');
        // 将评论框内容插入comment-box-contain中
        commentBoxContain.appendChild(tempDiv);
        console.log(document.querySelector('.content-author-id').innerHTML)
        console.log(item.receiver_id)
        console.log(document.querySelector('.content-author-id').innerHTML!=item.receiver_id)
        if(document.querySelector('.content-author-id').innerHTML!=item.receiver_id){
            tempDiv.querySelector('.comment-reply-nickname').innerHTML=`回复 ${item.receiver_nickname}`
        }
        // 如果是九级评论，就将回复隐藏
        console.log('commentContent.num'+item.num)
        // if(item.num===9){
        //     tempDiv.querySelector('.comment-reply').style.display='none'
        // }

        tempDiv.querySelector('.comment-box').style.width=widthBox+'px'

        document.querySelector('.comment-ccc').style.display='none'




        //回复
        function ReplyBox(tempDiv,comment_id,num){
            let constPicture=localStorage.getItem('picture')
            if(constPicture===''){
                constPicture="../image/headSculpture.jpeg"
            }
            else{
                constPicture='/upload/'+constPicture
            }
            const commentReplyContent=`
                    <div class="user-img">
                        <img src='${constPicture}' class="comment-avatar" alt="">
                    </div>
                    <div class="comment-form">
                        <div class="comment-wrapper">
                            <div class="comment-id"></div>
                             <textarea class="comment_content" placeholder="请输入回复" maxlength="100"></textarea>

                        </div>
                        <div class="comment-content2">
                            <span class="comment-wen">可输入&nbsp100&nbsp个字符</span>
                            <input type="submit" class="comment-confirm" value="评论">
                        </div>
                    </div>
                `;
            const commentReplyTextareaBox=tempDiv.querySelector('.comment-containBox')


            //原有的内容是否为空（评论区）
            if(commentReplyTextareaBox.innerHTML==='') {
                const commentReplyTextarea = document.createElement('div')
                commentReplyTextarea.innerHTML = commentReplyContent
                commentReplyTextarea.classList.add('comment-contain')
                commentReplyTextareaBox.appendChild(commentReplyTextarea)

                //点击评论事件（先判断评论输入的内容是否为空）
                const commentConfirm=tempDiv.querySelector('.comment-confirm')
                commentConfirm.addEventListener('click',event=>{
                    console.log('点击commentConfirm')
                    const commentContent=tempDiv.querySelector('.comment_content')
                    console.log('内容：'+commentContent.value)
                    if(commentContent.value!==''){
                        //提交事件给后端，新增评论
                        const commentCommentBox=tempDiv.querySelector('.comment-box')
                        let article_id=localStorage.getItem('key')
                        let receiver_id=commentCommentBox.querySelector('.comment-id').innerHTML
                        let user_id=localStorage.getItem('id')
                        let content=commentContent.value
                        num++;
                        let up_level=comment_id
                        console.log("receiver_id:"+receiver_id+'article_id:'+article_id+"user_id:"+user_id+'content：'+content+'num:'+num+'up_level:'+up_level)
                        axios({
                            url:'/Blog/Comments/insertComments',
                            method: 'post',
                            params:{
                                receiver_id,article_id,user_id,content,num,up_level
                            }
                        }).then(Result=>{
                            console.log(Result)
                            console.log(Result.data)
                            let commentContent=Result.data


                            //将刚刚评论的加到页面上，将评论框删除
                            let time = commentContent.create_at;
                            let date = new Date(time);
                            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

                            let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);
                            let Picture='/upload/'+localStorage.getItem('picture')
                            let Nickname=localStorage.getItem('nickname')
                            const htmlContent1 = `
                                <div class="comment-box">
                                    <div class="left">
                                        <img src=${Picture} class="comment-box-avatar" alt="">
                                    </div>
                                    <div class="left">
                                        <span class="comment-nickname">${Nickname}</span>
                                        <span class="comment-reply-nickname"></span><br>
                                        <span class="comment-element">${commentContent.content}</span>
                                        <span class="comment-comment_id">${commentContent.id}</span><br>
                                        <span class="comment-wen">发布于</span>
                                        <span class="comment-time">${formattedDate}</span>
                                        <span class="comment-id">${id}</span>
                                    </div>
                                    <div class="right">
                                        <span class="comment-reply">回复</span>
                                    </div>
                                </div>

                                <div class="comment-containBox"></div>

                                <div class="up_level-box"></div>
                             `;

                            const tempDiv1 = document.createElement('div');
                            tempDiv1.classList.add('comment-boxes')

                            let marginLeft
                            if(commentContent.num===1){
                                marginLeft=0
                            }
                            else if(commentContent.num===2){
                                marginLeft=40
                            }else{
                                marginLeft=0
                            }
                            console.log(commentContent.num)
                            let widthBox
                            if(commentContent.num===1){
                                widthBox=790
                            }
                            else{
                                widthBox=790-40
                            }
                            tempDiv1.style.marginLeft=marginLeft+'px'
                            tempDiv1.innerHTML = htmlContent1;
                            const commentBoxContain1=tempDiv.querySelector('.up_level-box')
                            commentBoxContain1.appendChild(tempDiv1);

                            console.log(document.querySelector('.content-author-id').innerHTML)
                            console.log(item)
                            console.log(item.receiver_id)
                            console.log(document.querySelector('.content-author-id').innerHTML!=item.receiver_id)

                            if(document.querySelector('.content-author-id').innerHTML!=item.receiver_id){
                                tempDiv1.querySelector('.comment-reply-nickname').innerHTML=`回复 ${item.receiver_nickname}`
                            }

                            tempDiv1.querySelector('.comment-box').style.width=widthBox+'px'
                            // 如果是九级评论，就将回复隐藏
                            console.log('commentContent.num'+commentContent.num)
                            // if(commentContent.num===9){
                            //     tempDiv1.querySelector('.comment-reply').style.display='none'
                            // }
                            //接着将评论框区域删除
                            commentContent.innerHTML=''
                            const commentReplyBox = tempDiv1.querySelector('.comment-reply');
                            console.log(commentReplyBox)
                            //添加回复事件
                            commentReplyBox.addEventListener('click',event=>{
                                console.log('点击')
                                console.log(commentContent.id)
                                ReplyBox(tempDiv1,commentContent.id,commentContent.num)
                            })
                        })
                    }
                })
            }
            else{
                commentReplyTextareaBox.innerHTML=''
            }
        }
        commentReplyBox.addEventListener('click',event=>{
            console.log(item.id)
            ReplyBox(tempDiv,item.id,item.num)

        })
        //设置点击回复和输入框之外的部分，将评论区删除
        document.addEventListener('click',event=>{
            let commentReplyTextareaBoxes=document.querySelectorAll('.comment-containBox')
            let commentReply=document.querySelectorAll('.comment-reply')
            commentReplyTextareaBoxes.forEach(item=>{
                let parentElement=item.parentElement;
                let replyButton=parentElement.querySelector('.comment-box')
                if(!item.contains(event.target)&&!replyButton.contains(event.target)){
                    item.innerHTML=''
                }
            })
        })





        //接着从数据库找字段up_level为item.id的
        findUpLevel()

        function findUpLevel(){
            axios({
                url:'/Blog/Comments/selectCommentsByUp_level',
                params:{
                    up_level:item.id
                }
            }).then(result2 => {
                console.log(result2)
                console.log(result2.data)
                console.log('找到下一级评论了')
                console.log('result2.data.length:'+result2.data.length)
                if(result2.data.length!==0){
                    console.log(user_id)
                    result2.data.forEach(item1=>{
                        let user_id=item1.user_id
                        console.log("user_id:"+user_id)
                        axios({
                            url:'/Blog/user/selectUserById',
                            params:{
                                id:user_id
                            }
                        }).then(result3 => {
                            console.log(result3)
                            console.log(result3.data)

                            //找后面的多级评论
                            let commentBoxContainUplevel=tempDiv.querySelector('.up_level-box');
                            if(item1.num===10){
                            }
                            else{
                                createComment(commentBoxContainUplevel,item1,result3.data.picture,result3.data.nickname,result3.data.id)
                            }
                        })
                    })
                }
            })
        }
    }
    //显示评论信息
    axios({
        url:'/Blog/Comments/selectCommentsByArticle_id',
        params:{
            article_id
        }
    })
        .then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach(item=>{
            let user_id=item.user_id

            //根据user_id找到用户头像
            axios({
                url:'/Blog/user/selectUserById',
                params:{
                    id:user_id
                }
            }).then(result1 => {
                console.log(result1)
                console.log(result1.data)

                //一级评论
                let commentBoxContain = document.querySelector('.comment-box-contain');
                createComment(commentBoxContain,item,result1.data.picture,result1.data.nickname,result1.data.id)
            })


        })
    })



});

//添加一级评论
document.querySelector('.comment-confirm1').addEventListener('click',function (){
    const tempDiv=document.querySelector('.comment-contain')
    const commentConfirm=tempDiv.querySelector('.comment-confirm1')

    console.log('点击commentConfirm')
    const commentContent = tempDiv.querySelector('.comment_content1')
    console.log('内容：' + commentContent.value)
    if (commentContent.value !== '') {
        //提交事件给后端，新增评论
        const commentCommentBox = tempDiv.querySelector('.comment-box')
        let article_id = localStorage.getItem('key')
        //通过文章id找到作者
        axios({
            url: '/Blog/Articles/selectArticlesUserIdByArticleId',
            params: {
                article_id
            }
        }).then(result => {
            console.log(result)
            console.log(result.data)
            let receiver_id = result.data.id
            let user_id = localStorage.getItem('id')
            let content = commentContent.value
            let num =  1
            let up_level = -1
            console.log("receiver_id:" + receiver_id + 'article_id:' + article_id + "user_id:" + user_id + 'content：' + content + 'num:' + num + 'up_level:' + up_level)
            axios({
                url: '/Blog/Comments/insertComments',
                method: 'post',
                params: {
                    receiver_id, article_id, user_id, content, num, up_level
                }
            }).then(Result => {
                console.log(Result)
                const id=localStorage.getItem('id')
                console.log(id)
                //从user表找到头像
                axios({
                    url: '/Blog/user/selectUserById',
                    method: 'post',
                    params: {
                        id
                    }
                }).then(result1 => {
                    console.log(result1)
                    console.log(result1.data)
                    insertBox(result1,Result)
                })
                function insertBox(result1,Result){
                    let picture
                    console.log(result1)
                    if(result1.data.picture===''){
                        picture='../image/headSculpture.jpeg'
                    }
                    else{
                        picture='/upload/'+result1.data.picture
                    }
                    console.log(Result)
                    console.log(Result.data)
                    let commentContentzzz = Result.data
                    //将刚刚评论的加到页面上，将评论框删除
                    let time = commentContentzzz.create_at;
                    let date = new Date(time);
                    let options = {year: 'numeric', month: '2-digit', day: '2-digit'};
                    let id = localStorage.getItem('id')
                    let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);
                    let nickname=localStorage.getItem('nickname')
                    const htmlContent1 = `
                                <div class="comment-box">
                                    <div class="left">
                                        <img src='${picture}' class="comment-box-avatar" alt="">
                                    </div>
                                    <div class="left">
                                        <span class="comment-nickname">${nickname}</span>
                                        <span class="comment-reply-nickname"></span><br>
                                        <span class="comment-element">${commentContentzzz.content}</span><br>
                                        <span class="comment-comment_id">${commentContentzzz.id}</span>
                                        <span class="comment-wen">发布于</span>
                                        <span class="comment-time">${formattedDate}</span>
                                        <span class="comment-id">${id}</span>
                                    </div>
                                    <div class="right">
                                        <span class="comment-reply">回复</span>
                                    </div>
                                </div>

                                <div class="comment-containBox"></div>

                                <div class="up_level-box"></div>
                             `;

                    const tempDiv1 = document.createElement('div');
                    tempDiv1.classList.add('comment-boxes')
                    tempDiv1.innerHTML = htmlContent1;

                    const commentBoxContain1 = document.querySelector('.comment-box-contain')
                    commentBoxContain1.appendChild(tempDiv1);
                    //接着将评论框区域删除
                    commentContent.innerHTML = ''
                    commentContent.value = '';

                    const commentContentCount = document.querySelector('.comment-count1')
                    commentContentCount.innerHTML=100
                    console.log('715行')
                    function ReplyBox(tempDiv1,comment_id,num){
                        let constPicture=localStorage.getItem('picture')
                        if(constPicture===''){
                            constPicture="../image/headSculpture.jpeg"
                        }
                        else{
                            constPicture='/upload/'+constPicture
                        }
                        const commentReplyBox=document.createElement('div')
                        const commentReplyContent=`
                                <div class="user-img">
                                    <img src='${constPicture}' class="comment-avatar" alt="">
                                </div>
                                <div class="comment-form">
                                    <div class="comment-wrapper">
                                        <div class="comment-id"></div>
                                         <textarea class="comment_content" placeholder="请输入回复" maxlength="100"></textarea>

                                    </div>
                                    <div class="comment-content2">
                                        <span class="comment-wen">可输入&nbsp100&nbsp个字符</span>
                                        <input type="submit" class="comment-confirm" value="评论">
                                    </div>
                                </div>
                            `;

                        //!!!!!!!没有新增盒子
                        // commentReplyBox.innerHTML=commentReplyContent
                        // tempDiv1.appendChild(commentReplyBox)
                        const commentReplyTextareaBox=tempDiv1.querySelector('.comment-containBox')


                        //原有的内容是否为空（评论区）
                        console.log(commentReplyTextareaBox.innerHTML)
                        if(commentReplyTextareaBox.innerHTML==='') {
                            const commentReplyTextarea = document.createElement('div')
                            commentReplyTextarea.innerHTML = commentReplyContent
                            commentReplyTextarea.classList.add('comment-contain')
                            commentReplyTextareaBox.appendChild(commentReplyTextarea)

                            //点击评论事件（先判断评论输入的内容是否为空）
                            const commentConfirm=tempDiv.querySelector('.comment-confirm')
                            console.log(commentConfirm)
                            commentConfirm.addEventListener('click',event=>{
                                console.log('点击commentConfirm')
                                const commentContent=tempDiv.querySelector('.comment_content')
                                console.log('内容：'+commentContent.value)
                                if(commentContent.value!=''){
                                    //提交事件给后端，新增评论
                                    const commentCommentBox=tempDiv.querySelector('.comment-box')
                                    let article_id=localStorage.getItem('key')
                                    let receiver_id=commentCommentBox.querySelector('.comment-id').innerHTML
                                    let user_id=localStorage.getItem('id')
                                    let content=commentContent.value
                                    num++;
                                    let up_level=comment_id
                                    console.log("receiver_id:"+receiver_id+'article_id:'+article_id+"user_id:"+user_id+'content：'+content+'num:'+num+'up_level:'+up_level)
                                    axios({
                                        url:'/Blog/Comments/insertComments',
                                        method: 'post',
                                        params:{
                                            receiver_id,article_id,user_id,content,num,up_level
                                        }
                                    }).then(Result=>{
                                        console.log(Result)
                                        console.log(Result.data)
                                        let commentContent=Result.data


                                        //将刚刚评论的加到页面上，将评论框删除
                                        let time = commentContent.create_at;
                                        let date = new Date(time);
                                        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

                                        let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);
                                        const htmlContent1 = `
                                            <div class="comment-box">
                                                <div class="left">
                                                    <img src=${picture} class="comment-box-avatar" alt="">
                                                </div>
                                                <div class="left">
                                                    <span class="comment-nickname">${nickname}</span>
                                                    <span class="comment-reply-nickname"></span><br>
                                                    <span class="comment-element">${commentContent.content}</span>
                                                    <span class="comment-comment_id">${commentContent.id}</span><br>
                                                    <span class="comment-wen">发布于</span>
                                                    <span class="comment-time">${formattedDate}</span>
                                                    <span class="comment-id">${id}</span>
                                                </div>
                                                <div class="right">
                                                    <span class="comment-reply">回复</span>
                                                </div>
                                            </div>

                                            <div class="comment-containBox"></div>

                                            <div class="up_level-box"></div>
                                         `;

                                        const tempDiv1 = document.createElement('div');
                                        tempDiv1.classList.add('comment-boxes')
                                        let marginLeft
                                        if(num===1){
                                            marginLeft=0
                                        }
                                        else{
                                            marginLeft=40
                                        }

                                        let   widthBox=790
                                        tempDiv1.style.marginLeft=marginLeft+'px'
                                        tempDiv1.innerHTML = htmlContent1;
                                        const commentBoxContain1=tempDiv.querySelector('.up_level-box')
                                        commentBoxContain1.appendChild(tempDiv1);


                                        console.log(document.querySelector('.content-author-id').innerHTML)
                                        console.log(document.querySelector('.content-author-id').innerHTML!=commentContent.receiver_id)

                                        if(document.querySelector('.content-author-id').innerHTML!=commentContent.receiver_id){
                                            tempDiv1.querySelector('.comment-reply-nickname').innerHTML=`回复 ${commentContent.receiver_nickname}`
                                        }
                                        tempDiv1.querySelector('.comment-box').style.width=widthBox+'px'
                                        // tempDiv1.querySelector('.comment-reply-nickname').innerHTML=localStorage.getItem('nickname')
                                        // 如果是九级评论，就将回复隐藏
                                        console.log('commentContent.num'+commentContent.num)
                                        console.log('commentContent'+widthBox)
                                        console.log('commentContent'+tempDiv1.querySelector('.comment-box').style.width)
                                    //    if(commentContent.num===9){
                                    //        tempDiv1.querySelector('.comment-reply').style.display='none'
                                    //    }
                                        //接着将评论框区域删除
                                        commentContent.innerHTML=''
                                        const commentReplyBox = tempDiv1.querySelector('.comment-reply');
                                        console.log(commentReplyBox)
                                        //添加回复事件
                                        commentReplyBox.addEventListener('click',event=>{
                                            console.log('点击')
                                            console.log(commentContent.id)
                                            ReplyBox(tempDiv1,commentContent.id,commentContent.num)
                                        })
                                    })
                                }
                            })
                        }
                        else{
                            commentReplyTextareaBox.innerHTML=''
                        }
                    }
//comment-confirm1
                    const  commentReplyBox=document.querySelector('.comment-confirm1')
                    console.log(commentReplyBox)
                    commentReplyBox.addEventListener('click',event=>{
                        console.log(commentContent.id)
                        ReplyBox(tempDiv,commentContent.id,commentContent.num)

                    })
                }
            })

        })
    }
})

//监听区域的字数
const commentContent = document.querySelector('.comment_content1')
commentContent.addEventListener('input', function() {
    const inputText = commentContent.value;
    const inputLength = 100-inputText.length;
    document.querySelector('.comment-count1').innerHTML = inputLength+'';
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


//点击评论
document.querySelector('.detail-comment').addEventListener('click',function (event){
    if(document.querySelector('.comment-style').innerHTML==='<i class="comment outline icon outline-comment"></i>评论'){
        document.querySelector('.comment-style').innerHTML='<i class="comment icon outline-comment"></i>评论'
        document.querySelector('.comment-ccc').style.display=''

    }else{
        document.querySelector('.comment-style').innerHTML='<i class="comment outline icon outline-comment"></i>评论'
        document.querySelector('.comment-ccc').style.display='none'
    }
})


//点击举报文章
document.querySelector('.report-button').addEventListener('click',function (event){
    event.defaultPrevented;
    console.log('点击举报')
    const user_id=localStorage.getItem('id')
    const article_id=document.querySelector('.report-article_id').innerHTML
    const receive_id=document.querySelector('.report-user_id').innerHTML
    const report_content=document.querySelector('.report-content').value
    console.log(report_content)
    if(report_content!==''){
        //传到后端
        axios({
            url:'/Blog/Reports/insertReports',
            method: 'post',
            params:{
                user_id,
                article_id,
                receive_id,
                report_content
            }
        }).then(result=>{
            console.log(result)
            console.log(result.data);

            //清空举报框
            document.querySelector(".report-content").value=''
        })
    }
    else{
        console.log('输入为空')
        document.querySelector(".report-content").placeholder = "举报内容不能为空";
    }

})
