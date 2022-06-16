

const containerBox = document.querySelector('.container');
const gridCell = document.getElementsByClassName('cell'); 
const gridSize = 25;
let isToggling = false;

window.onload = makeBlocks(), colorCells();

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

//Creates event to listen on the "cells". Looking for if the cells have the 
//mouse down event

function enableToggle(e) {
    console.log('enableToggle')
    isToggling = true;
    if (e.target.classList == 'cell') {
        e.target.classList.toggle('active');
    }
}

function disableToggle() {
    console.log('disableToggle')
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
    document.onmousedown = enableToggle;
  
    for (let i = 0, il = gridCell.length; i < il; i++) {
        gridCell[i].onmouseenter = toggle; //changes color 
    }

    document.onmouseup = disableToggle;
}