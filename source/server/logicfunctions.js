const { gameState } = require('./server');

const fs = require('fs').promises;

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
  return gameState;
}

function placeCounter(column, gameState) {
  console.log(column, gameState);
  if (gameState.gameWon) {
    console.log('illegal move');
    return gameState;
  }
  if (gameState.board[0][column] !== null) {
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
      saveGameState(gameState);
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
  return gameState;
}

function arrayIncludesWin(array) {
  if (array.includes('redredredred')) {
    return 'red';
  }
  if (array.includes('yellowyellowyellowyellow')) {
    return 'yellow';
  }
  return null;
}

function checkWinnerHorizontal(row, column, board) {
  const checkRow = board[row].join('');
  return arrayIncludesWin(checkRow);
}

function checkWinnerVertical(rowIndex, columnIndex, board) {
  const checkColumn = board.map((row) => row[columnIndex]).join('');
  return arrayIncludesWin(checkColumn);
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
  let checkDiagonal = [];
  for (let i = 0; i <= distance; i++) {
    checkDiagonal.push(board[bottomLeftIndex[0] - i][bottomLeftIndex[1] + i]);
  }
  checkDiagonal = checkDiagonal.join('');
  return arrayIncludesWin(checkDiagonal);
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
  return arrayIncludesWin(checkDiagonal);
}

function checkWinner(i, j, gameState) {
  const winners = [];
  winners.push(checkWinnerHorizontal(i, j, gameState.board));
  winners.push(checkWinnerVertical(i, j, gameState.board));
  winners.push(checkWinnerNegativeDiagonal(i, j, gameState.board));
  winners.push(checkWinnerPositiveDiagonal(i, j, gameState.board));
  if (winners.includes('red')) {
    gameState.gameWon = true;
    gameState.winner = 'red';
    gameState.player1wins += 1;
    return gameState;
  }
  if (winners.includes('yellow')) {
    gameState.gameWon = true;
    gameState.winner = 'yellow';
    gameState.player2wins += 1;
    return gameState;
  }
}

async function saveGameState(gameState) {
  await fs.writeFile('/Users/george/gamestates.json', JSON.stringify(gameState), 'utf-8');
}

async function gameStateExists(gameState) {
  try {
    const data = await fs.readFile('/Users/george/gamestates.json', 'utf-8');
    savedGameState = JSON.parse(data);
    console.log(savedGameState.player1name, savedGameState.player2name);
    console.log(gameState.player1name, gameState.player2name);
    if (gameState.player1name === savedGameState.player1name && gameState.player2name === savedGameState.player2name) {
      gameState = savedGameState;
    } else {
      gameState.gameState = false
      gameState.player1wins = 0;
      gameState.player2wins = 0;
      gameState.player = 'red';
      gameState.numberOfTurns = 0;
      gameState.winner = null;
      gameState.board = [];
    }
  } finally {
    return gameState;
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    createBoard,
    placeCounter,
    resetGame,
    arrayIncludesWin,
    checkWinnerHorizontal,
    checkWinnerVertical,
    checkWinnerPositiveDiagonal,
    checkWinnerNegativeDiagonal,
    checkWinner,
    saveGameState,
    gameStateExists,
  };
}
