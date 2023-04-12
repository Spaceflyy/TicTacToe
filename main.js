const Player = (name, symbol, turn) => {
  return { name, symbol, turn };
};

const player1 = Player("", "X", true);
const player2 = Player("", "O", false);

const gameManager = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;
  let round = 0;
  let winner = null;

  const GetResult = () => {
    return winner;
  };

  const GetGameOver = () => {
    return gameOver;
  };

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

    winConditions.forEach((elem) => {
      if (
        gameBoard[elem[0]] === player.symbol &&
        gameBoard[elem[1]] === player.symbol &&
        gameBoard[elem[2]] === player.symbol
      ) {
        gameOver = true;
        winner = `${player.name} is the winner!`;
        displayManager.showWin(elem);
      }
    });
    if (round == 9 && winner == null) {
      gameOver = true;
      winner = "Its a draw!";
      console.log("FIRE");
    }
  };

  const RestartGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    round = 0;
    winner = null;
    player1.turn = true;
    player2.turn = false;
    displayManager.ResetDivColour();
  };

  const PlayRound = (cellIndex, playerSymbol) => {
    gameBoard[cellIndex] = playerSymbol;
    if (round <= 9 && !GetGameOver()) {
      round++;
      CheckWin(GetCurrPlayer());
      SetCurrPlayer();
      displayManager.UpdateDisplay();
      if (player2.name == "Computer") {
        PlayAIMove();
      }
    }
  };

  const PlayAIMove = () => {
    if (round <= 9 && !GetGameOver()) {
      let randomSpace = 0;
      let emptySpaces = [];
      for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] == "") {
          emptySpaces.push(i);
        }
      }
      randomSpace = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
      gameBoard[randomSpace] = player2.symbol;
      round++;
      CheckWin(GetCurrPlayer());
      SetCurrPlayer();
      displayManager.UpdateDisplay();
    }
  };
  return {
    GetCurrPlayer,
    GetBoard,
    GetGameOver,
    GetResult,
    RestartGame,
    PlayRound,
    PlayAIMove,
    SetBoard,
  };
})();

const displayManager = (() => {
  const handleForm = (e) => {
    e.preventDefault();

    let p1NameField = document.querySelector("#p1Name");
    let p2NameField = document.querySelector("#p2Name");
    let grid = document.querySelector(".gridContainer");
    let menu = document.querySelector(".newGameMenu");
    if (p1NameField.value == "") {
      player1.name = "Player 1";
    } else {
      player1.name = Capitalize(p1NameField.value);
    }
    if (p2NameField.value == "") {
      player2.name = "Player 2";
    } else {
      player2.name = Capitalize(p2NameField.value);
    }
    menu.style.display = "none";
    grid.style.display = "flex";
    form.reset();
    UpdateDisplay();
  };

  const Capitalize = (word) => {
    let words = word.split(" ");
    let newWords = [];

    words.forEach((w) => {
      let rest = w.slice(1).toLowerCase();
      newWords.push(w.charAt(0).toUpperCase() + rest);
    });
    return newWords.join(" ");
  };

  let cells = document.querySelectorAll(".cell");
  let form = document.querySelector(".newGameMenu form");
  form.addEventListener("submit", handleForm);

  let rstartbtn = document.querySelector("#restartBtn");
  rstartbtn.addEventListener("click", () => {
    gameManager.RestartGame();
    UpdateDisplay();
  });

  let changeNameBtn = document.querySelector("#newGameBtn");
  changeNameBtn.addEventListener("click", () => {
    let grid = document.querySelector(".gridContainer");
    let menu = document.querySelector(".newGameMenu");
    menu.style.display = "block";
    grid.style.display = "none";
    gameManager.RestartGame();
  });
  const AIGame = () => {
    let p1NameField = document.querySelector("#p1Name");
    let grid = document.querySelector(".gridContainer");
    let menu = document.querySelector(".newGameMenu");
    if (p1NameField.value == "") {
      player1.name = "Player 1";
    } else {
      player1.name = Capitalize(p1NameField.value);
    }

    player2.name = "Computer";

    menu.style.display = "none";
    grid.style.display = "flex";
    form.reset();
    UpdateDisplay();
  };

  let vsComputerbtn = document.querySelector("#VSCompBtn");
  vsComputerbtn.addEventListener("click", AIGame);

  cells.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (elem.innerText == "") {
        gameManager.PlayRound(
          elem.getAttribute("data"),
          gameManager.GetCurrPlayer().symbol
        );
      }
    });
  });

  const showWin = (winningIndexes) => {
    let currentIndex = 0;
    cells.forEach((cell) => {
      if (cell.getAttribute("data") == winningIndexes[currentIndex]) {
        cell.style.backgroundColor = "#1F8C2D";
        currentIndex++;
      }
    });
  };
  const UpdateDisplay = () => {
    let currentIndex = 0;
    let currTurnDisplay = document.querySelector("#turnDisplay");
    currTurnDisplay.innerText = `${gameManager.GetCurrPlayer().name}'s turn! `;
    cells.forEach((elem) => {
      elem.innerText = gameManager.GetBoard()[currentIndex];
      currentIndex++;
    });
    if (gameManager.GetGameOver()) {
      currTurnDisplay.innerText = gameManager.GetResult();
    }
  };

  const ResetDivColour = () => {
    cells.forEach((cell) => {
      cell.style.backgroundColor = "";
    });
  };

  return { UpdateDisplay, ResetDivColour, showWin };
})();
