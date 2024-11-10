let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;//Задаёт начальную скорость 0
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameWin = false;
let gameOver = false;

window.onload = function () {
    // Создание игрового поля
    board = document.getElementById("board");
    board.height = (total_row + 1) * blockSize;
    board.width = (total_col + 1) * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);//добавление события срабатывания кнопки
    // Скорость змеи
    setInterval(update, 100);//обновление каждые 100мс
}

function update() {
    if (gameOver || gameWin) {
        return;
    }

    // Задний фон
    context.fillStyle = "white";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Рост змеи
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    //привязка блока(хвост)
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    //задаёт 1й блок(голову)
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "green";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for (let i = 0; i < snakeBody.length; i++) {
        document.getElementById("counter").innerHTML = snakeBody.length;
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);//рост
    }

    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Выход за поле
        gameOver = true;
        alert("Вы проиграли. Ваш счёт: "+ snakeBody.length);
        document.getElementById('restartButton').classList.replace('buttonRefresh-hiden', 'buttonRefresh-visible');
    }

    if (snakeBody.length ==324) {

        //Победа
        gameWin = True;
        alert("Вы выиграли! Ваш счёт: "+snakeBody.length);
        document.getElementById('restartButton').classList.replace('buttonRefresh-hiden', 'buttonRefresh-visible');
        
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Съел себя
            gameOver = true;
            alert("Вы проиграли. Ваш счёт: "+snakeBody.length);
            document.getElementById('restartButton').classList.replace('buttonRefresh-hiden', 'buttonRefresh-visible');
        }
    }

}

// Передвижение
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}

// Размещение фрукта
function placeFood() {

    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}

function snakeLeft() {
    if (speedX != 1) { 
        speedX = -1;
        speedY = 0;
    }
}

function snakeUp() {
    if (speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
}

function snakeDown() {
    if (speedY != -1) { 
        speedX = 0;
        speedY = 1;
    }
}

function snakeRight() {
    if (speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}
