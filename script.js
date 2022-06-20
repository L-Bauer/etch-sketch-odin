const grid = document.querySelector('.grid');
const inputs = document.querySelectorAll('.controls input');
const sizeLabel = document.querySelector('.size');
const cellGrid = document.querySelectorAll('.cell');
const eraseButton = document.querySelector('.erase');
const normalColor = document.querySelector('#color');

let gridSize = 16;
let isToggling = false;
let cellColor = normalColor.value;
let radioButtonValue;

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

//Looking at input blocks
function handleUpdate() {
    if (this.id == 'sizing') {
        gridSize = this.value;
        newGrid();     
    }
    else if (this.id == 'color') {
        console.log(this.value);
        cellColor = this.value;
    }
    else if (this.type == 'radio') {
        console.log(this.value);
        radioButtonValue = this.value;
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
        if (e.target.parentElement.className == 'grid') {
            cellChange(e);
        }
    }
    else if (e.type == 'mouseup') {
        console.log('disableToggle');
        isToggling = false;
    }
}

function cellChange(e) {
    if (isToggling === false) {
        return;
    }
    else if (radioButtonValue == 'lighten') {
        lightShade(e);
        console.log('Lighten Color');
    }
    else if (radioButtonValue == 'darken') {
        darkShade(e);
        console.log('Darken Color');
    }
    else {
        color(e);
        console.log('Normal Color');
    }
}
colorCells();
function colorCells() {
    grid.addEventListener('mousedown', cellChange);
    grid.addEventListener('mousemove', cellChange);

    document.addEventListener('mousedown', toggle);
    document.addEventListener('mouseup', toggle);
}


const RGB_Linear_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}

//Darkens shade
function darkShade(e) {
    let newColor = RGB_Linear_Shade(-0.1, e.target.style.background)
    console.log(newColor);
    e.target.style.background = newColor;
}
//Lightens shade
function lightShade(e) {
    let newColor = RGB_Linear_Shade(0.1, e.target.style.background)
    console.log(newColor);
    e.target.style.background = newColor;
}

function color(e) {
    e.target.style.background = cellColor;
}

