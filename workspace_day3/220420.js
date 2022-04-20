/*
    배열 Array
*/

// //자바스크립트 배열 선언 방법
// let testArray = [1, 2, 3, 4, 5];
// let testArray2 = new Array(5);

// // 배열 각 요소에 접근 방법
// testArray[0] =100;

// // 배열은 주로 반복문이랑 같이 사용
// for(let i = 0; i < testArray.length; i++) {
//     testArray[i];
// } // i가 필요할 때 특정 index값만 사용하게 할때 특히 유용

// testArray.forEach(function(number, index, arr) {
//     console.log("number : ", number, " index : ", index, " arr : ",arr);
// }) // 첨부터 끝까지 순차적으로 돌릴때 

// 자바스크립트의 배열의 특징은 배열의 각 요소의 타입이 달라도 상관없다 (배열을 요소로 받을수도 있다)
// let testArray = [1, 'ball', X, [10, 20, 30], 5];

// // push 배열에 새 요소 추가 배열의 맨뒤에 들어간다
// testArray.push(30);
// testArray.forEach(function(number, index, arr) {
//     console.log("2 number : ", number, " index : ", index, " arr : ",arr);
// })

// // pop 맨뒤의 요소 제거
// testArray.pop();
// testArray.forEach(function(number, index, arr) {
//     console.log("3 number : ", number, "2 index : ", index, "2 arr : ",arr);
// })

// //unshift 맨 앞에 요소 추가
// testArray.unshift(300);
// testArray.forEach(function(number, index, arr) {
//     console.log("4 number : ", number, "2 index : ", index, "2 arr : ",arr);
// })

// //shift 맨 앞의 요소 제거
// testArray.shift();
// testArray.forEach(function(number, index, arr) {
//     console.log("5 number : ", number, "2 index : ", index, "2 arr : ",arr);
// })

// 사실 앞쪽의 데이터를 건드리는건 추천되는 사용함수는 아니다 -> 속도가 느려진다
// 앞쪽을 건드리려면 힙이 아닌 스택의 느낌이라 전체를 복사한 다음에 앞쪽에 하나 추가하고 차례차례 스택을 쌓아 주는 느낌이다 

// map 모든 인자들을 건드려 줄때 사용 
// 반복문 돌려서 모든 인자들을 콜백함수에 넣어서 돌려주는 느낌
// return값을 새로운 배열에 담아줘야한다 => foreach와 차이점
// let arrayMultiple = testArray.map( x => x * 2);
// arrayMultiple.forEach(function(number, index, arr) {
//     console.log("6 number : ", number, "2 index : ", index, "2 arr : ",arr);
// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const arcRadius = 20;
let arcPosX = canvas.width / 2 + 100;
let arcPosY = canvas.height / 2;

let X = 1; 
let Y = 1;
let S = 2;

let ball = {
    left: 0, right: 0, top: 0, bottom: 0
}

// 블록 배열 만들기
let brick = {
    left: 0, right: 0, top: 0, bottom: 0,
    column: 0, row: 0, collisionCount: 0
}

// 실수로 시작부터 column열 row행 반대로 시작함
const brickColumn = 5;
const brickRow = 4;
const brickWidth = 50;
const brickHeight = 25;
let bricks = []; // 2차원 배열로 생성할 것임
function setBricks() {
    for(let i = 0; i < brickRow; i++) {
        bricks[i] = [];
        for(let j = 0; j < brickColumn; j++) {
            bricks[i][j] = {
                // ToDo: right : left + 50 해보기
                left: 55 + j * (brickWidth + 10), 
                right: 55 + j * (brickWidth + 10) + brickWidth, 
                top: 30 + i * (brickHeight + 5), 
                bottom: 30 + i * (brickHeight + 5) + brickHeight,
                column: i, row: j, collisionCount: 0
            };
        }
    } 
}

const bricksColor = ["rgb(251, 55, 55)", "orange", "yellow", "rgb(0, 230, 0)"];
function drawBricks() {
    for(let i = 0; i < brickRow; i++) {
        // context.beginPath();
        for(let j = 0; j < brickColumn; j++) {
            if(bricks[i][j].collisionCount == 0) {
                context.beginPath();
                context.rect(bricks[i][j].left, bricks[i][j].top, brickWidth, brickHeight);
                context.fillStyle = bricksColor[i]; 
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
setBricks();

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
let rectS = 8;

function keyDownEventHandler(e) {
    if(e.key == "ArrowRight") {
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
        if( arcPosY < arcRadius ) {
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
        location.reload();
    }
}

function isCollsionRectToArc() {
    if(arcPosX >= rectPosX 
        && arcPosX <= rectPosX + 100 
        && arcPosY + arcRadius < canvas.height 
        && arcPosY + arcRadius >= canvas.height - 20) {
            // console.log("충돌");
            Y = -1;
    } else {
        // console.log("miss");
    }
} 

function gameOver() {
    if(arcPosY + arcRadius == canvas.height ) {
        alert("Game Over");
        location.reload();
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
    drawRect();
    drawArc();
    drawBricks();
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
setInterval(updata, 10);