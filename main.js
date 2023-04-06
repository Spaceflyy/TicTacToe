const gameManager = () => {};

const displayManager = () => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let board = document.querySelectorAll(".cell");

  const addSymbol = (e) => {
    gameBoard[e.target.getAttribute("data")] = "X";
    updateBoard();
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
};

const Player = (name, symbol) => {};

const test = displayManager();
