let sliderMovie = document.getElementById('sliderMovie');
let innerSlider = '';
let sliderTv = document.getElementById('slidertv');
let innerSlidertv = '';
fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=c6b4ec789301ea172457fcb6ecc3f733`)
    .then((res) =>
        res.json()
    )
    .then((data) => {
        for (var x in data.results) {
            console.log(data.results[x]);
            innerSlider += `<div class="card bg-dark text-white m-2">
                                <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" alt = "...">
                            </div>`;
        }
        sliderMovie.innerHTML = `<div class="text-light">
                            <h2 class="m-0 pt-5">อันดับหนังสูงสุดสัปดาห์นี้</h2>
                        </div>
                        <div class="slider m-0">
                            ${innerSlider}
                        </div>`
    }).then(() => {
        /* JQuery */
        $(document).ready(function () {
            $('.slider').slick({
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

fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=c6b4ec789301ea172457fcb6ecc3f733`)
    .then((res) =>
        res.json()
    )
    .then((data) => {
        // console.log(data.results);
        for (var x in data.results) {
            console.log(data.results[x]);
            innerSlidertv += `<div class="card bg-dark text-white m-2 hover">
                                <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" alt = "...">
                            </div>`;
        }
        sliderTv.innerHTML = `<div class="text-light">
                                <h2 class="m-0 pt-5">TV อันดับสูงสุดสัปดาห์นี้</h2>
                            </div>
                            <div class="sliderTV m-0">
                                ${innerSlidertv}
                            </div>`;
    })
    .then(() => {
        /* JQuery */
        $(document).ready(function () {
            $('.sliderTV').slick({
                Infinity: false,
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: true
            });
        });
    })
    .catch((err) => {
        console.log(err)
    })


let btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener('click',function(e){
    e.preventDefault();
    let keyword = document.getElementById('searchKeyWord').value;

    var para = new URLSearchParams();
    para.append("keyword", keyword);
    location.href = window.location + 'search.html?' + para.toString();
})