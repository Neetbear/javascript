const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const arcRadius = 5;
let arcPosX = canvas.width / 2;
let arcPosY = canvas.height / 2 + 120;

const startDir = [-1, 1];
let X = 1; 
let Y = 1;
let S = 3;

let ball = {
    left: 0, right: 0, top: 0, bottom: 0
}

// 블록 배열 만들기
// let brick = {
//     left: 0, right: 0, top: 0, bottom: 0,
//     column: 0, row: 0, collisionCount: 0
// }

class Brick {
    constructor(left, top, right, bottom, column, row, collisionCount) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.column = column;
        this.row = row;
        this.collisionCount = collisionCount;
    }
}
class BlockBrick extends Brick {
    constructor(left, top, right, bottom, column, row, collisionCount, dir, speed){
        super(left, top, right, bottom, column, row, collisionCount);
        this.dir = dir;
        this.speed = speed;
    };
    movingBrick() {
        if (this.dir == 1) {
            this.left += this.speed;
            this.right += this.speed;
            if( this.left + 100 >= canvas.width ) {
                this.dir = -1;
            } 
        } else {
            this.left -= this.speed;
            this.right -= this.speed;
            if( this.left <= 0 ) {
                this.dir = 1;
            }
        }
    };
    blockArc() {
        if(arcPosX >= this.left
            && arcPosX <= this.right
            && arcPosY >= this.top
            && arcPosY <= this.bottom) {
                console.log(blockBrick);
                Y = Y * (-1);
        } 
    };
}
// 방해 블록 만들기 
// left, top, right, bottom, column, row, collisionCount, dir, speed
const blockBrick = new BlockBrick(150, 200, 250, 225, 1, 1, 0, startDir[Math.round(Math.random())], 1);
function drawBlockBrick() {
    context.beginPath();
    context.rect(blockBrick.left, blockBrick.top, 100, 25);
    context.fillStyle = "black"; 
    context.fill(); 
    context.closePath();
}

// 실수로 시작부터 column열 row행 반대로 시작함
let brickColumn = 5;
let brickRow = 4;

let brickWidth = 50;
let brickHeight = 25;

function startBricks() {
    brickColumn = document.getElementById("columnNumber").value;
    brickRow = document.getElementById("rowNumber").value;

    console.log(brickColumn, brickRow);
    setBrickSize();
    setBricks();
}
function setBrickSize() {
    // startBricks();
    brickWidth = (290 - (10 * (brickColumn-1)))/brickColumn;
    brickHeight = (130 - (10 * (brickRow-1)))/brickRow;    
    console.log(brickWidth, brickHeight);
}

let bricks = []; // 2차원 배열로 생성할 것임
function setBricks() {
    for(let i = 0; i < brickRow; i++) {
        bricks[i] = [];
        for(let j = 0; j < brickColumn; j++) {
            // bricks[i][j] = {
            //     left: 55 + j * (brickWidth + 10), 
            //     right: 55 + j * (brickWidth + 10) + brickWidth, 
            //     top: 30 + i * (brickHeight + 10), 
            //     bottom: 30 + i * (brickHeight + 10) + brickHeight,
            //     column: i, row: j, collisionCount: 0
            // }; class로 변환 
            bricks[i][j] = new Brick(
                55 + j * (brickWidth + 10), 
                30 + i * (brickHeight + 10), 
                55 + j * (brickWidth + 10) + brickWidth, 
                30 + i * (brickHeight + 10) + brickHeight,
                i, j, 0
            );
        }
    } 
}

const bricksColor = ["rgb(251, 55, 55)", "orange", "yellow", "rgb(0, 230, 0)", "blue", "indigo", "puple"];
function drawBricks() {
    for(let i = 0; i < brickRow; i++) {
        // context.beginPath();
        for(let j = 0; j < brickColumn; j++) {
            if(bricks[i][j].collisionCount == 0) {
                context.beginPath();
                context.rect(bricks[i][j].left, bricks[i][j].top, brickWidth, brickHeight);
                context.fillStyle = bricksColor[(i%6)]; 
                context.fill(); 
                context.closePath();
            } else if(bricks[i][j].collisionCount == 1) {
                context.beginPath();
                context.rect(bricks[i][j].left, bricks[i][j].top, brickWidth, brickHeight);
                context.fillStyle = "gray"; 
                context.fill(); 
                context.closePath();
            } else {}
        }
        // context.closePath();
    }
}

// 벽돌깨기 
function isCollsionArcToBricks() {
    for(let i = 0; i < brickRow; i++) {
        for(let j = 0; j < brickColumn; j++) {
            if(arcPosX >= bricks[i][j].left
                && arcPosX <= bricks[i][j].right
                && arcPosY - arcRadius >= bricks[i][j].top
                && arcPosY - arcRadius <= bricks[i][j].bottom) {
                    if(bricks[i][j].collisionCount <= 1) {
                        bricks[i][j].collisionCount++; 
                        console.log("충돌");
                        Y = Y * (-1);
                        // bricks[i][j] = "";
                    }
            } 
        }
    }
} 

document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('keyup', keyUpEventHandler);

let rectPosX = canvas.width / 2 - 100 / 2;
let rectS = 15;

let gameStatus = 0; // 0 시작전 1 시작 2 끝
let pauseX = -1;
function keyDownEventHandler(e) {
    if(e.keyCode == 32) {
        if(gameStatus == 0) {
            // alert("Game Start");
            startBricks();
            // setBrickSize();
            X = startDir[Math.round(Math.random())];
            Y = startDir[Math.round(Math.random())];
            gameStatus = 1;
        } else if(gameStatus == 2) {
            window.location.reload();
        } else {
            pauseX = pauseX * (-1);
        }
    } else if(e.key == "ArrowRight") {
        if(rectPosX <= canvas.width -100) {
            rectPosX += rectS;
        } else if(rectPosX = canvas.width -100) {
            rectPosX -= 1;
        }
    } else if(e.key == "ArrowLeft") {
        if(rectPosX >= 0) {
            rectPosX -= rectS;
        } else if(rectPosX = 0) {
            rectPosX += 1;
        } 
    } 
}
function keyUpEventHandler(e) {
    if(e.key == "ArrowRight") {
    } else if(e.key == "ArrowLeft") {
    }
}

function updata() {
    if (X == 1) {
        arcPosX += S;
        if( arcPosX >= canvas.width - arcRadius ) {
            X = -1;
        } 
    } else {
        arcPosX -= S;
        if( arcPosX <= arcRadius ) {
            X = 1;
        }
    }
    if (Y == 1) {
        arcPosY += S;
        if( arcPosY >= canvas.height - arcRadius ) {
            Y = -1;
        } 
    } else {
        arcPosY -= S;
        if( arcPosY <= arcRadius ) {
            Y = 1;
        }
    }
    // 충돌하기 
    isCollsionRectToArc();
    // 게임오버
    gameOver();
    // 벽돌깨기
    isCollsionArcToBricks();
    // 게임클리어
    if(gameClear() >= 1) {
        alert("Game Clear!!!");
        gameStatus = 2;
    }
    blockBrick.movingBrick();
    blockBrick.blockArc();
    // isCollsionArcToBlock();
}

function isCollsionRectToArc() {
    if(arcPosX >= rectPosX 
        && arcPosX <= rectPosX + 100 
        && arcPosY + arcRadius < canvas.height 
        && arcPosY + arcRadius >= canvas.height - 20) {
            // console.log("충돌");
            Y = -1;
    } 
    // else {
        // console.log("miss");
    // }
} 

function gameOver() {
    if(arcPosY + arcRadius >= canvas.height) {
        alert("Game Over");
        gameStatus = 2;
    }
}

function gameClear() {
    let gameProceed = 0; 
    for(let i = 0; i < brickRow; i++) {
        for(let j = 0; j < brickColumn; j++) {
            if(bricks[i][j].collisionCount == 2) {
                gameProceed++;
            } 
        }
    }
    return gameProceed / (brickRow * brickColumn);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    // setBrickSize();
    drawRect();
    drawArc();
    drawBricks();
    drawBlockBrick();
}

function drawRect() {
    context.beginPath();

    context.rect(rectPosX, canvas.height - 20, 100, 20);
    context.fillStyle = "red"; 
    context.fill(); 

    context.closePath();
}

function drawArc() {
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI); 

    context.fillStyle = "blue";
    context.fill();

    context.closePath(); 
}

setInterval(draw, 10);
setInterval(() => {if(gameStatus == 1 && pauseX == 1) {updata()}}, 10);