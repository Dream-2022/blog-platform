//保存文章(存草稿)
const articleSaveButton = document.querySelector('.save-button');


if(localStorage.getItem("edit-key")!==null){
    articleId=localStorage.getItem("edit-key")
    localStorage.setItem("EditorPage",articleId)
}
localStorage.removeItem("edit-key")
console.log("11111111111"+articleId)
articleSaveButton.addEventListener('click', function() {
    //标签
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="tag"]');
    const selectedLabels = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedLabels.push(checkbox.value);
        }
    });
    console.log("Selected Labels:", selectedLabels);
    //分类
    const checkboxColumn = document.querySelectorAll('input[type="checkbox"][name="column"]');
    const selectedColumns = [];
    checkboxColumn.forEach(checkbox => {
        if (checkbox.checked) {
            selectedColumns.push(checkbox.value);
        }
    });
    const pageColumn=document.querySelectorAll('.content-column')
    pageColumn.forEach(item=>{
        console.log(item.innerHTML)
        var trimmedString = item.textContent.trim().substring(0, item.textContent.trim().length - 1);
        console.log('trimmedString:'+trimmedString)
        selectedColumns.push(trimmedString)

    })



    //为空的情况
    const redSpan=document.querySelector('.red')
    //博客内容不能为空
    if(count=='0'){
        console.log("博客内容不能为空");
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='博客内容不能为空'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }
    //请选择标签或分类
    console.log("Selected Column:", selectedColumns);
    if (!Boolean(selectedLabels.length)||!Boolean(selectedColumns.length)) {
        // selectedLabels 不为空，包含选中的标签
        console.log("selectedLabels或selectedColumns是空的", selectedLabels);
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='请选择标签或分类'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }
    //标题输入为空
    const myInput=document.querySelector('.content-title')
    if (myInput.value.trim() === '') {
        // 输入为空
        console.log("标题输入为空");
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='请输入标题'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }
    //文本域内容为空
    const myTextarea=document.querySelector('.content-textarea')
    if (myTextarea.value.trim() === '') {
        console.log("文本域内容为空");
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='请输入文章摘要'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }


    //获得单选框中的内容
    const radioButtons = document.querySelectorAll('input[type="radio"][name="original"]');
    // 遍历所有单选框，找到被选中的单选框
    let original;
    radioButtons.forEach(radio => {
        if (radio.checked) {
            original = radio.value;
            console.log("单选框的内容："+original)
        }
    });


    //上传博客(草稿）
    const user_id=localStorage.getItem("id")
    const title=document.querySelector('.content-title').value
    const textarea=document.querySelector('.content-textarea').value
    //html
    //content
    //selectedValue
    //设置是否是草稿
    let state='草稿'
    let view=0;
    let give=0;
    let collect=0;
    const release_at=new Date();
    const update_at=new Date();

    let htmlText=html
    let plainText=content
    //selectedLabels
    //selectedColumns

    let articleLabel
    //插入字段
    if(articleId===""){
        console.log('空')
        console.log(articleId+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        function fetchData() {
            return axios({
                url: '/Blog/Articles/InsertArticleTest',
                method: 'post',
                params:{
                    articleId,user_id,title,textarea,htmlText,plainText,original,
                    avatar,state,view,give,collect,release_at,update_at
                }
            });
        }
        fetchData()
            .then(result => {
                console.log("结果：" + JSON.stringify(result));
                console.log("ID: " + result.data.id);

                // 在此处进行其他后续操作
                console.log(JSON.stringify(result));
                articleLabel=result.data

                console.log("InsertArticleTest插入文章后的id："+articleLabel.id)
                //提示和跳转
                //将文章id更新，不重复上传
                articleId=articleLabel.id;
                console.log("插入文章后articleId1"+articleId)
                localStorage.setItem("EditorPage",articleId)
                someOtherFunction();
            })
            .catch(error => {
                console.error("请求失败: " + error);
            });

        // axios({
        //     url: '/Blog/Articles/InsertArticleTest',
        //     method: 'post',
        //     params: {
        //         articleId, user_id, title, textarea, htmlText, plainText, original,
        //         avatar, state, view, give, collect, release_at, update_at
        //     }
        // }).then(result => {
        //     console.log(JSON.stringify(result));
        //     articleLabel = result.data
        //
        //     console.log("InsertArticleTest插入文章后的id：" + articleLabel.id)
        //     //提示和跳转
        //     //将文章id更新，不重复上传
        //     articleId = articleLabel.id;
        //     console.log("插入文章后articleId1" + articleId)
        // })

        function someOtherFunction(){
            //读取标签的list
            const output = document.getElementById('output');
            const contentLabels = output.querySelectorAll('.content-label');

            console.log("插入文章后articleId:" + articleId)
            let selectElement = []
            contentLabels.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement.push(trimmedString)

            });
            console.log("selectElement:" + selectElement)
            const input = document.getElementById('input');
            const contentColumns = input.querySelectorAll('.content-column');
            let selectElement2 = []
            contentColumns.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement2.push(trimmedString)

            });
            console.log("selectElement2:" + selectElement2)


            //新增对应文章的标签(labels表)
            axios({
                url: '/Blog/Labels/InsertLabel',
                method: 'post',
                data: {
                    articleId, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                // articleId=result.data.id;
            })

            console.log("articleId:" + articleId)
            //新增对应标签文章信息（label_article表）
            axios({
                url: '/Blog/LabelArticle/insertLabelArticle',
                method: 'post',
                data: {
                    articleId, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传

            })

            //新增对应的发布人id，和分类名称（columns表）
            axios({
                url: '/Blog/Columns/InsertColumn',
                method: 'post',
                data: {
                    // 此处的id是作者id
                    articleId:user_id, selectElement:selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
            })

            const id=localStorage.getItem("EditorPage")
            console.log("const articleId=localStorage.getItem:id:" + id)
            //新增对应标签文章信息（column_article表）
            axios({
                url: '/Blog/ColumnArticle/insertColumnArticle',
                method: 'post',
                data: {
                    // 此处的id是文章id
                    articleId:id, selectElement:selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传
                alert('保存成功')
            })

        }
    }

    else{
        //此时已经保存了，只需要更新即可
        console.log('非空')
        const id=localStorage.getItem("EditorPage")
        console.log(id+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)

        // axios({
        //     url:'/Blog/Articles/updateArticleTest',
        //     method: 'post',
        //     params:{
        //         id,user_id,title,textarea,html,content,original,avatar,state
        //     }
        // }).then(result=>{
        //     console.log("结果："+result);
        //     console.log(result.data);
        // })


        //更新上传的内容
        function fetchData2() {
            return axios({
                url: '/Blog/Articles/updateArticleTest',
                method: 'post',
                params:{
                    id,user_id,title,textarea,html,content,original,avatar,state
                }
            });
        }
        fetchData2()
            .then(result => {
                console.log("结果：" + JSON.stringify(result));
                console.log("ID: " + result.data.id);

                // 在此处进行其他后续操作
                console.log(JSON.stringify(result));
                articleLabel=result.data

                console.log("InsertArticleTest插入文章后的id："+articleLabel.articleId)
                //提示和跳转
                //将文章id更新，不重复上传
                articleId=articleLabel.articleId;
                console.log("articleId"+articleId)
                someOtherFunction2();
            })
            .catch(error => {
                console.error("请求失败: " + error);
            });
        //等待上一个执行完毕才执行someOtherFunction2
        function someOtherFunction2(){
            //读取标签的list
            const output = document.getElementById('output');
            const contentLabels = output.querySelectorAll('.content-label');

            let selectElement = []
            contentLabels.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement.push(trimmedString)

            });
            const input = document.getElementById('input');
            const contentColumns = input.querySelectorAll('.content-column');
            let selectElement2 = []
            contentColumns.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement2.push(trimmedString)

            });
            console.log("selectElement2:" + selectElement2)
            // let id=localStorage.getItem("EditorPage")

            //新增对应文章的标签(labels表)
            axios({
                url: '/Blog/Labels/InsertLabel',
                method: 'post',
                data: {
                    articleId:id, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
            })

            console.log("id:" + id)
            //新增对应标签文章信息（label_article表）
            axios({
                url: '/Blog/LabelArticle/insertLabelArticle',
                method: 'post',
                data: {
                    articleId:id, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传

            })

            //新增对应的发布人id，和分类名称（columns表）
            axios({
                url: '/Blog/Columns/InsertColumn',
                method: 'post',
                data: {
                    user_id, selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
            })


            //新增对应分类文章信息（column_article表）
            axios({
                url: '/Blog/Columns/insertColumnArticle',
                method: 'post',
                data: {
                    articleId:id, selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传

            })

            //新增对应分类文章信息
            // const id=localStorage.getItem("EditorPage")
            console.log("const articleId=localStorage.getItem:id:" + id)
            //新增对应标签文章信息（column_article表）
            axios({
                url: '/Blog/ColumnArticle/insertColumnArticle',
                method: 'post',
                data: {
                    // 此处的id是文章id
                    articleId:id, selectElement:selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传
                alert('保存成功')
            })

        }

    }

    console.log('11')
});



//发布文章（状态为未审核）
const articleSendButton = document.querySelector('.send-button');
articleSendButton.addEventListener('click', function() {
    //标签
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="tag"]');
    const selectedLabels = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedLabels.push(checkbox.value);
        }
    });
    // Do whatever you want with the selected labels
    console.log("Selected Labels:", selectedLabels);
    //分类
    const checkboxColumn = document.querySelectorAll('input[type="checkbox"][name="column"]');
    const selectedColumns = [];
    checkboxColumn.forEach(checkbox => {
        if (checkbox.checked) {
            selectedColumns.push(checkbox.value);
        }
    });
    const pageColumn=document.querySelectorAll('.content-column')
    pageColumn.forEach(item=>{
        console.log(item.innerHTML)
        var trimmedString = item.textContent.trim().substring(0, item.textContent.trim().length - 1);
        console.log('trimmedString:'+trimmedString)
        selectedColumns.push(trimmedString)

    })


    //为空的情况
    const redSpan=document.querySelector('.red')
    //博客内容不能为空
    if(count=='0'){
        console.log("博客内容不能为空");
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='博客内容不能为空'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }
    //请选择标签或分类
    console.log("Selected Column:", selectedColumns);
    if (!Boolean(selectedLabels.length)||!Boolean(selectedColumns.length)) {
        // selectedLabels 不为空，包含选中的标签
        console.log("selectedLabels或selectedColumns是空的", selectedLabels);
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='请选择标签或分类'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }
    //标题输入为空
    const myInput=document.querySelector('.content-title')
    if (myInput.value.trim() === '') {
        // 输入为空
        console.log("标题输入为空");
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='请输入标题'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }
    //文本域内容为空
    const myTextarea=document.querySelector('.content-textarea')
    if (myTextarea.value.trim() === '') {
        console.log("文本域内容为空");
        console.log('div.classList.add(\'fail\')')
        redSpan.innerHTML='请输入文章摘要'
        redSpan.scrollIntoView({ behavior: 'smooth' });
        return;
    }else{
        redSpan.innerHTML='&nbsp;'
    }


    //获得单选框中的内容
    const radioButtons = document.querySelectorAll('input[type="radio"][name="original"]');
    // 遍历所有单选框，找到被选中的单选框
    let original;
    radioButtons.forEach(radio => {
        if (radio.checked) {
            original = radio.value;
            console.log("单选框的内容："+original)
        }
    });


    //上传博客(草稿）
    const user_id=localStorage.getItem("id")
    const title=document.querySelector('.content-title').value
    const textarea=document.querySelector('.content-textarea').value
    //html
    //content
    //selectedValue
    //设置是否是草稿
    let state='未审核'
    let view=0;
    let give=0;
    let collect=0;
    const release_at=new Date();
    const update_at=new Date();
    let htmlText=html
    let plainText=content
    //selectedLabels
    //selectedColumns

    let articleLabel
    //插入字段
    if(articleId===""){
        console.log('空')
        console.log(articleId+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        function fetchData() {
            return axios({
                url: '/Blog/Articles/InsertArticleTest',
                method: 'post',
                params:{
                    articleId,user_id,title,textarea,htmlText,plainText,original,
                    avatar,state,view,give,collect,release_at,update_at
                }
            });
        }
        fetchData()
            .then(result => {
                console.log("结果：" + JSON.stringify(result));
                console.log("ID: " + result.data.id);

                // 在此处进行其他后续操作
                console.log(JSON.stringify(result));
                articleLabel=result.data

                console.log("InsertArticleTest插入文章后的id："+articleLabel.id)
                //提示和跳转
                //将文章id更新，不重复上传
                articleId=articleLabel.id;
                console.log("插入文章后articleId1"+articleId)
                console.log("发布处id："+articleId)
                localStorage.setItem("EditorPage",articleId)
                someOtherFunction();
            })
            .catch(error => {
                console.error("请求失败: " + error);
            });
        // axios({
        //     url:'/Blog/Articles/InsertArticleTest',
        //     method: 'post',
        //     params:{
        //         articleId,user_id,title,textarea,htmlText,plainText,original,
        //         avatar,state,view,give,collect,release_at,update_at
        //     }
        // }).then(result=>{
        //     console.log(JSON.stringify(result));
        //     articleLabel=result.data
        //
        //     console.log("InsertArticleTest插入文章后的id："+articleLabel.id)
        //     //提示和跳转
        //     //将文章id更新，不重复上传
        //     articleId=articleLabel.id;
        //     console.log("插入文章后articleId1"+articleId)
        // })
        function someOtherFunction(){
            //读取标签的list
            const output = document.getElementById('output');
            const contentLabels = output.querySelectorAll('.content-label');

            console.log("插入文章后articleId:" + articleId)
            let selectElement = []
            contentLabels.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement.push(trimmedString)

            });
            //获取全部分类
            const input = document.getElementById('input');
            const contentColumns = input.querySelectorAll('.content-column');
            let selectElement2 = []
            contentColumns.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement2.push(trimmedString)

            });

            console.log("selectElement:" + selectElement)

            console.log("新增对应文章的标签(labels表):"+articleId)
            //新增对应文章的标签(labels表)
            axios({
                url: '/Blog/Labels/InsertLabel',
                method: 'post',
                data: {
                    articleId, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                // articleId=result.data.id;
            })

            console.log("articleId:" + articleId)
            //新增对应标签文章信息（label_article表）
            axios({
                url: '/Blog/LabelArticle/insertLabelArticle',
                method: 'post',
                data: {
                    articleId, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传
                articleId = result.data.id;
            })

            //新增对应分类文章信息（column_article表）
            axios({
                url: '/Blog/Columns/insertColumnArticle',
                method: 'post',
                data: {
                    articleId, selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传

            })

            //新增对应分类文章信息
            const id=localStorage.getItem("EditorPage")
            console.log("const articleId=localStorage.getItem:id:" + id)
            //新增对应标签文章信息（column_article表）
            axios({
                url: '/Blog/ColumnArticle/insertColumnArticle',
                method: 'post',
                data: {
                    // 此处的id是文章id
                    articleId:id, selectElement:selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传
                window.location.assign("../MainPage.html");
            })
        }
    }
    else{
        console.log('发布之后的articleId:'+articleId)
        const id=localStorage.getItem("EditorPage");
        console.log('获取到的：'+id);
        //此时已经保存了，只需要更新即可
        console.log('非空')
        console.log(id+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        //function fetchData2() {
        axios({
            url: '/Blog/Articles/updateArticleTest',
            method: 'post',
            params:{
                id,user_id,title,textarea,html,content,original,avatar,state
            }
        })

            //fetchData2()
            .then(result => {
                console.log("结果：" + JSON.stringify(result));
                console.log("ID: " + result.data.id);
                console.log("ID  :"+id)

                // 在此处进行其他后续操作
                console.log(JSON.stringify(result));
                articleLabel=result.data

                console.log("InsertArticleTest插入文章后的id："+articleLabel.articleId)
                //提示和跳转
                //将文章id更新，不重复上传
                articleId=articleLabel.articleId;
                console.log("articleId"+articleId)
                someOtherFunction2();
            })
            .catch(error => {
                console.log("error:", error);
                if (error.response) {
                    console.log("error message:" + error.response.data.message)
                }
            })
        //等待上一个执行完毕才执行someOtherFunction2
        function someOtherFunction2(){
            //读取标签的list
            const output = document.getElementById('output');
            const contentLabels = output.querySelectorAll('.content-label');

            let selectElement = []
            contentLabels.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement.push(trimmedString)

            });
            console.log("selectElement:" + selectElement)

            //获取全部分类
            const input = document.getElementById('input');
            const contentColumns = input.querySelectorAll('.content-column');
            let selectElement2 = []
            contentColumns.forEach((label) => {

                var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

                selectElement2.push(trimmedString)

            });

            const Id=localStorage.getItem("EditorPage")
            //新增对应文章的标签(labels表)
            axios({
                url: '/Blog/Labels/InsertLabel',
                method: 'post',
                data: {
                    articleId:Id, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
            })

            console.log("Id:" + Id)
            //新增对应标签文章信息（label_article表）
            axios({
                url: '/Blog/LabelArticle/insertLabelArticle',
                method: 'post',
                data: {
                    articleId:Id, selectElement
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                // //提示(保存成功)和跳转
                localStorage.removeItem("EditorPage")
                alert('发布成功')
                window.location.replace('../MainPage.html')
                console.log('22')
            })

            //新增对应分类文章信息（column_article表）
            axios({
                url: '/Blog/Columns/insertColumnArticle',
                method: 'post',
                data: {
                    articleId:Id, selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传

            })

            //新增对应分类文章信息
            const id=localStorage.getItem("EditorPage")
            console.log("const articleId=localStorage.getItem:id:" + id)
            //新增对应标签文章信息（column_article表）
            axios({
                url: '/Blog/ColumnArticle/insertColumnArticle',
                method: 'post',
                data: {
                    // 此处的id是文章id
                    articleId:id, selectElement:selectElement2
                }
            }).then(result => {
                console.log("结果：" + result);
                console.log(result.data);
                //提示和跳转
                //将文章id更新，不重复上传
                window.location.assign("../MainPage.html");

            })
        }

    }

});