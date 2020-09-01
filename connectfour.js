function draw_grid(numberOfRows, numberOfColumns) {
    const grid = document.getElementById("grid")
    for (let i = 0; i < numberOfRows; i++) {
        //create a new row element
        let row = document.createElement("div")
        row.className = "row"
        row.id = "row-" + i
        //place row in grid
        grid.appendChild(row)
        for (let j = 0; j < numberOfColumns; j++) {
            //create column element
            let column = document.createElement("div")
            column.className = "column"
            column.id = "row-" + i + "-column-" + j;
            //create circle element
            const circle = document.createElement("div")
            circle.className = "circle"
            circle.id = "circle-row-" + i + "-column-" + j;
            //place circle in column
            column.appendChild(circle)
            //place column in row
            row.appendChild(column);
        }
    }
}

function placeCounter(board, column, player) {
    $("#winner-display").css("display", "none")
    for (let i = board.length - 1; i >= 0; i--) {
        if (board[i][column] === null) {
            board[i][column] = player
            $("#circle-row-" + i + "-column-" + column).css("background-color", player)
            numberOfTurns += 1
            checkWinner(i, column, board)
            if (numberOfTurns % 2 === 1) {
                return "yellow"
            } else {
                return "red"
            }
        } else {
            continue

            // return board (Connor: instead of returning player colours return boolean for successful placement then change board/player in loop below)
        }
    }
}

function resetGame(board) {
    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[i].length; j++) {
            board[i][j] = null
            $("#circle-row-" + i + "-column-" + j).css("background-color", "white")
        }
    }
    console.log("reset game was clicked")
    return board

}


draw_grid(6, 7)

//Define game variables
const board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

let player1wins = 0
let player2wins = 0
let player = "red"
let numberOfTurns = 0



for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
        $("#row-" + i + "-column-" + j).click(() => player = placeCounter(board, j, player))
    }
}



//const resetGameButton= document.getElementById("reset-button")
// resetGameButton.addEventListener("click", function () {resetGame(board)})

$("#reset-button").click(() => resetGame(board))


function checkWinner(i, j, board) {
    // row to left
    if (board[i][j - 3]) {
        if ((board[i][j] === board[i][j - 1]) && (board[i][j - 1] === board[i][j - 2]) && (board[i][j - 2] === board[i][j - 3]) && board[i][j] !== null) {
            updateDisplay(board[i][j])
        }
    }
    // row to right
    if (board[i][j + 3]) {
        if ((board[i][j] === board[i][j + 1]) && (board[i][j + 1] === board[i][j + 2]) && (board[i][j + 2] === board[i][j + 3]) && board[i][j] !== null) {
            updateDisplay(board[i][j])
        }
    }
    // column up
    if (i - 3 >= 0) {
        if ((board[i][j] === board[i - 1][j]) && (board[i - 1][j] === board[i - 2][j]) && (board[i - 2][j] === board[i - 3][j]) && board[i][j] !== null) {
            updateDisplay(board[i][j])
        }
    }
    // column down
    if (i + 3 < board.length) {
        if ((board[i][j] === board[i + 1][j]) && (board[i + 1][j] === board[i + 2][j]) && (board[i + 2][j] === board[i + 3][j]) && board[i][j] !== null) {
            updateDisplay(board[i][j])
        }
    }
    //check diagonal up
    if (i - 3 >= 0) {
        // left
        if (j - 3 >= 0) {
            if (board[i][j] === board[i - 1][j - 1] && board[i - 1][j - 1] === board[i - 2][j - 2] && board[i - 2][j - 2] === board[i - 3][j - 3] && board[i][j] !== null) {
                updateDisplay(board[i][j])
            }
        }
        // right
        if (j + 3 < board[i].length) {
            if (board[i][j] === board[i - 1][j + 1] && board[i - 1][j + 1] === board[i - 2][j + 2] && board[i - 2][j + 2] === board[i - 3][j + 3] && board[i][j] !== null) {
                updateDisplay(board[i][j])
            }
        }
    }
    //down
    if (i + 3 < board.length) {
        // left
        if (j - 3 >= 0) {
            if (board[i][j] === board[i + 1][j - 1] && board[i + 1][j - 1] === board[i + 2][j - 2] && board[i + 2][j - 2] === board[i + 3][j - 3] && board[i][j] !== null) {
                updateDisplay(board[i][j])
            }
        }
        // right
        if (j + 3 < board[i].length) {
            if (board[i][j] === board[i + 1][j + 1] && board[i + 1][j + 1] === board[i + 2][j + 2] && board[i + 2][j + 2] === board[i + 3][j + 3] && board[i][j] !== null) {
                updateDisplay(board[i][j])
            }
        }
    }
}



function updateDisplay(winner) {
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = winner;
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "block";
    resetGame(board)

}
// check winner

// what are we iterating over and when 

// input for board sizes - fix

// display winner 

// ask about nested loop when listening for click. 