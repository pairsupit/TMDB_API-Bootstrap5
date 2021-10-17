var para = new URLSearchParams(window.location.search);
var keyword = para.get('keyword');
let showWhatYouSearch = document.getElementById('showWhatYouSearch');
let collection = '';
fetch(`https://api.themoviedb.org/3/search/multi?api_key=c6b4ec789301ea172457fcb6ecc3f733&query=${keyword}`)
    .then((res) =>
        res.json()
    )
    .then((data) => {
        let items = data.results
        console.log(data.results);
        for (var x in data.results) {
            // console.log(data.results[x].backdrop_path);
            if (data.results[x].backdrop_path) {
                collection += `<div class="card bg-transparent text-white p-2" style="width:16.66%" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${data.results[x].id}>
                                    <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" alt = "...">
                                </div>`;
            }
        }
        showWhatYouSearch.innerHTML = collection;

        showWhatYouSearch.addEventListener('click', function (e) {
            
            var modal = document.getElementById('exampleModal');
            img = modal.children[0].children[0].children[1].children[0];
            var title = document.getElementById('title');
            var overview = document.getElementById('overview');
            var vote = document.getElementById('vote');
            var rate = document.getElementById('rate');
            var type = document.getElementById('genre');
            var genreStr = '';

            if (e.target.parentNode.classList.contains('card')) {
                var para = new URLSearchParams();
                para.append("id", e.target.parentNode.id);
                var path = '?' + para.toString();
                window.history.replaceState({}, 'path', path);

                for (var i in items) {
                    if (items[i].id == e.target.parentNode.id) {
                        img.src = `https://image.tmdb.org/t/p/w300${items[i].backdrop_path}`
                        title.innerText = items[i].title;
                        overview.innerText = items[i].overview;
                        vote.innerText = items[i].vote_average;
                        items[i].adult ? rate.innerText = 'adult' : rate.innerText = 'kid';

                        // console.log(items[i].genre_ids)
                        var genre = localStorage.getItem('genre_movie')
                        genre_json = JSON.parse(genre)
                        for (x in items[i].genre_ids) {
                            // console.log(x);
                            for (y in genre_json) {
                                // console.log(genre_json[y].id);
                                if (genre_json[y].id == items[i].genre_ids[x]) {
                                    genreStr += genre_json[y].name + ' '
                                }
                            }
                        }

                    }
                }
                type.innerText = genreStr;
            }
        })
    })
    .catch((err) => {
        console.log(err)
    })