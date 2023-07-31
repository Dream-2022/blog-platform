<!--标签事件-->
    // 点击输入按钮
    function toggleInputBox() {
        const button = document.getElementById('toggleButton');
        const inputBox = document.getElementById('inputBox');
        const textInput = document.getElementById('textInput');

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


    const selectedLabels = [];//标签中的内容

    // 添加标签
    function addContentLabel() {
        const textInput = document.getElementById('textInput');
        const content = textInput.value.trim();
        if (content !== '') {

            const output = document.getElementById('output');
            const newContent = document.createElement('span');

            //判断是否存在相同的标签，标签个数不超过5
            function getExistingContents() {

                const output = document.getElementById('output');
                const contentLabels = output.querySelectorAll('.content-label');


                let flag=false;
                let sum=0;
                contentLabels.forEach((label) => {
                    sum++;
                    if(content+"X"===label.textContent.trim()){
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
                selectedLabels.push(content)

                console.log("输入标签后："+selectedLabels)

                newContent.textContent = content;
                newContent.classList.add('content-label');

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.classList.add('delete-label');

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
            const inputBox = document.getElementById('inputBox');
            const button = document.getElementById('toggleButton');
            inputBox.style.display = 'none';
            button.style.display = 'inline';
        }
    }



    // 添加事件委托，捕获点击“删除”按钮的事件
    document.getElementById("output").addEventListener("click", function(event) {
        console.log("进入")
        if (event.target.classList.contains("delete-label")) {
            // 点击的是“删除”按钮
            var box = event.target.parentElement;
            box.remove(); // 删除盒子
            console.log("Deleted:", box.textContent.trim());


            var trimmedString = box.textContent.trim().substring(0, box.textContent.trim().length - 1);
            console.log("trimmedString"+trimmedString)

            //删除list中对应的值（如果存在的话）
            var valueToRemove = trimmedString;
            var index = selectedLabels.indexOf(valueToRemove);
            console.log("index:"+index)
            if (index !== -1) {
                selectedLabels.splice(index, 1);
            }
            console.log("删除之后的selectedLabels"+selectedLabels)


            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="tag"]');

            //取消下拉框中的勾选
            // const element = document.querySelector(`.content-label[value="${trimmedString}"]`);
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
    function addContentLabelDropdown(){
        //标签
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="tag"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                //判断是否存在相同的标签，标签个数不超过5
                function getExistingContents() {
                    const output = document.getElementById('output');
                    const contentLabels = output.querySelectorAll('.content-label');
                    const existingContents = [];

                    let flag=false;
                    let sum=0;
                    contentLabels.forEach((label) => {
                        sum++;
                        existingContents.push(label.textContent.trim());
                        if(checkbox.value+"X"===label.textContent.trim()){
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
                    const output = document.getElementById('output');
                    const newContent = document.createElement('span');
                    selectedLabels.push(checkbox.value);
                    //将选中的加入span盒子
                    newContent.textContent = checkbox.value;
                    newContent.classList.add('content-label');

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'X';
                    deleteButton.classList.add('delete-label');

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
                // 如果复选框未被选中，从selectedLabels集合中移除其值
                let index = selectedLabels.indexOf(checkbox.value);
                let valueLabelDropdown=checkbox.value
                console.log("复选框未被选中时"+selectedLabels)
                if (index !== -1) {
                    selectedLabels.splice(index, 1);
                    //在这里写移出对应的标签
                    const output = document.getElementById('output');
                    const contentLabels = output.querySelectorAll('.content-label');

                    contentLabels.forEach((label) => {
                        if(valueLabelDropdown+"X"===label.textContent.trim()){
                            label.parentNode.removeChild(label);
                        }
                    });
                }
            }
        });
    }

    // 点击其他地方时，将输入框切换回按钮模式
    document.addEventListener('click', function (event) {
        const inputBox = document.getElementById('inputBox');
        const container = document.querySelector('.container-label');
        const button = document.getElementById('toggleButton');
        if (!container.contains(event.target)) {
            button.style.display = 'inline';
            inputBox.style.display = 'none';
        }
    });