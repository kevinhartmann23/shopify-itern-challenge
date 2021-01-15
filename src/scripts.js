//Query Selectors
let displayGrid = document.querySelector('.card-display');
let searchButton = document.querySelector('.search');
let searchInput = document.querySelector('.search-input');
let inputLabel = document.querySelector('.label');
let nomCount = document.querySelector('.nomination-count');
let bannerDisplay = document.querySelector('.banner-display');
let introTitle = document.querySelector('.intro-title')
//EVENT HANDLERS
searchButton.addEventListener('click', submitSearch)

//GLOBALS
let movieData = [];
let nominatedFilms = [];
let nominationsLeft = 4;

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
  if(nominatedFilms.length < 4){
    event.target.disabled = true;
    event.target.innerText = `Nominated`
    nomCount.innerText = `${nominationsLeft - nominatedFilms.length} Nominations Left...`
    nominatedFilms.push(movieData.find(movie => movie.imdbID === event.target.id))
  } else if (nominatedFilms.length === 4) {
    nominatedFilms.push(movieData.find(movie => movie.imdbID === event.target.id))
    nomCount.innerText = `${nominationsLeft - nominatedFilms.length} Nominations Left...`
    displayGrid.classList.add('hidden')
    displayBanner()
    bannerDisplay.classList.remove('hidden')
  }
}

function removeNomination(event){
  let indexOf = nominatedFilms.indexOf(movie => movie.imdbID === event.target.id)
  nominatedFilms.splice(indexOf, 1)
  displayBanner()
}



//DOM HELPERS
function createGrid(){
  nomCount.innerText = 'Nominate 5 Films...'
  displayGrid.innerHTML = ''
  movieData.forEach(movie => {
  displayGrid.innerHTML += `
  <article class="card-grid">
      <div class="image-wrapper">
        <img class="image" src="${movie.Poster}" alt="nominate for an award">
      </div>
        <h4 class="movie-title">${movie.Title}</h4>
        <h4 class="year-title">Year: ${movie.Year}</h4>
        <button id='${movie.imdbID}' class='nominate-button'>Nominate</button>
  </article>
  `
  })
  let nominateButton = document.querySelectorAll('.nominate-button')

  nominateButton.forEach(button => {
    button.addEventListener('click', nominateMovie)
  })
}

function displayBanner(){
  searchInput.classList.add('hidden')
  inputLabel.classList.add('hidden')
  searchButton.classList.add('hidden')
  introTitle.innerText = "Your Nominations Are..."
  nomCount.innerText = "Thanks for your Nominations!"
  bannerDisplay.innerHTML = ''
  nominatedFilms.forEach(nom => {
    bannerDisplay.innerHTML +=  `
      <article class="nominated-card">
          <div class="image-wrapper-nom">
            <img class="nom-image" src="${nom.Poster}" alt="nominate for an award">
          </div>
            <h2 class="nom-title">${nom.Title}</h4>
            <h3 class="nom-year">Year: ${nom.Year}</h4>
            <div class="nom-foot">
            <h4 class="final-result hidden">Nominated</h4>
            <button id='${nom.imdbID}' class='remove-nominate-button'>Remove Nomination</button>
            </div>
      </article>
      `
  })

  let removeNominationButton = document.querySelectorAll('.remove-nominate-button')

  removeNominationButton.forEach(button => {
    button.addEventListener('click', removeNomination)
  })

  let finalResults = document.querySelectorAll('.final-results')


  // if(nominatedFilms.length === 5){
  //   removeNominationButton.classList.add('hidden')
  //   finalResults.classList.remove('hidden')
  // }
}
