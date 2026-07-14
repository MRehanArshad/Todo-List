let todo_viewer = document.getElementById('todo-viewer');
let task_list = JSON.parse(localStorage.getItem('taskList')) || [];

// For Searching
document.getElementById('search-bar').addEventListener('input', search);

function search() {
    const search_input = document.getElementById('search-bar').value.trim().toLowerCase();
    const author = getSession();
    const filtered = task_list.filter(task =>
        task.author === author && task.name.toLowerCase().includes(search_input)
    );

    document.getElementById('current-page').innerText = '1';
    display_item(filtered);
}

function delete_task(id) {
    task_list = task_list.filter(task => task.id !== id);
    localStorage.setItem('taskList', JSON.stringify(task_list));

    display_item(task_list.filter(task => task.author === getSession()));
}

// For Displaying Todo
function getTaskElement(Task) {
    if (!Task) {
        return '';
    }
    return `
    <div class="task" style="border: ${Task.boxColor} 20px solid;">
        <div class='title'>
            <h3>${Task["name"]}</h3>
        </div>
        <div class='details'>
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
            <button class="delete" onclick="confirmDelete(${Task['id']})"> Delete </button>
        </div>
    </div>
    `;
}

function getSession() {
    const username = localStorage.getItem('authToken');
    return username;
}

function show_details(id) {
    window.location.href = `../details.html?taskId=${id}`;
}

function edit_task(id) {
    window.location.href = `../update.html?taskId=${id}`;
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', logout);

function display_item(task_list) {
    if(task_list.length === 0) { 
        todo_viewer.innerHTML = `<div class="no-tasks">No tasks found</div>`;
        return;
    }
    console.log(task_list);
    todo_viewer.innerHTML = "";
    let author = getSession();
    task_list = task_list.filter(task => task.author === author);
    let page_num = parseInt(document.getElementById('current-page').innerText);

    for (let i = 0; i < 9; i++) {
        if (i + (page_num - 1) * 9 > task_list.length) {
            continue;
        }
        todo_viewer.innerHTML += getTaskElement(task_list[i + (page_num - 1) * 9]);
    }
}

function confirmDelete(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        delete_task(id);
    }
}

function validateSession() {
    if (!(Boolean(getSession()) && (localStorage.getItem('userRole')) === 'user')) {
        document.documentElement.innerHTML = "";
        alert("You are not authorized to view this Page");
        window.location.href = (`../login.html`);
    }
}

document.getElementById('next-page').addEventListener('click', () => {
    const author = getSession();
    const authorTasks = task_list.filter(task => task.author === author);
    console.log(authorTasks);
    let page_num = parseInt(document.getElementById('current-page').innerText);
    const totalPages = Math.ceil(authorTasks.length / 9) || 1;

    if (page_num < totalPages) {
        document.getElementById('current-page').innerText = page_num + 1;
        display_item(task_list);
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    let page_num = parseInt(document.getElementById('current-page').innerText);
    if (page_num > 1) {
        document.getElementById('current-page').innerText = page_num - 1;
        display_item(task_list);
    }
});

validateSession();
console.log(task_list);
display_item(task_list.filter(task => task.author === getSession()));