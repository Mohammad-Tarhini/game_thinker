const h2 = document.querySelector("h2");
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const colors = [red, green, blue, yellow]; 

const BLINK_TIME = 500;

let gameState = {
    pattern: [],
    cursor: 0,
    level: 0,
    started: false
};

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function blink(element) {
    const backgroundColor = getComputedStyle(element).backgroundColor; 
    element.style.boxShadow = "0px 0px 5px 10px grey";
    element.style.backgroundColor = "grey";
    
    setTimeout(() => {
        element.style.backgroundColor = backgroundColor;
        element.style.boxShadow = "none";
    }, BLINK_TIME);
}

function resetListeners() {
    colors.forEach(button => {
        button.removeEventListener("click", handleCorrectAnswer);
        button.removeEventListener("click", gameOver);
    });
}

function waitForUserInput() {
    resetListeners();
    
    if (gameState.pattern[gameState.cursor]) {
        const correctButton = gameState.pattern[gameState.cursor];
        correctButton.addEventListener("click", handleCorrectAnswer);
        attachGameOverListeners(correctButton);
    } else {
        gameState.cursor = 0;
        setTimeout(startNextLevel, 500);
    }
}

function attachGameOverListeners(correctElement) {
    colors.forEach(button => {
        button.addEventListener("click", gameOver);
    });
    correctElement.removeEventListener("click", gameOver);
}

function handleCorrectAnswer() {
    gameState.cursor += 1;
    
    if (gameState.cursor === gameState.pattern.length) {
        gameState.cursor = 0;
        setTimeout(startNextLevel, 500);
    } else {
        waitForUserInput();
    }
}

function gameOver() {
    alert("Game Over!");
    resetGame();
}

function startNextLevel() {
    const nextColor = getRandomColor();
    gameState.pattern.push(nextColor);
    blink(nextColor);
    
    gameState.level += 1;
    h2.innerHTML = `Level ${gameState.level}`;
    
    waitForUserInput();
}

function resetGame() {
    gameState = {
        pattern: [],
        cursor: 0,
        level: 0,
        started: false
    };
    h2.innerHTML = "Level 0";
    document.addEventListener("click", startGame);
}

function startGame() {
    if (!gameState.started) {
        gameState.started = true;
        document.removeEventListener("click", startGame);
        startNextLevel();
    }
}

document.addEventListener("click", startGame);
