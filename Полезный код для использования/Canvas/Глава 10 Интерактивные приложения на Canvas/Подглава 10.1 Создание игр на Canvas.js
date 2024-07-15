// Глава 10: Интерактивные приложения на Canvas
// Подглава 10.1: Создание игр на Canvas

// HTML5 Canvas предоставляет мощные возможности для создания интерактивных приложений, включая игры.
// В этой главе мы рассмотрим основные принципы разработки игр на Canvas и приведем примеры простых игр, таких как арканоид и змейка.

// Основные принципы разработки игр

// 1. Инициализация: Настройка Canvas и контекста рисования.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 2. Игровой цикл: Цикл, который обновляет состояние игры и перерисовывает экран.
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// 3. Обновление состояния: Логика изменения состояния игры (позиции объектов, столкновения и т.д.).
function update() {
  // Обновление логики игры
}

// 4. Рисование: Отображение текущего состояния игры на экране.
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Рисование объектов игры
}

// Пример простой игры: Арканоид

// Инициализация параметров игры
let paddleWidth = 75;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function update() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

gameLoop();

// Пример простой игры: Змейка

let snake = [{ x: 150, y: 150 }];
let direction = 'right';
let food = { x: 200, y: 200 };

document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
  if (e.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (e.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (e.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (e.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
}

function update() {
  let head = { ...snake[0] };
  if (direction === 'right') head.x += 10;
  else if (direction === 'left') head.x -= 10;
  else if (direction === 'up') head.y -= 10;
  else if (direction === 'down') head.y += 10;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);

  snake.forEach(part => {
    ctx.fillStyle = 'green';
    ctx.fillRect(part.x, part.y, 10, 10);
  });
}

gameLoop();

// Итог:
// Создание игр на Canvas включает в себя инициализацию, обновление состояния и перерисовку.
// Мы рассмотрели примеры простых игр, таких как арканоид и змейка, чтобы продемонстрировать основные принципы.
// Эти принципы могут быть расширены и адаптированы для создания более сложных игр и интерактивных приложений.
