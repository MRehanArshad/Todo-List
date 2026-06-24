let object = JSON.parse(localStorage.getItem(localStorage.getItem("click-id")));

let title = document.getElementById('todo-name');
let description = document.getElementById('todo-description');
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('due-date');

title.value = pastName = object['name'];
description.value = pastDescription = object['description'];
startDate.value = pastStartDate = object['startDate'];
endDate.value = pastEndDate = object['dueDate'];

function updated(NewtodoName, Newdescription, NewstartDate,NewdueDate) {
    return (pastName != NewtodoName || pastDescription != Newdescription || pastStartDate != NewstartDate || pastEndDate != NewdueDate)
}

// For Writing to Local Storage
function writeToLocalStorage(Task) {
    Task["id"] = object['id'];
    localStorage.setItem(object['id'], JSON.stringify(Task));
}

document.getElementById('submit').addEventListener('click', (e)=>{
    e.preventDefault();

    let NewtodoName = document.getElementById('todo-name').value;
    let Newdescription = document.getElementById('todo-description').value;
    let NewstartDate = document.getElementById('start-date').value;
    let NewdueDate = document.getElementById('due-date').value;

    if (!updated(NewtodoName, Newdescription, NewstartDate,NewdueDate)) {
        console.log("No Value has updated");
    } else {
        let Task = {
            name: NewtodoName,
            description: Newdescription,
            startDate: NewstartDate,
            dueDate: NewdueDate
        }
        writeToLocalStorage(Task);
    }
});
