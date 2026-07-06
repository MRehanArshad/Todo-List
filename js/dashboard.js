function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', logout);


function getTasksNum() {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    return taskList.length;
}

function getUsersNum() {
    const users = JSON.parse(localStorage.getItem('Users')) || [];
    return users.length;
}

function updateDashboardCounts() {
    const tasksCard = document.getElementById('tasks-count');
    const usersCard = document.getElementById('users-count');
    tasksCard.textContent = getTasksNum();
    usersCard.textContent = getUsersNum();
}

function getAllUsers() {
    const users = JSON.parse(localStorage.getItem('Users')) || [];
    return users;
}

function getAllTasks() {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    return taskList;
}

function getSession() {
    const username = localStorage.getItem('authToken');
    return username;
}

function validateSession() {
    if (!(Boolean(getSession()) && (localStorage.getItem('userRole')) === 'admin')) {
        document.documentElement.innerHTML = "";
        alert("You are not authorized to view this Page");
        window.location.href = (`../login.html`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDashboardCounts();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = 'login.html';
        });
    }

    const ctx = document.getElementById('myGraph')?.getContext('2d');
    if (ctx) {
        const users = getAllUsers().filter(user => user.role === 'user');
        const tasks = getAllTasks();
        const userTaskCounts = users.map(user => ({
            name: user.username,
            count: tasks.filter(task => task.author === user.username).length
        }));

        const labels = userTaskCounts.map(item => item.name);
        const data = userTaskCounts.map(item => item.count);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Tasks per User',
                    data,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)'
                }]
            }
        });
    }
});

//Dashboard Details Script

function delete_task(id) {
    let task_list = getAllTasks();
    task_list = task_list.filter(task => task.id !== id);

    localStorage.removeItem('taskList');
    localStorage.setItem('taskList', JSON.stringify(task_list));

    displayTasksData();
}

function delete_user(username) {
    let user_list = getAllUsers();
    user_list = user_list.filter(user => user.username !== username);

    let user_tasks = getAllTasks().filter(task => task.author === username);
    user_tasks.forEach(task => {
        delete_task(task.id);
    });

    localStorage.removeItem('Users');
    localStorage.setItem('Users', JSON.stringify(user_list));

    displayUsersData();
}

function show_details(id) {
    window.location.href = `../details.html?taskId=${id}`;
}

function edit_task(id) {
    window.location.href = `../update.html?taskId=${id}`;
}

function confirmDeleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        delete_task(id);
    }
}

function confirmDeleteUser(username) {
    if (confirm("Are you sure you want to delete this user?")) {
        delete_user(username);
    }
}

function displayUsersData() {
    const users = getAllUsers().filter(user => user.role === 'user');
    const usersTableBody = document.getElementById('users-data-content');
    usersTableBody.innerHTML = '';
    let count = 1;
    for (const user of users) {
        let tasks = getAllTasks().filter(task => task.author === user.username);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${count++}</td>
            <td>${user.username}</td>
            <td>${tasks.length}</td>
            <td><button class="delete" onclick="confirmDeleteUser('${user.username}')"> Delete </button> </td>
        `;
        usersTableBody.appendChild(row);
    }
}

function displayTasksData() {
    const tasks = getAllTasks();
    const tasksTableBody = document.getElementById('tasks-data-content');
    tasksTableBody.innerHTML = '';
    let count = 1;
    for (const task of tasks) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${count++}</td>
            <td>${task.name}</td>
            <td>${task.author}</td>
            <td>
                <button class="view-detail-btn" onclick="show_details(${task.id});"> View Details
                </button>
                <button class="edit" onclick="edit_task(${task.id})"> Edit Task </button>
                <button class="delete" onclick="confirmDeleteTask(${task.id})"> Delete </button>
            </td>
            `;
        tasksTableBody.appendChild(row);
    }
}

validateSession();
displayTasksData();
displayUsersData();