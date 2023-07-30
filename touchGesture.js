const gameContainer = document.getElementById("gridContainer");
let touchStartX = 0;
let touchStartY = 0;

gameContainer.addEventListener("touchstart", handleTouchStart);
gameContainer.addEventListener("touchmove", handleTouchMove);
gameContainer.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.preventDefault(); // Prevents scrolling when dragging on the game container
    // You can add additional logic here to handle touch movement if needed
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    // Calculate the touch distance in the X and Y directions
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Determine the type of touch gesture based on the distance
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal gesture (left or right)
        if (deltaX > 0) {
            // Right swipe
            // Handle the right swipe action in your game logic
            actionRight();
            console.log("Right Swipe");
        } else {
            // Left swipe
            // Handle the left swipe action in your game logic
            actionLeft();
            console.log("Left Swipe");
        }
    } else {
        // Vertical gesture (up or down)
        if (deltaY > 0) {
            // Down swipe
            // Handle the down swipe action in your game logic
            console.log("down pressed");
		//sreenSwitch();
            downArrowCount++;
            // Move the top number down when the "Arrow Down" key is pressed
            if(downArrowCount === 7){
                moveDown();
                pushLinesUp();
		        gameOver();
                downArrowCount=0;
            }

            else {
                moveDown();
		        gameOver();
            }
            score(numbers);
            console.log("Down Swipe");
        } else {
            // Up swipe
            // Handle the up swipe action in your game logic
            console.log("Up Swipe");
        }
   }
}

function actionLeft(){
    // Move the top number to the left column if it is at the top of the grid
    if (topNumberIndex > 0) {
        numbers[topNumberIndex] = undefined;
        topNumberIndex--;
        targetColumn--;
        numbers[topNumberIndex] = topNumberValue;
        drawGrid();
    }
}

function actionRight(){
    // Move the top number to the right column if it is at the top of the grid
    if (topNumberIndex < gridSize - 1) {
        numbers[topNumberIndex] = undefined;
        topNumberIndex++;
        targetColumn++;
        numbers[topNumberIndex] = topNumberValue;
        drawGrid();
    }
}

function handleInput(event) {
    const key = event.key;

    if (key === "ArrowLeft") {
        actionLeft();
        console.log("left pressed");
    } else if (key === "ArrowRight") {
        actionRight();
        console.log("right pressed");
    } else if (key === "ArrowDown") {
	//screenSwitch();
        console.log("down pressed");
	if(inGame==true){
        downArrowCount++;
        // Move the top number down when the "Arrow Down" key is pressed
        if(downArrowCount === 7){
            moveDown();
            pushLinesUp();
            gameOver();
            downArrowCount=0;
        }
        else {
            moveDown();
            gameOver();
        }
        score(numbers);
    }else {
	inGame=true;
	drawGrid();
	}
}
}

