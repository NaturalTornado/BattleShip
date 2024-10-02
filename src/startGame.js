// startGame.js - Rev.-17
import Player from "./Players"; // Import Player class to manage player objects
import GameBoard from "./Gameboard"; // Import GameBoard to manage ship placement logic

function startGame(player1, player2) {
    console.log("Game is starting...");

    // Initialize ships for Player 1
    player1.ships = {
        Carrier: { length: 4, placed: false },
        Destroyer: { length: 3, placed: false },
        Submarine: { length: 2, placed: false }
    };

    // Set opponents for both players
    player1.setOpponent(player2);
    player2.setOpponent(player1);

    // Place ships for the computer
    randomShipPlacement(player2);

    // Attach event listeners to the ship divs (#Carrier, #Destroyer, #Submarine)
    setupShipSelection(player1);

    return { player1, player2 };
}

// Function to randomly place ships for player 2 (computer)
function randomShipPlacement(player) {
    const playerShips = {
        Carrier: { length: 4 },
        Destroyer: { length: 3 },
        Submarine: { length: 2 }
    };

    for (const shipType in playerShips) {
        const ship = playerShips[shipType];
        let placed = false;

        // Try placing the ship randomly until a valid position is found
        while (!placed) {
            const xCoord = Math.floor(Math.random() * 8);
            const yCoord = Math.floor(Math.random() * 8);
            const isHorizontal = Math.random() > 0.5;
            placed = player.gameBoard.placeGamePieces(shipType, ship.length, xCoord, yCoord, isHorizontal);

            console.log(`Computer placed ${shipType} at X: ${xCoord} Y: ${yCoord}`);
        }
    }
}

// Function to set up ship selection for the player
function setupShipSelection(player) {
    // Add event listeners to the respective ship divs
    document.getElementById("Carrier").addEventListener("click", () => {
        selectShip(player, "Carrier");
    });
    document.getElementById("Destroyer").addEventListener("click", () => {
        selectShip(player, "Destroyer");
    });
    document.getElementById("Submarine").addEventListener("click", () => {
        selectShip(player, "Submarine");
    });
}

// Function to select a ship and set up event listeners for cells
function selectShip(player, shipType) {
    console.log(`Selected ${shipType} for placement.`);

    // Remove any previous cell event listeners to avoid placing the wrong ship
    removeCellListeners();

    // Attach new event listeners to cells in the player's gameboard
    const boardCells = document.querySelectorAll("#GameBoardOne .cell");

    boardCells.forEach((cell) => {
        cell.addEventListener("click", function placeShip(event) {
            const cellId = event.target.id; // Extract the cell's ID (e.g., "54" for X=5, Y=4)
            const xCoord = parseInt(cellId.charAt(0)); // Extract X coordinate from the ID
            const yCoord = parseInt(cellId.charAt(1)); // Extract Y coordinate from the ID

            // Ensure shipType is properly referenced in player.ships
            const ship = player.ships[shipType];
            if (!ship) {
                console.log(`${shipType} is not available for placement.`);
                return;
            }

            // Check if the ship has already been placed
            if (ship.placed) {
                console.log(`${shipType} has already been placed.`);
                return;
            }

            // Attempt to place the selected ship
            if (player.gameBoard.placeGamePieces(shipType, ship.length, xCoord, yCoord)) {
                console.log(`${shipType} placed at X:${xCoord}, Y:${yCoord}`);
                event.target.style.backgroundColor = "blue"; // Mark the grid cell as occupied

                // Mark the ship as placed
                player.ships[shipType].placed = true;

                // Remove this cell's event listener after placement
                event.target.removeEventListener("click", placeShip);

                // Check if all ships have been placed
                if (player.gameBoard.allShipsPlaced()) {
                    console.log("All ships placed! Starting game...");
                    removeCellListeners();
                    return;
                }
            } else {
                console.log("Invalid placement. Please select a different location.");
            }
        });
    });
}

// Function to remove all event listeners for placing ships
function removeCellListeners() {
    const boardCells = document.querySelectorAll("#GameBoardOne .cell");
    boardCells.forEach((cell) => {
        const newCell = cell.cloneNode(true); // Clone the node to remove listeners
        cell.parentNode.replaceChild(newCell, cell); // Replace the cell to remove listeners
    });
}

export default startGame;
