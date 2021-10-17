let logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click',function(){
    localStorage.removeItem('session_id')
    localStorage.removeItem('request_token')
    window.location.href = "/"
})