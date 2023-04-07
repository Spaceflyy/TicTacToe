const displayManager = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let board = document.querySelectorAll(".cell");
  let currentSymbol;
  let currentTurnDisplay = document.getElementById("turnDisplay");

  const getBoard = () => {
    return { gameBoard };
  };

  const addSymbol = (e) => {
    if (e.target.innerText == "") {
      if (player1.turn == true) {
        currentTurnDisplay.innerText = "Player 2's Turn";
        currentSymbol = player1.symbol;
        player1.turn = false;
        player2.turn = true;
      } else {
        currentTurnDisplay.innerText = "Player 1's Turn";
        currentSymbol = player2.symbol;
        player2.turn = false;
        player1.turn = true;
      }
      gameBoard[e.target.getAttribute("data")] = currentSymbol;
      updateBoard();
    }
  };

  board.forEach((element) => {
    element.addEventListener("click", addSymbol);
  });

  const updateBoard = () => {
    let currentIndex = 0;
    board.forEach((element) => {
      element.innerText = gameBoard[currentIndex];
      currentIndex++;
    });
  };

  return { getBoard };
})();

const Player = (symbol, turn) => {
  return { symbol, turn };
};

const gameManager = (() => {
  // displayManager.getBoard();
})();

const player1 = Player("X", true);
const player2 = Player("O", false);
