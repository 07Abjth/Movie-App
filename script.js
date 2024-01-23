const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a60000a5dcad534c248b8578d58a163f&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=a60000a5dcad534c248b8578d58a163f&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");

    movieEl.innerHTML = `
 
            <img src="${IMG_PATH + poster_path}"
            alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
              
<h3> Overview</h3>
            ${overview}  
           
        </div>`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    try {
      const url = SEARCH_URL + searchTerm;
      await getMovies(url);
      search.value = "";
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  } else {
    window.location.reload();
  }
});
