let showMyList = document.getElementById('showMyList');
let collection = '';
// SHOW ALL ITEM IN MY LIST
fetch(`http://localhost:3000/getItemList`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            list_id: localStorage.getItem('list_id')
        })
    })
    .then((res) =>
        res.json()
    )
    .then((data) => {
        for (var x in data.items) {
            // console.log(data.results[x].backdrop_path);
            if(data.items[x].backdrop_path){
                collection += `<div class="card bg-transparent text-white p-2" style="width:16.66%" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${data.items[x].id}>
                                    <img src="https://image.tmdb.org/t/p/w300${data.items[x].poster_path}" alt = "...">
                                </div>`;
            }
        }
        showMyList.innerHTML = collection;

        showMyList.addEventListener('click', function (e) {
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

                var para = new URLSearchParams();
                para.append("id", e.target.parentNode.id);
                var path = '?' + para.toString();
                window.history.replaceState({}, 'path', path);

                for (var i in data.items) {
                    if (data.items[i].id == e.target.parentNode.id) {
                        img.src = `https://image.tmdb.org/t/p/w300${data.items[i].backdrop_path}`
                        title.innerText = data.items[i].title;
                        overview.innerText = data.items[i].overview;
                        vote.innerText = data.items[i].vote_average;
                        data.items[i].adult ? rate.innerText = 'adult' : rate.innerText = 'kid';

                        // console.log(items[i].genre_ids)
                        var genre = localStorage.getItem('genre_movie')
                        genre_json = JSON.parse(genre)
                        for (x in data.items[i].genre_ids) {
                            // console.log(x);
                            for (y in genre_json) {
                                // console.log(genre_json[y].id);
                                if (genre_json[y].id == data.items[i].genre_ids[x]) {
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
    .catch((err) => 
        console.log(err)
    )
