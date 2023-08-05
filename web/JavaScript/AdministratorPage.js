window.addEventListener('DOMContentLoaded', function(){
    //从数据库article表中获取所有发布的文章
    axios({
        url: '/Blog/Articles/SelectArticles',
        method: 'get'
    }).then(result => {
        console.log(result)
        console.log(result.data)

    })
})
