
//文章管理--------------------------------
function addArticleOne(result1,item){
    console.log(result1)
    console.log(result1.data)
    const dateObject = new Date(item.release_at);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedDateString = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;

    const commentReplyContent = `
                      <span class="table-tou">${item.title}</span>
                      <span class="table-user">${result1.data.username}</span>
                      <span class="table-textarea">${item.textarea}</span>
                      <span class="table-release_at">${formattedDateString}</span>
                      <span class="table-id">${item.id}</span>
                      <span class="table-shen">
                          <span class="access">通过</span>
                          <span class="accessFail">未通过</span>
                      </span>
                `;
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('table')
    tempDiv.innerHTML = commentReplyContent;
    const articlesBox = document.querySelector('.articles-box');
    articlesBox.appendChild(tempDiv);
    return tempDiv
}

//获取文章，相当于点击未审核
function ObtainArticle(){
    //从数据库article表中获取所有发布的文章
    axios({
        url: '/Blog/Articles/selectArticleByStateUnpublished',
        method: 'get'
    }).then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach(item=>{
            console.log(item)
            //通过作者id找到作者username
            let user_id=item.user_id
            axios({
                url: '/Blog/user/selectUserById',
                method: 'get' ,
                params:{
                    id:user_id
                }
            }).then(result1 => {
                console.log(result1)
                console.log(result1.data)
                const tempDiv=addArticleOne(result1,item)
                //点击审核通过和不通过按钮
                tempDiv.querySelector('.access').addEventListener('click',function (){
                    console.log('点击通过：'+item.title)
                    //修改article文章中的‘未审核’->‘发布’
                    let article_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                    console.log(article_id)
                    axios({
                        url: '/Blog/Articles/updateArticleByArticle_idForState',
                        method: 'post',
                        params:{
                            article_id:article_id,
                            state:'发布'
                        }
                    }).then(result2 => {
                        console.log(result2)
                        const accessBox=document.querySelector('.alert')
                        console.log(accessBox)
                        accessBox.innerHTML='审核通过'
                        accessBox.classList.remove('display')
                        //将盒子移除
                        event.target.closest('.table').innerHTML=''
                        setTimeout(()=>
                        {
                            accessBox.classList.add('display')

                        },2000)
                    })
                })
                tempDiv.querySelector('.accessFail').addEventListener('click',function (){
                    console.log('点击未通过：'+item.title)
                    //修改article文章中的‘未审核’->‘未通过’
                    let article_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                    console.log(article_id)
                    axios({
                        url: '/Blog/Articles/updateArticleByArticle_idForState',
                        method: 'post',
                        params:{
                            article_id:article_id,
                            state:'未通过'
                        }
                    }).then(result2 => {
                        console.log(result2)
                        const accessBox=document.querySelector('.alertFail')
                        console.log(accessBox)
                        accessBox.innerHTML='审核未通过'
                        accessBox.classList.remove('display')
                        tempDiv.style.display='none'

                        setTimeout(()=>
                        {
                            console.log('审核未通过')
                            accessBox.classList.add('display')
                        },2000)
                    })
                })
            })

        })
    })
}
window.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.headSculpture').src='/upload/'+localStorage.getItem('picture')
    ObtainArticle()
    const selectLabel=document.querySelector('.select-label')
    //读取标签
    axios({
        url: '/Blog/Labels/ObtainLabelTest',
        method: 'get'
    })
        .then(result => {
        console.log(result)
        console.log(result.data)
        //将所有标签加入标签栏
        result.data.forEach(labelIt=>{
            console.log(labelIt)
            let name=labelIt.labelName
            const label = document.createElement('option');
            console.log('加上:::'+name)
            label.name = `${labelIt.id}`;
            label.value = `${labelIt.id}`;
            // 设置 label 文本内容
            label.textContent = `${name}`;
            selectLabel.appendChild(label);

        })
    })

    //读取年份
    axios({
        url: '/Blog/Articles/MainPageTest',
        method: 'get'
    })
        .then(result => {
        console.log(result)
        console.log(result.data)
        //加载年的下拉框
        // 根据从后端获取到的数据动态生成选项
        result.data.forEach(tag => {
            const label = document.createElement('option');
            const tagContainer=document.querySelector('.select-year')
            let tagList=tagContainer.querySelectorAll('option')
            //找年份
            console.log(tag)
            console.log(tag.release_at)
            var date = new Date(tag.release_at);
            var year = date.getFullYear();
            console.log(year);

            let flag=1;
            //然后判断有没有重复的
            console.log(tagList)
            for (let i = 0; i < tagList.length; i++) {
                const name = tagList[i].value;
                console.log(name+year);
                if(name==year){
                    flag=0;
                }
            }

            if(flag===1){
                console.log('加上'+year)
                label.name = `${year}`;
                label.value = `${year}`; // 用年作为 value
                // 设置 label 文本内容
                label.textContent = `${year}`;
                tagContainer.appendChild(label);
            }

        });
    })


})

//点击未审核按钮
document.querySelector('.unpublished').addEventListener('click',function (){
    axios({
        url: '/Blog/Articles/selectArticleByStateUnpublished',
        method: 'get'
    }).then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach(item=>{
            console.log(item)
            //通过作者id找到作者username
            let user_id=item.user_id
            axios({
                url: '/Blog/user/selectUserById',
                method: 'get' ,
                params:{
                    id:user_id
                }
            }).then(result1 => {
                console.log(result1)
                console.log(result1.data)
                const dateObject = new Date(item.release_at);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const day = dateObject.getDate();
                const hours = dateObject.getHours();
                const minutes = dateObject.getMinutes();
                const seconds = dateObject.getSeconds();
                const formattedDateString = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;

                const commentReplyContent = `
                      <span class="table-tou">${item.title}</span>
                      <span class="table-user">${result1.data.username}</span>
                      <span class="table-textarea">${item.textarea}</span>
                      <span class="table-release_at">${formattedDateString}</span>
                      <span class="table-id">${item.id}</span>
                      <span class="table-shen">
                          <span class="access">通过</span>
                          <span class="accessFail">未通过</span>
                      </span>
                `;
                const tempDiv = document.createElement('div');
                tempDiv.classList.add('table')
                tempDiv.innerHTML = commentReplyContent;
                const articlesBox = document.querySelector('.articles-box');
                articlesBox.appendChild(tempDiv);

                //点击审核通过和不通过按钮
                tempDiv.querySelector('.access').addEventListener('click',function (){
                    console.log('点击通过：'+item.title)
                    //修改article文章中的‘未审核’->‘发布’
                    let article_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                    console.log(article_id)
                    axios({
                        url: '/Blog/Articles/updateArticleByArticle_idForState',
                        method: 'post',
                        params:{
                            article_id:article_id,
                            state:'发布'
                        }
                    }).then(result2 => {
                        console.log(result2)
                        const accessBox=document.querySelector('.alert')
                        console.log(accessBox)
                        accessBox.classList.remove('display')
                        //将盒子移除
                        event.target.closest('.table').innerHTML=''
                        setTimeout(()=>
                        {
                            accessBox.classList.add('display')

                        },2000)
                    })
                })
                tempDiv.querySelector('.accessFail').addEventListener('click',function (){

                    console.log('点击未通过：'+item.title)
                    //修改article文章中的‘未审核’->‘未通过’
                    let article_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                    console.log(article_id)
                    axios({
                        url: '/Blog/Articles/updateArticleByArticle_idForState',
                        method: 'post',
                        params:{
                            article_id:article_id,
                            state:'未通过'
                        }
                    }).then(result2 => {
                        console.log(result2)
                        const accessBox=document.querySelector('.alertFail')
                        console.log(accessBox)
                        accessBox.classList.remove('display')
                        event.target.closest('.table').innerHTML=''

                        setTimeout(()=>
                        {
                            accessBox.classList.add('display')
                        },2000)
                    })
                })
                //点击文章盒子
                tempDiv.addEventListener('click', function(event) {
                    console.log('点击')
                    // 判断是否点击了 .unAccessUser，如果是，则不进行后续操作
                    if (event.target.classList.contains('access')||event.target.classList.contains('access')) {
                        return;
                    }
                    const article_id = event.currentTarget.querySelector('.table-id').innerHTML;
                    localStorage.setItem('key', article_id);
                    window.location.href = "BlogPage.html";
                });
            })

        })
    })
})

function addUnPublish(result1,item){
    const dateObject = new Date(item.release_at);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedDateString = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;

    const commentReplyContent = `
                      <span class="table-tou">${item.title}</span>
                      <span class="table-user">${result1.data.username}</span>
                      <span class="table-textarea">${item.textarea}</span>
                      <span class="table-release_at">${formattedDateString}</span>
                      <span class="table-id">${item.id}</span>
                      <span class="table-shen">
                          <span class="delete">删除</span>
                      </span>
                `;
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('table')
    tempDiv.innerHTML = commentReplyContent;
    const articlesBox = document.querySelector('.articles-box');
    articlesBox.appendChild(tempDiv);

    //如果点击了删除按钮，将文章状态改为删除
    tempDiv.querySelector('.delete').addEventListener('click',function (event){
        const deleteBox=event.target.closest('.table').querySelector('.table-id')
        console.log(deleteBox.innerHTML)
        const article_id=deleteBox.innerHTML
        //从数据库中将该文章的state的字段改为删除
        axios({
            url: '/Blog/Articles/updateArticleByArticle_idForState',
            method: 'post',
            params:{
                article_id:article_id,
                state:'删除'
            }
        }).then(result2 => {
            console.log(result2)
            console.log(result2.data)
            //将盒子移除
            event.target.closest('.table').innerHTML=''
            //展示弹窗
            const accessBox=document.querySelector('.alert')
            console.log(accessBox)
            console.log(accessBox.innerHTML)
            accessBox.innerHTML='删除成功'
            accessBox.classList.remove('display')
            setTimeout(()=>
            {
                accessBox.classList.add('display')

            },2000)
        })
    })
}
//如果点击了发布按钮
document.querySelector('.published').addEventListener('click',function (){
    document.querySelector('.active').classList.remove('active')
    document.querySelector('.published').classList.add('active')
    //将原有内容清空
    document.querySelector('.articles-box').innerHTML=''
    //加上盒子
    axios({
        url: '/Blog/Articles/selectArticleByStatePublished',
        method: 'get'
    }).then(result => {
        console.log(result)
        console.log(result.data)
        //显示在页面上
        result.data.forEach(item=>{
            console.log(item)
            //通过作者id找到作者username
            let user_id=item.user_id
            axios({
                url: '/Blog/user/selectUserById',
                method: 'get' ,
                params:{
                    id:user_id
                }
            }).then(result1 => {
                console.log(result1)
                console.log(result1.data)
                addUnPublish(result1,item)
            })
        })
    })

})

//如果点击了未发布
document.querySelector('.unpublished').addEventListener('click',function (){
    document.querySelector('.active').classList.remove('active')
    document.querySelector('.unpublished').classList.add('active')
    document.querySelector('.articles-box').innerHTML=''
})


//如果点击下拉框（找到三个下拉框中的内容，然后根据三个判断）
function handleSelect() {
    const selectedYear = document.querySelector(".select-year").value;
    const selectedLabel = document.querySelector(".select-label").value;
    const selectedSearch=document.querySelector(".content-text").value
    console.log('selectedSearch:'+selectedSearch)
    console.log("点击Selected:"+selectedYear+selectedLabel);
    console.log("点击Selected:"+selectedSearch)

    const published=document.querySelector('.published')
    const unpublished=document.querySelector('.unpublished')

    console.log(document.querySelector('.articles-box').innerHTML)
    document.querySelector('.articles-box').innerHTML=''
    console.log(document.querySelector('.articles-box').innerHTML)


    //如果发布按钮为active(从articleListDropdown筛选条件)
    if(unpublished.classList.contains('active')){
        console.log(document.querySelector('.content-text').value)
        if(selectedYear==='年'&&selectedLabel==='标签'&&selectedSearch===''){
            document.querySelector('.unpublished').click()
        }
        else{
            //将user_id，selectedYear，selectedLabel传到后端
            axios({
                url:'/Blog/Articles/selectArticlesForYearAndLabel',
                params:{
                    state:'未审核',
                    selectedYear,
                    selectedLabelId:selectedLabel,
                    selectedSearch
                }
            }).then(result => {
                console.log(result)
                console.log(result.data)

                //将传入的数据打印到页面上
                result.data.forEach(blogData=>{
                    const user_id=blogData.user_id
                    console.log(user_id)
                    //根据user_id找username
                    axios({
                        url: '/Blog/user/selectUserById',
                        method: 'get' ,
                        params:{
                            id:user_id
                        }
                    }).then(result1 => {
                        console.log(result1)
                        addArticleOne(result1,blogData)
                        //如果是空的显示没有
                        console.log(document.querySelector('.articles-box').innerHTML)

                        if(document.querySelector('.articles-box').innerHTML===''){
                            console.log(document.querySelector('.articles-box').innerHTML)
                            console.log('页面为空')
                            document.querySelector('.noSearch2').classList.remove('noSearch')
                        }
                        else{
                            document.querySelector('.noSearch2').classList.add('noSearch')
                        }
                    })

                })

            })
        }

    }

    //如果未发布按钮为active(从articleListDropdown筛选条件，加上state===’草稿‘)
    if(published.classList.contains('active')){
        console.log('unpublished')
        // 遍历数据并将每个博客插入到页面中
        //将user_id，selectedYear，selectedLabel传到后端
        axios({
            url:'/Blog/Articles/selectArticlesForYearAndLabelAndState',
            params:{
                state:'发布',
                selectedYear,
                selectedLabelId:selectedLabel,
                selectedSearch
            }
        }).then(result => {
            console.log(result)
            console.log(result.data)
            //将传入的数据打印到页面上
            result.data.forEach(blogData=>{
                const user_id=blogData.user_id
                console.log(user_id)
                //根据user_id找username
                axios({
                    url: '/Blog/user/selectUserById',
                    method: 'get' ,
                    params:{
                        id:user_id
                    }
                }).then(result1 => {
                    console.log(result1)
                    addUnPublish(result1,blogData)

                    //将盒子加入页面
                    //如果是空的显示没有
                    if(document.querySelector('.articles-box').innerHTML===''){
                        console.log(document.querySelector('.articles-box').innerHTML)
                        console.log('页面为空')
                        document.querySelector('.noSearch2').classList.remove('noSearch')
                    }
                    else{
                        document.querySelector('.noSearch2').classList.add('noSearch')
                    }
                })
            })
        })
    }


}
//点击用户管理
document.querySelector('.text-content1').addEventListener('click',function (){
    document.querySelector('.Active').classList.remove('Active')
    document.querySelector('.text-content1').classList.add('Active')
    document.querySelector('.Table').style.display='';
    document.querySelector('.articles-box').style.display='';
    document.querySelector('.published-box').style.display=''
    document.querySelector('.hide-content').style.display=''
    document.querySelector('.table-release_at').style.display=''
    document.querySelector('.table-tou').innerHTML='文章标题'
    document.querySelector('.table-user').innerHTML='作者id'

    document.querySelector('.unpublished').click()
})

//用户管理--------------------------------

//点击用户管理
document.querySelector('.text-content2').addEventListener('click',function (){
    document.querySelector('.Active').classList.remove('Active')
    document.querySelector('.text-content2').classList.add('Active')
    document.querySelector('.Table').style.display='';
    document.querySelector('.articles-box').style.display='';
    //将上面的隐藏
    document.querySelector('.published-box').style.display='none'
    document.querySelector('.hide-content').style.display='none'
    document.querySelector('.table-release_at').style.display='none'
    //修改样式
    document.querySelector('.table-user').innerHTML='作者id'
    document.querySelector('.table-tou').innerHTML='用户名'
    //将内容清空
    document.querySelector('.articles-box').innerHTML=''
    //获取所有用户
    axios({
        url: '/Blog/user/selectUser',
        method: 'get'
    }).then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach(item=>{
            const commentReplyContent = `
                      <span class="table-tou">${item.nickname}</span>
                      <span class="table-user">${item.username}</span>
                      <span class="table-textarea">${item.profile}</span>
                      <span class="table-id">${item.id}</span>
                      <span class="table-shen">
                          <span class="unAccessUser">删除用户</span>
                      </span>
                `;
            const tempDiv = document.createElement('div');
            tempDiv.classList.add('table')
            tempDiv.innerHTML = commentReplyContent;
            const articlesBox = document.querySelector('.articles-box');
            articlesBox.appendChild(tempDiv);


            //如果点击了删除该用户
            tempDiv.querySelector('.unAccessUser').addEventListener('click',function (event){
                const confirmed =confirm('是否确认删除用户：'+item.nickname)
                if(confirmed){
                    const user_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                    console.log(user_id)
                    axios({
                        url: '/Blog/user/deleteUserByUser_id',
                        method: 'post',
                        params:{
                            user_id
                        }
                    }).then(result1 => {
                        console.log(result1)
                        console.log(result1.data)
                        //将这个盒子删掉
                        event.target.closest('.table').remove()
                    })
                }
            })

            //如果点击了这个盒子，就进入个人中心
            tempDiv.addEventListener('click', function(event) {
                // 判断是否点击了 .unAccessUser，如果是，则不进行后续操作
                if (event.target.classList.contains('unAccessUser')) {
                    return;
                }
                const user_id = event.currentTarget.querySelector('.table-id').innerHTML;
                localStorage.setItem('detail-author-id', user_id);
                window.location.href = "Detail.html";
            });
            // console.log(document.querySelector('.article-box').innerHTML)
            // if(document.querySelector('.articles-box').innerHTML===''){
            //     document.querySelector('.articles-box').classList.remove('noSearch2')
            // }
        })
    })
})


//点击举报受理
document.querySelector('.text-content3').addEventListener('click',function (){
    document.querySelector('.Active').classList.remove('Active')
    document.querySelector('.text-content3').classList.add('Active')
    document.querySelector('.Table').style.display='';
    document.querySelector('.articles-box').style.display='';
    //将上面的隐藏
    document.querySelector('.published-box').style.display='none'
    document.querySelector('.hide-content').style.display='none'
    document.querySelector('.table-release_at').style.display=''

    //修改样式
    document.querySelector('.table-tou').innerHTML='被举报者id'
    document.querySelector('.table-user').innerHTML='举报者id'
    document.querySelector('.table-textarea').innerHTML='文章概要'
    document.querySelector('.table-release_at').innerHTML='举报时间'

    //将内容清空
    document.querySelector('.articles-box').innerHTML=''


    //获取所有举报
    axios({
        url: '/Blog/Reports/selectReports',
        method: 'get'
    })
        .then(result => {
        console.log(result)
        console.log(result.data)
        result.data.forEach(item=>{
            console.log(item.report_content)
            if(item.report_content!==''){
                const dateObject = new Date(item.create_at);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const day = dateObject.getDate();
                const hours = dateObject.getHours();
                const minutes = dateObject.getMinutes();
                const seconds = dateObject.getSeconds();
                const formattedDateString = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
                const commentReplyContent = `
                      <span class="table-tou">${item.receiveName}</span>
                      <span class="table-user">${item.userName}</span>
                      <span class="table-textarea">${item.article_content}</span>
                      <span class="table-release_at">${formattedDateString}</span>
                      <span class="table-id">${item.article_id}</span>
                      <span class="table-report-id">${item.id}</span>
                      <span class="table-shen">
                          <span class="access">忽略</span>
                          <span class="accessFail">打回</span>
                      </span>
                `;
                const tempDiv = document.createElement('div');
                tempDiv.classList.add('table')
                tempDiv.innerHTML = commentReplyContent;
                const articlesBox = document.querySelector('.articles-box');
                articlesBox.appendChild(tempDiv);
                document.querySelector('.access').style.display=''
                document.querySelector('.access').innerHTML='忽略'
                document.querySelector('.accessFail').style.display='删除'
                document.querySelector('.accessFail').innerHTML='删除'

                //如果点击了删除,文章状态上面写删除
                tempDiv.querySelector('.accessFail').addEventListener('click',function (event){
                    const confirmed =confirm('是否确认打回文章：'+item.article_title)
                    if(confirmed){
                        const user_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                        console.log(user_id)
                        axios({
                            url: '/Blog/Articles/updateArticleByArticle_idForState',
                            method: 'post',
                            params:{
                                article_id:item.article_id,
                                state:'删除'
                            }
                        }).then(result1 => {
                            console.log(result1)
                            console.log(result1.data)
                            //将这个盒子删掉
                            event.target.closest('.table').remove()
                        })
                    }
                })
                //如果点击了忽略,举报内容清空
                tempDiv.querySelector('.access').addEventListener('click',function (event){
                    const confirmed=confirm('是否忽略用户对：'+item.article_title+' 的举报')
                    if(confirmed){
                        const user_id=event.target.closest('.table').querySelector('.table-id').innerHTML
                        console.log(user_id)
                        axios({
                            url: '/Blog/Reports/updateReportsByReport_id',
                            method: 'post',
                            params:{
                                id:item.id
                            }
                        }).then(result1 => {
                            console.log(result1)
                            console.log(result1.data)
                            //将这个盒子删掉
                            event.target.closest('.table').remove()
                        })
                    }

                })

            }

        })
    })
})
function addWatermark(imgSrc, watermarkText) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgSrc;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            console.log('w'+img.width)
            console.log('h',img.height)
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0);

            ctx.font = "40px Arial";
            ctx.fillStyle = "rgba(255,253,53,0.9)";
            console.log(watermarkText)
            const textWidth = ctx.measureText(watermarkText).width;
            const xPosition = (img.width - textWidth-30);
            const yPosition = (img.height - 30)

            ctx.fillText(watermarkText, xPosition, yPosition);

            resolve(canvas.toDataURL('image/jpeg'));
        };

        img.onerror = function() {
            reject("Error loading image.");
        };
    });
}

//点击轮播图(2-6张)
document.querySelector('.text-content4').addEventListener('click',function (){
    document.querySelector('.Active').classList.remove('Active')
    document.querySelector('.text-content4').classList.add('Active')
    if(document.querySelector('.Table')){
        document.querySelector('.Table').style.display='none';
    }
    if(document.querySelector('.articles-box')){
        document.querySelector('.articles-box').style.display='none';
    }
    if(document.querySelector('.published-box')){
        document.querySelector('.published-box').style.display='none'
    }
    if(document.querySelector('.hide-content')){
        document.querySelector('.hide-content').style.display='none'
    }

    document.querySelector('.container-box2').innerHTML=`
        <div class="slider-box">
            <div class="preview">轮播图预览</div><br><br>
            <div id="slider-body">
                <div class="slider">
                  <div class="slider-content">
                    <div class="slider-item" id="slider-item1">
                      <img src="../image/image3.jpg" alt="Image 1">
                    </div>
                    <div class="slider-item">
                      <img src="../image/image4.jpg" alt="Image 2">
                    </div>
                    <div class="slider-item">
                      <img src="../image/image2.jpg" alt="Image 2">
                    </div>
                    <div class="slider-item">
                      <img src="../image/image7.jpg" alt="Image 4">
                    </div>
                  </div>
                </div>
            </div>
            <div class="slider-images">
<!--               <div class="slider-image">-->
<!--                    <img src="../image/title.png" class="image1" alt="">-->
<!--                    <div class="overlay">-->
<!--                        <button class="up-img"><i class="angle double up icon"></i>向上调整</button>-->
<!--                        <button class="update-img"><i class="sync alternate icon"></i>更换图片</button>-->
<!--                        <button class="down-img"><i class="angle double down icon"></i>向下调整</button>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
            <div class="addImageButton">添加图片</div>
            <input type="file" class="uploadAddImageButton" placeholder="未选择" style="display: none">
        </div>
        
    `;

        //获取数据库中的图片，添加进页面
        axios({
            url: '/Blog/RotationChart/selectRotationChart',
            method: 'get'
        })
            .then(result => {
                console.log(result)
                console.log(result.data)
                document.querySelector('.slider-content').innerHTML=''
                let flag=1
                result.data.forEach(item=>{
                    var sliderImageDiv=document.createElement('div')
                    sliderImageDiv.classList.add('slider-item')
                    sliderImageDiv.innerHTML=`
                    <img src=${item.content} alt="Image 1">
                    <span class="rotationChart-id">${item.id}</span>
                `;
                    document.querySelector('.slider-content').appendChild(sliderImageDiv)
                    //下方的图片展示
                    var classImage=`image${item.id}`
                    var classOverlay=`overlay${item.state}`
                    var uploadImage=`uploadImage${item.state}`
                    var presentImageDiv=document.createElement('div')
                    presentImageDiv.classList.add('slider-image')
                    presentImageDiv.innerHTML=`
                    <img src=${item.content} class=${classImage} alt="">
                    <div class="overlay ${classOverlay}">
                        <button class="up-img"><i class="angle double up icon"></i>向上调整</button>
                        <button class="update-img"><i class="sync alternate icon"></i>更换图片</button>
                        <button class="delete-img"><i class="x icon"></i>删除图片</button>
                        <button class="down-img"><i class="angle double down icon"></i>向下调整</button>
                        <input class=${uploadImage} type="file" class="upload" placeholder="未选择" style="display: none">
                    </div>
                `;
                    document.querySelector('.slider-images').appendChild(presentImageDiv)
                    console.log(presentImageDiv)

                    let thisOverlay = presentImageDiv.querySelector(`.${classOverlay}`);
                    console.log(thisOverlay)

                    presentImageDiv.addEventListener('mouseenter', function() {
                        thisOverlay.style.display = 'block';
                    });

                    presentImageDiv.addEventListener('mouseleave', function() {
                        thisOverlay.style.display = 'none';
                    });
                    console.log(result.data.length)

                    //四个按钮的点击事件
                    presentImageDiv.querySelector('.up-img').addEventListener('click',function (){
                        //修改数据库
                        let numberPart
                        if (presentImageDiv) {
                            console.log(presentImageDiv)
                            const className = presentImageDiv.querySelector('.overlay').className;
                            console.log(className)
                            const match = className.match(/\d+/);
                            if (match) {
                                numberPart = match[0];
                                console.log(numberPart); // 这就是您想要的数字
                            }
                        }
                        console.log(numberPart)
                        axios({
                            url: '/Blog/RotationChart/updateRotationChartUpState',
                            method: 'post',
                            params:{
                                state:numberPart
                            }
                        }).then(result1 => {
                            console.log(result1)

                            //点击向上调整
                            document.querySelector('.text-content4').click()
                        })

                    })
                    //点击向下调整
                    presentImageDiv.querySelector('.down-img').addEventListener('click',function (){
                        //修改数据库
                        let numberPart
                        if (presentImageDiv) {
                            console.log(presentImageDiv)
                            const className = presentImageDiv.querySelector('.overlay').className;
                            console.log(className)
                            const match = className.match(/\d+/);
                            if (match) {
                                numberPart = match[0];
                                console.log(numberPart); // 这就是您想要的数字
                            }
                        }
                        console.log(numberPart)
                        numberPart++
                        axios({
                            url: '/Blog/RotationChart/updateRotationChartUpState',
                            method: 'post',
                            params:{
                                state:numberPart
                            }
                        }).then(result1 => {
                            console.log(result1)

                            //点击向上调整
                            document.querySelector('.text-content4').click()
                        })

                    })
                    //点击更换图片
                    presentImageDiv.querySelector('.update-img').addEventListener('click',function (){
                        presentImageDiv.querySelector(`.${uploadImage}`).click();
                    })
                    document.querySelector(`.${uploadImage}`).onchange = function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            const originalFilename = file.name; // 获取原始文件名
                            const extension = originalFilename.slice(((originalFilename.lastIndexOf(".") - 1) >>> 0) + 2); // 获取文件扩展名
                            const baseFilename = originalFilename.replace(`.${extension}`, ''); // 获取不带扩展名的文件名
                            const time =new Date().getTime();
                            const newFilename = `${baseFilename}_水印_${time}.${extension}`; // 添加"_水印"到文件名

                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = function() {
                                const userNickname=localStorage.getItem('nickname')
                                console.log(userNickname)
                                addWatermark(reader.result, '博客园 '+userNickname).then(modifiedImg => {
                                    presentImageDiv.querySelector(`.${classImage}`).src = modifiedImg;

                                    fetch(modifiedImg)
                                        .then(res => res.blob())
                                        .then(blob => {
                                            const modifiedFile = new File([blob], newFilename, {
                                                type: "image/jpeg",
                                                lastModified: new Date()
                                            });

                                            const formData = new FormData();
                                            formData.append('avatar', modifiedFile);

                                            let numberPart
                                            if (presentImageDiv) {
                                                console.log(presentImageDiv)
                                                const className = presentImageDiv.querySelector('.overlay').className;
                                                console.log(className)
                                                const match = className.match(/\d+/);
                                                if (match) {
                                                    numberPart = match[0];
                                                    console.log(numberPart); // 这就是您想要的数字
                                                }
                                            }
                                            console.log(numberPart)
                                            axios({
                                                url: '/Blog/Articles/Avatar',
                                                method: 'POST',
                                                data: formData
                                            }).then(result => {
                                                console.log("返回了什么：" + result);
                                                console.log("图片路径:" + result.data);
                                                let avatar = '/upload/' + result.data;
                                                //接着将图片更新到数据库，然后点击‘轮播图’
                                                axios({
                                                    url: '/Blog/RotationChart/updateRotationChartContent',
                                                    method: 'POST',
                                                    params:{
                                                        state:numberPart,
                                                        content:avatar
                                                    }
                                                }).then(result3 => {
                                                    console.log(result3);
                                                    console.log(result3.data);
                                                    document.querySelector('.text-content4').click()
                                                })
                                            });
                                        });
                                });
                            };
                        }
                    };
                    //点击删除图片
                    presentImageDiv.querySelector('.delete-img').addEventListener('click',function (){
                        let numberPart
                        if (presentImageDiv) {
                            console.log(presentImageDiv)
                            const className = presentImageDiv.querySelector('.overlay').className;
                            console.log(className)
                            const match = className.match(/\d+/);
                            if (match) {
                                numberPart = match[0];
                                console.log(numberPart); // 这就是您想要的数字
                            }
                        }
                        console.log(numberPart)
                        axios({
                            url: '/Blog/RotationChart/deleteRotationChart',
                            method: 'POST',
                            params:{
                                state:numberPart
                            }
                        }).then(result => {
                            console.log(result);
                            document.querySelector('.text-content4').click()
                        })
                    })
                    //第一张图片和最后一张图片要隐藏一个按钮
                    if(flag===1){
                        presentImageDiv.querySelector('.up-img').style.display='none'
                    }
                    if(flag===result.data.length){
                        presentImageDiv.querySelector('.down-img').style.display='none'
                    }
                    flag++
                });
                let deleteImg=document.querySelectorAll('.delete-img')
                if(flag===2){
                    //隐藏删除按钮
                    deleteImg.forEach(item=>{
                        item.style.display='none'
                    })
                }
                else{
                    deleteImg.forEach(item=>{
                        item.style.display=''
                    })
                }
                slider()
            })

    document.querySelector('.addImageButton').addEventListener('click',function (){
        document.querySelector('.uploadAddImageButton').click();
    })
    document.querySelector('.uploadAddImageButton').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const originalFilename = file.name; // 获取原始文件名
            const extension = originalFilename.slice(((originalFilename.lastIndexOf(".") - 1) >>> 0) + 2); // 获取文件扩展名
            const baseFilename = originalFilename.replace(`.${extension}`, ''); // 获取不带扩展名的文件名
            const time =new Date().getTime();
            const newFilename = `${baseFilename}_水印_${time}.${extension}`; // 添加"_水印"到文件名

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                const userNickname=localStorage.getItem('nickname')
                console.log(userNickname)
                addWatermark(reader.result, '博客园 '+userNickname).then(modifiedImg => {
                    // document.querySelector(`.${classImage}`).src = modifiedImg;

                    fetch(modifiedImg)
                        .then(res => res.blob())
                        .then(blob => {
                            const modifiedFile = new File([blob], newFilename, {
                                type: "image/jpeg",
                                lastModified: new Date()
                            });

                            const formData = new FormData();
                            formData.append('avatar', modifiedFile);

                            axios({
                                url: '/Blog/Articles/Avatar',
                                method: 'POST',
                                data: formData
                            }).then(result => {
                                console.log("返回了什么：" + result);
                                console.log("图片路径:" + result.data);
                                let avatar = '/upload/' + result.data;
                                //接着将图片更新到数据库，然后点击‘轮播图’
                                axios({
                                    url: '/Blog/RotationChart/insertRotationChart',
                                    method: 'POST',
                                    params:{
                                        content:avatar
                                    }
                                }).then(result3 => {
                                    console.log(result3);
                                    console.log(result3.data);
                                    slider()
                                    document.querySelector('.text-content4').click()

                                })
                            });
                        });
                });
            };
        }
    };
    //轮播图
    function slider(){
        const slider = document.querySelector('.slider');
        const sliderContent = document.querySelector('.slider-content');
        const sliderItems = document.querySelectorAll('.slider-item');
        let currentIndex = 0;
        let interval;
        function startSlider() {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % sliderItems.length;
                updateSlider();
            }, 3000);
        }
        function updateSlider() {
            sliderContent.style.transform = `translateX(-${currentIndex * (100 / sliderItems.length)}%)`;
        }
        startSlider();
    }


})

//点击返回主页
document.querySelector('.exit').addEventListener('click',function (){
    window.location.href = "../MainPage.html";

})