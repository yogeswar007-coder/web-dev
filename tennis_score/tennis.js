const p1button = document.querySelector("#p1button");
const p2button = document.querySelector("#p2button");
const p1display = document.querySelector("#p1display");
const p2display = document.querySelector("#p2display");
const resetButton = document.querySelector("#reset");
const scoreHistoryList = document.querySelector("#scoreHistory ul");
const winningScoreSelect = document.querySelector("#playTo");
const playerOneNameInput = document.querySelector("#playerOneName");
const playerTwoNameInput = document.querySelector("#playerTwoName");

let p1score = 0;
let p2score = 0;
let winningScore = 3;
let isGameOver = false;

function updateButtonLabels() {
    const playerOneName = playerOneNameInput.value || "Player One";
    const playerTwoName = playerTwoNameInput.value || "Player Two";
    p1button.textContent = `+1 ${playerOneName}`;
    p2button.textContent = `+1 ${playerTwoName}`;
}

playerOneNameInput.addEventListener("input", updateButtonLabels);
playerTwoNameInput.addEventListener("input", updateButtonLabels);

function reset() {
    isGameOver = false;
    p1score = 0;
    p2score = 0;
    p1display.textContent = 0;
    p2display.textContent = 0;
    p1display.classList.remove("has-text-success", "has-text-danger");
    p2display.classList.remove("has-text-success", "has-text-danger");
    p1button.disabled = false;
    p2button.disabled = false;
    updateButtonLabels();
}

p1button.addEventListener("click", () => {
    if (!isGameOver) {
        p1score += 1;
        if (p1score === winningScore) {
            isGameOver = true;
            p1display.classList.add("has-text-success");
            p2display.classList.add("has-text-danger");
            p1button.disabled = true;
            p2button.disabled = true;
            scoreHistoryList.innerHTML += `<li>${playerOneNameInput.value || "Player One"} wins ${p1score} to ${p2score}</li> against ${playerTwoNameInput.value || "Player Two"}`;
        }
        p1display.textContent = p1score;
    }
});

p2button.addEventListener("click", () => {
    if (!isGameOver) {
        p2score += 1;
        if (p2score === winningScore) {
            isGameOver = true;
            p2display.classList.add("has-text-success");
            p1display.classList.add("has-text-danger");
            p1button.disabled = true;
            p2button.disabled = true;
            scoreHistoryList.innerHTML += `<li>${playerTwoNameInput.value || "Player Two"} wins ${p2score} to ${p1score}</li> against ${playerOneNameInput.value || "Player One"}`;
        }
        p2display.textContent = p2score;
    }
});

winningScoreSelect.addEventListener("change", function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener("click", reset);

updateButtonLabels();
