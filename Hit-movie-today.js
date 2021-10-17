let sliderMovieToday = document.getElementById('sliderMovieToday');
let innerSliderMovieToday = '';

fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=c6b4ec789301ea172457fcb6ecc3f733`)
    .then((res) =>
        res.json()
    )
    .then((data) => {
        let items = data.results
        // console.log(items);

        for (var x in data.results) {
            innerSliderMovieToday += `<div class="card bg-transparent border-0 text-white m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${data.results[x].id}>
                                            <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" style="width:90%;" alt = "...">
                                        </div>`
        }
        sliderMovieToday.innerHTML = `<div class="text-light">
                                            <h2 class="m-0 pt-2">อันดับหนังสูงสุดวันนี้</h2>
                                        </div>
                                        <div class="slider-movie-today m-0">
                                            ${innerSliderMovieToday}
                                        </div>`

        sliderMovieToday.addEventListener('click', function (e) {
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
                        title.innerText = items[i].title;
                        overview.innerText = items[i].overview;
                        vote.innerText = items[i].vote_average;
                        items[i].adult ? rate.innerText = 'adult' : rate.innerText = 'kid';

                        // console.log(items[i].genre_ids)
                        var genre = localStorage.getItem('genre_movie')
                        genre_json = JSON.parse(genre)
                        for(x in items[i].genre_ids){
                            // console.log(x);
                            for(y in genre_json){
                                // console.log(genre_json[y].id);
                                if(genre_json[y].id == items[i].genre_ids[x]){
                                    genreStr += genre_json[y].name + ' '
                                }
                            }
                        }                   
                        
                    }
                }
                type.innerText = genreStr;
            }
        })

    }).then(() => {
        /* JQuery */
        $(document).ready(function () {
            $('.slider-movie-today').slick({
                Infinity: false,
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: true
            });
        });
    })
    .catch((err) =>
        console.log(err)
    )
