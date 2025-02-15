// Game Board Object
const gameBoard = (() => {
  var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const setplayerMarker = (boardRow, boardColumn, playerMarker) => {
    if (board[boardRow][boardColumn] == "") {
      board[boardRow][boardColumn] = playerMarker;
    } else {
      console.log("Already Full");
      if (currentPlayerTracker.name == "playerOne") {
        currentPlayerTracker = playerTwo;
      } else {
        currentPlayerTracker = playerOne;
      }
    }
  };

  const displayBoard = () => {
    console.log(board);
  };

  const resetGame = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    squares.forEach((square) => {
      square.innerHTML = "";
    });

    // Starts back from player one
    currentPlayerTracker = playerOne;

    controlMoveIdent()
  };

  const checkWin = (currentPlayer) => {
    let isWin = false;

    // Horizontal Win - Row 1
    if (
      board[0][0] == currentPlayer.playerMarker &&
      board[0][1] == currentPlayer.playerMarker &&
      board[0][2] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Horizontal Win - Row 2
    if (
      board[1][0] == currentPlayer.playerMarker &&
      board[1][1] == currentPlayer.playerMarker &&
      board[1][2] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Horizontal Win - Row 3
    if (
      board[2][0] == currentPlayer.playerMarker &&
      board[2][1] == currentPlayer.playerMarker &&
      board[2][2] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Vertical Win - Col 1
    if (
      board[0][0] == currentPlayer.playerMarker &&
      board[1][0] == currentPlayer.playerMarker &&
      board[2][0] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Vertical Win - Col 2
    if (
      board[0][1] == currentPlayer.playerMarker &&
      board[1][1] == currentPlayer.playerMarker &&
      board[2][1] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Vertical Win - Col 3
    if (
      board[0][2] == currentPlayer.playerMarker &&
      board[1][2] == currentPlayer.playerMarker &&
      board[2][2] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Diagonal Win - Bottom Left to Top Right
    if (
      board[2][0] == currentPlayer.playerMarker &&
      board[1][1] == currentPlayer.playerMarker &&
      board[0][2] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    // Diagonal Win - Top Left to Bottom Right
    if (
      board[0][0] == currentPlayer.playerMarker &&
      board[1][1] == currentPlayer.playerMarker &&
      board[2][2] == currentPlayer.playerMarker
    ) {
      isWin = true;
    }

    if (isWin) {
      const modal = document.querySelector(".modal");
      modal.setAttribute("style", "display:inline");
      const winnerText = document.querySelector(".winner");
      winnerText.textContent = `${currentPlayer.name} Wins!`;

      setTimeout(() => {
        modal.setAttribute("style", "display:none");
        currentPlayer.addScore();

        const playerOneScore = document.querySelector("#playerOneScore");
        const playerTwoScore = document.querySelector("#playerTwoScore");

        playerOneScore.textContent = playerOne.getScore();
        playerTwoScore.textContent = playerTwo.getScore();

        gameBoard.resetGame();
      }, 2000);
    }
  };

  return { setplayerMarker, displayBoard, resetGame, checkWin };
})();

// Player Objects
const Player = (name, playerMarker) => {
  const setName = (Newname) => {
    name = Newname;
  };

  let score = 0;

  const addScore = () => {
    score++;
  };

  const getScore = () => {
    return score;
  };

  return { setName, name, playerMarker, addScore, getScore };
};

playerOne = Player("playerOne", "X");
playerTwo = Player("playerTwo", "O");
let currentPlayerTracker = playerOne;

function controlMoveIdent() {
  const moveIdentLeft = document.querySelector(".moveIdentLeft");
  const moveIdentRight = document.querySelector(".moveIdentRight");

  if (currentPlayerTracker.name == "playerOne") {
    moveIdentLeft.setAttribute("style", "display:block");
    moveIdentRight.setAttribute("style", "display:none");
  } else {
    moveIdentLeft.setAttribute("style", "display:none");
    moveIdentRight.setAttribute("style", "display:block");
  }
}

const game = (currentPlayer) => {
  gameBoard.displayBoard();
  gameBoard.checkWin(currentPlayer);

  currentPlayerTracker =
    currentPlayer.name == "playerOne"
      ? (currentPlayerTracker = playerTwo)
      : (currentPlayerTracker = playerOne);

  controlMoveIdent();
};

function registerMove(square) {
  // className comes is as : box top-l
  // so moveRow will become the row it's in E.G top, mid, bottom
  moveRow = square.className.split(" ")[1].split("-")[0];
  moveRow = moveRow == "top" ? 0 : moveRow == "mid" ? 1 : 2;

  moveColumn = square.className.split(" ")[1].split("-")[1];
  moveColumn = moveColumn == "l" ? 0 : moveColumn == "m" ? 1 : 2;

  // Show Move Graphically
  const markerItem = document.createElement("p");
  markerItem.classList.add("markerItem");

  markerItem.innerHTML = currentPlayerTracker.playerMarker;

  if (currentPlayerTracker.playerMarker == "X") {
    markerItem.setAttribute("style", "color:#f38ba8");
  } else {
    markerItem.setAttribute("style", "color:#8ab1f7");
  }

  square.appendChild(markerItem);

  gameBoard.setplayerMarker(
    moveRow,
    moveColumn,
    currentPlayerTracker.playerMarker
  );

  game(currentPlayerTracker);
}

const squares = document.querySelectorAll(".box");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    registerMove(square);
  });
});
