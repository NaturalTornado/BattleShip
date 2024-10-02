// Players.js - Rev.-04
import GameBoard from "./Gameboard";

class Player {
    constructor(name, isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.gameBoard = new GameBoard(); // Player's gameboard
        this.opponent = null; // Reference to opponent
    }

    // Set the opponent for turn-based play
    setOpponent(opponent) {
        this.opponent = opponent;
    }

    // Player attacks a coordinate on the opponent's gameboard
    attack(xCoord, yCoord) {
        if (this.opponent) {
            this.opponent.gameBoard.receiveAttack(xCoord, yCoord);
        } else {
            throw new Error('Opponent not set for this player.');
        }
    }

    // Random attack for computer player
    randomAttack() {
        if (this.isComputer && this.opponent) {
            let validMove = false;
            let x, y;

            while (!validMove) {
                x = Math.floor(Math.random() * 8);
                y = Math.floor(Math.random() * 8);
                const target = this.opponent.gameBoard.gameGrid[x][y];

                if (target !== 'X' && target !== 'O') {
                    validMove = true;
                }
            }

            this.attack(x, y);
            console.log(`Computer attacks at X: ${x}, Y: ${y}`);
            return { x, y };
        }
    }
}

export default Player;
    