//Query Selectors
let displayGrid = document.querySelector('.card-display');
let searchButton = document.querySelector('.search');
let searchInput = document.querySelector('.search-input');
let inputLabel = document.querySelector('.label');
let nomCount = document.querySelector('.nomination-count');
let bannerDisplay = document.querySelector('.banner-display');
let introTitle = document.querySelector('.intro-title');
let viewNominationsButton = document.querySelector('.view-nominations');
let returnHomeButton = document.querySelector('.return-home');

//EVENT HANDLERS
searchButton.addEventListener('click', submitSearch)
viewNominationsButton.addEventListener('click', displayBanner);
returnHomeButton.addEventListener('click', toggleViews);

//GLOBALS
let movieData = [];
let nominatedFilms = [];

// FETCH REQUESTS

function getData(inputValue){
  fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=be68040e`)
    .then(response => response.json())
    .then(data => {
      movieData = data.Search
      console.log(movieData)
      createGrid();
    })
    .catch(error => console.log(error))
}

function submitSearch(){
  getData(searchInput.value)
  introTitle.innerText = `Search Results for ${searchInput.value} `
  searchInput.value = ''
}

function nominateMovie(event){
  if(nominatedFilms.length < 4){
    event.target.disabled = true;
    event.target.innerText = `Nominated`
    nominatedFilms.push(movieData.find(movie => movie.imdbID === event.target.id))
    viewNominationsButton.classList.remove('hidden')
  } else if (nominatedFilms.length === 4) {
    nominatedFilms.push(movieData.find(movie => movie.imdbID === event.target.id))
    displayBanner()
  }
  let nominationsLeft = 5 - nominatedFilms.length;
  nomCount.innerText = `${nominationsLeft} Nominations Left...`
}

function removeNomination(event){
  let indexOf = nominatedFilms.indexOf(movie => movie.imdbID === event.target.id)
  nominatedFilms.splice(indexOf, 1)
  displayBanner()
}

function toggleViews(){
  displayGrid.classList.remove('hidden')
  bannerDisplay.classList.add('hidden')
  searchInput.classList.remove('hidden')
  viewNominationsButton.classList.remove('hidden')
  returnHomeButton.classList.add('hidden')
  inputLabel.classList.remove('hidden')
  searchButton.classList.remove('hidden')
  introTitle.innerText = "Search Results..."
  if(movieData.length === 5){
    nomCount.innerText = "Thanks for your Nominations!"
  } else
  nomCount.innerText = `${nominationsLeft} Nominations Left...`
}



//DOM HELPERS

function createGrid(movieSearchResults){
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

  if(nominatedFilms.length < 4){
    returnHomeButton.classList.remove('hidden')
    let nominationsLeft = 5 - nominatedFilms.length;
    nomCount.innerText = `${nominationsLeft} Nominations Left...`
    introTitle.innerText = "Your Current Nominations..."
  } else {
    returnHomeButton.classList.add('hidden')
    introTitle.innerText = "Your Nominations Are..."
    nomCount.innerText = "Thanks for your Nominations!"
  }

  displayGrid.classList.add('hidden')
  bannerDisplay.classList.remove('hidden')
  searchInput.classList.add('hidden')
  viewNominationsButton.classList.add('hidden')
  inputLabel.classList.add('hidden')
  searchButton.classList.add('hidden')
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
    if(nominatedFilms.length > 4){
      button.classList.add('hidden')
    }
  })

  let finalResults = document.querySelectorAll('.final-results')
  finalResults.forEach(e => {
    if(nominatedFilms.length > 4){
      e.classList.remove('hidden')
    }
  })
}
