const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

function drawBackground() {
    context.beginPath();
    context.rect(0 ,0, canvas.width, canvas.height -50);
    context.fillStyle = "gray"; 
    context.fill(); 
    context.closePath();
}

document.addEventListener('keydown', keyDownEventHandler);

const fieldWidth = 50;
const fieldHeight = 50;
const fieldColumn = 10;
const fieldRow = 10;
let userPosX = 50;
let userPosY = 50;
const arcRadius = 25
let gameState = 0; // 0 게임가능 / 1 가위바위보(몬스터 조우) / 2 클리어

// const fieldType = ["justField", "isMonster", "isShop", "isUser", "isGoal"];
class Field {
    constructor(left, top, right, bottom, column, row, fieldStyle, isMonster) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.column = column;
        this.row = row;
        this.fieldStyle = fieldStyle; //color
        this.isMonster = isMonster;
    }
}
class User extends Field {
    constructor(left, top, right, bottom, HP, money){
        super(left, top, right, bottom);
        this.HP = HP;
        this.money = money;
    };
}
class Gate extends Field {
    constructor(left, top, right, bottom){
        super(left, top, right, bottom);
    };
}
class Shop extends Field {
    constructor(left, top, right, bottom){
        super(left, top, right, bottom);
    };
    shopping() {
        if((userPosX == shop.left) && (userPosY == shop.top)) {
            console.log("shop")
            if(user.money > 100) {
                user.money -= 100;
                user.HP += 50;
            }
        }
    }
}

let user;
function setUser() {
    user = new User(
        userPosX, 
        userPosY, 
        userPosX + fieldWidth, 
        userPosY + fieldHeight,
        50, 0
    )
}
setUser();
function userDraw() {
    context.beginPath();
    context.arc(userPosX + fieldWidth / 2, userPosY + fieldHeight / 2, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = "rgb(214, 54, 54)"; 
    context.fill(); 
    context.closePath();
}

let gate;
function setGate() {
    let overlap = true;
    let i, j;
    while(overlap) {
        i = Math.floor(Math.random() * 9);
        j = Math.floor(Math.random() * 9);
        if((i == 0) && (j == 0)) { 
            overlap = true;
            continue;
        } else { 
            overlap = false;
            gate = new Gate(
                fieldWidth * (i + 1), 
                fieldHeight * (j + 1), 
                fieldWidth * (i + 2), 
                fieldHeight * (j + 2)
            )
        }
    }
}
setGate();
function gateDraw() {
    context.beginPath();
    context.arc(gate.left + fieldWidth / 2, gate.top + fieldHeight / 2, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = "black"; 
    context.fill(); 
    context.closePath();
}


let shop;
function setShop() {
    let overlap = true;
    let i, j;
    while(overlap) {
        i = Math.floor(Math.random() * 9);
        j = Math.floor(Math.random() * 9);
        if((i == 0) && (j == 0)) { 
            overlap = true;
            continue;
        } else if((fieldWidth * (i + 1) == gate.left) 
            && (fieldHeight * (j + 1) == gate.top)) {
                overlap = true;
        } else { 
            overlap = false;
            shop = new Shop(
                fieldWidth * (i + 1), 
                fieldHeight * (j + 1) , 
                fieldWidth * (i + 2), 
                fieldHeight * (j + 2)
            )
        }
    }
}
setShop();
function shopDraw() {
    context.beginPath();
    context.arc(shop.left + fieldWidth / 2, shop.top + fieldHeight / 2, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = "gold"; 
    context.fill(); 
    context.closePath();
}

function keyDownEventHandler(e) {
    if(e.key == "ArrowRight" && gameState == 0) {
        console.log("ArrowRight");
        if(userPosX < canvas.width -100) {
            userPosX += fieldWidth;
        }
    } else if(e.key == "ArrowLeft" && gameState == 0) {
        console.log("ArrowLeft");
        if(userPosX > fieldWidth) {
            userPosX -= fieldWidth;
        }
    } else if(e.key == "ArrowUp" && gameState == 0) {
        console.log("ArrowUp");
        if(userPosY > fieldHeight) {
            userPosY -= fieldHeight;
        }
    } else if(e.key == "ArrowDown" && gameState == 0) {
        console.log("ArrowDown");
        if(userPosY < canvas.height -100) {
            userPosY += fieldHeight;
        }
    } else if(e.key == " " && gameState == 2) {
        alert("Restart");
        window.location.reload();
    }
}

let fields = [];
function setFields() {
    for(let i = 0; i < fieldRow; i++) {
        fields[i] = [];
        for(let j = 0; j < fieldColumn; j++) {
            if(i == 0 && j ==0) {
                fields[i][j] = new Field(
                    50 + j * fieldWidth, 
                    50 + i * fieldHeight, 
                    50 + (j + 1) * fieldWidth, 
                    50 + (i + 1) * fieldHeight,
                    i, j, Math.round(Math.random() * 3), false
                );
            } else {
                fields[i][j] = new Field(
                    50 + j * fieldWidth, 
                    50 + i * fieldHeight, 
                    50 + (j + 1) * fieldWidth, 
                    50 + (i + 1) * fieldHeight,
                    i, j, Math.round(Math.random() * 3), Math.round(Math.random())
                );
            }
        }
    } 
}
setFields();

const fieldDesign = ["forest", "river", "desert", "snow"];
const fieldsColor = ["lightgreen", "lightblue", "bisque", "whitesmoke"]; // 숲 강 사막 
function drawFields() {
    for(let i = 0; i < fieldRow; i++) {
        for(let j = 0; j < fieldColumn; j++) {
            context.beginPath();
            context.rect(fields[i][j].left, fields[i][j].top, fieldWidth, fieldHeight);
            context.fillStyle = fieldsColor[fields[i][j].fieldStyle]; 
            context.fill(); 
            context.closePath();
        }
    }
}

function gameClear() {
    if((userPosX == gate.left) 
    && (userPosY ==  gate.top) 
    && (gameState == 0)) {
        gameState = 2;
        setTimeout(() => { alert("Game Clear") }, 100);
    }
}

function draw() {
    context.clearRect(550, 0, 50, canvas.height);  
    drawBackground()
    title();
    drawFields();
    userDraw();
    gateDraw();
    shopDraw();
    hp();
    money();
}

function title() {
    context.font = '30px serif';
    context.strokeText('Explorer The Field', 175, 30);
}
function hp() {
    context.font = '15px serif';
    context.fillText(`H.P.`, 560, 275);
    context.fillText(`${user.HP}`, 560, 295);
}
function money() {
    context.font = '15px serif';
    context.fillText(`GOLD`, 560, 315);
    context.fillText(`${user.money}`, 560, 335);
}

function drawRockScissorsPaper() {
    const rockImg = new Image();
    rockImg.src = "rock.png";
    rockImg.onload = function() {
        // context.beginPath();
        context.drawImage(rockImg, 100, 550, 50, 50);
        // context.closePath();
    };
    const paperImg = new Image();
    paperImg.src = "paper.png";
    paperImg.onload = function() {
      context.drawImage(paperImg, 275, 550, 50, 50);
    };
    const scissorsImg = new Image();
    scissorsImg.src = "scissors.png";
    scissorsImg.onload = function() {
      context.drawImage(scissorsImg, 450, 550, 50, 50);
    };
}

function meetMonster() {
    // console.log((userPosX-50)/50, (userPosY-50)/50);
    if(fields[(userPosX-50)/50][(userPosY-50)/50].isMonster) {
        console.log("meet monster");
        alert("Monster!!!")
        gameState = 1;
        drawRockScissorsPaper();
    } else {
        context.clearRect(0, 550, canvas.width, 50); 
    }
}

function fightMonster(event) {
    let mine;
    let monsters = Math.floor(Math.random() * 3);
    if(gameState == 1) {
        if(event.offsetX >= 100 
            && event.offsetX <= 150
            && event.offsetY >= 550
            && event.offsetY <= 600) {
                console.log("rock");
                mine = 1;
                rockScissorsPaper(mine, monsters);
        } else if(event.offsetX >= 275
            && event.offsetX <= 325
            && event.offsetY >= 550
            && event.offsetY <= 600) {
                console.log("paper");
                mine = 2;
                rockScissorsPaper(mine, monsters);
        } else if(event.offsetX >= 450 
            && event.offsetX <= 500
            && event.offsetY >= 550
            && event.offsetY <= 600) {
                console.log("scissors");
                mine = 0;
                rockScissorsPaper(mine, monsters);
        }
    }
    console.log(user.HP);
    console.log(user.money);
}

// 가위 = 0 / 바위 = 1 / 보 = 2
// ((mine - monsters) + 2) % 3 -> 0 이김 1 패배 2 비김
function rockScissorsPaper(a, b) {
    let result = ((a - b) + 2) % 3;
    if(result == 0) {
        user.money += Math.floor(Math.random() * 100);
        gameState = 0;
        fields[(userPosX-50)/50][(userPosY-50)/50].isMonster = false;
        alert("승리");
    } else if(result == 1) {
        user.HP -= 10;
        gameState = 0;
        fields[(userPosX-50)/50][(userPosY-50)/50].isMonster = false;
        alert("패배");
    } else if(result == 2) {
        gameState = 0;
        fields[(userPosX-50)/50][(userPosY-50)/50].isMonster = false;
        alert("무승부");
    }
}

function gameOver() {
    if(user.HP == 0) {
        gameState = 2;
        setTimeout(() => { alert("Game Over") }, 100);
    }
}

function updata () {
    meetMonster();
    gameClear();
    gameOver();
    shop.shopping();
}

setInterval(draw, 10);
setInterval(() => {
    if(gameState == 0) {
        updata()
    }
}, 10);