function checkWinnerTopRightDiagonal(rowIndex, columnIndex, board) {
  const topRightIndex = [rowIndex, columnIndex];
  const bottomLeftIndex = [rowIndex, columnIndex];
  console.log(topRightIndex)
  while (topRightIndex[0] !== 0 && topRightIndex[1] !== board.length[0]-1) {
    topRightIndex[0] -= 1;
    topRightIndex[1] += 1;
    console.log(topRightIndex)
  }
  while (bottomLeftIndex[0] !== board.length -1 && bottomLeftIndex[1] !== 0) {
    bottomLeftIndex[0] += 1;
    bottomLeftIndex[1] -= 1;
  }
  distance = topRightIndex[1] - bottomLeftIndex[1];
  //console.log(distance)
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

 


board = [
  [null, 'red', null, null, null],
  [null, null, 'red', null, null],
  [null, null, null, 'red', null],
  [null, null, null, null, 'red'],
  [null, null, null, null, null],
]
console.log(checkWinnerNegativeDiagonal(0, 1, board))