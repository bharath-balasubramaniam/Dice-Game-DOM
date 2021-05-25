'use strict';
let currentScore = 0;
let current = 0;
let totalScore = [0, 0];
let playing = true;
//selecting elements
const score_1El = document.querySelector('#score--0');
const score_2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const newEl = document.querySelector('.btn--new');
const rollEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');
const howEl = document.querySelector('.btn--how');
const current_1El = document.getElementById('current--0');
const current_2El = document.getElementById('current--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
// starting conditions
score_1El.textContent = 0;
score_2El.textContent = 0;
diceEl.classList.add('hidden');
//player shift
const switchPlayer = () => {
  document.getElementById(`current--${current}`).textContent = 0;
  currentScore = 0;
  current === 0 ? (current = 1) : (current = 0);
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};
//add effect
const hidden = function () {
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('overlay').classList.remove('hidden');
};
const add = function () {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
};
//Rolling a dice
rollEl.addEventListener('click', () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${current}`).textContent = currentScore;
    } else if (dice === 1) {
      switchPlayer();
    }
  } else {
    diceEl.classList.add('hidden');
  }
});
// hold button
holdEl.addEventListener('click', () => {
  if (playing) {
    totalScore[current] += currentScore;
    if (totalScore[current] >= 100) {
      document.getElementById(`score--${current}`).textContent =
        totalScore[current];
      document
        .querySelector(`.player--${current}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${current}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      document.getElementById(`score--${current}`).textContent =
        totalScore[current];
      switchPlayer();
    }
  }
});
//new button
newEl.addEventListener('click', () => {
  document
    .querySelector(`.player--${current}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  playing = true;
  current_1El.textContent = 0;
  current_2El.textContent = 0;
  score_1El.textContent = 0;
  score_2El.textContent = 0;
  currentScore = 0;
  totalScore = [0, 0];
  current = 0;
});
howEl.addEventListener('click', () => hidden());
document.querySelector('.close-modal').addEventListener('click', () => add());
document.querySelector('#overlay').addEventListener('click', () => add());
document.addEventListener('keydown', () => add());
