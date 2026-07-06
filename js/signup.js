function validateUsername(username) {
    //We have list of users
    let usersList = JSON.parse(localStorage.getItem('Users')) || [];
    usersList = usersList.filter(user => user.username === username);
    let result = !(Boolean(usersList.length));
    return result;
}

document.getElementById('submit').addEventListener('click', () => {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let User = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        role: 'user'
    }

    console.log(User);

    if (validateUsername(username)) {
        let usersList = JSON.parse(localStorage.getItem('Users')) || [];
        usersList.push(User);
        localStorage.setItem('Users', JSON.stringify(usersList));
        window.location.href = '../login.html';
    }
    else {
        alert(`This username is already taken. 
            Try a Different one`);
    }

});