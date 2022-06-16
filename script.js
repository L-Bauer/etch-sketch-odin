const containerBox = document.getElementsByClassName('container');
const gridCell = document.getElementsByClassName('cell'); 


const gridSize = 8;

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
        containerBox[0].appendChild(col);
    }
}
makeBlocks();

//Creates event to listen on the "cells". Looking for if the cells have the 
//mouse down event

function dragCells () {
    for (let cellsNum = 0; cellsNum < gridCell.length; cellsNum++) {
        gridCell[cellsNum].addEventListener('dragover', () => 
            console.log('I am clicked ' + cellsNum));
    }


}

window.onload = addListeners;

function addListeners(){
    window.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp()
{
    containerBox[0].removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
    containerBox[0].addEventListener('mousemove', divMove, true);
}

function divMove(e){
        console.log(e);
}