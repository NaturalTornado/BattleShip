// Ship.js - Rev.-00

// Factory function to create a ship object
const Ship = (length) => {
    // Tracks the number of hits the ship has received
    let hits = 0;

    // Method to track a hit on the ship
    const hit = () => {
        if (hits < length) hits += 1;
    };

    // Method to determine if the ship is sunk
    const isSunk = () => hits >= length;

    // Public interface: expose hit and isSunk methods
    return { length, hit, isSunk };
};

export default Ship;
