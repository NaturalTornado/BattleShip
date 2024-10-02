// index.js - Rev.-02
import loadPage from "./loadPage";
import startGame from "./startGame";
import GameBoard from "./Gameboard";
import Player from "./Players";
import gameLoop from "./gameLoop";

// This is the main entry point of the Battleship game.
// It listens for the DOM to load and starts the game when the 'Start' button is clicked.

document.addEventListener('DOMContentLoaded', () => {
    // Load the initial UI page setup
    loadPage();

    // Initialize Player 1 (human) and Player 2 (computer)
    const player1 = new Player("Player 1");
    const player2 = new Player("Computer", true);

    // Attach event listener to the 'SetShips' button to begin setting ships
    const setShipsButton = document.getElementById('SetShips');
    if (setShipsButton) {
        setShipsButton.addEventListener('click', () => {
            console.log("Set Ships");
            startGame(player1, player2);
        });
        console.log("123");
    }

    const start = document.getElementById('Start');
    start.addEventListener('click', () => {
        console.log(player1.gameBoard.allShipsPlaced());
        console.log("Carrier Placed?: ");
        console.log(player1.gameBoard.ships.Carrier.placed);

        // Corrected logging of ships
        Object.keys(player1.gameBoard.ships).forEach(ship => {
            console.log(`Player 1 ship: ${ship}, placed: ${player1.gameBoard.ships[ship].placed}`);
        });

        Object.keys(player2.gameBoard.ships).forEach(ship => {
            console.log(`Player 2 ship: ${ship}, placed: ${player2.gameBoard.ships[ship].placed}`);
        });

        if (player1.gameBoard.allShipsPlaced() && player2.gameBoard.allShipsPlaced()) {
            console.log("game loop ");
            gameLoop(player1, player2);  // Pass player1 and player2 to gameLoop
        }
    });
});
