

const containerBox = document.querySelector('.container');
const gridCell = document.getElementsByClassName('cell');
const allCells = document.querySelectorAll('.cell');
const inputs = document.querySelectorAll('.controls input');

let gridSize = 16;
let isToggling = false;


//Makes the grid
function makeBlocks() {
    for (let i = 0; i < gridSize; i++) { //Creates the rows
        const col = document.createElement('div');
        col.className = "col";
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div'); //Creates cells in row
            cell.className = "cell";
            col.appendChild(cell);
        }                
        containerBox.appendChild(col);
    }
}
makeBlocks();
//Creates event to listen on the "cells". Looking for if the cells have the 
//mouse down event

function enableToggle(e) {
    if (e.target.classList == 'cell' || e.target.classList == 'cell active') {
        console.log('enable', e.target);
        e.target.classList.toggle('active');
    }
    isToggling = true;
    console.log('enableToggle');
}

function disableToggle() {
    console.log('disableToggle');
    isToggling = false;
}

function toggle(e) {
    if (isToggling === false) {
        return;
    }
    console.log('toggle:', e.target);
    e.target.classList.toggle('active');
}

let colorCells = function() {
    document.addEventListener('mousedown', enableToggle);
  
    for (let i = 0, il = gridCell.length; i < il; i++) {
        gridCell[i].addEventListener('mouseenter', toggle);
    }

    document.addEventListener('mouseup', disableToggle);
}

//Testing new branch
function handleUpdate() {
    gridSize = this.value;
    refreshGrid();
    makeBlocks();
}

function refreshGrid() {
    containerBox.innerHTML ='';
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));