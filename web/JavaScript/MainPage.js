const username=localStorage.getItem("username")
const token=localStorage.getItem("token")
let articles;
// 在页面加载时执行查询请求
window.addEventListener('DOMContentLoaded', function() {
    console.log("进入addEventListener的响应页面")
    axios.get('/Blog/Articles/MainPageTest')
        .then(result => {
            document.querySelector('#headSculpture').src="/upload/"+localStorage.getItem("picture")
            var loadingBox = document.querySelector(".loading-container");
            loadingBox.style.display = "none";
            console.log(result.data);
            articles=result.data;
            // 进行后续处理，根据实际需求操作
            const articlesContainer = document.querySelector('.articles');

            // 生成文章内容
            result.data.forEach(item => {
                //如果是发布文章才显示
                if(item.state=='发布'){

                    // 创建元素
                    const contentBox = document.createElement('div');
                    const table = document.createElement('table');
                    const tr1 = document.createElement('tr');
                    const tr2 = document.createElement('tr');
                    const td1 = document.createElement('td');
                    const td2 = document.createElement('td');
                    const td3 = document.createElement('td');
                    const img = document.createElement('img');
                    const h4 = document.createElement('h4');
                    const spanContent = document.createElement('span');
                    const tdSection = document.createElement('td');
                    const spanView = document.createElement('span');
                    const spanView1 = document.createElement('span');
                    const spanLike = document.createElement('span');
                    const spanLike1 = document.createElement('span');
                    const spanId = document.createElement('span');

                    // 设置元素属性和内容
                    contentBox.classList.add('content-box');
                    if(!item.avatar){
                        img.src = 'image/cat.jpeg';
                    }
                    else{
                        img.src=item.avatar;
                    }
                    spanId.innerHTML=item.id;


                    img.classList.add('content-image');
                    h4.textContent = item.title;
                    spanContent.classList.add('content-span');
                    spanId.classList.add('content-id');
                    spanContent.textContent = item.textarea;
                    spanView.innerHTML = '<i class="eye icon"></i>浏览量';
                    spanView1.classList.add('content-view');
                    spanView1.textContent = item.view;
                    spanLike.innerHTML = '<i class="thumbs up icon"></i>点赞';
                    spanLike1.classList.add('content-like');
                    spanLike1.textContent = item.give;
                    // 构建元素结构
                    td1.setAttribute('rowspan', '2');
                    td1.appendChild(img);
                    td2.appendChild(h4);
                    td2.appendChild(spanId);
                    td2.appendChild(spanContent);
                    td3.appendChild(spanView);
                    td3.appendChild(spanView1);
                    td3.appendChild(spanLike);
                    td3.appendChild(spanLike1);
                    tr1.appendChild(td1);
                    tr1.appendChild(td2);
                    tr2.appendChild(td3);
                    tdSection.appendChild(tr2);
                    tdSection.classList.add('section');
                    table.appendChild(tr1);
                    table.appendChild(tdSection);
                    contentBox.appendChild(table);

                    // 将文章内容添加到父容器中
                    articlesContainer.appendChild(contentBox);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
});
//点击文章
document.querySelector('.articles').addEventListener('click', function(event) {
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
                window.location.href = "HTML/BlogPage.html";
            })
            .catch(error => {
                console.error(error);
            });
    }
});