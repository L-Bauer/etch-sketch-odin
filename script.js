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


const RGB_Linear_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}

const RGB_Linear_Blend=(p,c0,c1)=>{
    var i=parseInt,r=Math.round,P=1-p,[a,b,c,d]=c0.split(","),[e,f,g,h]=c1.split(","),x=d||h,j=x?","+(!d?h:!h?d:r((parseFloat(d)*P+parseFloat(h)*p)*1000)/1000+")"):")";
    return"rgb"+(x?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+i(e[3]=="a"?e.slice(5):e.slice(4))*p)+","+r(i(b)*P+i(f)*p)+","+r(i(c)*P+i(g)*p)+j;
}

grid.addEventListener('mouseover', shade);

//Darkens shade
function shade(e) {
    let newColor = RGB_Linear_Shade(-0.5, e.target.style.background)
    console.log(newColor);
    e.target.style.background = newColor;
}

