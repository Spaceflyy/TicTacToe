const Player = (name, symbol, turn) => {
  return { name, symbol, turn };
};

const player1 = Player("Jim", "X", true);
const player2 = Player("Luke", "O", false);

const gameManager = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const GetBoard = () => {
    return gameBoard;
  };

  const SetBoard = (position, marker) => {
    gameBoard[position] = marker;
  };

  const SetCurrPlayer = () => {
    if (player1.turn == true) {
      player1.turn = false;
      player2.turn = true;
    } else {
      player1.turn = true;
      player2.turn = false;
    }
  };

  const GetCurrPlayer = () => {
    let currPlayer;
    if (player1.turn == true) {
      currPlayer = player1;
    } else {
      currPlayer = player2;
    }
    return currPlayer;
  };

  const CheckWin = (player) => {
    let winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    let board = GetBoard();

    winConditions.forEach((elem) => {
      if (
        board[elem[0]] === player.symbol &&
        board[elem[1]] === player.symbol &&
        board[elem[2]] === player.symbol
      ) {
        console.log("WINNER");
      }
    });
  };

  return { CheckWin, SetCurrPlayer, GetCurrPlayer, SetBoard, GetBoard };
})();

const displayManager = (() => {
  let cells = document.querySelectorAll(".cell");

  cells.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (elem.innerText == "") {
        gameManager.SetBoard(
          elem.getAttribute("data"),
          gameManager.GetCurrPlayer().symbol
        );
        gameManager.CheckWin(gameManager.GetCurrPlayer());
        gameManager.SetCurrPlayer();
        UpdateDisplay();
      }
    });
  });

  const UpdateDisplay = () => {
    let currentIndex = 0;
    let currTurnDisplay = document.querySelector("#turnDisplay");
    currTurnDisplay.innerText = `${gameManager.GetCurrPlayer().name}'s turn! `;
    cells.forEach((elem) => {
      elem.innerText = gameManager.GetBoard()[currentIndex];
      currentIndex++;
    });
  };
  return { UpdateDisplay };
})();
