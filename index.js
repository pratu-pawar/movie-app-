const API_KEY = "api_key=1b38301457c28013e084d11ad6df41b9";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
+API_KEY;
IMG_KEY = 'https://image.tmdb.org/t/p/w500'
const search_URL = BASE_URL +'search/movie?'+ API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getmovie(API_KEY);

function getmovie(url){
    fetch(url).then(res => res.json()).then(data =>{ 
        console.log(data.results);
        showMovies(data.results)

    })
}

function showMovies(data){ 

    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div")
        movieEl.classList.add('movie');
        movieEl.innerHTML =
        ` <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
            <h1>${title}</h1> 
            <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
        <h3>overview</h3>
        ${overview}

    </div>`
    
    main.appendChild(movieEl);
    });
      
}

function getcolor(vote) { 
    if(vote >= 8){ 
        return'green'
    }else if(vote >= 5){ 
        return 'orange'
    }else{ 
        return'red'
    }
}

form.addEventListener('submit', (e) =>{ 
      e.preventDefault();
       
      const searchTerm = search.value;

      if(searchTerm){ 
        getmovie(search_URL+'&query='+searchTerm)
      }
})
