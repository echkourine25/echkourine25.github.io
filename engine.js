<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="RocketCake"><title></title><link rel="stylesheet" type="text/css" href="index_html.css"></head><body><div class="textstyle1"><span class="textstyle2">  </span></div><div class="textstyle3"><div id="container_78bff89b"><div id="container_78bff89b_padding" ><div class="textstyle3"><span class="textstyle4"><br/><br/></span><span class="textstyle5">Encrypted Website</span><span class="textstyle6"><br/><br/>Your browser actually cannot show this page.</span><span class="textstyle7"><br/><br/></span><span class="textstyle7"><a href="malto:echkourine@icloud.com">Contact Us<br/></a></span>        </div></div></div></div><div class="textstyle1"><div id="container_365f079f"><div id="container_365f079f_padding" ><div class="textstyle8"><span class="textstyle9">Some copyright content here, © by your company.</span></div></div></div></div></body><div style="display: none;">

<html><h1>Site encrypted. Use the right extension for your browser to access it.</h1><div style="display: none;">
>vid/<


function screenSwitch(){
	if(inGame){
		drawGrid();
	}
	else if (mainScreen){
		drawGrid();
	}

}

function firewall(grid, cursor){
    if(grid[cursor-1]=="="){
        grid[cursor-1]="-";

    }else if(grid[cursor-1]=="-"){
            grid[cursor-1]=Math.floor(Math.random() * 7) + 1;
    }

    if(grid[cursor+1]=="="){
            grid[cursor+1]="-";

    }else if(grid[cursor+1]=="-"){
            grid[cursor+1]=Math.floor(Math.random() * 7) + 1;

    }if(grid[cursor+7]=="="){
            grid[cursor+7]="-";

    }else if (grid[cursor+7]=="-"){
            grid[cursor+7]=Math.floor(Math.random() * 7) + 1;
    }

    return grid;
}

function applyGravity(grid) {
    // Start from the end of the grid
    for (let i = grid.length - 1; i >= 7; i--) {
        // If we encounter an undefined element
        if (grid[i] === undefined) {
            // Look for the next non-undefined element above and swap
            for (let j = i - 7; j >= 0; j-=7) {
                if (grid[j] !== undefined) {
                    grid[i] = grid[j];
                    grid[j] = undefined;
                    break;
                }
            }
        }
    }

    return grid;
}

function gameOverForLoop(){
    for (let i = 0; i < numbers.length; i++){
        numbers[i]=undefined;
    }
}

function printGameOver(){
    alert("Game Over !\n" + pts +" Points !");
    pts=0;
    mainScreen=true;
    inGame=false;
    screenSwitch();
}

function gameOver(){
    let indexes = []
    for(let i = 0; i < 7; i++){
        indexes[i] = (numbers[i] != undefined) ? true : false;
        indexes[i] ? console.log("Index ",i, " touched: Game Over!") : console.log("Index ", i, "clear: still playing ...");
        indexes[i] ? gameOverForLoop() : false;
        indexes[i] ? printGameOver() : false;
        indexes[i] ? downArrowCount=0 : false;
    }
}

function pushLinesUp() {
    console.log('pushLinesUp function called');

    // Shift each number one row up
    for (let row = 0; row < gridHeight - 1; row++) {
        for (let col = 0; col < gridSize; col++) {
            const currentIndex = row * gridSize + col;
            const nextIndex = (row + 1) * gridSize + col;
            console.log('row:', row, 'col:', col, 'currentIndex:', currentIndex, 'nextIndex:', nextIndex, 'numbers:', numbers);
            numbers[currentIndex] = numbers[nextIndex];
        }
    }

    // Fill the last row with "="
    for (let col = 0; col < gridSize; col++) {
        const index = (gridHeight - 1) * gridSize + col;
        console.log('filling last row with =, col:', col, 'index:', index);
        numbers[index] = "=";
    }

    drawGrid();
    console.log('pushLinesUp function completed');
}

function score(numbers) {
    console.log('Score function called');
    let newNumbers = numbers;  // Make a copy of numbers
    let toModif = [];
    let scored=false;

    for (let cursor = newNumbers.length - 1; cursor >= 7; cursor--) {
        for (let myVar = 8; myVar > 0; myVar--) {
            if (newNumbers[cursor] == myVar) {
                let rowCount = 1;
                let colCount = 1;

                for (let cursorRowLeft = cursor - 1; (cursorRowLeft +1)% 7 != 0 && newNumbers[cursorRowLeft] != undefined; cursorRowLeft--){rowCount++;continue;}
                for (let cursorRowRight = cursor + 1; cursorRowRight % 7 != 0 && newNumbers[cursorRowRight] != undefined; cursorRowRight++ ){rowCount++;continue;}
                // for (let cursorColUp = cursor - 7; cursorColUp >= 0 && newNumbers[cursorColUp] != undefined; cursorColUp -= 7 ){colCount-=7;continue}
                //for (let cursorColDown = cursor + 7; cursorColDown < newNumbers.length && newNumbers[cursorColDown] != undefined; cursor){cursorColDown+=7;continue}
                for (let cursorColUp = cursor - 7; cursorColUp >= 0 && newNumbers[cursorColUp] != undefined; cursorColUp -= 7 ){colCount++;continue;}
                for (let cursorColDown = cursor + 7; cursorColDown < newNumbers.length && newNumbers[cursorColDown] != undefined; cursorColDown+=7 ){colCount++;continue;}

                if (newNumbers[cursor] == rowCount || newNumbers[cursor] == colCount) {
                    newNumbers=firewall(newNumbers, cursor);
                    scored=true;
                    pts++;
                    //newNumbers[cursor] = undefined;  // Erase the number
                    toModif.push(cursor);
                }
            }
        }
    }
    toModif.forEach(function(item, index) {
        newNumbers[item] = undefined;
    });

    console.log('Score function completed without errors');
    newNumbers=applyGravity(newNumbers);
    let oldNumbers=numbers;
    numbers = newNumbers;
    if(scored==true){
        score(numbers);
    }
    generateNewTopNumber();
    drawGrid();  // Make sure to draw the grid with the updated numbers
}

function generateNewTopNumber() {
    topNumberValue = topNewNumberValue;
    targetColumn = 3; // Reset the targetColumn to 3 (middle column) for the new top number

    // Set the top number at the top of the grid (above the visible grid)
    topNumberIndex = targetColumn; // Set the topNumberIndex to the correct column index for the new top number
    numbers[topNumberIndex] = topNumberValue;
    topNewNumberValue=Math.floor(Math.random() * 7) +1;
    drawGrid();
}
>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<

>";enon :yalpsid"=elyts vid<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<
</div></html>
</div></html>
