const request = require('supertest');
const {
  gameState,
  app,
} = require('../server/server.js');

describe('POST /board/create', () => {
  let expectedResult = { ...gameState };
  expectedResult.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  expectedResult = { result: expectedResult };
  it('should return a game state with board as a 5 row 4 column array', (done) => {
    request(app)
      .post('/board/create')
      .send({
        numberRows: 5,
        numberColumns: 4,
      })
      .expect(200, expectedResult)
      .end(done);
  });
});

describe('POST /game/placecounter', () => {
  let expectedResult = { ...gameState };
  expectedResult.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, 'red', null],
  ];
  expectedResult.numberOfTurns = 1;
  expectedResult.player = 'yellow';
  expectedResult = { result: expectedResult };
  it('Should return a game state with counter added to correct column', (done) => {
    request(app)
      .post('/game/placecounter')
      .send({
        j: 2
      })
      .expect(200, expectedResult)
      .end(done);
  });
});

describe('GET /game/resetgame', () => {
  let expectedResult = { ...gameState };
  expectedResult.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  expectedResult.numberOfTurns = 1;
  expectedResult.player = 'yellow';
  expectedResult = { result: expectedResult };
  it('Should return a game state with a board of nulls', (done) => {
    request(app)
      .get('/game/resetgame')
    // .send({
    // })
      .expect(200, expectedResult)
      .end(done);
  });
});

describe('PUT /game/player1name', () => {
  let expectedResult = { ...gameState }
  expectedResult.player1name = 'George'
  expectedResult = { result: expectedResult }
  it('Will update player 1 name and send a 200 sucess back', (done) => {
    request(app)
    .put('/game/player1name')
    .expect(200)
    .end(done)
  })
})

describe('PUT /game/player2name', () => {
  let expectedResult = { ...gameState }
  expectedResult.player1name = 'George2'
  expectedResult = { result: expectedResult }
  it('Will update player 2 name and send a 200 success back', (done) => {
    request(app)
    .put('/game/player1name')
    .expect(200)
    .end(done)
  })
})
