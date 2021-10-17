let tvList = document.getElementById('tvList');
var collection = '';

let genre_tv = JSON.parse(localStorage.getItem('genre_tv'))
// console.log(genre_tv);
for (var x in genre_tv) {
    // console.log(genre_tv[x]);
    collection += `<li><a class="dropdown-item" id="${genre_tv[x].id}" href="#">${genre_tv[x].name}</a></li>`;
    tvList.innerHTML = collection;
}

let showListOfTv = document.getElementById("showListOfTv");
// if you choose type of movie it will be shown in tv.html page
tvList.addEventListener('click', function (e) {
    e.preventDefault();
    let collection_tv = '';
    console.log(e.target.id)
    let tv_id = e.target.id;

    fetch(`https://api.themoviedb.org/3/tv/${tv_id}/similar?api_key=c6b4ec789301ea172457fcb6ecc3f733`)
        .then((res) =>
            res.json()
        )
        .then((data) => {
            let items = data.results
            // console.log(items);

            for (var x in data.results) {
                if (data.results[x].poster_path) {
                    collection_tv += `<div class="card bg-transparent text-white p-2" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width:16.66%" id=${data.results[x].id}>
                                            <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" alt = "...">
                                        </div>`
                }
            }
            showListOfTv.innerHTML = collection_tv;

            showListOfTv.addEventListener('click', function (e) {
                // console.log('click sliderMovieToday')
                var modal = document.getElementById('exampleModal');
                img = modal.children[0].children[0].children[1].children[0];
                var title = document.getElementById('title');
                var overview = document.getElementById('overview');
                var vote = document.getElementById('vote');
                var rate = document.getElementById('rate');
                var type = document.getElementById('genre');
                var genreStr = '';

                if (e.target.parentNode.classList.contains('card')) {
                    // console.log(`click card ${e.target.parentNode.id}`)

                    var para = new URLSearchParams();
                    para.append("id", e.target.parentNode.id);
                    var path = '?' + para.toString();
                    window.history.replaceState({}, 'path', path);

                    for (var i in items) {
                        if (items[i].id == e.target.parentNode.id) {
                            // console.log(items[i])
                            img.src = `https://image.tmdb.org/t/p/w300${items[i].backdrop_path}`
                            title.innerText = items[i].name;
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
            console.log(err);
        })
})
