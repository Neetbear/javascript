const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const fieldWidth = 50;
const fieldHeight = 50;

const fieldType = ["user", "gate", "monster", "shop", "field"];
const fieldDisign = ["forest", "desert", "river", "normal"];

class Field {
    constructor(left, top, right, bottom, column, row, color) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.column = column;
        this.row = row;
        this.color = color; // field design 용도
    }
}
class User extends Brick {
    constructor(left, top, right, bottom, color, HP, money){
        super(left, top, right, bottom, color);
        this.money = money;
        this.HP = HP;
    };

}


let fields = [];
function setFields() {
    for(let i = 0; i < brickRow; i++) {
        fields[i] = [];
        for(let j = 0; j < brickColumn; j++) {
            fields[i][j] = new Field(
                50 + j * brickWidth, 
                50 + i * brickHeight, 
                50 + (j + 1) * brickWidth, 
                50 + (i + 1) * brickHeight,
                i, j, 0
            );
        }
    } 
}

const fieldsColor = ["ligthgreen", "ligthblue", "bisque"]; // 숲 강 사막 
function drawFields() {
    for(let i = 0; i < brickRow; i++) {
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
    }
}

function draw() {

}
function updata () {

}

setInterval(draw, 10);
setInterval(() => {if(gameStatus == 1 && pauseX == 1) {updata()}}, 10);