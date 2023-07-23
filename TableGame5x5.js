const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const checkWin = () => {
    const winConditions = [

      //row
      [0, 1, 2, 3], [1, 2, 3, 4], //row 1
      [5, 6, 7, 8], [6, 7, 8, 9], //row 2
      [10, 11, 12, 13], [11, 12, 13, 14], //row 3
      [15, 16, 17, 18], [16, 17, 18, 19], //row 4
      [20, 21, 22, 23], [21, 22, 23, 24], //row 5

      //column
      [0, 5, 10, 15], [5, 10, 15, 20], //column 1
      [1, 6, 11, 16], [6, 11, 16, 21], //column 2
      [2, 7, 12, 17], [7, 12, 17, 22], //column 3
      [3, 8, 13, 18], [8, 13, 18, 23], //column 4
      [4, 9, 14, 19], [9, 14, 19, 24], //column 5
      
      // diagonal
      [5, 11, 17, 23], [0, 6, 12, 18], 
      [6, 12, 18, 24], [1, 7, 13, 19], 
      [3, 7, 11, 15], [4, 8, 12, 16], 
      [8, 12, 16, 20], [9, 13, 17, 21],
    ];
  
    for (const condition of winConditions) {
      const [a, b, c, d] = condition;
      // check that if player win return true, else return false
      if (board[a] && board[a] === board[b] && board[a] === board[c] && board[c] === board[d]) {
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
  board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message = "Player X to start!"
    cells.forEach((cell) => (cell.textContent = ""));
    showMessage(message)
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

cells.forEach((cell) => cell.addEventListener("click", handleClick));
