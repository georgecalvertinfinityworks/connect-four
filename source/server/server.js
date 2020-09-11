const gameState = {
  gameWon: false,
  player1wins: 0,
  player2wins: 0,
  player: 'red',
  numberOfTurns: 0,
  winner: null,
  board: [],
};

function createBoard(numberOfRows, numberOfColumns, gameState) {
  gameState.board = [];
  const rows = [];
  for (i = 0; i < numberOfColumns; i++) {
    rows.push(null);
  }
  for (i = 0; i < numberOfRows; i++) {
    const newRow = rows.slice();
    gameState.board.push(newRow);
  }
  // render(board);
  console.log(gameState);
  return gameState;
}

function placeCounter(column, gameState) {
  if (gameState.gameWon) {
    console.log('illegal move');
    return gameState;
  }
  for (let i = gameState.board.length - 1; i >= 0; i--) {
    if (gameState.board[i][column] === null) {
      gameState.board[i][column] = gameState.player;
      gameState.numberOfTurns += 1;
      if (gameState.player === 'red') {
        gameState.player = 'yellow';
      } else if (gameState.player === 'yellow') {
        gameState.player = 'red';
      }
      checkWinner(i, column, gameState);
      return gameState;
    }
  }
}

function resetGame(gameState) {
  gameState.gameWon = false;
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[i].length; j++) {
      gameState.board[i][j] = null;
    }
  }
  console.log('reset game was clicked');
  return gameState;
}

function checkWinnerHorizontal(row, column, board) {
  const checkRow = board[row].join('');
  if (checkRow.includes('redredredred')) {
    return 'red';
  } if (checkRow.includes('yellowyellowyellowyellow')) {
    return 'yellow';
  }
  return null;
}

function checkWinnerVertical(rowIndex, columnIndex, board) {
  const checkColumn = board.map((row) => row[columnIndex]).join('');
  // const checkColumn = board[:][column].join('')
  if (checkColumn.includes('redredredred')) {
    return 'red';
  } if (checkColumn.includes('yellowyellowyellowyellow')) {
    return 'yellow';
  }
  return null;
}

function checkWinnerPositiveDiagonal(rowIndex, columnIndex, board) {
  const topRightIndex = [rowIndex, columnIndex];
  const bottomLeftIndex = [rowIndex, columnIndex];
  while (topRightIndex[0] !== 0 && topRightIndex[1] !== board.length[0] - 1) {
    topRightIndex[0] -= 1;
    topRightIndex[1] += 1;
  }
  while (bottomLeftIndex[0] !== board.length - 1 && bottomLeftIndex[1] !== 0) {
    bottomLeftIndex[0] += 1;
    bottomLeftIndex[1] -= 1;
  }
  const distance = topRightIndex[1] - bottomLeftIndex[1];
  // console.log(distance)
  let checkDiagonal = [];
  for (let i = 0; i <= distance; i++) {
    checkDiagonal.push(board[bottomLeftIndex[0] - i][bottomLeftIndex[1] + i]);
  }
  checkDiagonal = checkDiagonal.join('');
  if (checkDiagonal.includes('redredredred')) {
    return 'red';
  } if (checkDiagonal.includes('yellowyellowyellowyellow')) {
    return 'yellow';
  }
  return null;
}
function checkWinnerNegativeDiagonal(rowIndex, columnIndex, board) {
  const topLeftIndex = [rowIndex, columnIndex];
  const bottomRightIndex = [rowIndex, columnIndex];
  while (topLeftIndex[0] !== 0 && topLeftIndex[1] !== 0) {
    topLeftIndex[0] -= 1;
    topLeftIndex[1] -= 1;
  }
  while (bottomRightIndex[0] !== board.length - 1 && bottomRightIndex[1] !== board.length - 1) {
    bottomRightIndex[0] += 1;
    bottomRightIndex[1] += 1;
  }
  distance = bottomRightIndex[1] - topLeftIndex[1];
  let checkDiagonal = [];
  for (let i = 0; i <= distance; i++) {
    checkDiagonal.push(board[bottomRightIndex[0] - i][bottomRightIndex[1] - i]);
  }
  checkDiagonal = checkDiagonal.join('');
  if (checkDiagonal.includes('redredredred')) {
    return 'red';
  } if (checkDiagonal.includes('yellowyellowyellowyellow')) {
    return 'yellow';
  }
  return null;
}

function checkWinner(i, j, gameState) {
  // row to left
  let winner = checkWinnerHorizontal(i, j, gameState.board);
  if (winner === 'red') {
    gameState.gameWon = true;
    gameState.winner = 'red';
    gameState.player1wins += 1;
    return gameState;
  } if (winner === 'yellow') {
    gameState.gameWon = true;
    gameState.winner = 'yellow';
    gameState.player2wins += 1;
    return gameState;
  }
  winner = checkWinnerVertical(i, j, gameState.board);
  if (winner === 'red') {
    gameState.gameWon = true;
    gameState.winner = 'red';
    gameState.player1wins += 1;
    return gameState;
  } if (winner === 'yellow') {
    gameState.gameWon = true;
    gameState.winner = 'yellow';
    gameState.player2wins += 1;
    return gameState;
  }

  winner = checkWinnerPositiveDiagonal(i, j, gameState.board);
  if (winner === 'red') {
    gameState.gameWon = true;
    gameState.winner = 'red';
    gameState.player1wins += 1;
    return gameState;
  } if (winner === 'yellow') {
    gameState.gameWon = true;
    gameState.winner = 'yellow';
    gameState.player2wins += 1;
    return gameState;
  }
  winner = checkWinnerNegativeDiagonal(i, j, gameState.board);
  if (winner === 'red') {
    gameState.gameWon = true;
    gameState.winner = 'red';
    gameState.player1wins += 1;
    return gameState;
  } if (winner === 'yellow') {
    gameState.gameWon = true;
    gameState.winner = 'yellow';
    gameState.player2wins += 1;
    return gameState;
  }
}

const express = require('express');
// const { createBoard } = require('../connectfour');
const app = express();

// use all from client
app.use(express.static('./client'));
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
app.listen(8080);
