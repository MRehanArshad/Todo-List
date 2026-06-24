let title = document.getElementById('title');
let description = document.getElementById('description');
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');

function showTaskDetails(){
    let object = JSON.parse(localStorage.getItem(localStorage.getItem("click-id")));
    title.innerHTML = object['name'];
    description.innerHTML = object['description'];
    startDate.innerHTML = object['startDate'];
    endDate.innerHTML = object['dueDate'];
    localStorage.removeItem("click-id");
}

showTaskDetails();

