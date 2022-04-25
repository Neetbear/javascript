const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

document.addEventListener('keydown', keyDownEventHandler);

const fieldWidth = 50;
const fieldHeight = 50;
const fieldColumn = 10;
const fieldRow = 10;
let userPosX = 50;
let userPosY = 50;
const arcRadius = 25
let gameState = 0;

const fieldType = ["isMonster", "isShop", "justField"];
class Field {
    constructor(left, top, right, bottom, column, row, fieldStyle, isMonster) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.column = column;
        this.row = row;
        this.fieldStyle = fieldStyle;
        this.isMonster = isMonster;
    }
}
class User extends Field {
    constructor(left, top, right, bottom, color, HP, money){
        super(left, top, right, bottom, color);
        this.money = money;
        this.HP = HP;
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
}

let user = [];
function setUser() {
    user = new User(
        userPosX, 
        userPosY, 
        userPosX + fieldWidth, 
        userPosY + fieldHeight,
        100, 0
    )
}
function userDraw() {
    setUser();
    context.beginPath();
    context.arc(user.left + fieldWidth / 2, user.top + fieldHeight / 2, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = "rgb(214, 54, 54)"; 
    context.fill(); 
    context.closePath();
}

let gate = [];
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
                fieldHeight * (j + 1) , 
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

function keyDownEventHandler(e) {
    if(e.key == "ArrowRight") {
        console.log("ArrowRight")
        if(userPosX < canvas.width -100) {
            userPosX += fieldWidth;
        }
    } else if(e.key == "ArrowLeft") {
        console.log("ArrowLeft")
        if(userPosX > fieldWidth) {
            userPosX -= fieldWidth;
        }
    } else if(e.key == "ArrowUp") {
        console.log("ArrowUp")
        if(userPosY > fieldHeight) {
            userPosY -= fieldHeight;
        }
    } else if(e.key == "ArrowDown") {
        console.log("ArrowDown")
        if(userPosY < canvas.height -100) {
            userPosY += fieldHeight;
        }
    }
}

let fields = [];
function setFields() {
    for(let i = 0; i < fieldRow; i++) {
        fields[i] = [];
        for(let j = 0; j < fieldColumn; j++) {
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
    if((userPosX == gate.left) && (userPosY ==  gate.top)) {
        gameState = 2;
        setTimeout(() => { alert("Game Clear") }, 100);
    }
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    drawFields();
    userDraw();
    // gateDraw();
}

function meetMonster() {
    // console.log((userPosX-50)/50, (userPosY-50)/50);
    if(fields[(userPosX-50)/50][(userPosY-50)/50].isMonster) {
        console.log("meet monster");
        gameState = 1;
    }
}

function fightMonster() {
    
}

function updata () {
    meetMonster();
    gameClear();
}

setInterval(() => {if(gameState == 0) {draw()}}, 10);
setInterval(() => {if(gameState == 0) {updata()}}, 10);