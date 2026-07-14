function validateInput() {
    if(document.getElementById('todo-name').value == "" || document.getElementById('start-date').value == "" || document.getElementById('due-date').value == ""){
        alert("Please fill in all required fields.");
        return false;
    }
    return true;
}

function validateDate() {
    const startDate = new Date(document.getElementById('start-date').value);
    const dueDate = new Date(document.getElementById('due-date').value);

    if (startDate > dueDate) {
        alert("Start date cannot be later than due date.");
        return false;
    }
    return true;
}

// Getting Id of the New Task
function getId() {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    if (taskList.length == 0)
        return 1;
    return Number(taskList.length) + 1;
}

// To get the session details
function getSession(){
    const username = localStorage.getItem('authToken');
    return username;
}

// For Writing to Local Storage
function writeToLocalStorage(Task) {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let id = getId();
    Task["id"] = id;
    Task['author'] = getSession();
    taskList.push(Task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getNotificationMethod() {
    let notificationMethod = [];

    if (document.getElementById('email-notification').checked) {
        notificationMethod.push("Email");
    }
    if (document.getElementById('sms-notification').checked) {
        notificationMethod.push("SMS");
    }
    return notificationMethod;
}

function getPriority() {
    if (document.getElementById('high-priority').checked) {
        return "High";
    } else if (document.getElementById('medium-priority').checked) {
        return "Medium";
    } else {
        return "Low";
    }
}

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    if(!validateInput()){
        return;
    }
    // Getting the Primary details
    const todoName = document.getElementById('todo-name');
    const description = document.getElementById('todo-description');
    const startDate = document.getElementById('start-date');
    const dueDate = document.getElementById('due-date');

    //Getting the Secondary details
    const email_input = document.getElementById('email-input');
    const boxColor = document.getElementById('box-color');
    const taskProgress = document.getElementById('task-progress');

    // Getting the Additional details
    const mobileNumber = document.getElementById('mobile-number');
    const relatedLink = document.getElementById('related-link');

    let notificationMethod = getNotificationMethod();
    let priority = getPriority();

    // Converting into Task
    const Task = {
        name: todoName.value,
        description: description.value,
        startDate: startDate.value,
        dueDate: dueDate.value,
        email: email_input.value,
        boxColor: boxColor.value,
        taskProgress: taskProgress.value,
        mobileNumber: mobileNumber.value,
        relatedLink: relatedLink.value,
        notificationMethod: notificationMethod,
        priority: priority
    }

    console.log(Task);

    if(!validateDate()) {
        return;
    }

    // Write to Local Storage
    writeToLocalStorage(Task);

    let successModal = document.getElementById('success');
    successModal.classList.remove('none');

    document.getElementsByTagName('form')[0].reset();
});

document.getElementById('task-progress').addEventListener('input', () => {
    let val = document.getElementById('slider-output');
    val.textContent = "";
    let slider_input = document.getElementById('task-progress').value;
    val.textContent = slider_input + "%";
});

document.getElementById('add-another-btn').addEventListener('click', () => {
    let successModal = document.getElementById('success');
    successModal.classList.add('none');

});

document.getElementById('go-back-btn').addEventListener('click', () => {
    window.location.href = '../index.html';
});