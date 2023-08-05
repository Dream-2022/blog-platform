document.querySelector('.content-input').value=localStorage.getItem("search")
console.log(localStorage.getItem("search"))
//搜索文章并插入的函数
function addArticles(content){
    console.log('要搜索的内容是：'+content)
    axios({
        url: '/Blog/Articles/likeSelectArticles',
        method: 'get',
        params:{
            content,
        }
    }).then(result => {
        console.log(result)
        let articles=result.data
        var targetElement = document.querySelector('.container-content');
        targetElement.innerHTML = '';

        let sum=0;
        articles.forEach(item=>{
            sum++;
            if(item.avatar===""){
                item.avatar="../image/cat.jpeg"
            }
            var contentBoxHTML = `
                <div class="content-box">
                    <table>
                        <tr>
                            <td rowspan="2"><img src=${item.avatar} class="content-image" alt=""></td>
                            <td>
                                <h3>${item.title}</h3>
                                <span class="content-span">${item.plainText}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="content-view"><i class="eye icon"></i>浏览量</span><span class="content-viewCount">${item.view}</span>
                                <span><i class="thumbs up icon"></i>点赞</span><span class="content-give">${item.give}</span>
                                <span><i class="star icon"></i> 收藏</span><span class="content-collect">${item.collect}</span>
                                <span class="content-id">${item.id}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            `;
            // 使用 jQuery 将 HTML 结构插入到目标元素中
            var container = document.createElement('div');
            // 将 HTML 结构赋值给容器的 innerHTML
            container.innerHTML = contentBoxHTML;
            // 获取目标盒子元素
            var targetElement = document.querySelector('.container-content');
            // 将新创建的内容插入到目标盒子中
            targetElement.appendChild(container);
        })
        if(sum===0){
            var black=`
                      <div class="black">
                          未找到相关文章
                      </div>
                     `;
            // 使用 jQuery 将 HTML 结构插入到目标元素中
            var container = document.createElement('div');
            // 将 HTML 结构赋值给容器的 innerHTML
            container.innerHTML = black;
            // 获取目标盒子元素
            var Element = document.querySelector('.container-content');
            // 将新创建的内容插入到目标盒子中
            Element.appendChild(container);
        }
    })
}
window.addEventListener('DOMContentLoaded', function(){
    let content=localStorage.getItem("search")

    let searchLet=localStorage.getItem('searchLet')
    console.log(searchLet)
    if(searchLet!==null){
        localStorage.removeItem('searchLet')
        document.querySelector('.search-label').click()
    }
    else{
        addArticles(content)
    }
})

//如果点击文章搜索
document.querySelector('.search-article').addEventListener('click',function (){
    const spanElement = document.querySelector('.active');
    spanElement.classList.remove('active');
    document.querySelector('.search-article').classList.add('active')
    document.querySelector('.content-button').innerHTML='搜索文章'
    let content=document.querySelector('.content-input').value
    console.log('search'+content)
    if(content===''){
        document.querySelector('.content-input').setAttribute('placeholder', '查找内容不能为空');
    }
    else{
        localStorage.setItem('search',content)
        addArticles(content)
    }

})
//如果点击用户搜索
document.querySelector('.search-user').addEventListener('click',function (){
    const spanElement = document.querySelector('.active');
    spanElement.classList.remove('active');
    document.querySelector('.search-user').classList.add('active')
    document.querySelector('.content-button').innerHTML='搜索用户'
    //按照输入框的内容进行搜索，先判断是否为空
    const contentInput=document.querySelector('.content-input')
    if(contentInput.value===''){
        contentInput.setAttribute('placeholder', '查找内容不能为空');
    }
    else{
        localStorage.setItem('search',contentInput.value)
        //根据输入框中的内容查找
        axios({
            url: '/Blog/user/likeSelectUsers',
            method: 'get',
            params:{
                content:contentInput.value
            }
        }).then(result => {
            console.log(result)
            console.log(result.data)
            //先清空
            document.querySelector('.container-content').innerHTML=''
            //将搜索到的用户加入页面
            const boxContain=document.querySelector('.container-content')
            if(result.data.length!==0){
                result.data.forEach(item=>{
                    //找到用户的原创个数，按照state和数量
                    axios({
                        url: '/Blog/Articles/selectArticleByUser_id',
                        method: 'get',
                        params:{
                            user_id:item.id
                        }
                    }).then(result1 => {
                        console.log(result1)
                        console.log(result1.data)

                        let contentBox = document.createElement('div');
                        contentBox.classList.add('content-blogger');
                        if(item.picture===""){
                            item.picture='../image/headSculpture.jpeg'
                        }else{
                            item.picture='/upload/'+item.picture
                        }
                        if(item.profile===''){
                            item.profile='这个人很懒，什么都没有写...'
                        }
                        contentBox.innerHTML = `
                        <table>
                            <tr>
                                <td rowspan="2" >
                                    <img src="${item.picture}" class="blogger-avatar" alt=""> 
                                </td>
                                <td class="center">
                                    <span class="blogger-name">${item.nickname}</span>
                                    <span class="blogger-wen">原创:</span>
                                    <span class="blogger-original">${result1.data}</span>
                                    <span class="blogger-id">${item.id}</span>
                                </td>
                                <td rowspan="2" class="right">
                                    <span class="blogger-follow"><i class="plus circle icon"></i>关注</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="blogger-profile">${item.profile}</span>
                                </td>
                            </tr>
                        </table>
                        <div class="column-article"></div>
                        `;
                        boxContain.appendChild(contentBox);

                        let fans_id=localStorage.getItem('id')
                        //判断是否关注用户
                        //如果搜到的用户是自己，不用显示是否关注
                        axios({
                            url: '/Blog/Follows/selectFollowsByBlogger_idAndFans_id',
                            params: {
                                fans_id,
                                blogger_id: item.id
                            }
                        }).then(result2=> {
                            console.log(result2.data);
                            console.log(result2);
                            if (result1.data == 1){
                                const bloggerFollow = contentBox.querySelector('.blogger-follow');
                                bloggerFollow.innerHTML = '已关注';
                                bloggerFollow.classList.add('cccBackground');
                            }
                            //如果搜索的是自己，隐藏关注字样
                            console.log(fans_id+":"+item.id)
                            if(fans_id==item.id){
                                contentBox.querySelector('.blogger-follow').style.display='none'
                            }
                        })

                    })


                })
            }
            //如果没有用户就显示未搜索到用户
            else{
                console.log('没有找到用户')
                let contentBox = document.createElement('div');
                contentBox.classList.add('black')
                contentBox.innerHTML = `<span>没有找到相关用户</span>`
                boxContain.appendChild(contentBox);
            }
        })
    }
})


//如果点击标签搜索
document.querySelector('.search-label').addEventListener('click',function (){
    const spanElement = document.querySelector('.active');
    spanElement.classList.remove('active');
    document.querySelector('.search-label').classList.add('active')
    document.querySelector('.content-button').innerHTML='搜索标签'
    //按照输入框的内容进行搜索，先判断是否为空
    const contentInput=document.querySelector('.content-input')
    if(contentInput.value===''){
        contentInput.setAttribute('placeholder', '查找内容不能为空');
    }
    else{
        localStorage.setItem('search',contentInput.value)
        //根据输入框中的内容查找
        axios({
            url: '/Blog/LabelArticle/likeSelectLabelArticle',
            method: 'get',
            params:{
                content:contentInput.value
            }
        }).then(result => {
            console.log(result)
            console.log(result.data)
            //先清空
            document.querySelector('.container-content').innerHTML=''

            result.data.forEach(item=>{
                if(item.avatar===""){
                    item.avatar="../image/cat.jpeg"
                }
                var contentBoxHTML = `
                    <div class="content-box">
                        <table>
                            <tr>
                                <td rowspan="2"><img src=${item.avatar} class="content-image" alt=""></td>
                                <td>
                                    <h3>${item.title}</h3>
                                    <span class="content-span">${item.plainText}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="content-view"><i class="eye icon"></i>浏览量</span><span class="content-viewCount">${item.view}</span>
                                    <span><i class="thumbs up icon"></i>点赞</span><span class="content-give">${item.give}</span>
                                    <span><i class="star icon"></i> 收藏</span><span class="content-collect">${item.collect}</span>
                                    <span class="content-id">${item.id}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                `;
                // 使用 jQuery 将 HTML 结构插入到目标元素中
                var container = document.createElement('div');
                // 将 HTML 结构赋值给容器的 innerHTML
                container.innerHTML = contentBoxHTML;
                // 获取目标盒子元素
                var targetElement = document.querySelector('.container-content');
                // 将新创建的内容插入到目标盒子中
                targetElement.appendChild(container);
            })
            if(result.data.length===0){
                console.log('没有找到标签')
                let contentBox = document.createElement('div');
                contentBox.classList.add('black')
                contentBox.innerHTML = `<span>没有找到相关标签对应的文章</span>`
                const boxContain=document.querySelector('.container-content')
                boxContain.appendChild(contentBox);
            }
        })
    }
})


//如果点击用户//如果点击文章
document.querySelector('.container-content').addEventListener('click', function(event) {
    // 检查点击的元素是否为 content-box 盒子
    if (event.target.closest('.content-blogger')&&!event.target.closest('.blogger-follow')) {
        var contentBox = event.target.closest('.content-blogger');
        var contentId = contentBox.querySelector('.blogger-id');
        var text = contentId.innerHTML;
        console.log('text:'+text)
        // 执行需要的操作，比如向后端发送请求，更新数据库等
        localStorage.setItem("detail-author-id", text);
        window.location.href = "Detail.html";
    }
    //如果点击关注
    if(event.target.closest('.blogger-follow')){
        const followButton=document.querySelector('.blogger-follow')
        let fans_id=localStorage.getItem('id')
        let blogger_id=event.target.closest('.content-blogger').querySelector('.blogger-id').innerHTML
        if(followButton.classList.contains('cccBackground')){
            //取消关注
            document.querySelector('.blogger-follow').classList.remove('cccBackground')
            // 含有类名 'cccBackground'
            console.log('包含类名 cccBackground');

            //删除对应的关注关系
            axios({
                url:'/Blog/Follows/deleteFollowsByBlogger_idAndFans_id',
                method: 'post',
                params:{
                    fans_id,blogger_id
                }
            }).then(result => {
                console.log(result)
                console.log(result.data)
                followButton.innerHTML = '<i class="plus circle icon"></i>关注'
                followButton.classList.remove('cccBackground');
            })
        }
        else{
            //添加关注
            axios({
                url:'/Blog/Follows/insertFollowsByBlogger_idAndFans_id',
                method: 'post',
                params:{
                    fans_id,blogger_id
                }
            }).then(result => {
                console.log(result)
                console.log(result.data)
                followButton.innerHTML = '已关注'
                document.querySelector('.blogger-follow').classList.add('cccBackground')
            })
        }
    }
    //点击文章盒子
    if(event.target.closest('.content-box')){
        let article_id=event.target.closest('.content-box').querySelector('.content-id').innerHTML
        localStorage.setItem('key',article_id)
        window.location.href = "BlogPage.html";

    }
});

//如果点击搜索
document.querySelector('.content-button').addEventListener('click',function (){
    let content=document.querySelector('.content-input').value
    if(content===''){
        document.querySelector('.content-input').setAttribute('placeholder', '查找内容不能为空');
        return
    }
    localStorage.setItem("search",content)
    console.log(content)
    const searchButton=document.querySelector('.content-button').textContent
    console.log(searchButton)
    if(searchButton==='搜索文章'){
        addArticles(content)
    }
    if(searchButton==='搜索用户'){
        document.querySelector('.search-user').click()
    }
    if(searchButton==='搜索标签'){
        document.querySelector('.search-label').click()
    }



})


