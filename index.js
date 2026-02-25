const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const resetBtn = document.getElementById('resetbtn');

let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText && 
            cells[a].innerText === cells[b].innerText && 
            cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;
        }
    }
    return null;
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerText !== '' || !gameActive) return;

        cell.innerText = currentPlayer;
        const winner = checkWinner();

        if (winner) {
            turnDisplay.innerText = `${winner} Wins!`;
            gameActive = false;
        } else if([...cells].every(cell=>cell.innerText!='')){
            turnDisplay.innerText="Draw!";
            gameActive=false;
        }
        else{
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.innerText = currentPlayer;
        }
    });
});

resetBtn.addEventListener('click', () => {
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameActive = true;
    turnDisplay.innerText = 'X';
});
