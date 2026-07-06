let title = document.getElementById('title');
let description = document.getElementById('description');
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');
let email = document.getElementById('email');
let mobileNumber = document.getElementById('mobile-number');
let relatedLink = document.getElementById('related-link');
let taskProgress = document.getElementById('task-progress');
let boxColor = document.getElementById('box-color');
let priority = document.getElementById('priority');
let notification = document.getElementById('notification-method');

function showTaskDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskId = urlParams.get('taskId');

    console.log(taskId);
    let object = JSON.parse(localStorage.getItem("taskList")).filter(task => task.id === Number(taskId))[0];
    title.innerHTML = object['name'];
    description.innerHTML = object['description'];
    startDate.innerHTML = object['startDate'];
    endDate.innerHTML = object['dueDate'];
    email.innerHTML = object['email'];
    mobileNumber.innerHTML = object['mobileNumber'];
    relatedLink.innerHTML = object['relatedLink'];
    taskProgress.innerHTML = object['taskProgress'];
    priority.innerHTML = object['priority'];
    notification.innerHTML = object['notificationMethod'];

}

function homePage(){
    let homepage = document.getElementById('homepage');

    if(localStorage.getItem('userRole') == 'user'){
        homepage.href = '../index.html';
    }
    else{
        homepage.href = '../dashboard.html';
    }
}

homePage();

showTaskDetails();

