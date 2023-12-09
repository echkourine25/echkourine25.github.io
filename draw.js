

function drawNextNumber(){
    const nextNumberElement = document.getElementById('nextNumber');
    nextNumberElement.innerHTML = "<h3>Next: "+topNewNumberValue+"</h3>";
    console.log("nextNumber drawn");
}
function drawGrid() {
if(inGame){
ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < gridHeight; row++) {
        console.log("gridHeight="+gridHeight);
        for (let col = 0; col < gridSize; col++) {
            console.log("gridSize="+gridSize);
            const x = col * rectSize;
            const y = row * rectSize;

            const number = numbers[row * gridSize + col];
            if (number !== undefined && (typeof number === "number" && number >= 1 && number <= 7)) {
                ctx.beginPath();
                ctx.arc(x + rectSize / 2, y + rectSize / 2, rectSize / 2, 0, 2 * Math.PI);
                ctx.fillStyle = "gainsboro";
                ctx.fill();
            }
            else if (number === "=" || number === "-") {
                ctx.beginPath();
                ctx.arc(x + rectSize / 2, y + rectSize / 2, rectSize / 2, 0, 2 * Math.PI);
                ctx.fillStyle = "gainsboro";
                ctx.fill();
            }

            if (number !== undefined) {
                ctx.fillStyle = (typeof number === "number") ? colors[number - 1] : "red";
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(number.toString(), x + rectSize / 2, y + rectSize / 2);
            }
        }
    }
    drawNextNumber();

}
else if(mainScreen){
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = "20px Arial";
ctx.fillStyle = "lightgreen";
ctx.textAlign = "center";
ctx.fillText("Press \"Down\" to Start !", canvas.width/2, canvas.height/2);
mainScreen=false;
}
}

function moveDown() {
    // Find the index of the top number in the numbers array
    const topNumberIndex = numbers.indexOf(topNumberValue);

    // Check if the top number is at the bottom row or there is a filled cell below
    const isAtBottomRow = topNumberIndex >= (gridHeight - 1) * gridSize;
    const cellBelowIndex = topNumberIndex + gridSize;
    const isCellBelowFilled = numbers[cellBelowIndex] !== undefined;

    // Stop moving down if the top number is at the bottom row or there is a filled cell below
    if (isAtBottomRow || isCellBelowFilled) {
        //generateNewTopNumber(); // Generate a new top number after reaching the bottom or encountering a filled cell
        return;
    }

    // Calculate the destination index for the top number to move one row down in the target column
    let destinationIndex = topNumberIndex;
    while (destinationIndex + gridSize < totalCells && numbers[destinationIndex + gridSize] === undefined) {
        destinationIndex += gridSize;
    }

    // Move the top number to the next index (down to the target column)
    numbers[destinationIndex] = topNumberValue;
    numbers[topNumberIndex] = undefined;
    drawGrid();

    // Continue the animation after a short delay
    //setTimeout(moveDown, 200);
}
/*
function animateMoveDown(startIndex, endIndex) {
    const animationSpeed = 5; // Adjust this value to control the speed of movement
    const distance = endIndex - startIndex;
    const direction = distance > 0 ? 1 : -1; // 1 for moving down, -1 for moving up

    const nextIndex = startIndex + direction * animationSpeed;

    // Move the top number to the next index
    numbers[nextIndex] = topNumberValue;
    numbers[startIndex] = undefined;
    drawGrid();

    // Continue the animation until reaching the destination index
    if ((direction === 1 && nextIndex < endIndex) || (direction === -1 && nextIndex > endIndex)) {
        requestAnimationFrame(() => animateMoveDown(nextIndex, endIndex));
    } else {
        generateNewTopNumber(); // Generate a new top number after the animation is complete
    }
}

function animateMoveDown(startIndex, endIndex) {
    const animationSpeed = 5; // Adjust this value to control the speed of movement
    const distance = endIndex - startIndex;
    const direction = distance > 0 ? 1 : -1; // 1 for moving down, -1 for moving up

    const nextIndex = startIndex + direction * animationSpeed;

    // Move the top number to the next index
    numbers[nextIndex] = topNumberValue;
    numbers[startIndex] = undefined;
    drawGrid();

    // Continue the animation until reaching the destination index
    if ((direction === 1 && nextIndex < endIndex) || (direction === -1 && nextIndex > endIndex)) {
        requestAnimationFrame(() => animateMoveDown(nextIndex, endIndex));
    } else {
        generateNewTopNumber(); // Generate a new top number after the animation is complete
    }
}*/

>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<