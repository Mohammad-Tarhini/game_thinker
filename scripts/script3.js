const h2 = document.querySelector("h2");
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const colors = [red, green, blue, yellow]; 

let cursor = 0;
let current_level = 0; 
let game_pattern = []; 

function randomElement(){
    return colors[Math.floor(Math.random()*colors.length)];
}

function blink(element){
    const backgroundColor = getComputedStyle(element).backgroundColor; 
    element.style.boxShadow = "0px 0px 5px 10px grey";
    element.style.backgroundColor = "grey";
    setTimeout(() =>{
        element.style.backgroundColor = `${backgroundColor}`;
        element.style.boxShadow = "0px 0px 0px 0px";
    }, 200);
 }

function waitForUserInput(){
    if(game_pattern[cursor]){
        linkToGameOver(game_pattern[cursor]);
        game_pattern[cursor].addEventListener("click", correctAnswer);
    }else{
        cursor = 0;
        moveToNextLevel();
    }
}

function linkToGameOver(correct_element){
    colors.forEach( e => {
        e.addEventListener("click", gameOver);
    });
    correct_element.removeEventListener("click", gameOver);
}

function gameOver(){
    alert("GameOver");
}

function correctAnswer(){
    alert("Mabrouk xD");
    cursor += 1;
    waitForUserInput();
}

function moveToNextLevel(){
    game_pattern.push(randomElement());
    blink(game_pattern[current_level]);
    current_level += 1;
    h2.innerHTML = `Level ${current_level}`;
    waitForUserInput();
}

function startGame(){
    document.removeEventListener("click", startGame);
    moveToNextLevel();
}

 document.addEventListener("click", startGame);