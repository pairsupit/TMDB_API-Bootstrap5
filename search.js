var para = new URLSearchParams(window.location.search);
var keyword = para.get('keyword');
let showWhatYouSearch = document.getElementById('showWhatYouSearch');
let collection = '';
fetch(`https://api.themoviedb.org/3/search/multi?api_key=c6b4ec789301ea172457fcb6ecc3f733&query=${keyword}`)
    .then((res) =>
        res.json()
    )
    .then((data) => {
        console.log(data.results);
        for (var x in data.results) {
            // console.log(data.results[x].backdrop_path);
            if(data.results[x].backdrop_path){
                collection += `<div class="card bg-dark text-white m-2">
                                    <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" alt = "...">
                                </div>`;
            }
        }
        showWhatYouSearch.innerHTML = collection;
    })
    .catch((err) => {
        console.log(err)
    })