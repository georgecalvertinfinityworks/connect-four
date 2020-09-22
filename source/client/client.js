function render(gameState) {
  console.log(gameState)
  $('#grid').empty();
  for (let i = 0; i < gameState.board.length; i++) {
    const row = $('<div />')
      .addClass('row')
      .attr('id', `row-${i}`);
    // place row in grid
    $(grid).append(row);
    for (let j = 0; j < gameState.board[0].length; j++) {
      const column = $('<div />')
        .addClass('column')
        .attr('id', `row-${i}-column-${j}`);
      const circle = $('<div />')
        .addClass('circle')
        .attr('id', `circle-row-${i}-column-${j}`);
      $(column).append(circle);
      // place column in row
      $(row).append(column);
      if (gameState.board[i][j] !== null) {
        $(`#circle-row-${i}-column-${j}`).css('background-color', gameState.board[i][j]);
      }
      $(column).click(() => {
        const body = {
          j,
        };
        $.ajax({
          type: 'POST',
          url: '/game/placecounter/',
          data: JSON.stringify(body),
          contentType: 'application/json',
          success: (result) => {
            render(result.result);
          },
        });
      });
    }
    $('#winner-count1').text(gameState.player1wins);
    $('#winner-count2').text(gameState.player2wins);
    if (gameState.gameWon === true) {
      $('#winner-name').text(gameState.winner);
      $('#winner-display').css('display', 'block');
      $('#whos-turn').css('display', 'none');
    } else {
      $('#winner-display').css('display', 'none');
      $('#player-name').text(`${gameState.player} it's your turn`);
      $('#whos-turn').css('display', 'block');
      if (gameState.player === 'yellow') {
        $('#player-name').text("🟡" + gameState.player2name + " it's your turn!🟡");
      } else {
        $('#player-name').text("🔴" + gameState.player1name + " it's your turn!🔴");
      }
    }
  }
}

$(() => {
  $('#create-board').click(() => {
    const numberRows = parseInt($('#number-rows').val());
    const numberColumns = parseInt($('#number-columns').val());
    const body = {
      numberRows,
      numberColumns,
    };
    $.ajax({
      type: 'POST',
      url: '/board/create',
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: (result) => {
        render(result.result);
      },
    });
  });
});


$(() => {
  const player1name = prompt("Welcome to connect four! Enter your unique user name player 1", "Player1")
  const body = {
    player1name,
  };
  $.ajax({
    type: 'PUT',
    url: '/game/player1name',
    data: JSON.stringify(body),
    contentType: 'application/json',
  });
});

$(() => {
  const player2name = prompt("Welcome to connect four! Enter your unique username player 2", "Player2")
  const body = {
    player2name,
  };
  $.ajax({
    type: 'PUT',
    url: '/game/player2name',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (result) => {
      render(result.result);
    },
  });
});

/*$(() => {
  $.ajax({
    type: 'GET',
    url: '/game/find',
    contentType: 'application/json',
    success: (result) => {
      render(result.result)
    }
  })
})*/


$(() => {
  $('#reset-button').click(() => {
    $.ajax({
      type: 'GET',
      url: '/game/resetgame',
      contentType: 'application/json',
      success: (result) => {
        render(result.result);
      },
    });
  });
});
