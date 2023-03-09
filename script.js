'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const congratsMessage = document.querySelectorAll('.Winner');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

const init = function () {
  // Starting Conditions
  diceEl.classList.add('hidden');

  // Additional Feature Added by me
  congratsMessage.forEach(element => {
    element.classList.add('hidden'); // Explanation: Since selecting multiple classes using querySelectorAll() method results into an Array that is why we need a iterative method which is forEach() meathod to loop through the array to Attach extra class .hidden one by one.
  });

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Default variables
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  // State variable
  playing = true;

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

// Functions
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice roll functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if dice is not 1
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      // Display new current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // else dice is equal to 1
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      // switch player
      switchPlayer();
    }
  }
});

// Hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add Current Score to total Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if score is greater or equal than 100
    if (scores[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');

      // Extra feature Added by me
      document
        .querySelector(`.win--${activePlayer}`)
        .classList.remove('hidden');

      playing = false;
    } else {
      switchPlayer();
      diceEl.classList.add('hidden');
    }
  }
});

// Reset button functionality
btnNew.addEventListener('click', init);
