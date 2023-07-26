//编辑文章
let articleId="";
//判断有无token令牌
if(!token){
    location.href='../MainPage.html'
}

//加载页面的时候发送请求，读取标签和分类
window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#headSculpture').src="/upload/"+localStorage.getItem("picture");

    axios.get('/Blog/Labels/ObtainLabelTest')
        .then(result => {
            console.log(result.data);
            const labels = result.data;

            const tagContainer = document.querySelector('.dropdown-content');

            // 根据从后端获取到的数据动态生成标签选项
            labels.forEach(tag => {
                // 创建标签
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'tag';
                checkbox.value = tag.labelName; // 用标签名作为 value
                // 设置 label 文本内容
                label.textContent = tag.labelName;
                label.appendChild(checkbox);
                tagContainer.appendChild(label);
            });
        })
        .catch(error => {
            console.error(error);
        });
    axios.get('/Blog/Columns/ObtainColumnTest')
        .then(result => {
            console.log(result.data);
            const columns = result.data;
            const tagContainer = document.querySelector('.dropdown-column');

            // 根据从后端获取到的数据动态生成标签选项
            columns.forEach(tag => {
                // 创建标签
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'column';
                checkbox.value = tag.columnName; // 用标签名作为 value
                // 设置 label 文本内容
                label.textContent = tag.columnName;
                label.appendChild(checkbox);
                tagContainer.appendChild(label);
            });
        })
        .catch(error => {
            console.error(error);
        });
});
//创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor
let html;//html文本
let content;//纯文本
let count;//字数
//编辑器配置对象
const editorConfig = {
    //占位提示文字
    placeholder: '发布文章内容...',
    //编辑器变化时回调函数
    onChange(editor) {
        html = editor.getHtml()
        console.log('editor content', html)
        //--------------------------------统计文字个数------------------
        content=editor.getText();
        console.log(content)
        function countCharacters(text) {
            // 使用正则表达式将空格去除，然后返回剩余字符的个数
            return text.replace(/\s/g, '').length;
        }
        let wordCountElement = document.querySelector('.word-count');
        count=countCharacters(content)+''
        if(count){
            wordCountElement.innerHTML = count;
        }
        //-------------------------------------------------------------
        //为了后续快速收集整个表单内容做铺垫
        // document.querySelector('.publish-content').value=html
    }
}
//创建编辑器
const editor = createEditor({
    //创建位置
    selector: '#editor-container',
    //默认内容
    html: '<p><br></p>',
    //配置器
    config: editorConfig,
    //默认（有更多功能）
    mode: 'default', // or 'simple'
})
//工具栏配置对象
const toolbarConfig = {}
//创建工具栏
const toolbar = createToolbar({
    //为指定编辑器创建工具栏
    editor,
    //工具栏创建的位置
    selector: '#toolbar-container',
    //配置继承模式
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

// 获取文本域元素(限制长度)
var textarea = document.querySelector('.content-textarea');
textarea.addEventListener('input', function() {
    var text = textarea.value;
    // 如果文本长度超过10个字，则截断文本
    if (text.length > 100) {
        textarea.value = text.slice(0, 100);
    }
});

// let file=""
// //上传图片(图片添加点击事件)
// window.onload = function() {
//     // 设置头像点击事件
//     document.querySelector('#headSculpture').onclick = function() {
//         document.getElementById('upload').click();
//     };
//
//     document.getElementById('upload').onchange = function(e) {
//         file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onloadend = function() {
//                 document.querySelector('#headSculpture').src = reader.result;
//                 console.log("1111"+reader.result)
//             };
//         }
//     };
// };

//上传照片



//保存文章(存草稿)
const articleSaveButton = document.querySelector('.save-button');
articleSaveButton.addEventListener('click', function() {
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
    let avatar;
    let htmlText=html
    let plainText=content
    //selectedLabels
    //selectedColumns

    //插入字段
    if(articleId===""){
        console.log('空')
        console.log(articleId+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        axios({
            url:'/Blog/Articles/InsertArticleTest',
            method: 'post',
            params:{
                articleId,user_id,title,textarea,htmlText,plainText,original,
                avatar,state,view,give,collect,release_at,update_at
            }
        }).then(result=>{
            console.log("结果："+result);
            console.log(result.data);
            //提示和跳转
            //将文章id更新，不重复上传
            articleId=result.data.id;
        })
        //读取标签的list
        const contentLabels = output.querySelectorAll('.content-label');


        let selectElement=[]
        contentLabels.forEach((label) => {

            var trimmedString = label.textContent.trim().substring(0, label.textContent.trim().length - 1);

            selectElement.push(trimmedString)

        });
        console.log("selectElement:"+selectElement)


        //新增对应文章的标签(labels表)
        axios({
            url:'/Blog/Labels/InsertLabel',
            method: 'post',
            data:{
                articleId,selectElement
            }
        }).then(result=>{
            console.log("结果："+result);
            console.log(result.data);
            //提示和跳转
            //将文章id更新，不重复上传
            articleId=result.data.id;
        })

        //新增对应标签文章信息（label_article表）
        axios({
            url:'/Blog/LabelArticle/insertLabelArticle',
            method: 'post',
            data:{
                articleId,selectElement
            }
        }).then(result=>{
            console.log("结果："+result);
            console.log(result.data);
            //提示和跳转
            //将文章id更新，不重复上传
            articleId=result.data.id;
        })
    }
    else{
        //此时已经保存了，只需要更新即可
        console.log('非空')
        console.log(articleId+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        axios({
            url:'/Blog/Articles/updateArticleTest',
            method: 'post',
            params:{
                id:articleId,user_id,title,textarea,html,content,original,avatar,state
            }
        }).then(result=>{
            console.log("结果："+result);
            console.log(result.data);
            //提示和跳转
            //将文章id更新，不重复上传
            articleId=result.data.id;
        })
    }


    // //提示(保存成功)和跳转
    // window.location.replace('../MainPage.html')
    // console.log('11')
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


    //上传博客(未审核）
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
    let avatar;
    let htmlText=html
    let plainText=content
    //selectedLabels
    //selectedColumns

    //插入字段
    if(articleId===""){
        console.log('空')
        console.log(articleId+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        axios({
            url:'/Blog/Articles/InsertArticleTest',
            method: 'post',
            params:{
                articleId,user_id,title,textarea,htmlText,plainText,original,
                avatar,state,view,give,collect,release_at,update_at
            }
        }).then(result=>{
            console.log("结果："+result);
            console.log(result.data);
            //提示和跳转
            //将文章id更新，不重复上传
            articleId=result.data.id;
            //提示(保存成功)和跳转
            window.location.href = '../MainPage.html';
            console.log('11')
        })
    }
    else{
        //此时已经保存了，只需要更新即可
        console.log('非空')
        console.log(articleId+":"+user_id+":"+title+":"+textarea+":"+html+":"+content+":"+original+":"+
            avatar+":"+state+":"+view+":"+give+":"+collect+":"+release_at+":"+update_at)
        axios({
            url:'/Blog/Articles/updateArticleTest',
            method: 'post',
            params:{
                id:articleId,user_id,title,textarea,html,content,original,avatar,state
            }
        }).then(result=>{
            console.log("结果："+result);
            console.log(result.data);
            //提示和跳转
            //将文章id更新，不重复上传
            articleId=result.data.id;
            //提示(保存成功)和跳转
            window.location.href = '../MainPage.html';
            console.log('11')
        })
    }



});


