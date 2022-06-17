

const grid = document.querySelector('.grid');
const gridCell = document.querySelectorAll('cell'); 
const gridSize = 16;
let isToggling = false;


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

function colorCells() {
    document.addEventListener('mousedown', enableToggle);
  
    for (let i = 0, il = gridCell.length; i < il; i++) {
        gridCell[i].addEventListener('mouseover', toggle);
    }

    document.addEventListener('mouseup', disableToggle);
}

colorCells();