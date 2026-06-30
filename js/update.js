
function getTask() {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskId = urlParams.get('taskId');

    taskList = taskList.filter(task => task.id === Number(taskId));

    console.log(taskId);
    return taskList[0];
}

function fillValues(object) {
    // Getting the Primary details
    let todoName = document.getElementById('todo-name');
    let description = document.getElementById('todo-description');
    let startDate = document.getElementById('start-date');
    let dueDate = document.getElementById('due-date');

    //Getting the Secondary details
    let email_input = document.getElementById('email-input');
    let boxColor = document.getElementById('box-color');
    let taskProgress = document.getElementById('task-progress');

    // Getting the Additional details
    let mobileNumber = document.getElementById('mobile-number');
    let relatedLink = document.getElementById('related-link');

    todoName.value = object.Name = object['name'];
    description.value = object.Description = object['description'];
    startDate.value = object.StartDate = object['startDate'];
    dueDate.value = object.EndDate = object['dueDate'];
    email_input.value = object['email'];
    boxColor.value = object['boxColor'];
    taskProgress.value = object['taskProgress'];
    mobileNumber.value = object['mobileNumber'];
    relatedLink.value = object['relatedLink'];

    if (object['notificationMethod'].includes("Email")) {
        document.getElementById('email-notification').checked = true;
    }
    if (object['notificationMethod'].includes("SMS")) {
        document.getElementById('sms-notification').checked = true;
    }

    if (object['priority'] === "High") {
        document.getElementById('high-priority').checked = true;
    } else if (object['priority'] === "Medium") {
        document.getElementById('medium-priority').checked = true;
    } else {
        document.getElementById('low-priority').checked = true;
    }
}

// Fetching the task form local Storage
let object = getTask();
console.log(object);

fillValues(object);

function updated(object, NewName, NewDescription, NewStartDate, NewdueDate, NewEmail, NewMobileNumber, NewRelatedLink, NewTaskProgress, NewPriority, NewNotificationMethod, NewboxColor) {
    return (
        object.name !== NewName ||
        object.description !== NewDescription ||
        object.startDate !== NewStartDate ||
        object.dueDate !== NewdueDate ||
        object.email !== NewEmail ||
        object.mobileNumber !== NewMobileNumber ||
        object.relatedLink !== NewRelatedLink ||
        object.taskProgress !== NewTaskProgress ||
        object.priority !== NewPriority ||
        object.boxColor !== NewboxColor ||
        object.notificationMethod !== NewNotificationMethod
    );
}

// For Writing to Local Storage
function writeToLocalStorage(Task) {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    taskList = taskList.filter(task => task.id !== Task.id);
    taskList.push(Task);
    localStorage.removeItem('taskList');
    localStorage.setItem('taskList', JSON.stringify(taskList));
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

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();

    let NewtodoName = document.getElementById('todo-name').value;
    let Newdescription = document.getElementById('todo-description').value;
    let NewstartDate = document.getElementById('start-date').value;
    let NewdueDate = document.getElementById('due-date').value;
    let Newemail_input = document.getElementById('email-input').value;
    let NewmobileNumber = document.getElementById('mobile-number').value;
    let NewrelatedLink = document.getElementById('related-link').value;
    let NewtaskProgress = document.getElementById('task-progress').value;
    let Newpriority = getPriority();
    let NewnotificationMethod = getNotificationMethod();
    let NewboxColor = document.getElementById('box-color').value;

    let error = false;
    if (!updated(object, NewtodoName, Newdescription, NewstartDate, NewdueDate, Newemail_input, NewmobileNumber, NewrelatedLink, NewtaskProgress, Newpriority, NewnotificationMethod, NewboxColor)) {
        error = true;
    } else {
        let Task = {
            id: object['id'],
            name: NewtodoName,
            description: Newdescription,
            startDate: NewstartDate,
            dueDate: NewdueDate,
            email: Newemail_input,
            mobileNumber: NewmobileNumber,
            relatedLink: NewrelatedLink,
            priority: Newpriority,
            notificationMethod: NewnotificationMethod,
            taskProgress: NewtaskProgress,
            boxColor: NewboxColor
        }
        writeToLocalStorage(Task);

        let successModal = document.getElementById('success');
        successModal.classList.remove('none');
    }

    if (error) {
        document.getElementsByClassName("error-card")[0].classList.toggle('none');

        let promise = new Promise(function (resolve, reject) {
            setTimeout(() => resolve("done"), 1000);
        })

        promise.then(
            result => { document.getElementsByClassName("error-card")[0].classList.toggle('none'); }
        )
    } else {
        document.getElementsByClassName("success-card")[0].classList.toggle('none');

        let promise = new Promise(function (resolve, reject) {
            setTimeout(() => resolve("done"), 1000);
        })

        promise.then(
            result => { document.getElementsByClassName("success-card")[0].classList.toggle('none'); }
        )
    }
});

document.getElementById('add-another-btn').addEventListener('click', () => {
    let successModal = document.getElementById('success');
    successModal.style = "display: none";

});

document.getElementById('go-back-btn').addEventListener('click', () => {
    window.location.href = '../index.html';
});