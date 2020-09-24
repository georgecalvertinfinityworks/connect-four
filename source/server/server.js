const fs = require('fs').promises;
const {
  createBoard,
  placeCounter,
  resetGame,
  checkWinnerHorizontal,
  checkWinnerVertical,
  checkWinnerPositiveDiagonal,
  checkWinnerNegativeDiagonal,
  checkWinner,
  saveGameState,
  gameStateExists,
} = require('./logicfunctions.js');

let gameState = {
  gameWon: false,
  player1wins: 0,
  player2wins: 0,
  player1name: '',
  player2name: '',
  player: 'red',
  numberOfTurns: 0,
  winner: null,
  board: [],
};

const express = require('express');
// const { createBoard } = require('../connectfour');
const app = express();

// use all from client
app.use(express.static('./source/client'));
app.use(express.json());

app.post('/board/create', (req, res) => {
  res.json({
    result: createBoard(req.body.numberRows, req.body.numberColumns, gameState),
  });
});

app.post('/game/placecounter/', (req, res) => {
  res.json({
    result: placeCounter(req.body.j, gameState),
  });
});

app.get('/game/resetgame', (req, res) => {
  res.json({
    result: resetGame(gameState),
  });
});

app.put('/game/player1name', (req, res) => {
  res.json({
    result: gameState.player1name = req.body.player1name,
  });
});

app.put('/game/player2name', async (req, res) => {
  gameState.player2name = req.body.player2name
  gameState = await gameStateExists(gameState)
  res.json({
    result: gameState,
  });
});

app.get('/game/find', (req, res) => {
  res.json({
    result: gameStateExists(),
  });
});


if (process.env.NODE_ENV !== "test") {
  app.listen(3006, () => {
      console.log('server started on port 3006');
  });
}


module.exports = {
  gameState,
  app
};