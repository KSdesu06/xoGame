const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const checkWin = () => {
    const winConditions = [
      [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], //row
      [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], //column
      [0, 5, 10, 15], [3, 6, 9, 12], //diagonal
    ];
  
    for (const condition of winConditions) {
      const [a, b, c, d] = condition;
      // check that if player win return true, else return false
      if (board[a] && board[a] === board[b] && board[a] === board[c]  && board[c] === board[d]) {
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
  board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
    message = "Player X to start!"
    cells.forEach((cell) => (cell.textContent = ""));
    showMessage(message)
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

cells.forEach((cell) => cell.addEventListener("click", handleClick));
