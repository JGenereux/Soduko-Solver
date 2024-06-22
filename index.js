
let board = [
    [5,2,0,0,6,9,0,0,8],
    [0,0,9,0,0,4,2,0,5],
    [0,0,8,7,2,0,0,0,1],
    [0,0,0,0,0,0,0,0,4],
    [6,7,1,3,0,2,8,5,9],
    [2,0,0,0,0,0,0,0,0],
    [9,0,0,0,1,3,7,0,0],
    [7,0,6,4,0,0,9,0,0],
    [4,0,0,9,7,0,0,8,3],
]

function getBoard(){
    const rowONEContainer = document.querySelector('.RowONE');
    const rowTWOContainer = document.querySelector('.RowTWO');
    const rowTHREEContainer = document.querySelector('.RowTHREE');
    const rowFOURContainer = document.querySelector('.RowFOUR');
    const rowFIVEContainer = document.querySelector('.RowFIVE');
    const rowSIXContainer = document.querySelector('.RowSIX');
    const rowSEVENContainer = document.querySelector('.RowSEVEN');
    const rowEIGHTContainer = document.querySelector('.RowEIGHT');
    const rowNINEContainer = document.querySelector('.RowNINE');
    displayBoard(0, rowONEContainer);
    displayBoard(1, rowTWOContainer);
    displayBoard(2, rowTHREEContainer);
    displayBoard(3, rowFOURContainer);
    displayBoard(4, rowFIVEContainer);
    displayBoard(5, rowSIXContainer);
    displayBoard(6, rowSEVENContainer);
    displayBoard(7, rowEIGHTContainer);
    displayBoard(8, rowNINEContainer);
}

function handleCellChange(event){
    const changedValue = event.target.value;
    const cellElement = event.target;
    const rowElement = cellElement.parentElement; //gets parent element of cell which is the row it is in.
    const rowIndex = Array.from(rowElement.parentElement.children).indexOf(rowElement); //Creates an array of a collection of all rows of the board, which then returns the index of the current cell.
    const columnIndex = Array.from(rowElement.children).indexOf(cellElement); //Creates an array of all cells of the row, and returns the current column index.

    if(validRow(rowIndex, changedValue) && validColumn(columnIndex, changedValue) && validSubgrid(rowIndex, columnIndex, changedValue)){
        cellElement.style.backgroundColor = "green";
    } else{
        cellElement.style.backgroundColor = "red";
    }
}


function displayBoard(i, rowContainer){
    board[i].forEach(cell => {
        const cellElement = document.createElement('input');
        cellElement.type = 'text';
        cellElement.value = (cell != 0 ? cell : '');
        cellElement.maxLength = 1;
        cellElement.classList.add('sudoku-cell');
        cellElement.onchange = handleCellChange;
        rowContainer.appendChild(cellElement);
    });
}

function clearBoard(){
    const containers = document.querySelectorAll('.standardRows');
    containers.forEach(container => {
        container.innerHTML = '';
    });

    const containerRowNine = document.querySelectorAll('.RowNINE');
    containerRowNine.forEach(container => {
        container.innerHTML = '';
    });
}






/* Logic for solving the sudoku board */

//3 conditions, check if valid in row, column and subgrid

function validRow(row, val){
    for(let j = 0; j < 9; j++){
        if(board[row][j] == val){
            return false;
        }
    }
    return true;
}

function validColumn(column, val){
    for(let i = 0; i < 9; i++){
        if(board[i][column] == val){
            return false;
        }
    }
    return true;
}

function validSubgrid(row,column, val){
    let startRow = Math.floor(row/3) * 3;
    let endColumn = Math.floor(column/3) * 3;
    for(let i  = startRow; i < startRow+3; i++){
        for(let j = endColumn; j < endColumn+3; j++){
            if(board[i][j] == val){
                return false;
            }
        }
    }
    return true;
}

function solve(row, column) {
    // Base case: If we've reached the end of the board, print the board and return true
    if (row == 9) {
        console.log(board);
        return true;
    }

    // If we've reached the end of the current row, move to the next row
    if (column == 9) {
        return solve(row + 1, 0);
    }

    // Skip cells that are already filled
    if (board[row][column] != 0) {
        return solve(row, column + 1);
    }

    // Try placing numbers 1-9 in the current cell
    for (let num = 1; num <= 9; num++) {
        if (validRow(row, num) && validColumn(column, num) && validSubgrid(row, column, num)) {
            board[row][column] = num;
            // Recursively solve for the next cell
            if (solve(row, column + 1)) {
                return true;
            }
            // If not valid, reset the cell (backtrack)
            board[row][column] = 0;
        }
    }
    
    // Trigger backtracking by returning false
    return false;
}


getBoard();
document.getElementById("solveButton").addEventListener("click", () => {
    console.log("YES");
    clearBoard();
    solve(0,0, board);
    getBoard();
})