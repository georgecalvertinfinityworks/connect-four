function createBoard(numberOfRows, numberOfColumns) {
  const board = [];
  const rows = [];
  for (i = 0; i < numberOfRows; i++) {
    rows.push(null);
  }
  for (i = 0; i < numberOfColumns; i++) {
    let newArray = rows.slice()
    board.push(newArray);
  }
  return board
}

const board = createBoard(4, 4);
console.log('before update', board);
board[0][0] = "x";
console.log('after update', board);
