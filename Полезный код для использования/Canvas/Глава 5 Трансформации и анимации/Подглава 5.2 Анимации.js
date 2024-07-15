// Глава 5: Трансформации и анимации в Canvas

// Подглава 5.2: Анимации

// Основы создания анимаций
// Анимации в Canvas позволяют создавать динамические и интерактивные визуальные эффекты.
// Основная идея анимации - это обновление состояния сцены и перерисовка холста на каждом кадре.

// Пример создания базовой анимации:

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = 0; // начальная позиция
const speed = 2; // скорость движения

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка холста

  ctx.beginPath();
  ctx.arc(x, canvas.height / 2, 20, 0, Math.PI * 2); // Рисование круга
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();

  x += speed; // Обновление позиции
  
  // Если круг выходит за пределы холста, вернуться на начало
  if (x > canvas.width) {
    x = 0;
  }
}

// Использование requestAnimationFrame для плавных анимаций
// requestAnimationFrame используется для обновления анимации на каждом кадре.
// Он обеспечивает плавные и эффективные анимации, синхронизированные с частотой обновления экрана.

function animate() {
  draw(); // Обновление состояния сцены
  requestAnimationFrame(animate); // Запрос следующего кадра
}

animate(); // Запуск анимации

// В этом примере функция `draw` обновляет состояние сцены, а `animate` вызывает `requestAnimationFrame` для повторения процесса.
// `requestAnimationFrame` автоматически выбирает наиболее подходящий интервал для обновления анимации,
// что делает её более плавной и производительной по сравнению с использованием setInterval или setTimeout.

// Пример добавления времени для плавной анимации:

let lastTime = 0;

function drawWithTime(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(x, canvas.height / 2, 20, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();

  x += speed * (deltaTime / 16); // Скорректированная скорость с учетом времени

  if (x > canvas.width) {
    x = 0;
  }

  requestAnimationFrame(drawWithTime); // Запрос следующего кадра
}

requestAnimationFrame(drawWithTime); // Запуск анимации с учетом времени

// Итог:
// Анимации в Canvas создаются путем обновления состояния сцены и перерисовки холста.
// `requestAnimationFrame` - лучший способ управления анимациями для достижения плавных и эффективных результатов.
// Также важно учитывать временные интервал для создания более плавных и точных анимаций.
