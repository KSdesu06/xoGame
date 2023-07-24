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

const saveGameToServer = async () => {
  const winner = checkWin();

  try {
      const response = await fetch('http://localhost:3000/games', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              position: index,
              value,
              winner ,
              boardSize: 4 
          })
      });
      
      const result = await response.json();
      console.log('Game saved:', result);
  } catch (error) {
      console.error('Error saving game:', error);
  }
};

const saveMoveToServer = async (index, player) => {
  try {
    const response = await fetch('http://localhost:3000/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ position: index, value: player, boardSize: 4 })
    });
    const data = await response.json();
    console.log('Move saved:', data);
  } catch (error) {
    console.error('Error saving move:', error);
  }
};

const handleClick = async (event) => {
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
        await saveMoveToServer(cellIndex, currentPlayer === "X" ? "O" : "X");
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
