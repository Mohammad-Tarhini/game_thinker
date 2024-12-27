//************** */
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");

//****************** */
const colors = [red, blue, green, yellow];
const memory = [];
let playerSequence = [];

//*********** */
let is_start = false;
let count = 0;

//****************** */
function randomelement() {
    const c = colors[Math.floor(Math.random() * colors.length)];
    memory.push(c);  
    return c;
}

function blink(element) {
    const backgroundColor = getComputedStyle(element).backgroundColor;
    element.style.boxShadow = "0px 0px 20px 15px grey";
    element.style.backgroundColor = "grey";
    setTimeout(() => {
        element.style.backgroundColor = backgroundColor;
        element.style.boxShadow = "none";
    }, 200);
}

function gameover() {
    alert("Game Over! Try again.");
    memory.length = 0;  // Clear memory
    playerSequence.length = 0;
    is_start = false;
}

function handleClick(color) {
    if (!is_start) return;
    
    playerSequence.push(color);
    
    const index = playerSequence.length - 1;
    
    if (playerSequence[index] !== memory[index]) {
        gameover();
        return;
    }

    if (playerSequence.length === memory.length) {
        playerSequence = [];  // Reset for next round
        setTimeout(start, 1000);  // Start next round after delay
    }
}

function fred() {
    handleClick(red);
}
function fblue() {
    handleClick(blue);
}
function fgreen() {
    handleClick(green);
}
function fyellow() {
    handleClick(yellow);
}

function start() {
    is_start = true;
    blink(randomelement())
}


function ss() {
    if (!is_start) {
        memory.length = 0;  
        playerSequence.length = 0;
        start();
    }
}

//************** */
document.addEventListener("click", ss);
red.addEventListener("click", fred);
blue.addEventListener("click", fblue);
green.addEventListener("click", fgreen);
yellow.addEventListener("click", fyellow);
