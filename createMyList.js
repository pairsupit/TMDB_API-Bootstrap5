// // CREATE LIST
if(!localStorage.getItem('list_id')){
    // console.log('this lis_id is empty');
    fetch(`http://localhost:3000/createList`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                session_id: localStorage.getItem('session_id'),
                name: 'mylist',
                description: '',
                language: ''
            })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.success)
            if (data.success) {
                alert('create List_id :' + data.list_id)
                localStorage.setItem('list_id', data.list_id)
                // location.reload();
            }
        })
        .catch((err) =>
            console.log(err)
        )
}