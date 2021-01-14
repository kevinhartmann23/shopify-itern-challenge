//Query Selectors
let displayGrid = document.querySelector('.card-display');
let searchButton = document.querySelector('.search')
let searchInput = document.querySelector('.search-input');

//EVENT HANDLERS
searchButton.addEventListener('click', submitSearch)

//GLOBALS
let movieData = [];
let nominatedFilms = [];

// FETCH REQUESTS

function getData(inputValue){
  fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=be68040e`)
    .then(response => response.json())
    .then(data => {
      movieData = data.Search
      createGrid();
    })
}

function submitSearch(){
  getData(searchInput.value)
  searchInput.value = ''
}



//DOM HELPERS
function createGrid(){
  displayGrid.innerHTML = ''
  movieData.forEach(movie => {
  displayGrid.innerHTML += `
  <article class="card-grid">
      <div id="${movie.imdbID}" class="image-wrapper">
        <img id="${movie.imdbID}" class="image" src="${movie.Poster}" alt="nominate for an award">
      </div>
      <div class="title-wrapper">
        <h4 class="movie-title">${movie.Title}</h4>
      </div>
      <div class="year-wrapper">
        <h4 class="year-title">Year:</h4>
        <p class="year">${movie.Year}</p>
      </div>
      <div class="nominate-wrapper">
        <img id="${movie.imdbID}" class="nominate" src="./assets/nominate.png" alt="nominate for an award">
      </div>
  </article>
  `
  })
}
