// Define game variables

let gameWon = false;
let player1wins = 0;
let player2wins = 0;
let player = 'red';
let numberOfTurns = 0;
let board = []

$('#winner-count1').text(player1wins);
$('#winner-count2').text(player2wins);

function draw_grid(numberOfRows, numberOfColumns) {
  $('#grid').empty();
  const grid = document.getElementById('grid');
  for (let i = 0; i < numberOfRows; i++) {
    // create a new row element
    const row = document.createElement('div');
    row.className = 'row';
    row.id = `row-${i}`;
    // const row = $('<div />')
    //   .addClass('row')
    //   .attr('id', `row-${i}`)
    // place row in grid
    grid.appendChild(row);
    for (let j = 0; j < numberOfColumns; j++) {
      // create column element
      const column = document.createElement('div');
      column.className = 'column';
      column.id = `row-${i}-column-${j}`;
      // create circle element
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.id = `circle-row-${i}-column-${j}`;
      // place circle in column
      column.appendChild(circle);
      // place column in row
      row.appendChild(column);
      $(column).click(() => player = placeCounter(board, j, player, gameWon));
    }
  }
}

function createBoard(numberOfRows, numberOfColumns, board) {
  const rows = [];
  for (i = 0; i < numberOfColumns; i++) {
    rows.push(null);
  }
  for (i = 0; i < numberOfRows; i++) {
    const newRow = rows.slice();
    board.push(newRow);
  }
  return board;
}


function placeCounter(board, column, player, gameWon) {
    console.log(board)
  console.log('placed counter');
  if (gameWon) {
    return null;
  }
  $('#winner-display').css('display', 'none');
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][column] === null) {
      board[i][column] = player;
      $(`#circle-row-${i}-column-${column}`).css('background-color', player);
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
      $(`#circle-row-${i}-column-${j}`).css('background-color', 'white');
    }
  }
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
  gameWon = true;
  return gameWon;
}

function checkWinner(i, j, board) {
  // row to left
  if (board[i][j - 3]) {
    if ((board[i][j] === board[i][j - 1]) && (board[i][j - 1] === board[i][j - 2])
      && (board[i][j - 2] === board[i][j - 3]) && board[i][j] !== null) {
      updateDisplay(board[i][j]);
    }
  }
  // row to right
  if (board[i][j + 3]) {
    if ((board[i][j] === board[i][j + 1]) && (board[i][j + 1] === board[i][j + 2])
      && (board[i][j + 2] === board[i][j + 3]) && board[i][j] !== null) {
      updateDisplay(board[i][j]);
    }
  }
  // column up
  if (i - 3 >= 0) {
    if ((board[i][j] === board[i - 1][j]) && (board[i - 1][j] === board[i - 2][j])
      && (board[i - 2][j] === board[i - 3][j]) && board[i][j] !== null) {
      updateDisplay(board[i][j]);
    }
  }
  // column down
  if (i + 3 < board.length) {
    if ((board[i][j] === board[i + 1][j]) && (board[i + 1][j] === board[i + 2][j])
      && (board[i + 2][j] === board[i + 3][j]) && board[i][j] !== null) {
      updateDisplay(board[i][j]);
    }
  }
  // check diagonal up
  if (i - 3 >= 0) {
    // left
    if (j - 3 >= 0) {
      if (board[i][j] === board[i - 1][j - 1] && board[i - 1][j - 1] === board[i - 2][j - 2]
          && board[i - 2][j - 2] === board[i - 3][j - 3] && board[i][j] !== null) {
        updateDisplay(board[i][j]);
      }
    }
    // right
    if (j + 3 < board[i].length) {
      if (board[i][j] === board[i - 1][j + 1] && board[i - 1][j + 1] === board[i - 2][j + 2]
          && board[i - 2][j + 2] === board[i - 3][j + 3] && board[i][j] !== null) {
        updateDisplay(board[i][j]);
      }
    }
  }
  // down
  if (i + 3 < board.length) {
    // left
    if (j - 3 >= 0) {
      if (board[i][j] === board[i + 1][j - 1] && board[i + 1][j - 1] === board[i + 2][j - 2]
          && board[i + 2][j - 2] === board[i + 3][j - 3] && board[i][j] !== null) {
        updateDisplay(board[i][j]);
      }
    }
    // right
    if (j + 3 < board[i].length) {
      if (board[i][j] === board[i + 1][j + 1] && board[i + 1][j + 1] === board[i + 2][j + 2]
          && board[i + 2][j + 2] === board[i + 3][j + 3] && board[i][j] !== null) {
        updateDisplay(board[i][j]);
      }
    }
  }
}

// draw_grid(6, 7);

// click buttons

$('#create-board').click(() => createBoard($('#number-rows').val(), $('#number-columns').val(), board));
$('#create-board').click(() => draw_grid($('#number-rows').val(), $('#number-columns').val()));

$('#reset-button').click(() => resetGame(board));

// input for board sizes - fix

// display winner

// ask about nested loop when listening for click.
