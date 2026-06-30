let todo_viewer = document.getElementById('todo-viewer');

// Getting items from local Storage
let task_list = JSON.parse(localStorage.getItem('taskList')) || [];

// For Searching
document.getElementById('search-bar').addEventListener('input', () => {
    let search_input = document.getElementById('search-bar').value;
    let search_result = [];
    search_result.push(task_list[0]);

    for (let i = 1; i < task_list.length; i++) {
        if (task_list[i]['name'].toLowerCase().includes(search_input.toLowerCase())) {
            search_result.push(task_list[i]);
        }
    }

    display_item(search_result);
})


// For Displaying Todo
function getTaskElement(Task) {
    return `
    <div class="task" style="border: ${Task.boxColor} 20px solid;">
        <div class='title'>
            <h3>${Task["name"]}</h3>
        </div>
        <div class='details>
            <p class='start-date'>
                ${Task['startDate']}
            </p>
            <p class='due-date'>
                ${Task['dueDate']}
            </p>
        </div>
        <div class="view-detail">
            <button class="view-detail-btn" onclick="show_details(${Task['id']});"> View Details </button>
            <button class="edit" onclick="edit_task(${Task['id']})"> Edit Task </button>
        </div>
    </div>
    `;
}

function show_details(id) {
    window.location.href = `../details.html?taskId=${id}`;
}

function edit_task(id) {
    window.location.href = `../update.html?taskId=${id}`;
}

function display_item(task_list) {
    console.log(task_list);
    todo_viewer.innerHTML = "";
    let page_num = parseInt(document.getElementById('current-page').innerText);
    console.log(page_num);

    for (let i = 0; i < 9; i++) {
        if (i + (page_num - 1) * 8 > task_list.length - 1) {
            break;
        }
        todo_viewer.innerHTML += getTaskElement(task_list[i + (page_num - 1) * 8]);
    }
}

document.getElementById('next-page').addEventListener('click', () => {
    let page_num = parseInt(document.getElementById('current-page').innerText);
    if ((task_list.length - (page_num * 9) >= 0)) {
        document.getElementById('current-page').innerText = page_num + 1;
    }
    display_item(task_list);
});

document.getElementById('prev-page').addEventListener('click', () => {
    let page_num = parseInt(document.getElementById('current-page').innerText);
    if (page_num > 1) {
        document.getElementById('current-page').innerText = page_num - 1;
    }
    display_item(task_list);
});

display_item(task_list);