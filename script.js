const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupRestart = document.getElementById("popup-restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            showPopup(`Player ${currentPlayer} Wins`);
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        showPopup("Match Draw");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.add("show");
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win");
    });

    popup.classList.remove("show");
}

restartBtn.addEventListener("click", restartGame);
popupRestart.addEventListener("click", restartGame);
