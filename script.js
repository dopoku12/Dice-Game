"use strict";
const playingOne = document.querySelector(".player--0");
const playingTwo = document.querySelector(".player--1");
const ScoreOne = document.querySelector("#score--0");
const ScoreTwo = document.querySelector("#score--1");
const btnRoll = document.querySelector(".btn--roll");
const TheDice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

const currentOne = document.querySelector("#current--0");
//or document.getElementById('current--0')
const currentTwo = document.querySelector("#current--1");

let scores, currentScore, activePlayer, playing;
// Starting conditions//

const init = function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  playing = true;
  playingOne.classList.add("player--active");
  playingOne.classList.remove("player--winner");
  playingTwo.classList.remove("player--active");
  playingTwo.classList.remove("player--winner");
  TheDice.classList.add("hidden");
  ScoreOne.textContent = 0;
  ScoreTwo.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();
const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playingOne.classList.toggle("player--active");
  playingTwo.classList.toggle("player--active");
};
//When you click Roll Dice

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // Display dice
    TheDice.classList.remove("hidden");
    TheDice.src = `img/dice-${dice}.png`;

    // ScoreOne.textContent = dice;

    //check for rolled dice
    if (dice !== 1) {
      //Add dice to current score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      currentScore += dice;
    } else {
      //Switch the player
      switchPlayer();
    }
  }
});
//when you click Hold
btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add current score to active Player's score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores);
    //2. check if player score is>= 100
    if (scores[activePlayer] >= 100) {
      //finish game
      TheDice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//When you click New Game//
btnNew.addEventListener("click", function () {
  init();
});
