const key=localStorage.getItem("key")
console.log(key)
let blog;
window.addEventListener('DOMContentLoaded', function() {
    axios.get('/Blog/BlogTest')
        .then(result => {
            console.log(result.data);
            articles=result.data;

            // 进行后续处理，根据实际需求操作

            // const str=articles.map(item=>{
            //     return`${item.id}`
            // }).join(',')

            //console.log(str);
            for (let articlesKey in articles) {
                if(articles[articlesKey].id===key){
                    blog=articles[articlesKey];
                    console.log(blog)
                    console.log("找到了")
                    console.log(blog)
                    console.log(blog.title)
                    document.querySelector('.content-title ').innerHTML=blog.title
                    document.querySelector('.content-author').innerHTML=localStorage.getItem("nickname")
                    document.querySelector('.content-time').innerHTML=blog.update_at
                    document.querySelector('.content-view').innerHTML=blog.view
                    document.querySelector('.content-give').innerHTML=blog.give
                    document.querySelector('.content-content').innerHTML=blog.htmlText
                }
            }

        })
        .catch(error => {
            console.error(error);
        });

});