const container = document.getElementById('container');


const gridSize = 5;

for (i=0; i < gridSize; i++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    container.appendChild(gridCell);
}