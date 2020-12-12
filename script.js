'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let playing;

// Refactoring functions
const switchPlayer = function () {
  // Switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // Remove the classe if there or add it if not (toggle)
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  // Variables
  // Store scores on hold
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Visuals reset
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Rolling dice feature
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Because of the toggler
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();

  /*
  // 1. Restore current values
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // 2. Restor value on hold
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  scores = [0, 0];

  // 3. Hide Dice
  diceEl.classList.add('hidden');

  // 4. Put the white layout on player 1
  if (!playing) {
    if (
      document.querySelector('.player--0').classList.contains('player--winner')
    ) {
      document.querySelector('.player--0').classList.remove('player--winner');
      player0El.classList.add('player--active');
    } else if (
      document.querySelector('.player--1').classList.contains('player--winner')
    ) {
      document.querySelector('.player--1').classList.remove('player--winner');
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    }
  } else {
    if (
      !document.querySelector('.player--0').classList.contains('player--active')
    ) {
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    }
  }

  // 5. Restore 'playing' boolean to 'true' and active player as 0
  playing = true;
  activePlayer = 0;
  */
});
