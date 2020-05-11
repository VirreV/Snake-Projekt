let gameInterval;
let interval = 200; //frame ms
let playArea = document.createElement("div");
playArea.id = "playArea";
document.querySelector("body").appendChild(playArea);

let score = 0;
let headPos = [10, 10]; //[column, row]
let snakeBody = [[10, 10]]; //[column, row]
let snakeDir = 0; //0. -> |1. V |2. <- |3. /\
let candyPos;

let snakeHead = document.createElement("div");
snakeHead.id = "snakeHead";
snakeHead.className = "snakePart";
updateSnakeHead();
function updateSnakeHead(){
    snakeHead.style.gridColumn = headPos[0];
    snakeHead.style.gridRow = headPos[1];
}

let candy = document.createElement("div");
randomCandy();
function randomCandy(){
    candyPos = [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];
    candy.style.gridColumn = candyPos[0];
    candy.style.gridRow = candyPos[1];
}
candy.id = "candy";
playArea.appendChild(candy);



function dead(){
    window.location.href = "gameOver.html";
}

playArea.appendChild(snakeHead);

function start(){
    if(document.querySelector("#startBtn").innerHTML == "START"){
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 37) {
                snakeDir = 2;
            }
            else if(event.keyCode == 38){
                snakeDir = 3;
            }
            else if(event.keyCode == 39) {
                snakeDir = 0;
            }
            else if(event.keyCode == 40){
                snakeDir = 1;
            }
        });
        document.querySelector("#startBtn").innerHTML = "STOP";
        document.querySelector("#startBtn").classList.toggle("started");
        gameInterval = setInterval(() => {
            switch(snakeDir){
                case 0:
                    if(headPos[0]+1 <= 20){
                        headPos[0]++;
                    }
                    else{
                        dead();
                    }
                    break;
                case 1:
                    if(headPos[1]+1 <= 20){
                        headPos[1]++;
                    }
                    else{
                        dead();
                    }
                    break;
                case 2:
                    if(headPos[0]-1 > 0){
                        headPos[0]--;
                    }
                    else{
                        dead();
                    }
                    break;
                case 3:
                    if(headPos[1]-1 > 0){
                        headPos[1]--;
                    }
                    else{
                        dead();
                    }
                    break;
            }
            moveSnakeBody();
            snakeBody[0][0] = headPos[0];
            snakeBody[0][1] = headPos[1];
            checkForBodyCollision();
            checkForCandyCollision();
        }, interval);

        function moveSnakeBody(){
            for(let i = 0; i < snakeBody.length - 1; i++){
                snakeBody[snakeBody.length-(i+1)][0] = snakeBody[snakeBody.length-(i+2)][0];
                snakeBody[snakeBody.length-(i+1)][1] = snakeBody[snakeBody.length-(i+2)][1];
                document.getElementById("body" + i).style.gridColumn = snakeBody[snakeBody.length-(i+1)][0];
                document.getElementById("body" + i).style.gridRow = snakeBody[snakeBody.length-(i+1)][1];
            }
            updateSnakeHead();
        }
    }
    else{
        document.querySelector("#startBtn").innerHTML = "START";
        document.querySelector("#startBtn").classList.toggle("started");
        clearInterval(gameInterval);
    }
}

function checkForCandyCollision(){
    if(headPos[0] == candyPos[0] && headPos[1] == candyPos[1]){
        score++;
        randomCandy();
        console.log("hit");
        snakeBody.push([headPos[0], headPos[1]])
        let bodyPart = document.createElement("div");
        bodyPart.className = "snakePart";
        bodyPart.id = "body" + (snakeBody.length - 2);
        bodyPart.style.gridColumn = headPos[0];
        bodyPart.style.gridRow = headPos[1];
        playArea.appendChild(bodyPart);
        document.getElementById("scoreSPAN").innerHTML = score;
    }
}
function checkForBodyCollision(){
    for(let i = 0; i < snakeBody.length - 1; i++){
        if(headPos[0] == snakeBody[i+1][0] && headPos[1] == snakeBody[i+1][1]){
            dead();
        }
    }
}