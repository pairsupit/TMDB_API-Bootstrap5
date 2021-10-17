// CREATE REQUEST TOKEN
fetch('http://localhost:3000/createRequestToken')
    .then(response =>
        response.json()
    )
    .then(data => {
        console.log('request token complete')
        console.log(data)
        localStorage.setItem('request_token', data.request_token);
    })
    .catch((err) =>
        console.log(err)
    )

let btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', () => {
    let usernameStr = document.getElementById('username').value;
    let passwordStr = document.getElementById('password').value;

    if (usernameStr && passwordStr && localStorage.getItem('request_token')) {
        fetch('http://localhost:3000/login',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    username: usernameStr,
                    password: passwordStr,
                    request_token: localStorage.getItem('request_token')
                })
            })
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log(data)
                if (data.success && data.request_token != null) {
                    window.location.href = 'home.html'
                }
            })
    } else {
        alert('Please fill out username and password')
    }
})