const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const fieldWidth = 50;
const fieldHeight = 50;
const fieldColumn = 10;
const fieldRow = 10;

const fieldType = ["isMonster", "isShop", "justField"];
class Field {
    constructor(left, top, right, bottom, column, row, isMonster) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.column = column;
        this.row = row;
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
                i, j, Math.round(Math.random())
            );
        }
    } 
}

const fieldDesign = ["forest", "river", "desert", "snow"];
const fieldsColor = ["lightgreen", "lightblue", "bisque", "whitesmoke"]; // 숲 강 사막 
function drawFields() {
    for(let i = 0; i < fieldRow; i++) {
        for(let j = 0; j < fieldColumn; j++) {
            context.beginPath();
            context.rect(fields[i][j].left, fields[i][j].top, fieldWidth, fieldHeight);
            context.fillStyle = fieldsColor[(i%4)]; 
            context.fill(); 
            context.closePath();
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    drawFields();
}
function updata () {

}
draw();
// setInterval(draw, 10);
// setInterval(updata, 10);