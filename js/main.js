const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restart");
const turnBtn = document.querySelector(".header-turn-btn");
const scorePlayer1 = document.querySelector(".score-player .score-res");
const scoreDraw = document.querySelector(".score-draw .score-res");
const scorePlayer2 = document.querySelector(".score-player2 .score-res");
const btns = document.querySelectorAll(".option-btn");
const active = document.querySelector(".active");
const game = document.querySelector(".game");
const start = document.querySelector(".start");
let img = document.querySelector(".option-img");
const playerBtn = document.querySelector("#gameWithPlayer");

for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        let move = (100 / btns.length) * i;
        active.style.left = move + "%"
    }
}

playerBtn.addEventListener("click", () => {
    start.style.display = "none";
    game.style.display = "block";
})

let player1Score = 0;
let drawScore = 0;
let player2Score = 0;

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    turnBtn.textContent = `${currentPlayer} TURN`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}


function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnBtn.textContent = `${currentPlayer} TURN`;
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        turnBtn.textContent = `${currentPlayer} WINS!`;
        updateScores(currentPlayer);
        running = false;
    } else if (!options.includes("") && !roundWon) {
        turnBtn.textContent = `DRAW!`;
        updateScores("draw");
        running = false;
    } else {
        changePlayer();
    }
}

function updateScores(winner) {
    if (winner === "X") {
        player1Score++;
        scorePlayer1.textContent = player1Score;
    } else if (winner === "O") {
        player2Score++;
        scorePlayer2.textContent = player2Score;
    } else if (winner === "draw") {
        drawScore++;
        scoreDraw.textContent = drawScore;
    }
}


function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    turnBtn.textContent = `${currentPlayer} TURN`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
    running = true;
}
