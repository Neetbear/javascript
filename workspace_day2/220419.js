/*
    캔버스 설정
    document
    context
*/

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const arcRadius = 20;
let arcPosX = canvas.width / 2 + 100;
let arcPosY = canvas.height / 2;

let X = 1; 
let Y = 1;
let S = 2;

document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('keyup', keyUpEventHandler);

let rectPosX = canvas.width / 2 - 100 / 2;
let rectS = 5;

function keyDownEventHandler(e) {
    // 동시에 누르면 코드상으론 위에부터 체크 된다
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
    // 데이터 수정(도형의 위치 이동)
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
}

function isCollsionRectToArc() {
    if(arcPosX >= rectPosX 
        && arcPosX <= rectPosX + 100 
        && arcPosY + arcRadius < canvas.height 
        && arcPosY + arcRadius >= canvas.height - 20) {
            console.log("충돌");
            Y = -1;
    } else {
        console.log("miss");
    }
} 

function gameOver() {
    if(arcPosY + arcRadius == canvas.height ) {
        alert("Game Over");
        location.reload();
    }
}

function draw() {
    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height); // 그리기전에 지워주기(클리어)
    // 다른 도형 그리기
    drawRect();
    drawArc();
}

function drawRect() {
    context.beginPath(); // 그리기 시작 

    context.rect(rectPosX, canvas.height - 20, 100, 20); // 사각형 그리기
    // x좌표, y좌표, 가로길이, 세로길이
    // (x좌표, y좌표) => 좌상단 꼭지점 좌표
    context.fillStyle = "red"; // 사각형 채우기
    context.fill(); // fill() 함수로 채워줌

    context.closePath(); // 그리기 종료
}

function drawArc() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // arcPosX++;
    // arcPosY;

    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI); // 원그리기
    // x좌표, y좌표, 반지름, 시작각도, 끝각도(원을 얼마나 그릴지 정해줌)
    // (x좌표, y좌표) => 원의 중심 좌표
    context.fillStyle = "blue";
    context.fill();

    context.closePath(); 
} // 함수 하나엔 하나의 기능만 있는게 좋은 구조라 지금 형태는 별로 기능별로 쪼갤것


// setInterval(funcName, 1000); // 1초(1000ms)마다 funcName 발동
// setInterval(drawArc, 10);
setInterval(draw, 10);
setInterval(updata, 10);


// 실습 동그라미가 오른쪽으로 움직이다가 캔버스 끝에 닿으면 왼쪽으로 이동
// 실습 동그라미가 움직이는 속도 변경
// 실습 바 키보드로 이동시키기
// 실습 벽돌깨기(공튕기기) 게임