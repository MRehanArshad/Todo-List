let todo_viewer = document.getElementById('todo-viewer');
let task_list = [];

for (key in Object.keys(localStorage)) {
    if (!(key === "Last Key" || key === "click-id")) {
        task_list.push(JSON.parse(localStorage.getItem(key)));
    }
}

// For Searching

document.getElementById('search-bar').addEventListener('input', () => {
    let search_input = document.getElementById('search-bar').value;
    let search_result = [];
    search_result.push(task_list[0]);
    
    for (let i = 1; i < task_list.length; i++) {
        if(task_list[i]['name'].toLowerCase().includes(search_input.toLowerCase())) {
            search_result.push(task_list[i]);
        }
    }

    display_item(search_result);
})


// For Displaying Todo

function getTaskElement(Task) {
    return `
    <div class="task">
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
    localStorage.setItem('click-id', id);
    window.location.href = '../details.html';
}

function edit_task(id) {
    localStorage.setItem('click-id', id);
    window.location.href = '../update.html';
}


function display_item(task_list) {
    console.log(task_list)
    todo_viewer.innerHTML = "";

    for (let i = 1; i < task_list.length; i++) {
        todo_viewer.innerHTML += getTaskElement(task_list[i]);
    }
}

display_item(task_list);