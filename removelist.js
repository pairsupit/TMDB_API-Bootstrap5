document.getElementById('removeListBtn').addEventListener('click', function (e) {
    var para = new URLSearchParams(window.location.search);
    var current_id = para.get('id');
    if (e.target.parentNode.classList.contains('removelist')) {
        console.log(current_id);
        fetch(`http://localhost:3000/removeItemFromList`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    session_id : localStorage.getItem('session_id'), 
                    list_id: localStorage.getItem('list_id') ,
                    media_id: current_id
                })
            }
        )
        .then((res) =>
            res.json()
        )
        .then((data) => {
            console.log(data)
            alert('Remove from my list /')
            location.reload()
        })
        .catch((err) =>
            console.log(err)
        )
    }
})