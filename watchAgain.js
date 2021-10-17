// let watchAgain = document.getElementById('watchAgain');
// let collection = '';
// fetch(``)
//     .then((res) =>
//         res.json()
//     )
//     .then((data) => {
//         console.log(data.results);
//         for (var x in data.results) {
//             // console.log(data.results[x].backdrop_path);
//             if(data.results[x].backdrop_path){
//                 collection += `<div class="card bg-transparent text-white p-2" style="width:16.66%">
//                                     <img src="https://image.tmdb.org/t/p/w300${data.results[x].poster_path}" alt = "...">
//                                 </div>`;
//             }
//         }
//         watchAgain.innerHTML = collection;
//     })
//     .catch((err) => {
//         console.log(err)
//     })