//判断有无token令牌
const token=localStorage.getItem('token')
if(!token){
    location.href='../Login.html'
}


const detailId=localStorage.getItem('detail-author-id')
const id=localStorage.getItem('id')
console.log(detailId)
let isFollow=false//是否关注该用户
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



//点击收藏按钮(显示收藏夹)
document.querySelector('.nav-collection').addEventListener('click',function (){
    console.log('点击收藏')
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')
    document.querySelector('.nav-collection').classList.add('active')
    //先清空，然后从数据库中读取收藏夹
    var targetElement = document.querySelector('.blog-box');
    targetElement.innerHTML = '';

    axios({
        url:'/Blog/Collects/selectCollectsByUserId',
        params:{
            user_id
        }
    }).then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach((item,index)=>{
            let contentBox = document.createElement('div');
            contentBox.classList.add('content-collect');
            let time=item.create_at
            // 将字符串解析为Date对象
            let date = new Date(time);
            // 定义日期格式化选项
            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            // 格式化日期
            let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);

            contentBox.innerHTML = `
            <table>
                <tr>
                    <td>
                        <span class="collect-name">${item.collectName}</span>
                        <span class="collect-id">${item.id}</span>
                    </td>
                    <td rowspan="2">
                        <span class="collect-update"><i class="edit icon"></i>更名</span>
                        <span class="collect-delete" type="button" data-bs-toggle="modal" data-bs-target=".my-box${item.id}"><i class="trash alternate icon"></i>删除</span>
                            <!--    弹框标签-->
                            <!--    bootstrap的modal弹框：添加modal类名（默认隐藏）-->
                            <div class="modal my-box${item.id}" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">提示框</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="modal-body-content">确认删除${item.collectName}吗？</div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary cancel-button">取消</button>
                                            <button type="button" class="btn btn-primary confirm-button">确认</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <span class="collect-zhan"><i class="angle down icon"></i>展开</span>
<!--                        输入框-->
                        <span class="input-box" id="inputBox">
                            <input type="text" id="textInput" placeholder="请输入更换的名字"/>
                            <button class="confirm">确定</button>
                         </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="collect-wen">创建于</span>
                        <span class="collect-time">${formattedDate}</span>
                    </td>
                </tr>
            </table>
            <div class="collect-article"></div>
            `;
            blogListContainer.appendChild(contentBox);
            if(item.collectName==='默认收藏夹'){
                document.querySelector('.collect-delete').style.display='none'
                document.querySelector('.collect-update').style.display='none'
                document.querySelector('.collect-zhan').style.marginLeft=200+'px'
            }
        })

    })
})
var parentElement = document.querySelector('.blog-box');

//(收藏按钮中)添加点击事件处理函数
parentElement.addEventListener('click', function(event) {
    if(document.querySelector('.content-collect')===null){
        console.log('进入')
        return
    }
    let collect_id=event.target.closest('.content-collect').querySelector('.collect-id').innerHTML

    console.log("收藏夹id；"+collect_id)
    //如果点击了更名按钮
    if (event.target.classList.contains('collect-update')) {
        console.log('点击了 collect-update 元素');
        var collectNameElement = event.target.closest('.content-collect').querySelector('.collect-name');
        var collectName = collectNameElement.textContent;
        console.log(collectName);
        // 切换到输入框模式
        event.target.closest('.content-collect').querySelector('#textInput').style.display = 'inline';
        event.target.closest('.content-collect').querySelector('.confirm').style.display = 'inline';
        event.target.closest('.content-collect').querySelector('#textInput').value = '';
    }
    //点击展示，打开下拉框
    if (event.target.classList.contains('collect-zhan')&&event.target.closest('.content-collect').querySelector('.collect-zhan').innerHTML==='<i class="angle down icon"></i>展开') {
        console.log('点击了 collect-zhan 元素');
        event.target.closest('.content-collect').querySelector('.collect-zhan').innerHTML = '<i class="angle up icon"></i>收起';
        //将收藏夹中的文章读取到页面上
        axios({
            url:'/Blog/CollectArticle/selectCollectArticleByCollectId',
            params:{
                id:collect_id
            }
        }).then(result => {
            console.log(result)
            console.log(result.data)
            //接下来加入文章盒子!!!!!!!!!!!!!!!
            if(result.data.length===0){
                let articleBox=event.target.closest('.content-collect').querySelector('.collect-article')
                articleBox.innerHTML='该收藏夹为空'
                event.target.closest('.content-collect').style.height=133+'px'
                articleBox.style.marginTop=20+'px'
                articleBox.style.marginLeft=26+'px'
            }
            else{
                //158px
                let H=77+168*result.data.length
                event.target.closest('.content-collect').style.height=H+'px'
                let blogListBox=event.target.closest('.content-collect').querySelector('.collect-article')
                result.data.forEach(blogData=>{
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
                        <div class="title-div"><h3>${blogData.title}</h3></div>
                          
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
                    blogListBox.appendChild(contentBox);
                })
            }
        })
    }
    else if(event.target.classList.contains('collect-zhan')&&event.target.closest('.content-collect').querySelector('.collect-zhan').innerHTML==='<i class="angle up icon"></i>收起'){
        console.log('点击了 collect-zhan 元素');
        event.target.closest('.content-collect').querySelector('.collect-zhan').innerHTML = '<i class="angle down icon"></i>展开';
        //将文章删除
        event.target.closest('.content-collect').style.height=77+'px'
        event.target.closest('.content-collect').querySelector('.collect-article').innerHTML = '';

    }
    //如果点击了删除元素中的确认
    if (event.target.classList.contains('confirm-button')) {
        console.log('点击了  confirm-button 元素');
        //向后端发送请求(先将收藏夹中的内容放到默认收藏夹中，然后删除这个收藏夹)
        //根据user_id在collects表中找到’默认收藏夹‘对应的collect_id2
        //然后删除在collects表中collect_id1对应的数据
        //然后在collect_article表中将前端传来的collect_id1更新为collect_id2
        axios({
            url:'/Blog/Collects/selectAndDeleteCollectsByUser_idAndCollect_id',
            params:{
                user_id,collect_id
            }
        }).then(result => {
            console.log(result)
            //将收藏夹的盒子删除
            var collectBox = event.target.closest('.content-collect');
            collectBox.remove();
            event.target.closest('.content-collect').querySelector('.btn-close').click()
        })

    }
    //如果点击了删除元素中的取消
    if(event.target.classList.contains('cancel-button')){
        console.log('点击了 confirm 元素')
        event.target.closest('.content-collect').querySelector('.btn-close').click()
    }
    //如果点击了更名中的确定
    if(event.target.classList.contains('confirm')){
        console.log('点击了 confirm 元素');
        let updateContent=event.target.closest('.content-collect').querySelector('#textInput')
        if(updateContent.value!==''){
            //更新数据库中的内容，并显示在页面上
            axios({
                url:'/Blog/Collects/updateCollectsByCollectNameAndCollect_id',
                method: 'post',
                params:{
                    collectName:updateContent.value,collect_id
                }
            }).then(result => {
                console.log(result)
                event.target.closest('.content-collect').querySelector('.collect-name').innerHTML=updateContent.value
                event.target.closest('.content-collect').querySelector('.collect-name').click()//相当于隐藏输入框
            })
        }
        else{
            updateContent.placeholder='更换的名字不能为空'
        }
    }
});
//(收藏按钮中)点击了其他地方，更名输入框消失
document.addEventListener('click', function(event) {
    const inputBoxes = document.querySelectorAll('#textInput');
    const confirmBoxes = document.querySelectorAll('.confirm');
    const updateBoxes = document.querySelectorAll('.collect-update');
    // 遍历每一对输入框和确认框
    for (let i = 0; i < inputBoxes.length; i++) {
        const inputBox = inputBoxes[i];
        const confirmBox = confirmBoxes[i];
        // 判断点击的目标元素是否位于当前输入框、确认框或更新框内部
        if (!inputBox.contains(event.target) && !confirmBox.contains(event.target)) {
            let isClickedOnUpdateBox = false;
            // 遍历每一个更新框
            for (let j = 0; j < updateBoxes.length; j++) {
                const updateBox = updateBoxes[j];
                if (updateBox.contains(event.target)) {
                    isClickedOnUpdateBox = true;
                    break;
                }
            }
            // 如果点击的目标元素不在任何一个更新框内，则隐藏当前输入框和确认框
            if (!isClickedOnUpdateBox) {
                inputBox.style.display = 'none';
                confirmBox.style.display = 'none';
            }
        }
    }
});



//点击专栏按钮（显示专栏）
document.querySelector('.nav-column').addEventListener('click',function () {
    console.log('点击专栏')
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')
    document.querySelector('.nav-column').classList.add('active')
    //先清空，然后从数据库中读取专栏名
    var targetElement = document.querySelector('.blog-box');
    targetElement.innerHTML = '';

    axios({
        url:'/Blog/Columns/ObtainColumnTest',
        params:{
            user_id
        }
    }).then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach((item,index)=>{
            console.log("index:"+index)
            let contentBox = document.createElement('div');
            contentBox.classList.add('content-column');
            let time=item.create_at
            // 将字符串解析为Date对象
            let date = new Date(time);
            // 定义日期格式化选项
            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            // 格式化日期
            let formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date);

            contentBox.innerHTML = `
            <table>
                <tr>
                    <td>
                        <span class="column-name">${item.columnName}</span>
                        <span class="column-id">${item.id}</span>
                    </td>
                    <td rowspan="2">
                        <span class="column-update"><i class="edit icon"></i>更名</span>
                        <span class="column-delete" type="button" data-bs-toggle="modal" data-bs-target=".my-Box${item.id}"><i class="trash alternate icon"></i>删除</span>
                            <!--    弹框标签-->
                            <!--    bootstrap的modal弹框：添加modal类名（默认隐藏）-->
                            <div class="modal my-Box${item.id}" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">提示框</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="modal-body-content">确认删除${item.columnName}吗？</div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary cancel-button">取消</button>
                                            <button type="button" class="btn btn-primary confirm-button">确认</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <span class="column-zhan"><i class="angle down icon"></i>展开</span>
<!--                        输入框-->
                        <span class="input-box" id="inputBox">
                            <input type="text" id="textInput-column" placeholder="请输入更换的名字"/>
                            <button class="confirm-column">确定</button>
                         </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="column-wen">更新于</span>
                        <span class="column-time">${formattedDate}</span>
                    </td>
                </tr>
            </table>
            <div class="column-article"></div>
            `;
            blogListContainer.appendChild(contentBox);
            if(index===0){
                document.querySelector('.column-delete').style.display='none'
            }
        })

    })
})
//(专栏按钮中)添加点击事件处理函数
parentElement.addEventListener('click', function(event) {
    if(document.querySelector('.content-column')===null){
        console.log('进入')
        return
    }
    let column_id = event.target.closest('.content-column').querySelector('.column-id').innerHTML
    console.log("专栏id；" + column_id)
    //如果点击了更名按钮
    if (event.target.classList.contains('column-update')) {
        console.log('点击了 column-update 元素');
        var columnNameElement = event.target.closest('.content-column').querySelector('.column-name');
        var columnName = columnNameElement.textContent;
        console.log(columnName);
        // 切换到输入框模式
        event.target.closest('.content-column').querySelector('#textInput-column').style.display = 'inline';
        event.target.closest('.content-column').querySelector('.confirm-column').style.display = 'inline';
        event.target.closest('.content-column').querySelector('#textInput-column').value = '';
    }
    //点击展示，打开下拉框
    if (event.target.classList.contains('column-zhan')&&event.target.closest('.content-column').querySelector('.column-zhan').innerHTML==='<i class="angle down icon"></i>展开') {
        console.log('点击了 column-zhan 元素');
        event.target.closest('.content-column').querySelector('.column-zhan').innerHTML = '<i class="angle up icon"></i>收起';
        //将收藏夹中的文章读取到页面上
        axios({
            url:'/Blog/ColumnArticle/selectColumnArticleByColumnId',
            params:{
                id:column_id
            }
        }).then(result => {
            console.log(result)
            console.log(result.data)
            //接下来加入文章盒子!!!!!!!!!!!!!!!
            if(result.data.length===0){
                let articleBox=event.target.closest('.content-column').querySelector('.column-article')
                articleBox.innerHTML='该专栏为空'
                event.target.closest('.content-column').style.height=133+'px'
                articleBox.style.marginTop=20+'px'
                articleBox.style.marginLeft=26+'px'
            }
            else{
                //158px
                let H=77+168*result.data.length
                event.target.closest('.content-column').style.height=H+'px'
                let blogListBox=event.target.closest('.content-column').querySelector('.column-article')
                result.data.forEach(blogData=>{
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
                        <div class="title-div"><h3>${blogData.title}</h3></div>
                          
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
                    blogListBox.appendChild(contentBox);
                })
            }
        })
    }
    else if(event.target.classList.contains('column-zhan')&&event.target.closest('.content-column').querySelector('.column-zhan').innerHTML==='<i class="angle up icon"></i>收起'){
        console.log('点击了 column-zhan 元素');
        event.target.closest('.content-column').querySelector('.column-zhan').innerHTML = '<i class="angle down icon"></i>展开';
        //将文章删除
        event.target.closest('.content-column').style.height=77+'px'
        event.target.closest('.content-column').querySelector('.column-article').innerHTML = '';
    }
    //点击删除
    if (event.target.classList.contains('confirm-button')) {
        let column_id1=event.target.closest('.content-column').querySelector('.column-id').innerHTML
        let column_id2=document.querySelector('.column-id').innerHTML
        console.log(column_id1+":"+column_id2)
        console.log('点击了  confirm-button 元素');
        //向后端发送请求(先找到属于这个分类的文章id)
        //根据这个文章id，从column_article表中找这篇文章是否还属于其他分类
        //选择该用户的第一个分类作为默认分类（collect_id2）
        //如果有，则进行下一步
        //如果删除该分类没有其他分类了，则更新column_article表中的内容，将表中所有collect_id1更新为collect_id2
        axios({
            url:'/Blog/ColumnArticle/selectAndDeleteColumnArticleByUser_idAndCollect_id',
            params:{
                user_id,column_id1,column_id2
            }
        }).then(result => {
            console.log(result)
            //将专栏的盒子删除
            var collectBox = event.target.closest('.content-column');
            collectBox.remove();
            event.target.closest('.content-column').querySelector('.btn-close').click()
        })

    }
    //如果点击了删除元素中的取消
    if(event.target.classList.contains('cancel-button')){
        console.log('点击了 cancel-button 元素')
        event.target.closest('.content-column').querySelector('.btn-close').click()
    }
})
//(专栏按钮中)点击了其他地方，更名输入框消失
document.addEventListener('click', function(event) {
    const inputBoxes = document.querySelectorAll('#textInput-column');
    const confirmBoxes = document.querySelectorAll('.confirm-column');
    const updateBoxes = document.querySelectorAll('.column-update');
    // 遍历每一对输入框和确认框
    for (let i = 0; i < inputBoxes.length; i++) {
        const inputBox = inputBoxes[i];
        const confirmBox = confirmBoxes[i];
        // 判断点击的目标元素是否位于当前输入框、确认框或更新框内部
        if (!inputBox.contains(event.target) && !confirmBox.contains(event.target)) {
            let isClickedOnUpdateBox = false;
            // 遍历每一个更新框
            for (let j = 0; j < updateBoxes.length; j++) {
                const updateBox = updateBoxes[j];
                if (updateBox.contains(event.target)) {
                    isClickedOnUpdateBox = true;
                    break;
                }
            }
            // 如果点击的目标元素不在任何一个更新框内，则隐藏当前输入框和确认框
            if (!isClickedOnUpdateBox) {
                inputBox.style.display = 'none';
                confirmBox.style.display = 'none';
            }
        }
    }
});


//如果点击了关注（查看关注列表）
document.querySelector('.nav-follow').addEventListener('click',function () {
    console.log('点击关注')
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')
    document.querySelector('.nav-follow').classList.add('active')
    //先清空，然后从数据库中读取专栏名
    var targetElement = document.querySelector('.blog-box');
    targetElement.innerHTML = '';
    axios({
        url:'/Blog/Follows/selectFollowsByFans_id',
        params:{
            user_id
        }
    }).then(result => {
        console.log(result)
        console.log(result.data)

        //将用户列表打印在页面
        result.data.forEach((item,index)=> {
            //判断从localStock读出来的id是否关注了该用户（item.id）
            let id=localStorage.getItem('id');
            let isFollowed=false
             axios({
                url: '/Blog/Follows/selectFollowsByBlogger_idAndFans_id',
                params: {
                    fans_id: id,
                    blogger_id: item.id
                }
             }).then(result1=>{
                 console.log(result1.data);
                 console.log(result1);
                 console.log("index:" + index)
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
                 blogListContainer.appendChild(contentBox);
                 if (result1.data == 1){
                     const bloggerFollow = contentBox.querySelector('.blogger-follow');
                     bloggerFollow.innerHTML = '已关注';
                     bloggerFollow.classList.add('cccBackground');
                 }
             })
        })
    })
})
//(关注按钮中)添加点击事件的处理函数
parentElement.addEventListener('click', function(event) {
    if (document.querySelector('.content-blogger') === null) {
        console.log('进入')
        return
    }
    if(event.target.classList.contains('blogger-follow')){
        const bloggerFollow =event.target.closest('.content-blogger').querySelector('.blogger-follow')
        let blogger_id=event.target.closest('.content-blogger').querySelector('.blogger-id').innerHTML
        let fans_id=localStorage.getItem("id")
        if (bloggerFollow.classList.contains('cccBackground')) {
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
                bloggerFollow.innerHTML='<i class="plus circle icon"></i>关注'
                bloggerFollow.classList.remove('cccBackground');
            })
        }
        else{
            axios({
                url:'/Blog/Follows/insertFollowsByBlogger_idAndFans_id',
                method: 'post',
                params:{
                    fans_id,blogger_id
                }
            }).then(result => {
                console.log(result)
                console.log(result.data)
                bloggerFollow.innerHTML='已关注'
                bloggerFollow.classList.add('cccBackground');
            })
        }
    }
})


//如果点击粉丝
document.querySelector('.nav-fan').addEventListener('click',function () {
    console.log('点击关注')
    const spanElement = document.querySelector('.nav .active');
    spanElement.classList.remove('active');
    spanElement.classList.add('ordinary')
    document.querySelector('.nav-fan').classList.add('active')
    //先清空，然后从数据库中读取
    var targetElement = document.querySelector('.blog-box');
    targetElement.innerHTML = '';
    axios({
        url:'/Blog/Follows/selectFollowsByBlogger_id',
        params:{
            user_id
        }
    }).then(result => {
        console.log(result)
        console.log(result.data)

        //将用户列表打印在页面
        result.data.forEach((item,index)=> {
            //判断从localStock读出来的id是否关注了该用户（item.id）
            let id=localStorage.getItem('id');
            let isFollowed=false
            axios({
                url: '/Blog/Follows/selectFollowsByBlogger_idAndFans_id',
                params: {
                    fans_id: item.id,
                    blogger_id: id
                }
            }).then(result1=>{
                console.log(result1.data);
                console.log(result1);
                console.log("index:" + index)
                let contentBox = document.createElement('div');
                contentBox.classList.add('content-fan');
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
                                <img src="${item.picture}" class="fan-avatar" alt=""> 
                            </td>
                            <td class="center">
                                <span class="fan-name">${item.nickname}</span>
                                <span class="fan-id">${item.id}</span>
                            </td>
                            <td rowspan="2" class="right">
                                <span class="fan-follow"><i class="plus circle icon"></i>回关</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="fan-profile">${item.profile}</span>
                            </td>
                        </tr>
                    </table>
                    `;
                blogListContainer.appendChild(contentBox);
                if (result1.data == 1){
                    const fanFollow = contentBox.querySelector('.fan-follow');
                    fanFollow.innerHTML = '已关注';
                    fanFollow.classList.add('cccBackground');
                }
            })
        })
    })
})
//(粉丝按钮中)添加点击事件的处理函数
parentElement.addEventListener('click', function(event) {
    if (document.querySelector('.content-fan') === null) {
        console.log('进入')
        return
    }
    if(event.target.classList.contains('fan-follow')){
        const fanFollow =event.target.closest('.content-fan').querySelector('.fan-follow')
        let fans_id=event.target.closest('.content-fan').querySelector('.fan-id').innerHTML
        let blogger_id=localStorage.getItem("id")
        if (fanFollow.classList.contains('cccBackground')) {
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
                fanFollow.innerHTML='<i class="plus circle icon"></i>关注'
                fanFollow.classList.remove('cccBackground');
            })
        }
        else{
            axios({
                url:'/Blog/Follows/insertFollowsByBlogger_idAndFans_id',
                method: 'post',
                params:{
                    fans_id,blogger_id
                }
            }).then(result => {
                console.log(result)
                console.log(result.data)
                fanFollow.innerHTML='已关注'
                fanFollow.classList.add('cccBackground');
            })
        }
    }
})

//页面加载
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

            let fans_id=localStorage.getItem('id')
            //该用户是否已经关注该博主
            axios({
                url:'/Blog/Follows/selectFollowsByBlogger_idAndFans_id',
                method:'GET',
                params:{
                    fans_id,blogger_id:detailId
                }
            }).then(result => {
                console.log(result)
                console.log(result.data)
                if(result.data===1){
                    isFollow=!isFollow
                    document.querySelector('.follow-button').classList.add('followed')
                    document.querySelector('.follow-button').innerHTML='已关注'
                }
            })
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
if(document.querySelector('.blog-box')!==null){
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
}


//点击编辑文章
if(document.querySelector('.blog-box')!==null){
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


//点击关注
document.querySelector('.follow-button').addEventListener('click',function (){
    let fans_id=localStorage.getItem('id')
    if(isFollow){
        axios({
            url:'/Blog/Follows/deleteFollowsByBlogger_idAndFans_id',
            method: 'post',
            params:{
                blogger_id:detailId,fans_id
            }
        }).then(result=>{
            document.querySelector('.follow-button').classList.remove('followed')
            document.querySelector('.follow-button').innerHTML='<i class="plus icon"></i>关注'
            isFollow=!isFollow
        })
    }
    else{
        axios({
            url:'/Blog/Follows/insertFollowsByBlogger_idAndFans_id',
            method: 'post',
            params:{
                blogger_id:detailId,fans_id
            }
        }).then(result=>{
            document.querySelector('.follow-button').classList.add('followed')
            document.querySelector('.follow-button').innerHTML='已关注'
            isFollow=!isFollow
        })
    }

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







