if(!localStorage.getItem('genre_tv')){
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=c6b4ec789301ea172457fcb6ecc3f733`)
        .then((res) =>
            res.json()
        )
        .then((data) => {
            console.log('fetchGenreTV.js');
            localStorage.setItem("genre_tv", JSON.stringify(data.genres))
        })
        .catch((err) => {
            console.log(err)
        })
}