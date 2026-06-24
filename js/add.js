// Getting Id of the New Task
function getId() {
    if (localStorage.length == 0) return 1;
    return Number(localStorage.getItem("Last Key")) + 1;
}

// For Writing to Local Storage
function writeToLocalStorage(Task) {
    id = getId();
    Task["id"] = id;
    localStorage.setItem(id, JSON.stringify(Task));
    localStorage.setItem("Last Key", id);
}


document.getElementById('submit').addEventListener('click', (e)=> {
    e.preventDefault();

    // Getting the useful element from the page
    let todoName = document.getElementById('todo-name');
    let description = document.getElementById('todo-description');
    let startDate = document.getElementById('start-date');
    let dueDate = document.getElementById('due-date');

    // Converting into Task
    let Task = {
        name: todoName.value,
        description: description.value,
        startDate: startDate.value,
        dueDate: dueDate.value
    }

    // Write to Local Storage
    writeToLocalStorage(Task);
});