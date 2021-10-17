// CREATE SESSION
if (!localStorage.getItem('session_id')) {
    fetch('http://localhost:3000/createSession', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            request_token: localStorage.getItem('request_token')
        })
    })
        .then(response =>
            response.json()
        )
        .then(data => {
            // console.log('create session complete')
            console.log(data)
            localStorage.setItem('session_id', data.session_id);
        })
        .catch((err) =>
            console.log(err)
        )
}

