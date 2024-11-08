let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const statusDisplay = document.querySelector("#status");

function handleCellClick(e) {
  const clickedCell = e.target;

  const clickedCellIndex = +clickedCell.getAttribute("data-index");

  if (board[clickedCellIndex] !== "" || !isGameActive) {
    return;
  }

  board[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Jogador ${currentPlayer} venceu!`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.innerHTML = "Empate!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = `É a vez do jogador ${currentPlayer}`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusDisplay.innerHTML = `É a vez do jogador ${currentPlayer}`;
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

statusDisplay.innerHTML = `É a vez do jogador ${currentPlayer}`;
document.querySelector(".btn").addEventListener("click", () => resetGame());
