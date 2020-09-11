const $ = require('jquery')

const { drawGrid, createBoard,  checkWinner, placeCounter, resetGame, updateDisplay } = require('./connectfour');
const each = require("jest-each").default;

test('create board creates the correct board', () => {
  board = [];
  numberOfColumns = 4;
  numberOfRows = 3;
  expectedOutput = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  actualOutput = createBoard(numberOfRows, numberOfColumns, board);

  expect(actualOutput).toStrictEqual(expectedOutput);
});