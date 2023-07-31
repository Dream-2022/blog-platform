<!--标签事件-->
// 点击输入按钮
function togleInputBox() {
    const button = document.getElementById('togleButton');
    const inputBox = document.getElementById('input-box');
    const textInput = document.getElementById('text-input');

    if (inputBox.style.display === 'none') {
        // 切换到输入框模式
        button.style.display = 'none';
        inputBox.style.display = 'inline';
        textInput.value = ''; // 清空输入框
    } else {
        // 切换回按钮模式
        button.style.display = 'inline';
        inputBox.style.display = 'none';
    }
}


const selectedColumns = [];//标签中的内容

// 添加标签
function addContentColumn() {
    const textInput = document.getElementById('text-input');
    const content = textInput.value.trim();
    if (content !== '') {

        const output = document.getElementById('input');
        const newContent = document.createElement('span');

        //判断是否存在相同的标签，标签个数不超过5
        function getExistingContents() {

            const output = document.getElementById('input');
            const contentColumns = output.querySelectorAll('.content-column');


            let flag=false;
            let sum=0;
            contentColumns.forEach((column) => {
                sum++;
                if(content+"X"===column.textContent.trim()){
                    console.log("相等")
                    flag=!flag;
                }
            });
            //判断标签个数
            if(!flag&&sum===5){
                flag=!flag;
            }
            return flag
        }

        if(!getExistingContents()) {
            console.log("content:"+content)
            selectedColumns.push(content)

            console.log("输入标签后："+selectedColumns)

            newContent.textContent = content;
            newContent.classList.add('content-column');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete-column');

            // deleteButton.onclick = function () {
            //     console.log("function")
            //     output.removeChild(newContent);
            //
            //
            //  };

            newContent.appendChild(deleteButton);
            output.appendChild(newContent);
        }
        // 隐藏输入框，显示按钮
        const inputBox = document.getElementById('input-box');
        const button = document.getElementById('togleButton');
        inputBox.style.display = 'none';
        button.style.display = 'inline';
    }
}



// 添加事件委托，捕获点击“删除”按钮的事件
document.getElementById("input").addEventListener("click", function(event) {
    console.log("进入")
    if (event.target.classList.contains("delete-column")) {
        // 点击的是“删除”按钮
        var box = event.target.parentElement;
        box.remove(); // 删除盒子
        console.log("Deleted:", box.textContent.trim());


        var trimmedString = box.textContent.trim().substring(0, box.textContent.trim().length - 1);
        console.log("trimmedString"+trimmedString)

        //删除list中对应的值（如果存在的话）
        var valueToRemove = trimmedString;
        var index = selectedColumns.indexOf(valueToRemove);
        console.log("index:"+index)
        if (index !== -1) {
            selectedColumns.splice(index, 1);
        }
        console.log("删除之后的selectedColumns"+selectedColumns)


        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="tag"]');

        //取消下拉框中的勾选
        // const element = document.querySelector(`.content-column[value="${trimmedString}"]`);
        // if(element.checked){
        //     console.log('xuanzhong')
        //     element.checked=!element.checked
        // }
        function uncheckCheckboxByValue(value) {
            var checkbox = document.querySelector('input[type="checkbox"][value="' + value + '"]');
            if (checkbox) {
                checkbox.checked = false;
            }
        }
        // 调用函数以取消勾选值为 "数据结构" 的复选框
        uncheckCheckboxByValue(trimmedString);
    }
});




// 从下拉框中添加标签(根据页面中span盒子的个数是否大于5，来判断是否能继续添加盒子)
function addContentColumnDropdown(){
    //标签
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="column"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            //判断是否存在相同的标签，标签个数不超过5
            function getExistingContents() {
                const output = document.getElementById('input');
                const contentColumns = output.querySelectorAll('.content-column');
                const existingContents = [];

                let flag=false;
                let sum=0;
                contentColumns.forEach((column) => {
                    sum++;
                    existingContents.push(column.textContent.trim());
                    if(checkbox.value+"X"===column.textContent.trim()){
                        console.log("相等")
                        flag=!flag;
                    }
                });
                console.log(existingContents);
                //判断标签个数
                if(!flag&&sum===5){
                    flag=!flag;
                }
                return flag
            }
            if(!getExistingContents()) {
                const output = document.getElementById('input');
                const newContent = document.createElement('span');
                selectedColumns.push(checkbox.value);
                //将选中的加入span盒子
                newContent.textContent = checkbox.value;
                newContent.classList.add('content-column');

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.classList.add('delete-column');

                deleteButton.onclick = function () {
                    output.removeChild(newContent);
                };

                newContent.appendChild(deleteButton);
                output.appendChild(newContent);
            }
        }
        //点击了下拉框时，这里的if和else才生效
        else {
            console.log("未被选中:"+checkbox.value)
            // 如果复选框未被选中，从selectedColumns集合中移除其值
            let index = selectedColumns.indexOf(checkbox.value);
            let valueColumnDropdown=checkbox.value
            console.log("复选框未被选中时"+selectedColumns)
            if (index !== -1) {
                selectedColumns.splice(index, 1);
                //在这里写移出对应的标签
                const output = document.getElementById('input');
                const contentColumns = output.querySelectorAll('.content-column');

                contentColumns.forEach((column) => {
                    if(valueColumnDropdown+"X"===column.textContent.trim()){
                        column.parentNode.removeChild(column);
                    }
                });
            }
        }
    });
}

// 点击其他地方时，将输入框切换回按钮模式
document.addEventListener('click', function (event) {
    const inputBox = document.getElementById('input-box');
    const container = document.querySelector('.container-column');
    const button = document.getElementById('togleButton');
    if (!container.contains(event.target)) {
        button.style.display = 'inline';
        inputBox.style.display = 'none';
    }
});