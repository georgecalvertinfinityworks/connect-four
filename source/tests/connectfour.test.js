const $ = require('jquery');
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
} = require('../server/logicfunctions.js');

const each = require('jest-each').default;

test('create board creates the correct board', () => {
  let numberOfRows = 3
  let numberOfColumns = 4 
  const gameState = {
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
  expectedOutput = {
    gameWon: false,
    player1wins: 0,
    player2wins: 0,
    player1name: '',
    player2name: '',
    player: 'red',
    numberOfTurns: 0,
    winner: null,
    board: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]
  };

  actualOutput = createBoard(numberOfRows, numberOfColumns, gameState);

  expect(actualOutput).toStrictEqual(expectedOutput);
});
