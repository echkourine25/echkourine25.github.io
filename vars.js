let pts=0;
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 7; // Change this value to adjust the size of the grid
const rectSize = canvas.width / gridSize;
const gridHeight = 8;
const totalCells = gridSize * gridHeight;
// Initialize an empty array for the numbers (grid will be empty)
const numbers = new Array(totalCells).fill(undefined);
const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
const colorsRev = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
let targetColumn = 3;
let topNumberIndex = -1;
let downArrowCount = 0;
let inGame=false;
let mainScreen=true;
let topNewNumberValue=generateNewNumberValue();
