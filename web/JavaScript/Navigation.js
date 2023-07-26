/*导航栏js*/
// 检查是否存在 nickname
var spanElement1 = document.querySelector('.nickname');
var spanElement2 = document.querySelector('.Nickname');
if (localStorage.getItem("nickname")) {
    var nickname = localStorage.getItem("nickname");
    spanElement1.innerText = nickname;
    spanElement2.innerText = nickname;
}
// 检查是否存在 picture
var pictureElement = document.querySelector('#headSculpture');
if (localStorage.getItem("picture")) {
    var picture = localStorage.getItem("picture");
    pictureElement.src = "/upload/"+"headSculpture.jpeg";
    document.querySelector('#headSculpture').src="/upload/"+localStorage.getItem("picture");

}

//如果未登录，则不会出现退出登录的按钮
const exitButton=document.querySelector(".exit")
//判断有无token令牌
if(!token){
    exitButton.style.display = "none";
}
//如果点击退出登录，将token和longt清除
exitButton.addEventListener("click", function() {
    localStorage.removeItem("token");
    localStorage.removeItem("longt");
    localStorage.removeItem("nickname");
    localStorage.removeItem("admin");
    localStorage.removeItem("gender");
    localStorage.removeItem("profile");
    localStorage.removeItem("username");
    localStorage.removeItem("picture");
    localStorage.removeItem("email");
    localStorage.removeItem("birthday");
    localStorage.removeItem("phone");
    //修改头像和nickname
    spanElement1.innerHTML='未登录'
    spanElement2.innerHTML='未登录'
    pictureElement.src='image/headSculpture.jpeg'
    //将退出登录按钮去掉
    exitButton.style.display = "none";

    //退出登录来到主页面
    window.location.href ='../MainPage.html';
});







