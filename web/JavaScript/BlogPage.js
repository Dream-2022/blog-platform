let key=localStorage.getItem("key")
console.log(key)
let blog;
let isLiked = false;//是否点赞了
let isCollected = false;//是否收藏了
let likeCount ;//点赞数
let collectCount ;//收藏数
var viewCount;//浏览量
//打开页面时，将文章信息导入
//还需要渲染分类专栏，标签栏，还有把日期转换为正确格式
//还有从articles表中读出点赞数，收藏数，浏览量
//作者名得改成文章作者（通过user_id从user表中拿数据）
window.addEventListener('DOMContentLoaded', function() {
    var likeElement = document.querySelector(".detail-give");
    var collectElement = document.querySelector(".detail-collect");
    axios.get('/Blog/Articles/BlogTest')
        .then(result => {
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


                    document.querySelector('.content-title ').innerHTML=blog.title
                    document.querySelector('.content-author').innerHTML=localStorage.getItem("nickname")
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
                    document.querySelector('.content-content').innerHTML=blog.htmlText
                    likeCount=blog.give
                    collectCount=blog.collect
                    console.log("likeCount:"+likeCount+"collectCount:"+collectCount)
                }
            }

        })
        .catch(error => {
            console.error(error);
        });
    //从likes表查找该用户是否点赞(通过user_id,article_id查找是否存在）
    let article_id=localStorage.getItem("key")
    let user_id=localStorage.getItem("id")
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


});

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

function toggleCollect() {
    var collectElement = document.querySelector(".detail-collect");
    if (!isCollected) {
        collectCount++;
        document.querySelector(".outline-collect").innerHTML='<i class="star icon"></i>收藏'
        collectElement.classList.add("collected");
        //将收藏加入数据库
        // axios.post("/Blog/Articles/collect", { username, key })
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    } else {
        collectCount--;
        collectElement.classList.remove("collected");
        document.querySelector(".outline-collect").innerHTML='<i class="star outline icon"></i>收藏'
    }
    isCollected = !isCollected;
    document.querySelector(".article-collect").textContent = collectCount;
}
