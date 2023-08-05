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

            // 筛选满足条件的文章
            var articles = result.data.filter(item => item.state === '发布');

            // 定义每页显示的文章数
            const pageSize = 4;
            // 定义当前页码
            let currentPage = 1;
            // 定义总页数
            let totalPages = Math.ceil(articles.length / pageSize);

            // 进行后续处理，根据实际需求操作
            const articlesContainer = document.querySelector('.articles');
            const paginationContainer = document.querySelector('.pagination');

            // 显示第一页的文章
            showPage(articles, currentPage);
            // 显示分页控件
            showPagination(totalPages);



            function showPage(articles, pageNumber) {
                // 清空文章列表
                articlesContainer.innerHTML = '';
                // 获取当前页的文章
                const start = (pageNumber - 1) * pageSize;
                const end = Math.min(start + pageSize, articles.length);
                const currentArticles = articles.slice(start, end);
                // 显示当前页的文章
                currentArticles.forEach(item => {
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
            }

            function showPagination(totalPages) {
                // 清空分页控件
                paginationContainer.innerHTML = '';

                // 创建分页元素
                for (let i = 1; i <= totalPages; i++) {
                    if(i===1){
                        const pageUp=document.createElement('a')
                        pageUp.innerHTML='上一页'
                        pageUp.classList.add('pageUp')
                        paginationContainer.appendChild(pageUp)
                        pageUp.addEventListener('click',function (){
                            if(currentPage!==1){
                                event.preventDefault();
                                currentPage = currentPage-1;
                                showPage(articles, currentPage);
                                showPagination(totalPages);
                            }
                            else{
                                alert('已经是第一页')
                            }
                        })
                    }


                    const pageLink = document.createElement('a');
                    pageLink.href = '#';
                    pageLink.textContent = i;
                    pageLink.classList.add('pagination-link');
                    // 如果是当前页，则添加active类
                    if (i === currentPage) {
                        pageLink.classList.add('active');
                    }
                    // 绑定点击事件
                    pageLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        // 更新当前页码
                        currentPage = i;
                        // 显示当前页的文章和分页控件
                        showPage(articles, currentPage);
                        showPagination(totalPages);
                    });
                    // 添加分页元素
                    paginationContainer.appendChild(pageLink);
                    if(i===totalPages){
                        const pageDown=document.createElement('a')
                        pageDown.innerHTML='下一页'
                        pageDown.classList.add('pageDown')
                        paginationContainer.appendChild(pageDown)
                        pageDown.addEventListener('click',function (){
                            if(currentPage!==totalPages){
                                event.preventDefault();
                                currentPage = currentPage+1;
                                showPage(articles, currentPage);
                                showPagination(totalPages);
                            }
                            else{
                                alert('已经是最后一页')
                            }
                        })

                    }
                }

            }

        })
        .catch(error => {
            console.error(error);
        });

    //如果是管理员，将blue显示，orange隐藏
    let admin=localStorage.getItem('admin')
    console.log('admin:'+admin)
    //是管理员的情况
    if(admin==1){
        document.querySelector('.orange').style.display='none'
        document.querySelector('.blue').classList.remove('blue')
    }

    //加载标签（找到最多的五个标签）
    axios.get('/Blog/LabelArticle/selectLabelArticleByCount')
        .then(result => {
            console.log(result)
            console.log(result.data)
            //渲染到页面上
            result.data.forEach(item=>{
                console.log(item)
                const ulElement = document.querySelector('.labelList');
                const newLiElement = document.createElement('li');
                newLiElement.classList.add('lis')
                newLiElement.textContent = `${item.labelName}`;
                ulElement.appendChild(newLiElement);
            })
        })
    //加载分类（找到作品最多的五个用户）
    axios.get('/Blog/Articles/selectArticlesByCount')
        .then(result => {
            console.log(result)
            console.log(result.data)
            //将用户插入
            result.data.forEach(item=>{
                const ulElement = document.querySelector('.userList');
                const newLiElement = document.createElement('li');
                newLiElement.classList.add('liw')
                newLiElement.classList.add(`${item.id}`)
                newLiElement.textContent = `${item.nickname}`;
                ulElement.appendChild(newLiElement);
            })

        })
});
//点击标签
document.querySelector('.labelList').addEventListener('click',function (event){
    if(event.target.classList.contains('lis')){
        console.log('点击')
        const LabelFollow =event.target.closest('.lis')
        console.log(LabelFollow)
        console.log(LabelFollow.innerHTML)
        localStorage.setItem('search',LabelFollow.innerHTML)
        window.location.href = "HTML/SearchPage.html";
        localStorage.setItem('searchLet',LabelFollow.innerHTML)
    }
})
//点击用户
document.querySelector('.userList').addEventListener('click', function(event) {
    if (event.target.classList.contains('liw')) {
        console.log('点击');
        const UserFollow = event.target.closest('.liw');

        const classList = Array.from(UserFollow.classList);
        const otherClasses = classList.filter(className => className !== 'liw');

        let name;
        for(let i = 0; i < otherClasses.length; i++) {
            name = otherClasses[i];
        }

        console.log(name);
        localStorage.setItem('detail-author-id', name);
        window.location.href = "HTML/Detail.html";
    }
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

//如果是管理员，点击进入管理员页面
document.querySelector('.manger').addEventListener('click',function (){
    window.location.href = "HTML/AdministratorPage.html";
})