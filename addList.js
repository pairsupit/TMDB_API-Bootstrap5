document.getElementById('addListBtn').addEventListener('click', function (e) {
    var para = new URLSearchParams(window.location.search);
    var current_id = para.get('id');
    if (e.target.parentNode.classList.contains('addlist')) {
        console.log(current_id);
        fetch(`http://localhost:3000/addItemToList`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    session_id: localStorage.getItem('session_id'),
                    id: para.get('id') ,
                    list_id: localStorage.getItem('list_id')
                })
            }
        )
        .then((res) =>
            res.json()
        )
        .then((data) => {
            console.log(data)
            alert('Add to my list /')
        })
        .catch((err) =>
            console.log(err)
        )
    }
})