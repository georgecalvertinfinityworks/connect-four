const $ = require('jquery');
const {
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
} = require('../server/logicfunctions.js');

const {
  gameState,
} = require('../server/server.js');

const each = require('jest-each').default;

test('create board creates the correct board', () => {
  const numberOfRows = 3;
  const numberOfColumns = 4;
  const testGameState = {
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
    ],
  };

  actualOutput = createBoard(numberOfRows, numberOfColumns, testGameState);

  expect(actualOutput).toStrictEqual(expectedOutput);
});

test('place counter, places counter correctly', () => {
  // Arrange
  gameState.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  gameState.player = 'red';
  const expectedOutput = 'red';

  // Act
  const Output = placeCounter(2, gameState);
  // Assert
  expect(Output.board[2][2]).toBe('red');
});

test('reset Game functions resets the game when a game is won', () => {
  // Arrange
  gameState.board = [
    ['red', null, null, null],
    ['yellow', null, null, null],
    ['red', 'red', 'red', 'red'],
  ];
  gameState.gameWon = true;

  expectedBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  const actualOutput = resetGame(gameState);

  // Assert
  expect(actualOutput.board).toEqual(expectedBoard);
  expect(actualOutput.gameWon).toBe(false);
});

describe('Horizontal Win works', () => {
  let board1 = [
    [null, null, null, null],
    ['yellow', null, 'yellow', 'yellow'],
    ['red', 'red', 'red', 'red'],
  ];
  let board2 = [
    [null, null, null, null, null],
    ['yellow', null, 'yellow', 'yellow', null],
    ['red', null, 'red', 'red', 'red'],
  ];
  each([
    [2, 1, board1, 'red'],
    [2, 4, board2, null],
  ]).it('Should returm the appropriate winner', (placedCounterRow, PlacedCounterColumn, passedBoard, expected) => {
    expect(
      checkWinnerHorizontal(placedCounterRow, PlacedCounterColumn, passedBoard),
    )
      .toBe(expected);
  });
});

test('Vertical Win Works', () => {
  // Arrange
  gameState.board = [
    ['yellow', null, null, null],
    ['yellow', 'red', null, null],
    ['yellow', 'red', null, null],
    ['yellow', 'red', 'red', null],
  ];
  // Act
  const actualOutput = checkWinnerVertical(0, 0, gameState.board);
  const expectedOutput = 'yellow';
  // Assert
  expect(actualOutput).toBe(expectedOutput);
});

describe('Positive Diagonal Win works', () => {
  board1 = [
    ['yellow', null, null, 'red'],
    ['yellow', null, 'red', 'red'],
    ['yellow', 'red', 'yellow', 'red'],
    ['red', 'yellow', 'red', 'yellow'],
  ];
  board2 = [
    ['yellow', null, null, 'red', 'red'],
    ['red', null, null, 'red', 'yellow'],
    ['yellow', null, 'red', 'red', 'yellow'],
    ['yellow', null, 'yellow', 'red', 'red'],
    ['red', 'yellow', 'red', 'yellow', 'yellow'],
  ];
  each([
    [0, 3, board1, 'red'],
    [0, 4, board2, null],
  ]).it('Should returm the appropriate winner', (placedCounterRow, PlacedCounterColumn, passedBoard, expected) => {
    expect(
      checkWinnerPositiveDiagonal(placedCounterRow, PlacedCounterColumn, passedBoard),
    )
      .toBe(expected);
  });
});

test('check winner negative diagonal works counter placed in middle', () => {
  // Arrange
  gameState.board = [
    ['yellow', null, null, 'red'],
    ['red', 'yellow', 'yellow', 'red'],
    ['yellow', 'red', 'yellow', 'red'],
    ['red', 'yellow', 'red', 'yellow'],
  ];
  // Act
  actualOutput = checkWinnerNegativeDiagonal(1, 1, gameState.board);
  expectedOutput = 'yellow';
  // Assert
  expect(actualOutput).toBe(expectedOutput);
});

test('check array contains win', () => {
  // Arrange
  const testArray = 'red,red,red,red';
  // Act
  expectedOutput = 'red';
  actualOutput = arrayIncludesWin(testArray);
  // Assert
  expect(actualOutput).toBe(expectedOutput);
});

test('check winner returns an updated game state for a read win', () => {
  // Arrange
  gameState.board = [
    ['yellow', null, null, null],
    ['yellow', 'red', null, null],
    ['yellow', 'red', null, null],
    ['yellow', 'red', 'red', null],
  ];
  // Act
  expectedOutput = { ...gameState };
  expectedOutput.gameWon = true;
  expectedOutput.player2wins = 1;
  expectedOutput.winner = 'yellow';
  actualOutput = checkWinner(0, 0, gameState);
  // Assert
  expect(actualOutput).toEqual(expectedOutput);
});
