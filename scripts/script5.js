//************** DOM Elements **************//
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");

const colors = [red, blue, green, yellow];

//************** Game State **************//
const memory = [];
let playerSequence = [];
let isGameActive = false;

//************** Game Logic **************//
function getRandomElement() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    memory.push(randomColor);
    return randomColor;
}

function blink(element) {
    const originalColor = getComputedStyle(element).backgroundColor;
    element.style.boxShadow = "0px 0px 20px 15px grey";
    element.style.backgroundColor = "grey";
    
    setTimeout(() => {
        element.style.backgroundColor = originalColor;
        element.style.boxShadow = "none";
    }, 200);
}

function resetGame() {
    alert("Game Over! Try again.");
    memory.length = 0;
    playerSequence.length = 0;
    isGameActive = false;
}

function handlePlayerInput(color) {
    if (!isGameActive) return;

    playerSequence.push(color);
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== memory[currentIndex]) {
        resetGame();
        return;
    }

    if (playerSequence.length === memory.length) {
        playerSequence = [];
        setTimeout(startNextRound, 1000);
    }
}

//************** Event Handlers **************//

function startNextRound() {
    isGameActive = true;
    blink(getRandomElement());
}

function initializeGame() {
    if (!isGameActive) {
        memory.length = 0;
        playerSequence.length = 0;
        startNextRound();
    }
}

//************** Event Listeners **************//
document.addEventListener("click", initializeGame);
colors.forEach(color => 
    color.addEventListener("click", () => handlePlayerInput(color))
);