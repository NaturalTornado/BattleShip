// gameLoop.js - Rev.-03

import GameBoard from "./Gameboard";
import Player from "./Players";

// Function to update the UI to reflect hits or misses on the gameboard
function updateBoard(gameGrid, boardId) {
    const board = document.getElementById(boardId);
    const cells = board.querySelectorAll('.cell');
    
    // Loop through each cell and update the UI based on the gameGrid state
    cells.forEach(cell => {
        const x = parseInt(cell.id.charAt(0)); // Get X coordinate from cell id
        const y = parseInt(cell.id.charAt(1)); // Get Y coordinate from cell id

        if (gameGrid[x][y] === "X") {
            cell.style.backgroundColor = "red";  // Mark a hit with red color
        } else if (gameGrid[x][y] === "O") {
            cell.style.backgroundColor = "gray"; // Mark a miss with gray color
        }
    });
}

// Function that manages the game loop: alternates turns between players
function gameLoop(player1, player2) {
    let currentPlayer = player1;
    console.log("game loop running!");

    // Function to check if the game has ended
    const checkForWin = () => {
        if (player1.gameBoard.allShipsSunk()) {
            console.log('Computer wins!');
            return true;
        } else if (player2.gameBoard.allShipsSunk()) {
            console.log('Player 1 wins!');
            return true;
        }
        return false;
    };

    // Main function to handle player moves
    const playerTurn = (x, y) => {
        if (currentPlayer === player1) {
            const hit = player1.attack(x, y);  // Use attack method on player1
            console.log(`Player 1 attacks [${x}, ${y}] and ${hit ? 'hits' : 'misses'}!`);

            // Update the board UI
            updateBoard(player2.gameBoard.gameGrid, 'GameBoardTwo');  // Update the computer board in UI

            // Check if all ships are sunk
            if (checkForWin()) return;

            // Switch to computer player
            currentPlayer = player2;

            // Trigger the computer's turn with a delay
            setTimeout(() => {
                const { x, y } = player2.randomAttack();  // Computer makes a random move
                console.log(`Computer attacks at [${x}, ${y}]`);

                // Update the player's board in UI
                updateBoard(player1.gameBoard.gameGrid, 'GameBoardOne');  // Update player board in UI

                // Check if player 1's ships are all sunk
                if (checkForWin()) return;

                // Switch back to player 1
                currentPlayer = player1;
            }, 1000);  // Delay to simulate computer thinking
        }
    };

    // Set up event listeners on the computer board for player 1's turn
    document.querySelectorAll('#GameBoardTwo .cell').forEach(cell => {
        cell.addEventListener('click', (e) => {
            const cellId = e.target.id; 
            const x = parseInt(cellId.charAt(0));
            const y = parseInt(cellId.charAt(1));
            console.log(`click player 1 turn: X:  '${x}' Y:  '${y}'`);
            playerTurn(x, y);
        });
    });
}

export default gameLoop;
