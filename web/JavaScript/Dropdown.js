// 导航栏中的下拉框设置
// 点击content-container盒子时，如果未登录，则跳转登录页面
var dropdownContainer = document.querySelector(".content-container");
dropdownContainer.addEventListener("click", function() {
    var token = localStorage.getItem("token");
    if (!token) {
        // 用户未登录，跳转到登录页面
        window.location.href = "Login.html";
    }
});

//下拉框的出现和消失
    var dropdownContent = document.querySelector(".content-dropdown");
    var isDropdownHovered = false;
    dropdownContainer.addEventListener("mouseover", function() {
    dropdownContent.style.display = "block";
});
    dropdownContent.addEventListener("mouseover", function() {
    isDropdownHovered = true;
});
    dropdownContent.addEventListener("mouseout", function() {
    isDropdownHovered = false;
});
    dropdownContainer.addEventListener("mouseout", function() {
    if (!isDropdownHovered) {
    dropdownContent.style.display = "none";
}
});
