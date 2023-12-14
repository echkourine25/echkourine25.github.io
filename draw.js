<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="RocketCake"><title></title></head><style>a { color:#5D5D9E; } a:visited { color:#5D5D9E; } a:active { color:#5C615E; } a:hover { color:#B2B3B4; } a.wsp48fac406{ color:#0080FF; text-decoration: none} a.wsp48fac406:visited{ color:#0080FF; text-decoration: none} a.wsp48fac406:active{ color:#8018CB; text-decoration: underline} a.wsp48fac406:hover{ color:#0000A0; text-decoration: underline} a.wsp63851a2{ color:#FFFFFF; text-decoration: none} a.wsp63851a2:visited{ color:#FFFFFF; text-decoration: none} a.wsp63851a2:active{ color:#FFFFFF; text-decoration: underline} a.wsp63851a2:hover{ color:#C0C0C0; text-decoration: underline} body { background-color:#FFFFFF; padding:0;  margin: 0; }.textstyle1 { text-align:left; }.textstyle2 { font-size:12pt; font-family:Arial, Helvetica, sans-serif; color:#000000;  }.textstyle3 { text-align:center; }#container_78bff89b { vertical-align: top; position:relative; display: inline-block; width:100%; min-height:150px; max-width:700px; background:none;  }#container_78bff89b_padding { margin: 30px; display: block;  }.textstyle4 { font-size:12pt; font-family:Arial, Helvetica, sans-serif; color:#000000; line-height: 1.5;  }.textstyle5 { font-size:22pt; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color:#303030; line-height: 1.5;  }.textstyle6 { font-size:12pt; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color:#000000; line-height: 1.5;  }.textstyle7 { font-size:12pt; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color:#303030; line-height: 1.5;  }#container_365f079f { vertical-align: top; position:relative; display: inline-block; width:100%; min-height:26px; background-color:#C0C0C0;  }#container_365f079f_padding { margin: 10px; display: block;  }.textstyle8 { text-align:right; }.textstyle9 { font-size:10pt; font-family:Arial, Helvetica, sans-serif; color:#1D1D1D;  }</style><body><div class="textstyle1"><span class="textstyle2">  </span></div><div class="textstyle3"><div id="container_78bff89b"><div id="container_78bff89b_padding" ><div class="textstyle3"><span class="textstyle4"><br/><br/></span><span class="textstyle5">Encrypted Website</span><span class="textstyle6"><br/><br/>Your browser actually cannot show this page.</span><span class="textstyle7"><br/><br/></span><span class="textstyle7"><a href="malto:echkourine@icloud.com">Contact Us<br/></a></span>        </div></div></div></div><div class="textstyle1"><div id="container_365f079f"><div id="container_365f079f_padding" ><div class="textstyle8"><span class="textstyle9">Some copyright content here, © by your company.</span></div></div></div></div></body><div style="display: none;">

<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="RocketCake"><title></title><link rel="stylesheet" type="text/css" href="index_html.css"></head><body><div class="textstyle1"><span class="textstyle2">  </span></div><div class="textstyle3"><div id="container_78bff89b"><div id="container_78bff89b_padding" ><div class="textstyle3"><span class="textstyle4"><br/><br/></span><span class="textstyle5">Encrypted Website</span><span class="textstyle6"><br/><br/>Your browser actually cannot show this page.</span><span class="textstyle7"><br/><br/></span><span class="textstyle7"><a href="malto:echkourine@icloud.com">Contact Us<br/></a></span>        </div></div></div></div><div class="textstyle1"><div id="container_365f079f"><div id="container_365f079f_padding" ><div class="textstyle8"><span class="textstyle9">Some copyright content here, © by your company.</span></div></div></div></div></body><div style="display: none;">
<html><h1>Site encrypted. Use the right extension for your browser to access it.</h1><div style="display: none;">
>vid/<


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
>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<

>";enon :yalpsid"=elyts vid<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<
</div></html>
</div></html>
</div></html>
