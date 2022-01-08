const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//set defaults
let speed=0;
let box = 36;
let units = CanvasLength/box;
let bound = 1;
let score = "0";
let d;
let snake = [];
let food = [];

//Set Game Speed; Will call draw() after eery speed ms
function gameSpeed(s){
    if(s==1){
        speed = 1;
        document.getElementById("temp").innerHTML+="gamespeed=1"+"<br>";
    }
    else if(s==2){
        speed = 2;
        document.getElementById("temp").innerHTML+="gamespeed=2"+"<br>";
    }
    else if(s==3){
        speed = 3;
        document.getElementById("temp").innerHTML+="gamespeed=3"+"<br>";
    }
    else{
        speed = 0;
        document.getElementById("temp").innerHTML+="gamespeed=0"+"<br>";
    }
}

//Set GameBoard Size
function gameSize(size){
    box = 12*size;
    units = CanvasLength/box;
    document.getElementById("temp").innerHTML+="gamesize="+size+"<br>"+"box="+box+"<br>"+"units="+units+"<br>";
}

//Set Bounds on wall or maze
function gameBound(b){
    if (b==0){
        bound = 0;
        document.getElementById("temp").innerHTML+="bound=0"+"<br>";
    }
    else if(b==1){
        bound = 1;
        document.getElementById("temp").innerHTML+="bound=1"+"<br>";
    }
    else if (b==2){
        bound = 2;
        document.getElementById("temp").innerHTML+="bound=2"+"<br>";
    }
}

//Initialize the Game Setup
function start(){
    //create snake
    snake[0] = {
        x : Math.floor(Math.random()*units) * box,
        y : Math.floor(Math.random()*units) * box
    }

    //create food
    createFood();
    
    
    //draw canvas
    draw();

    //set interval
    if(speed==1){
        let game = setInterval(draw, 150);
        document.getElementById("temp").innerHTML+="interval=150"+"<br>";
    }
    else if(speed==2){
        let game = setInterval(draw, 100);
        document.getElementById("temp").innerHTML+="interval=100"+"<br>";
    }
    else if(speed==3){
        let game = setInterval(draw, 70);
        document.getElementById("temp").innerHTML+="interval=70"+"<br>";
    }
    else{
        let game = setInterval(draw, 100);
        document.getElementById("temp").innerHTML+="interval=100default"+"<br>";
    }
    document.getElementById("detials").style.display = "none";
    document.getElementById("canvasDiv").style.display = "inline-block";
    document.getElementById("temp").innerHTML+="start"+"<br>";
    
}

// loading audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

//create food
function createFood(){
    food = {
        x : Math.floor(Math.random()*units) * box,
        y : Math.floor(Math.random()*units) * box
    }
    document.getElementById("temp").innerHTML+="food created"+"<br>";
}

//Operating Game trough Keys
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
        document.getElementById("temp").innerHTML+="left"+"<br>";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
        document.getElementById("temp").innerHTML+="up"+"<br>";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
        document.getElementById("temp").innerHTML+="right"+"<br>";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
        document.getElementById("temp").innerHTML+="down"+"<br>";
    }
}

//updating Score
function updatescore(score){
    document.getElementById("score").innerHTML= score;
    document.getElementById("temp").innerHTML+="score update="+score+"<br>";
};

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            document.getElementById("temp").innerHTML+="Over!!!"+"<br>";
            return true;
            
        }
    }
    return false;
}

function gameover(){
    clearInterval(game);
}

function createCanvas(){
    i=box;
    j=units;
    for(n=0; n<j; n++){
        for(m=0; m<j; m++){
            if((n+m)%2==0){
                ctx.fillStyle = "blue";
                ctx.fillRect(n*box,m*box,box,box);
            }
            else{
                ctx.fillStyle = "black";
                ctx.fillRect(n*box,m*box,box,box); 
            }
        }
    }
}


// draw everything to the canvas
function draw(){
    createCanvas();
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect( food.x, food.y,box,box);
        
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        updatescore(score);
        eat.play();
        food = {
            x : Math.floor(Math.random()*units) * box,
            y : Math.floor(Math.random()*units) * box
        }
        document.getElementById("temp").innerHTML+="food eat"+"<br>";
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    if(bound==0){
        if(snakeX<0){
            snakeX = snakeX + box*units;
        }
        else if(snakeY<0){
            snakeY = snakeY + box*units;
        }
        else if(snakeX>(box*units)){
            snakeX = snakeX - box*units;
        }
        else if(snakeY>(box*units)){
            snakeY = snakeY - box*units;
        }
    }
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    if(bound==0){
        if(collision(newHead,snake)){
            gameover();
            dead.play();
            document.getElementById("temp").innerHTML+="end"+"<br>";
        }
    }
    else if(bound==1||bound==2){
        if(snakeX < 0*box || snakeX > (units-1)* box || snakeY < 0*box || snakeY > (units-1)*box || collision(newHead,snake)){
            gameover();
            dead.play();
            document.getElementById("temp").innerHTML+="end"+"<br>";
        }
    }
    
    snake.unshift(newHead);
    
    
}
