const cells = document.querySelectorAll(".cell");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const playAgainBtn = document.getElementById("play-again");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add click listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

playAgainBtn.addEventListener("click", restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    // Stop if cell already filled or game over
    if (board[index] !== "" || !gameActive) return;

    // Update board
    board[index] = currentPlayer;

    // Show X or O visibly
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    checkWinner();
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            gameActive = false;
            showPopup(`Player ${currentPlayer} Wins! 🎉`);
            return;
        }
    }

    // Draw
    if (!board.includes("")) {
        gameActive = false;
        showPopup("It's a Draw! 🤝");
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    popup.classList.add("hidden");

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}
