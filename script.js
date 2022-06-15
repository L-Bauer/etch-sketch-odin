const container = document.getElementsByClassName('container');


const gridSize = 10;

function makeBlocks() {
    for (let i = 0; i < gridSize; i++) { //Creates the rows
        const row = document.createElement('div');
        row.className = "row";
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div'); //Creates cells in row
            cell.className = "cell";
            row.appendChild(cell);
        }                
        container[0].appendChild(row);
    }
}

makeBlocks();