let gameInterval;
let interval = 300; //frame ms
let playArea = document.createElement("div");
playArea.id = "playArea";
document.querySelector("body").appendChild(playArea);

let headPos = [10, 10]; //[column, row]
let snakeBody = [[10, 10]]; //[column, row]
let snakeDir = 0; //0. -> |1. V |2. <- |3. /\

let snakeHead = document.createElement("div");
snakeHead.id = "snakeHead";
snakeHead.className = "snakePart";
updateSnakeHead();
function updateSnakeHead(){
    snakeHead.style.gridColumn = headPos[0];
    snakeHead.style.gridRow = headPos[1];
}

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
                    if(headPos[0]-1 >= 0){
                        headPos[0]--;
                    }
                    else{
                        dead();
                    }
                    break;
                case 3:
                    if(headPos[1]-1 >= 0){
                        headPos[1]--;
                    }
                    else{
                        dead();
                    }
                    break;
            }
            moveSnakeBody();
        }, interval);

        function moveSnakeBody(){
            for(let i = 0; i < snakeBody.length; i++){
                snakeBody[snakeBody.length-(i+1)] == snakeBody[snakeBody.length-(i+1)];
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