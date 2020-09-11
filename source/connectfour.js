// Define game variables

// const { noConflict } = require('jquery');

let gameWon = false;
let player1wins = 0;
let player2wins = 0;
let player = 'red';
let numberOfTurns = 0;
const board = [];

$('#winner-count1').text(player1wins);
$('#winner-count2').text(player2wins);

function createBoard(numberOfRows, numberOfColumns, board) {
  const rows = [];
  for (i = 0; i < numberOfColumns; i++) {
    rows.push(null);
  }
  for (i = 0; i < numberOfRows; i++) {
    const newRow = rows.slice();
    board.push(newRow);
  }
  render(board);
  return board;
}

/* function draw_grid(numberOfRows, numberOfColumns) {
  $('#grid').empty();
  // const grid = document.getElementById('grid');
  const grid = $('#grid');
  for (let i = 0; i < numberOfRows; i++) {
    // create a new row element
    // const row = document.createElement('div');
    // row.className = 'row';
    // row.id = `row-${i}`;
    const row = $('<div />')
      .addClass('row')
      .attr('id', `row-${i}`);
    // place row in grid
    $(grid).append(row);
    for (let j = 0; j < numberOfColumns; j++) {
      // create column element
      const column = $('<div />')
        .addClass('column')
        .attr('id', `row-${i}-column-${j}`);
      // create circle element
      const circle = $('<div />')
        .addClass('circle')
        .attr('id', `circle-row-${i}-column-${j}`);
      // place circle in column
      $(column).append(circle);
      // place column in row
      $(row).append(column);
      $(column).click(() => player = placeCounter(board, j, player, gameWon));
    }
  }
} */

function render(board) {
  $('#grid').empty();
  for (let i = 0; i < board.length; i++) {
    const row = $('<div />')
      .addClass('row')
      .attr('id', `row-${i}`);
      // place row in grid
    $(grid).append(row);
    for (let j = 0; j < board[0].length; j++) {
      const column = $('<div />')
        .addClass('column')
        .attr('id', `row-${i}-column-${j}`);
      const circle = $('<div />')
        .addClass('circle')
        .attr('id', `circle-row-${i}-column-${j}`);
      $(column).append(circle);
      // place column in row
      $(row).append(column);
      if (board[i][j] !== null) {
        console.log(board[i][j]);
        $(`#circle-row-${i}-column-${j}`).css('background-color', board[i][j]);
      }
      $(column).click(() => player = placeCounter(board, j, player, gameWon));
    }
  }
  console.log('render complete');
}

function placeCounter(board, column, player, gameWon) {
  if (gameWon) {
    return null;
  }
  $('#winner-display').css('display', 'none');
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][column] === null) {
      board[i][column] = player;
      render(board);
      numberOfTurns += 1;
      checkWinner(i, column, board);
      if (numberOfTurns % 2 === 1) {
        return 'yellow';
      }
      return 'red';
    }
    continue;
  }
}

function resetGame(board) {
  gameWon = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }
  render(board);
  console.log('reset game was clicked');
  return board;
}

function updateDisplay(winner) {
  if (winner === 'red') {
    player1wins += 1;
  }
  if (winner === 'yellow') {
    player2wins += 1;
  }
  $('#winner-name').text(winner);
  $('#winner-display').css('display', 'block');
  $('#winner-count1').text(player1wins);
  $('#winner-count2').text(player2wins);
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
  distance = topRightIndex[1] - bottomLeftIndex[1];
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
  // console.log(topRightIndex);
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

function checkWinner(i, j, board) {
  // row to left
  let winner = checkWinnerHorizontal(i, j, board);
  if (winner === 'red') {
    updateDisplay('red');
    gameWon = true;
    return gameWon;
  } if (winner === 'yellow') {
    updateDisplay('yellow');
    gameWon = true;
    return gameWon;
  }
  winner = checkWinnerVertical(i, j, board);
  if (winner === 'red') {
    updateDisplay('red');
    gameWon = true;
    return gameWon;
  } if (winner === 'yellow') {
    updateDisplay('yellow');
    gameWon = true;
    return gameWon;
  }

  winner = checkWinnerPositiveDiagonal(i, j, board);
  if (winner === 'red') {
    updateDisplay('red');
    gameWon = true;
    return gameWon;
  } if (winner === 'yellow') {
    updateDisplay('yellow');
    gameWon = true;
    return gameWon;
  }
  winner = checkWinnerNegativeDiagonal(i, j, board);
  if (winner === 'red') {
    updateDisplay('red');
    gameWon = true;
    return gameWon;
  } if (winner === 'yellow') {
    updateDisplay('yellow');
    gameWon = true;
    return gameWon;
  }
}

$('#create-board').click(() => createBoard($('#number-rows').val(), $('#number-columns').val(), board));
// $('#create-board').click(() => draw_grid($('#number-rows').val(), $('#number-columns').val()));

$('#reset-button').click(() => resetGame(board));

if (typeof module !== 'undefined') {
  module.exports = {
    createBoard,
    render,
    placeCounter,
    resetGame,
    updateDisplay,
    checkWinnerHorizontal,
    checkWinnerVertical,
    checkWinnerNegativeDiagonal,
    checkWinnerPositiveDiagonal,
    checkWinner,
  };
}
