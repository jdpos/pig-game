'use strict';

//Selecionando elementos
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting conditions
const scores = [0, 0];
let currentScore;
let playing;
let activePlayer = 0;

const init = function () {
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  activePlayer = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Funcionalidade jogando o dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Jogando o dado
    const numberDice = Math.round(Math.random() * (6 - 1)) + 1;
    // Mostrando o dado na tela
    diceEl.src = `dice-${numberDice}.png`;
    diceEl.classList.remove('hidden');
    //Check se numberDice é igual a 1. Se verdadeiro, mude o jogador, se falso,
    // adicione e mostre no current score.

    if (numberDice !== 1) {
      currentScore += numberDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
