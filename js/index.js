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
            <button class="delete" onclick="delete_task(${Task['id']})"> Delete </button>
        </div>
    </div>
    `;
}

// To get the session details
function getSession(){
    const username = localStorage.getItem('authToken');
    return username;
}

function show_details(id) {
    window.location.href = `../details.html?taskId=${id}`;
}

function edit_task(id) {
    window.location.href = `../update.html?taskId=${id}`;
}

function delete_task(id) {
    if (!confirm('Delete this task permanently?')) {
        return;
    }

    task_list = task_list.filter(task => task.id !== id);
    localStorage.setItem('taskList', JSON.stringify(task_list));
    display_item(task_list);
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', logout);

function display_item(task_list) {
    console.log(task_list);
    todo_viewer.innerHTML = "";
    let page_num = parseInt(document.getElementById('current-page').innerText);
    console.log(page_num);
    let author = getSession();

    for (let i = 0; i < 9; i++) {
        if (i + (page_num - 1) * 8 > task_list.length - 1) {
            break;
        }
        let Task = task_list[i + (page_num - 1) * 8];
        if(Task.author !== author){
            break;
        }
        todo_viewer.innerHTML += getTaskElement(Task);
    }
}

function validateSession(){
    if (!(Boolean(getSession()) && (localStorage.getItem('userRole')) === 'user')) {
        document.documentElement.innerHTML = "";
        alert("You are not authorized to view this Page");
        window.location.href = (`../login.html`);
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

validateSession();
display_item(task_list);