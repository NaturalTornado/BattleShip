// GameBoard.js - Rev.-07
import Ships from "./Ships";

class GameBoard {
    constructor() {
        this.gameGrid = Array.from({ length: 8 }, () => Array(8).fill(0)); // 8x8 grid
        this.placedShips = []; // Track placed ships
        this.ships = {
            Carrier: { length: 4, placed: false, hits: 0 },
            Destroyer: { length: 3, placed: false, hits: 0 },
            Submarine: { length: 2, placed: false, hits: 0 }
        };
    }

    // Check if there's room to place the ship horizontally/vertically
    isRoom(xCoord, yCoord, shipLength, isHorizontal) {
        if (isHorizontal) {
            if (yCoord + shipLength > 8) return false; // Ensure ship fits within grid horizontally
            for (let i = 0; i < shipLength; i++) {
                if (this.gameGrid[xCoord][yCoord + i] !== 0) return false; // Check for overlapping ships
            }
        } else {
            if (xCoord + shipLength > 8) return false; // Ensure ship fits vertically
            for (let i = 0; i < shipLength; i++) {
                if (this.gameGrid[xCoord + i][yCoord] !== 0) return false; // Check for overlapping ships
            }
        }
        return true;
    }

    // Store the ship on the grid
    storePieces(xCoord, yCoord, shipLength, shipType, isHorizontal) {
        if (isHorizontal) {
            for (let i = 0; i < shipLength; i++) {
                this.gameGrid[xCoord][yCoord + i] = shipType;
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                this.gameGrid[xCoord + i][yCoord] = shipType;
            }
        }
        this.placedShips.push(shipType);
        this.ships[shipType].placed = true;
    }

    // Check if the ship has already been placed
    isPlaced(shipType) {
        return this.ships[shipType].placed;
    }

    // Check if all ships have been placed
    allShipsPlaced() {
        return Object.values(this.ships).every(ship => ship.placed);
    }

    // Place ships on the gameboard
    placeGamePieces(shipType, shipLength, xCoord, yCoord, isHorizontal = true) {
        if (this.isRoom(xCoord, yCoord, shipLength, isHorizontal)) {
            this.storePieces(xCoord, yCoord, shipLength, shipType, isHorizontal);
            return true;
        }
        return false;
    }

    // Receive an attack
    receiveAttack(attackX, attackY) {
        const target = this.gameGrid[attackX][attackY];
        if (typeof target === 'string') {
            console.log(`Hit on ${target} at ${attackX}, ${attackY}`);
            this.gameGrid[attackX][attackY] = "X"; // Mark the hit
            this.ships[target].hits++; // Increment the hit count for the ship

        } else {
            console.log(`Miss at ${attackX}, ${attackY}`);
            this.gameGrid[attackX][attackY] = "O"; // Mark the miss
        }
    }

    // Check if all ships have been sunk
    allShipsSunk() {
        return Object.values(this.ships).every(ship => ship.hits >= ship.length);
    }
}

export default GameBoard;
