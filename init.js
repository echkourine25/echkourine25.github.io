const grid=document.getElementById("gridContainer");
grid.autofocus;
const audioElem = document.getElementById("myAudio");
audioElem.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
audioElem.play();

generateNewTopNumber();
drawGrid();
window.addEventListener("keydown", handleInput);
