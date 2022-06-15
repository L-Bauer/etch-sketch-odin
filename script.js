const container = document.getElementsByClassName('container');


const gridSize = 64;

function makeBlocks() {
    for (let i = 0; i < gridSize; i++) { //Creates the rows
        const col = document.createElement('div');
        col.className = "col";
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div'); //Creates cells in row
            cell.className = "cell";
            col.appendChild(cell);
        }                
        container[0].appendChild(col);
    }
}

makeBlocks();