// Revision: loadPage.js - rev-03

import GameBoard from "./Gameboard"; // Import GameBoard to associate with each player

function loadPage() {
    const Body = document.querySelector('body');
    const Header = document.getElementById('Header');

    const GameBoards = document.querySelectorAll('.GameBoard');
    const NameAreas = document.querySelectorAll('.NameArea');
    const PiecesAreas = document.querySelectorAll('.PiecesArea');
    const BoardAreas = document.querySelectorAll('.BoardArea');

    const GameBoardOne = document.getElementById('GameBoardOne');
    const GameBoardTwo = document.getElementById('GameBoardTwo');

    const Carriers = document.querySelectorAll('.Carrier');
    const Destroyers = document.querySelectorAll('.Destroyer');
    const Submarines = document.querySelectorAll('.Submarine');

    const NavBar = document.getElementById('NavBar');
    const NewGame = document.getElementById('NewGame');
    const Exit = document.getElementById('Exit');

    // Function to add styles to an HTML element
    function styleAdder(divName, styles) {
        if (divName) {
            for (const property in styles) {
                divName.style[property] = styles[property];
            }
        }
    }

    // Function to apply styles to multiple elements (NodeList)
    function styleAdderMultiple(nodeList, styles) {
        if (nodeList) {
            nodeList.forEach(divName => {
                styleAdder(divName, styles);
            });
        }
    }

    // Styling for the body (main grid container)
    const BodyStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',  // Two columns
        gridTemplateRows: '1fr 6fr 1fr', // Three rows (auto removed for simplicity)
        gap: '10px', // Optional: gap between grid items
        backgroundColor: 'lightcyan',
        height: '100vh' // Ensure the grid takes up the full viewport height
    };

    // Styling for the Header to span both columns in the first row
    const headerStyles = {
        gridColumn: '1 / 3',  // Span both columns (1 to 3)
        gridRow: '1 / 2',     // First row
        backgroundColor: 'lightcyan',
        fontSize: '32px',
        textAlign: 'center',
        padding: '2px',
        fontWeight: '800',
    };

    // General layout for GameBoard (applies to both GameBoards)
    const GameBoardStyles = {
        gap: '2px',
        padding: '2px',
        margin: '2px',
    };

    // Styling for NameArea, shared by both GameBoardOne and GameBoardTwo
    const NameAreaStyles = {
        gridColumn: '1/3',
        gridRow: '1/2',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        fontSize: '24px',
        fontWeight: '600',
        padding: '2px',
        textAlign: 'center',
        gap: '2px',
        backgroundColor: 'lightgray',
    };

    // Styling for PiecesArea and BoardArea for GameBoardOne
    const PiecesAreaOneStyles = {
        gridColumn: '1/2', // Left side
        gridRow: '2/3',    // Second row
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
        padding: '12px',
    };

    const BoardAreaOneStyles = {
        gridColumn: '2/3', // Right side (closer to the center)
        gridRow: '2/3',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)', // Create an 8x8 grid
        gridTemplateRows: 'repeat(8, 1fr)',
        gap: '1px',
    };

    // Styling for PiecesArea and BoardArea for GameBoardTwo (mirrored layout)
    const PiecesAreaTwoStyles = {
        gridColumn: '2/3', // Right side (closer to the outside)
        gridRow: '2/3',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
        padding: '12px',
    };

    const BoardAreaTwoStyles = {
        gridColumn: '1/2', // Left side (closer to the center)
        gridRow: '2/3',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)', // Create an 8x8 grid
        gridTemplateRows: 'repeat(8, 1fr)',
        gap: '1px',
    };

    // Ship Styling (For different ship types)
    const CarrierStyles = {
        gridColumn: '1/5',
        gridRow: '2/3',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        backgroundColor: 'lightgreen', // Green color for Carrier
    };

    const DestroyerStyles = {
        gridColumn: '1/4',
        gridRow: '4/5',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        backgroundColor: 'lightyellow', // Yellow color for Destroyer
    };

    const SubmarineStyles = {
        gridColumn: '1/3',
        gridRow: '6/7',
        border: 'solid',
        borderColor: 'black',
        borderWidth: '4px',
        backgroundColor: 'lightgray', // Gray color for Submarine
    };

    // Styling for GameBoardOne and GameBoardTwo
    const GameBoardOneStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
        gridTemplateRows: '1fr 5fr auto',
        gridColumn: '1 / 2', // First column (left)
        gridRow: '2 / 3',    // Second row
        border: '4px solid black',
    };

    const GameBoardTwoStyles = {
        display: 'grid',
        gridTemplateColumns: '5fr 1fr',
        gridTemplateRows: '1fr 5fr auto',
        gridColumn: '2 / 3', // Second column (right)
        gridRow: '2 / 3',    // Second row
        border: '4px solid black',
    };

    // Styling for NavBar to span both columns in the third row
    const NavBarStyles = {
        gridColumn: '1 / 3', // Span both columns (1 to 3)
        gridRow: '3 / 4',    // Third row
        border: '4px solid black',
        padding: '4px',
    };

    // Apply the styles using the styleAdder function
    styleAdder(Body, BodyStyles);
    styleAdder(Header, headerStyles);
    styleAdder(GameBoardOne, GameBoardOneStyles);
    styleAdder(GameBoardTwo, GameBoardTwoStyles);
    styleAdder(NavBar, NavBarStyles);

    // Apply styles to GameBoards
    styleAdderMultiple(GameBoards, GameBoardStyles);
    styleAdderMultiple(NameAreas, NameAreaStyles);

    // Apply styles to Game Pieces
    styleAdderMultiple(Carriers, CarrierStyles);
    styleAdderMultiple(Destroyers, DestroyerStyles);
    styleAdderMultiple(Submarines, SubmarineStyles);

    // Apply styles for GameBoardOne
    styleAdder(PiecesAreas[0], PiecesAreaOneStyles);
    styleAdder(BoardAreas[0], BoardAreaOneStyles);

    // Apply styles for GameBoardTwo (mirrored)
    styleAdder(PiecesAreas[1], PiecesAreaTwoStyles);
    styleAdder(BoardAreas[1], BoardAreaTwoStyles);

    // Function to generate 8x8 grid cells inside each BoardArea
    function generateGrid(boardArea) {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `${x}${y}`;  // New two-digit id format
                cell.style.border = '1px solid black';
                cell.style.backgroundColor = 'lightblue';
                cell.style.width = '100%';
                cell.style.height = '100%';
                boardArea.appendChild(cell);
            }
        }
    }

    // Generate grids for both players' boards
    generateGrid(BoardAreas[0]); // Player One's board
    generateGrid(BoardAreas[1]); // Player Two's board
}

export default loadPage;
