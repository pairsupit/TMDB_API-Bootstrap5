let btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click',function(e){
    e.preventDefault();
    let keyword = document.getElementById('searchKeyWord').value;

    var para = new URLSearchParams();
    para.append("keyword", keyword);
    window.location.href = 'ShowSearchResult.html?' + para.toString();
})