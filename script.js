const grid = document.querySelector('.grid');
const inputs = document.querySelectorAll('.controls input');
const sizeLabel = document.querySelector('.size');
const cellGrid = document.querySelectorAll('.cell');
const eraseButton = document.querySelector('.erase');

let gridSize = 16;
let isToggling = false;
let cellColor = '#6d4545';

window.onload = () => {
    setupGrid(gridSize);
}
sizeLabel.innerHTML = gridSize + ' X ' + gridSize;

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let totalGridSize = size**2;

    for (let i = 0; i < totalGridSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.className ='cell';
        grid.appendChild(gridElement);
    }
}

//Changing the grid size
function handleUpdate() {
    if (this.id == 'sizing') {
        gridSize = this.value;
        newGrid();
         
    }
    if (this.id == 'color') {
        console.log(this.value);
        cellColor = this.value;
    }
}

function newGrid () {
    grid.innerHTML ='';
    setupGrid(gridSize);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousedown', () => {
    inputs.forEach(input => input.addEventListener('mousemove', moveMouse));
}));

function moveMouse () {
    if (this.id == 'sizing') {
        console.log(this.value);
        sizeLabel.innerHTML = this.value + ' X ' + this.value;
        console.log(this.id); 
    }
}

//Erase work, Start with clean grid
eraseButton.addEventListener('click', newGrid);


//Color the cells
function toggle(e) {
    if (e.type == 'mousedown') {
        isToggling = true;
        console.log('enableToggle');
        console.log(e);
        if (e.target.parentElement.className == 'grid') {
            addColor(e);
        }
    }
    else if (e.type == 'mouseup') {
        console.log('disableToggle');
        isToggling = false;
    }
}

function addColor(e) {
    if (isToggling === false) {
        return;
    }
    e.target.style.background = cellColor;
    console.log('toggle:', e.target);
}

function colorCells() {
    grid.addEventListener('mousedown', addColor);
    grid.addEventListener('mousemove', addColor);

    document.addEventListener('mousedown', toggle);
    document.addEventListener('mouseup', toggle);
}

colorCells();
//End of coloring cells
