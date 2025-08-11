const board = document.getElementById('board'); 
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X'; 
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function createBoard() {
  board.innerHTML = ""; 
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index; 
    cell.innerText = value;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  event.target.innerText = currentPlayer;

  if (checkWinner()) {
    message.innerText = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    message.innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  return winningPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
  });
}

function restartGame() {
  currentPlayer = 'X';
  cells = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  message.innerText = "Player X's turn";
  createBoard();
}

restartBtn.addEventListener("click", restartGame);

createBoard();
