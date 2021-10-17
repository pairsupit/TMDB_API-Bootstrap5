if(!localStorage.getItem('genre_movie')){
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=c6b4ec789301ea172457fcb6ecc3f733`)
        .then((res) =>
            res.json()
        )
        .then((data) => {
            console.log('fetchGenreMovie.js');
            localStorage.setItem("genre_movie", JSON.stringify(data.genres))
        })
        .catch((err) => {
            console.log(err)
        })
}