// Getting Id of the New Task
function getId(taskList) {
    if (taskList.length == 0) 
        return 1;
    return Number(taskList.length) + 1;
}

// For Writing to Local Storage
function writeToLocalStorage(Task) {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    id = getId(taskList);
    Task["id"] = id;
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

document.getElementById('submit').addEventListener('click', (e)=> {
    e.preventDefault();

    // Getting the Primary details
    const todoName = document.getElementById('todo-name');
    const description = document.getElementById('todo-description');
    const startDate = document.getElementById('start-date');
    const dueDate = document.getElementById('due-date');

    //Getting the Secondary details
    const email_input = document.getElementById('email-input');
    const boxColor = document.getElementById('box-color');
    const coverImage = document.getElementById('cover-image');
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
        coverImage: coverImage.value,
        taskProgress: taskProgress.value,
        mobileNumber: mobileNumber.value,
        relatedLink: relatedLink.value,
        notificationMethod: notificationMethod,
        priority: priority
    }

    console.log(Task);

    // Write to Local Storage
    writeToLocalStorage(Task);

    document.getElementsByClassName("success-card")[0].classList.toggle('none');

    // let promise = new Promise(function(resolve, reject) {
    //     setTimeout(()=>resolve("done"), 1000);
    // })

    // promise.then(
    //     result=>{document.getElementsByClassName("success-card")[0].classList.toggle('none');}
    // )

    // document.getElementsByTagName('form')[0].reset();
});

document.getElementById('task-progress').addEventListener('input', () => {
    let val = document.getElementById('slider-output');
    val.textContent = "";
    let slider_input = document.getElementById('task-progress').value;
    val.textContent = slider_input + "%";
});

