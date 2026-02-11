const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

// Winning combinations
const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin() {
  for (let combo of winCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw';
}

function updateBoard() {
  cells.forEach((cell, i) => cell.textContent = board[i]);
}

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => {
    if (!board[i] && !gameOver) {
      board[i] = currentPlayer;
      const result = checkWin();
      if (result) {
        gameOver = true;
        setTimeout(() => alert(result === 'Draw' ? "It's a Draw!" : ${result} Wins!), 100);
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateBoard();
    }
  });
});

resetBtn.addEventListener('click', () => {
  board.fill('');
  currentPlayer = 'X';
  gameOver = false;
  updateBoard();
});
