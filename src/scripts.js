//Query Selectors
let displayGrid = document.querySelector('.card-display');
let searchButton = document.querySelector('.search')
let searchInput = document.querySelector('.search-input');
// let nominateButton = document.querySelectorAll('.nominate')

//EVENT HANDLERS
searchButton.addEventListener('click', submitSearch)
  // nominateButton.addEventListener('click', nominateMovie)

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

function nominateMovie(event){
  let id = event.target.id
  return nominatedFilms.push(movieData.find(movie => movie.id === id))
}



//DOM HELPERS
function createGrid(){
  displayGrid.innerHTML = ''
  movieData.forEach(movie => {
  displayGrid.innerHTML += `
  <article class="card-grid">
      <div class="image-wrapper">
        <img class="image" src="${movie.Poster}" alt="nominate for an award">
      </div>
        <h4 class="movie-title">${movie.Title}</h4>
        <h4 class="year-title">Year: ${movie.Year}</h4>
        <button id='${movie.imdbID}' class='nominate-button'>Nominate
        <img id="${movie.imdbID}" class="nominate" src="./assets/nominate.png" alt="nominate for an award">
        </button>
  </article>
  `
  })
}
