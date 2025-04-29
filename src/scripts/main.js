'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const buttonStart = document.querySelector('.button.start');
const messageStart = document.querySelector('.message-start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const gameScore = document.querySelector('.game-score');
const gameScoreAdd = document.querySelector('.game-score-add');

let timerId;

function updatedTable() {
  const state = game.getState();
  const rows = document.querySelectorAll('.field-row');
  const currentScore = +gameScore.textContent || 0;
  const newScore = game.getScore();
  const scoreDiff = newScore - currentScore;

  if (scoreDiff > 0 && game.getStatus() !== 'idle') {
    gameScoreAdd.classList.remove('game-score-add--move');
    void gameScoreAdd.offsetWidth;
    clearTimeout(timerId);

    gameScoreAdd.textContent = `+${scoreDiff}`;
    gameScoreAdd.classList.add('game-score-add--move');

    timerId = setTimeout(() => {
      gameScoreAdd.classList.remove('game-score-add--move');
    }, 500);
  }

  gameScore.textContent = newScore;

  state.forEach((row, iRow) => {
    row.forEach((valueCell, iCell) => {
      const cell = rows[iRow].children[iCell];

      cell.className = 'field-cell';
      cell.textContent = '';

      if (valueCell > 0) {
        cell.textContent = valueCell;
        cell.classList.add(`field-cell--${valueCell}`);
      }
    });
  });

  if (game.getStatus() === 'win') {
    messageWin.classList.remove('hidden');
  } else if (game.getStatus() === 'lose') {
    messageLose.classList.remove('hidden');
  }
}

buttonStart.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    buttonStart.classList.remove('start');
    buttonStart.classList.add('restart');
    buttonStart.textContent = 'Restart';
    messageStart.classList.add('hidden');
  } else {
    buttonStart.classList.remove('restart');
    buttonStart.classList.add('start');
    buttonStart.textContent = 'Start';
    messageStart.classList.remove('hidden');
    messageLose.classList.add('hidden');
    messageWin.classList.add('hidden');
    game.restart();
  }
  updatedTable();
});

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
  }
  updatedTable();
});
