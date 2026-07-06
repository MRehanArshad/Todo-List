function validateUser(username, password) {
    //We have list of users
    let usersList = JSON.parse(localStorage.getItem('Users')) || [];
    usersList = usersList.filter(user => user.username === username && user.password === password);
    return usersList[0];
}

function getData(User){
    let data = {
        token: User.username,
        role: User.role
    };
    return data;
}

document.getElementById('submit').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let User = {
        username: username,
        password: password
    }

    console.log(User);

    const user = validateUser(username, password);
    if (Boolean(user)) {
        console.log(user);
        let data = getData(user);
        console.log(data);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.role);

        if(data.role == 'user'){
            window.location.href = '../index.html';
        } else{
            window.location.href = '../dashboard.html';
        }
    }
    else {
        alert(`Password or username mismatch`);
    }
});
