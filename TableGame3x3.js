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
              winner, 
              boardSize: 3  
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
      body: JSON.stringify({ position: index, value: player, boardSize: 3 })
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

const getMovesFromServer = async () => {
  try {
    const response = await fetch('http://localhost:3000/moves');
    const moves = await response.json();
    return moves;
  } catch (error) {
    console.error('Error fetching moves:', error);
    return [];
  }
};

const displayMoves = async () => {
  const moves = await getMovesFromServer();
  const movesList = document.getElementById('movesList');

  moves.forEach(move => {
    const listItem = document.createElement('li');
    listItem.textContent = `Position: ${move.position}, Value: ${move.value}`;
    movesList.appendChild(listItem);
  });
};

document.addEventListener("DOMContentLoaded", displayMoves);


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
