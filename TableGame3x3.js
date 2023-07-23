const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const checkWin = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], //row
      [0, 3, 6], [1, 4, 7], [2, 5, 8], //column
      [0, 4, 8], [2, 4, 6], //diagonal
    ];
  
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      // check that if player win return true, else return false
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true; 
      }
    }
    return false;
}
  
const checkDraw = () => {
    return board.every((cell) => cell !== ""); 
}

const showMessage = (message) => {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}

const handleClick = (event) => {
    const cellIndex = event.target.dataset.index;

    //check who's turn
    if (board[cellIndex] === "" && !checkWin() && !checkDraw()) {
      board[cellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      showMessage(`Player ${currentPlayer}'s turn `);
        
        //show message who wins
        if (checkWin()) {
            showMessage(`Player ${currentPlayer === "X" ? "O" : "X"} wins!`);
        } else if (checkDraw()) {
            showMessage("It's a draw!");
        }
    }
}

const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message = "Player X to start!"
    cells.forEach((cell) => (cell.textContent = ""));
    showMessage(message)
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

cells.forEach((cell) => cell.addEventListener("click", handleClick));
