const grid = document.querySelector('.grid');
const inputs = document.querySelectorAll('.controls input');
const sizeLabel = document.querySelector('.size');
const cellGrid = document.querySelectorAll('.cell');

const defaultSize = 16;
let isToggling = false;

sizeLabel.innerHTML = defaultSize + ' X ' + defaultSize;

window.onload = () => {
    setupGrid(defaultSize);
}

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
    gridSize = this.value;
    refreshGrid();
    setupGrid(gridSize);
}

function refreshGrid() {
    grid.innerHTML ='';
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousedown', () => {
    inputs.forEach(input => input.addEventListener('mousemove', moveMouse));
}));

function moveMouse () {
    console.log(this.value);
    sizeLabel.innerHTML = this.value + ' X ' + this.value;
}

//Color the cells
function toggle(e) {
    if (e.type == 'mousedown') {
        isToggling = true;
        console.log('enableToggle');
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
    console.log('toggle:', e.target);
    e.target.style.background = '#6d4545';
}

function colorCells() {
    document.addEventListener('mousedown', toggle);
    document.addEventListener('mouseup', toggle);

    grid.addEventListener('mousedown', addColor);
    grid.addEventListener('mouseover', addColor);
}

colorCells();
