window.addEventListener('DOMContentLoaded', loadMovies);

document
  .querySelector('#movieForm')
  .addEventListener('submit', recommendMovies);
document.querySelector('#anotherMovieBtn').addEventListener('click', resetPage);

/* Moods I chose for each movie */
let predeterminedMoods = {
  'Castle in the Sky': 'adventurous',
  'Grave of the Fireflies': 'emotional',
  'My Neighbor Totoro': 'peaceful',
  "Kiki's Delivery Service": 'peaceful',
  'Only Yesterday': 'emotional',
  'Porco Rosso': 'adventurous',
  'Pom Poko': 'magical',
  'Whisper of the Heart': 'peaceful',
  'Princess Mononoke': 'adventurous',
  'My Neighbors the Yamadas': 'peaceful',
  'Spirited Away': 'magical',
  'The Cat Returns': 'magical',
  "Howl's Moving Castle": 'magical',
  'Tales from Earthsea': 'mysterious',
  Ponyo: 'magical',
  Arrietty: 'peaceful',
  'From Up on Poppy Hill': 'peaceful',
  'The Wind Rises': 'emotional',
  'The Tale of the Princess Kaguya': 'emotional',
  'When Marnie Was There': 'mysterious',
  'The Red Turtle': 'mysterious',
  'Earwig and the Witch': 'magical',
};

let movies = [];

async function loadMovies() {
  try {
    let url = 'https://ghibli-api.vercel.app/api/films';
    let response = await fetch(url);

    let data = await response.json();

    movies = data.data;

    /* Manipulate data to include a mood for each movie */
    movies.forEach((movie) => {
      movie.mood = predeterminedMoods[movie.title] || 'none';
    });
  } catch (error) {
    console.error(error);
  }
}

function recommendMovies() {
  event.preventDefault();
  let moodError = document.querySelector('#moodError');
  moodError.textContent = '';
  document.querySelector('#mood').classList.remove('is-invalid');

  let moodSelected = document.querySelector('#mood').value;

  if (moodSelected === '') {
    moodError.textContent = 'Please select a mood.';
    document.querySelector('#mood').classList.add('is-invalid');
    return;
  }

  let movieRecommendations = movies.filter(
    (movie) => movie.mood === moodSelected,
  );

  let randomMovie =
    movieRecommendations[
      Math.floor(Math.random() * movieRecommendations.length)
    ];

  displayMovie(randomMovie);
}

function displayMovie(movie) {
  let movieCard = document.querySelector('#movieCard');
  movieCard.classList.remove('d-none');

  let formCard = document.querySelector('#formCard');
  formCard.classList.add('d-none');

  let moviePoster = document.querySelector('#moviePoster');
  let movieTitle = document.querySelector('#movieTitle');
  let movieScore = document.querySelector('#movieScore');
  let movieDirector = document.querySelector('#movieDirector');
  let movieYear = document.querySelector('#movieYear');
  let movieRuntime = document.querySelector('#movieRuntime');
  let movieDescription = document.querySelector('#movieDescription');

  moviePoster.src = movie.image;
  movieTitle.innerHTML = movie.title;
  movieScore.innerHTML = `${movie.rt_score}%`;
  movieDirector.innerHTML = movie.director;
  movieYear.innerHTML = movie.release_date;
  movieRuntime.innerHTML = movie.running_time;
  movieDescription.innerHTML = movie.description;
}

function resetPage() {
  event.preventDefault();
  let movieCard = document.querySelector('#movieCard');
  movieCard.classList.add('d-none');

  let formCard = document.querySelector('#formCard');
  formCard.classList.remove('d-none');

  document.querySelector('#mood').value = '';
}
