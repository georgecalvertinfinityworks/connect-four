const { contains } = require("jquery")

class Board {
  numberOfRows
  numberOfColumns
  gameWon = false
  board = []
  winCounts: [0, 0]
  constructor(numberOfRows, numberOfColumns){
    this.numberOfRows = numberOfRows
    this.numberOfColumns = numberOfColumns
  }
  createBoard (){
    const rows = [];
  for (let i = 0; i < this.numberOfColumns; i++) {
    rows.push(null);
  }
  for (let i = 0; i < this.numberOfRows; i++) {
    const newRow = rows.slice();
    this.board.push(newRow);
  }
  console.log('done')
  }
  placeCounter(column, player){
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][column] === null) {
        board[i][column] = player;
  }
  }
  }
  resetGame(){
    this.createBoard()
    this.gameWon = false

  }
  checkWinner(row, column, board){
  }
  checkHorizontalWinner(row, column, board){
    const checkRow = board[row].join(' ')
    if checkRow.includes('redredredred')
      return [red, red, red, red]
  }
  checkVerticalWinner(row, column, board){
    

  }
  checkDiagonalWinner(row, column, board){

  }

}

$('#create-board').click(() => const board = new Board(($('#number-rows').val(), $('#number-columns').val())    
