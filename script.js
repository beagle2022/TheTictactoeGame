const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const resetButton = document.querySelector('#rButton');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
initializeGame();

function initializeGame() {

    cells.forEach(cell => {
        cell.addEventListener('click', cellClicked);
        rButton.addEventListener('click', restartGame);
        statusText.textContent = `${currentPlayer}s Turn`;
    });
    running = true;
}

function cellClicked(cell, index) {
    const cellIndex = this.getAttribute('cellIndex');
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    console.log(index);
    checkWinner(); 
}   

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X" )? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        return;
    }
    else if (!options.includes('')) {
        statusText.textContent = `It's a draw!`;
        running = false;
        return;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    options = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusText.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = ""
    });
    running = true;
}
