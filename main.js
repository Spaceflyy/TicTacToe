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

  const SetGameOver = (result) => {
    gameOver = result;
  };

  const GetGameOver = () => {
    return gameOver;
  };

  const NextRound = () => {
    round++;
  };

  const GetRound = () => {
    return round;
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
        SetGameOver(true);
        winner = `${player.name} is the winner!`;
      }
    });
    if (GetRound() == 9 && winner == null) {
      SetGameOver(true);
      winner = "Its a draw!";
    }
  };

  const RestartGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    round = 0;
    winner = null;
    player1.turn = true;
    player2.turn = false;
  };

  return {
    NextRound,
    GetRound,
    CheckWin,
    SetCurrPlayer,
    GetCurrPlayer,
    SetBoard,
    GetBoard,
    GetGameOver,
    SetGameOver,
    GetResult,
    RestartGame,
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

  cells.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (elem.innerText == "") {
        gameManager.SetBoard(
          elem.getAttribute("data"),
          gameManager.GetCurrPlayer().symbol
        );
        if (gameManager.GetRound() <= 9 && !gameManager.GetGameOver()) {
          gameManager.NextRound();
          gameManager.CheckWin(gameManager.GetCurrPlayer());
          gameManager.SetCurrPlayer();
          UpdateDisplay();
        }
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
    if (gameManager.GetGameOver()) {
      currTurnDisplay.innerText = gameManager.GetResult();
    }
  };
})();
