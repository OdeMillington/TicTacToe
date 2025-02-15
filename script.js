// Game Board Object
const gameBoard = (() => {
    var board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const setplayerMarker = (boardRow, boardColumn, playerMarker) => {
        board[boardRow][boardColumn] = playerMarker;
    }

    const displayBoard = () => {
        console.log(board)
    }

    const resetBoard = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }

    const checkWin = (currentPlayer) => {
        
        let isWin = false;

        // Horizontal Win - Row 1
        if (board[0][0] == currentPlayer.playerMarker && board[0][1] == currentPlayer.playerMarker && board[0][2] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Horizontal Win - Row 2
        if (board[1][0] == currentPlayer.playerMarker && board[1][1] == currentPlayer.playerMarker && board[1][2] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Horizontal Win - Row 3
        if (board[2][0] == currentPlayer.playerMarker && board[2][1] == currentPlayer.playerMarker && board[2][2] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Vertical Win - Col 1
        if (board[0][0] == currentPlayer.playerMarker && board[1][0] == currentPlayer.playerMarker && board[2][0] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Vertical Win - Col 2
        if (board[0][1] == currentPlayer.playerMarker && board[1][1] == currentPlayer.playerMarker && board[2][1] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Vertical Win - Col 3
        if (board[0][2] == currentPlayer.playerMarker && board[1][2] == currentPlayer.playerMarker && board[2][2] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Diagonal Win - Bottom Left to Top Right
        if (board[2][0] == currentPlayer.playerMarker && board[1][1] == currentPlayer.playerMarker && board[0][2] == currentPlayer.playerMarker ) {
            isWin = true
        }

        // Diagonal Win - Top Left to Bottom Right
        if (board[0][0] == currentPlayer.playerMarker && board[1][1] == currentPlayer.playerMarker && board[2][2] == currentPlayer.playerMarker ) {
            isWin = true
        }

        if (isWin) {
            console.log(`${currentPlayer.name} Wins!`)
            gameRunning = false
        }

    }

    return {setplayerMarker, displayBoard, resetBoard, checkWin}
})()

// Player Objects
const Player = (name, playerMarker) => {
    const setName = (Newname) => {
        name = Newname;
    }

    let score = 0;

    const addScore = () => {
        score++
    }

    const getScore = () => {
        return score
    }

    return {setName, name, playerMarker, addScore, getScore}
    
}

playerOne = Player("playerOne", "X")
playerTwo = Player("playerTwo", "O")
let currentPlayerTracker = playerOne

const game = (currentPlayer) => {

    move = prompt("Where to Move?")

    gameBoard.setplayerMarker(move.split(" ")[0], move.split(" ")[1], currentPlayer.playerMarker)
    gameBoard.displayBoard();
    gameBoard.checkWin(currentPlayer)

    currentPlayerTracker = currentPlayer.name == "playerOne" ? currentPlayerTracker = playerTwo : currentPlayerTracker = playerOne

}

let gameRunning = true

while (gameRunning) {
    game(currentPlayerTracker)
}