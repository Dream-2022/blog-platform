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
    addArticles(content)
})

//如果点击文章
document.querySelector('.container-content').addEventListener('click', function(event) {
    // 检查点击的元素是否为 content-box 盒子
    if (event.target.closest('.content-box')) {
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

//如果点击搜索
document.querySelector('.content-button').addEventListener('click',function (){
    let content=document.querySelector('.content-input').value
    if(content===''){
        document.querySelector('.content-input').setAttribute('placeholder', '查找内容不能为空');
        return
    }
    localStorage.setItem("search",content)
    console.log(content)
    addArticles(content)
})