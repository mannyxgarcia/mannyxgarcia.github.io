//Event Listeners
document.querySelector('#guessBtn').addEventListener('click', checkGuess);
document.querySelector('#resetBtn').addEventListener('click', initializeGame);

// Global Variables
let randomNumber;
let attempts = 0;
let remainingGuesses = 7;

let totalWins = 0;
let totalLosses = 0;
let previousGuesses = [];

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  // console.log('randomNumber: ' + randomNumber);
  attempts = 0;
  remainingGuesses = 7;
  previousGuesses = [];

  //hiding the Reset button
  document.querySelector('#resetBtn').style.display = 'none';

  //showing the Guess button
  document.querySelector('#guessBtn').style.display = 'inline';

  //Set number of guesses left
  document.querySelector('#guessesRemaining').textContent =
    remainingGuesses + ' Guesses Remain';

  //set wins and losses
  document.querySelector('#wins').textContent = totalWins + ' won';
  document.querySelector('#losses').textContent = totalLosses + ' lost';

  let playerGuess = document.querySelector('#playerGuess');
  playerGuess.focus(); //adding focus to the textbox
  playerGuess.value = ''; //clearing the textbox

  let feedback = document.querySelector('#feedback');
  feedback.textContent = ''; //clearing the feedback

  //clearing the previous guesses
  document.querySelector('#guesses').textContent = '';
}

function checkGuess() {
  let feedback = document.querySelector('#feedback');
  feedback.textContent = '';

  let guess = Number(document.querySelector('#playerGuess').value);

  // Validate input
  if (guess < 1 || guess > 99) {
    feedback.textContent = 'Enter a number between 1 and 99';
    feedback.style.color = 'red';
    return;
  }

  if (isNaN(guess)) {
    feedback.textContent = 'Please enter a valid number.';
    feedback.style.color = 'red';
    return;
  }

  if (previousGuesses.includes(guess)) {
    feedback.textContent = 'You already guessed that number!';
    feedback.style.color = 'red';
    return;
  }

  attempts++;
  remainingGuesses--;
  previousGuesses.push(guess);

  // Display previous guesses
  document.querySelector('#guesses').textContent = previousGuesses.join(', ');

  document.querySelector('#guessesRemaining').textContent =
    remainingGuesses + ' Guesses Remain';

  if (guess == randomNumber) {
    feedback.textContent = 'You guessed it! You Won!';
    feedback.style.color = 'darkgreen';
    totalWins += 1;
    document.querySelector('#wins').textContent = totalWins + ' won';
    gameOver();
  } else if (attempts == 7) {
    feedback.textContent = 'Sorry, you lost!';
    feedback.style.color = 'red';
    totalLosses += 1;
    document.querySelector('#losses').textContent = totalLosses + ' lost';
    gameOver();
  } else if (guess > randomNumber) {
    feedback.textContent = 'Guess was too high!';
    feedback.style.color = 'orange';
  } else {
    feedback.textContent = 'Guess was too low!';
    feedback.style.color = 'orange';
  }

  // clear the input box and focus it for the next guess
  document.querySelector('#playerGuess').value = '';
  document.querySelector('#playerGuess').focus();
}

function gameOver() {
  let guessBtn = document.querySelector('#guessBtn');
  let resetBtn = document.querySelector('#resetBtn');
  guessBtn.style.display = 'none'; //hides Guess button
  resetBtn.style.display = 'inline'; //displays Reset button
}
