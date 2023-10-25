const taskInput = document.getElementById('task');
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById("sort-button");
const taskList = document.getElementById('task-list');
const totalTasks = document.getElementById('total-task');
let stat = {
    DOING: 0,
    DONE: 1
};
let taskArr = [];
let taskId = 1;
let count = 0;
totalTasks.innerText = count;

// Bài 1: Hoàn thành todoList với các yêu cầu sau:
/**
 * 1. THêm nhiệm vụ vào todoList bằng nút "Thêm"
 * 2. Sau khi thêm thif nhiện vụ sẽ hiện lên và hiện nút "Xong" của nhiện vụ đó kèm tên nhiệm vụ
 * 3. Khi click vào nút "Xong" thì sẽ chuyển sang nút "Xóa" và gạch ngang nhiện vụ, và làm mờ đi - Nghĩa là làm xong
 * 3. Khi click vào nút "Xóa" thì sẽ xóa nhiệm vụ ra khỏi danh sách
 */
addButton.addEventListener('click', function () {
    let taskText = taskInput.value.trim();

    if (taskText !== '') {
        let taskObj = {
            id: taskId++,
            content: taskText,
            stat: stat.DOING
        }
        let listItem = createItem(taskObj);
        count = addOne(count);
        totalTasks.innerText = count;
        taskArr.push(taskObj);
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});

// Bài 2: Thêm bộ đếm trên todoList
/**
 * Thêm bộ đếm để đếm xem có bao nhiêu nhiệm vụ đang ở trên todoList
 */
const addOne = (num) => num += 1;
const minusOne = (num) => num -= 1;

// Bài 3: Thêm nút xắp xếp để xếp các nhiệm vụ theo bảng chữ cái
sortButton.addEventListener("click", function () {
    if (taskArr.length > 1) {
        taskArr.sort(compareVietnamese);
        //THay đổi vị trí các phần tử trên giao diện
        taskList.innerHTML = "";
        taskArr.forEach(task => {
            let listItem = createItem(task);
            taskList.appendChild(listItem);
        });
    }
});

//Hàm tạo phần tử cho danh sách
function createItem(taskObj) {
    let listItem = document.createElement('li');
    if (taskObj.stat == stat.DOING) {
        listItem.innerHTML = `
                                <span class="item-text">${taskObj.content}</span>
                                <div id="${taskObj.id}">
                                    <button class="finish-button">Xong</button>
                                    <button class="delete-button hide-button">Xóa</button>
                                </div>
                            `;
    } else {
        listItem.innerHTML = `
                                <span class="item-text done-text">${taskObj.content}</span>
                                <div id="${taskObj.id}">
                                    <button class="finish-button hide-button">Xong</button>
                                    <button class="delete-button">Xóa</button>
                                </div>
                            `;
    }

    let itemText = listItem.querySelector('.item-text');

    let deleteButton = listItem.querySelector('.delete-button');
    deleteButton.addEventListener('click', function (event) {
        listItem.remove();
        count = minusOne(count);
        totalTasks.innerText = count;
        taskArr = removeTask(taskArr, event.target);
    });

    let finishButton = listItem.querySelector('.finish-button');
    finishButton.addEventListener('click', function (event) {
        itemText.classList.add("done-text");
        finishButton.classList.add("hide-button");
        deleteButton.classList.remove("hide-button");
        taskArr = updateTask(taskArr, event.target);
    });

    return listItem;
}

//Hàm loại bỏ task khỏi mảng
function removeTask(taskArr, btnDom) {
    let taskId = btnDom.parentElement.getAttribute("id");
    return taskArr.filter((ele) => ele.id != taskId);
}

//Hàm update trang thái task ở mảng
function updateTask(taskArr, btnDom) {
    let taskId = btnDom.parentElement.getAttribute("id");
    for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].id == taskId) {
            taskArr[i].stat = stat.DONE;
        }
    }
    return taskArr;
}

// Hàm so sánh tùy chỉnh sử dụng tiếng Việt
function compareVietnamese(a, b) {
    return a.content.localeCompare(b.content, "vi", { sensitivity: "base" });
}