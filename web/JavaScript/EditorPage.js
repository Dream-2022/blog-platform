//编辑文章
let articleId="";
//判断有无token令牌
if(!token){
    location.href='../MainPage.html'
}
let editKey=localStorage.getItem('edit-key')
localStorage.setItem('key',editKey)

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
    //从localStock读到的用户id
    const user_id=localStorage.getItem("id")
    console.log("user_id:"+user_id)
    axios({
        url: '/Blog/Columns/ObtainColumnTest',
        method: 'get',
        params: {
            user_id
        }
    }).then(result => {
        console.log(result.data);
        const columns = result.data;
        const tagContainer = document.querySelector('.dropdown-column');

        // 根据从后端获取到的数据动态生成分类选项
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
    }).catch(error => {
        console.error(error);
    });


    //如果是从个人中心进来，要通过localStock获取edit-key的值
    //进入页面的时候要销毁edit-key.放入key
    console.log('edit-key:'+editKey)
    if(editKey!==null){
        console.log('editKey不为空')
        axios({
            url:'/Blog/Articles/selectArticlesByArticleId',
            method:'GET',
            params:{
                article_id:editKey
            }
        }).then(result=> {
            console.log(result)
            console.log(result.data)
            const article=result.data
            document.querySelector('.content-title').value=article.title
            document.querySelector('.content-textarea').value=article.textarea
            console.log(article.avatar)
            if(article.avatar===""){
                document.querySelector('#avatarImage1').src='../image/title.png'
            }
            else{
                document.querySelector('#avatarImage1').src=article.avatar
            }
            //创建编辑器函数，创建工具栏函数
            const { createEditor, createToolbar } = window.wangEditor
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
                },
                MENU_CONF: {}
            }
            function getInitialContent() {
                if(editKey!==null)
                    return article.htmlText
                return "<p><br></p>"
            }
            editorConfig.MENU_CONF['uploadImage'] = {
                filedName:'file',
                server: '/Blog/upload_image'

            }

            //创建编辑器
            const editor = createEditor({
                //创建位置
                selector: '#editor-container',
                //默认内容
                html:getInitialContent(),
                // html: '<p><br></p>',
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


            //渲染标签和分类(包括下拉框)
            //获取文章标签
            axios({
                url:'/Blog/LabelArticle/selectLabelArticleByArticleId',
                params:{
                    article_id:editKey
                }
            }).then(result=>{
                console.log(result)
                console.log(result.data)
                //把标签显示在页面上
                result.data.forEach(item=>{
                    //新增标签盒子
                    console.log(item.labelName)
                    const output = document.getElementById('output');
                    const newContent = document.createElement('span');
                    selectedLabels.push(item.labelName)

                    console.log("输入标签后："+selectedLabels)

                    newContent.textContent = item.labelName;
                    newContent.classList.add('content-label');

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'X';
                    deleteButton.classList.add('delete-label');

                    newContent.appendChild(deleteButton);
                    output.appendChild(newContent);
                    //在下拉框中勾选
                    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="tag"]');
                    checkboxes.forEach(check=>{
                        if(check.value===item.labelName){
                            check.checked=!check.checked
                        }
                    })
                })

            })


            //获取文章分类
            axios({
                url:'/Blog/ColumnArticle/selectColumnArticleByArticleId',
                params:{
                    article_id:editKey
                }
            }).then(result=>{
                console.log(result)
                console.log(result.data)
                //把标签显示在页面上
                result.data.forEach(item=>{
                    //新增标签盒子
                    console.log(item.columnName)
                    const output = document.getElementById('input');
                    const newContent = document.createElement('span');
                    selectedLabels.push(item.columnName)

                    console.log("输入标签后："+selectedLabels)

                    newContent.textContent = item.columnName;
                    newContent.classList.add('content-column');

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'X';
                    deleteButton.classList.add('delete-column');

                    newContent.appendChild(deleteButton);
                    output.appendChild(newContent);
                    //在下拉框中勾选
                    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="column"]');
                    checkboxes.forEach(check=>{
                        if(check.value===item.columnName){
                            check.checked=!check.checked
                        }
                    })
                })

            })

            //原创单选框
            if(article.original==="原创"){
                var transshipmentRadioButton1 = document.querySelector('input[name="original"][value="original"]');
                transshipmentRadioButton1.checked = true;
            }else if(article.original==="转载"){
                var transshipmentRadioButton2 = document.querySelector('input[name="original"][value="transshipment"]');
                transshipmentRadioButton2.checked = true;
            }else if(article.original==="翻译"){
                var transshipmentRadioButton3 = document.querySelector('input[name="original"][value="translation"]');
                transshipmentRadioButton3.checked = true;
            }
        })
    }
    else{
        const user_id=localStorage.getItem('username')
        //创建编辑器函数，创建工具栏函数
        const { createEditor, createToolbar } = window.wangEditor
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
            },
            MENU_CONF: {}
        }
        editorConfig.MENU_CONF['uploadImage'] = {
            filedName:'file',
            server: '/Blog/upload_image',
            meta:{
                userid:user_id
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
    }
});







let html;//html文本
let content;//纯文本
let count;//字数


// 获取文本域元素(限制长度)
var textarea = document.querySelector('.content-textarea');
textarea.addEventListener('input', function() {
    var text = textarea.value;
    // 如果文本长度超过10个字，则截断文本
    if (text.length > 100) {
        textarea.value = text.slice(0, 100);
    }
});

//上传照片
let avatar;
// 当页面加载完毕
window.onload = function() {
    document.getElementById('avatarImage1').onclick = function() {
        document.getElementById('upload1').click();
    };

    document.getElementById('upload1').onchange = function(e) {
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
                    document.getElementById('avatarImage1').src = modifiedImg;

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
                                avatar = '/upload/' + result.data;
                            });
                        });
                });
            };
        }
    };
};

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


///////////////////////////////////////////////////////////


