let gameInterval;
let playArea = document.createElement("div");
playArea.id = "playArea";
document.querySelector("body").appendChild(playArea);

for(let i = 0; i < 400; i++){
    let x = document.createElement("div");
    x.className = "borderBlock";

    playArea.appendChild(x);
}

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

playArea.appendChild(snakeHead);

function start(){
    if(document.querySelector("#startBtn").innerHTML == "START"){
        document.querySelector("#startBtn").innerHTML = "STOP";
        document.querySelector("#startBtn").classList.toggle("started");
        gameInterval = setInterval(() => {
            console.log("interval");
            moveSnakeBody();
            switch(snakeDir){
                case 0:
                    headPos[0]++;
                    break;
                case 1:
                    headPos[1]++;
                    break;
                case 2:
                    headPos[0]--;
                    break;
                case 3:
                    headPos[1]--;
                    break;
            }
        }, 1000);

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