// Глава 11: Оптимизация и производительность в Canvas
// Подглава 11.2: Советы по улучшению производительности

// Оптимизация работы с Canvas является важным аспектом для создания плавных и отзывчивых приложений.
// Вот несколько советов по улучшению производительности при работе с Canvas.

// Использование двойной буферизации:
// Двойная буферизация помогает избежать мерцания и улучшить производительность путем рисования на скрытом холсте, а затем копирования результата на основной холст.
// Это позволяет выполнять все сложные операции рисования в фоне и обновлять экран только один раз за кадр.

// Пример использования двойной буферизации:
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
const offscreenCtx = offscreenCanvas.getContext('2d');

function drawScene() {
  // Очистка offscreen холста
  offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  // Выполнение всех операций рисования на offscreen холсте
  offscreenCtx.fillStyle = 'blue';
  offscreenCtx.fillRect(50, 50, 100, 100);

  offscreenCtx.fillStyle = 'red';
  offscreenCtx.fillRect(200, 50, 100, 100);

  // Копирование содержимого offscreen холста на основной холст
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(offscreenCanvas, 0, 0);
}

setInterval(drawScene, 1000 / 60); // Обновление экрана 60 раз в секунду

// Минимизация перерисовок и вычислений:
// Один из ключевых моментов для оптимизации производительности - это минимизация ненужных перерисовок и вычислений.
// Рисуйте только те элементы, которые изменились, и избегайте сложных вычислений в основном цикле рендеринга.

// Пример минимизации перерисовок:
let lastX = 0;
let lastY = 0;

function drawMovingObject(x, y) {
  // Проверка, изменились ли координаты
  if (x !== lastX || y !== lastY) {
    // Очистка предыдущего кадра
    ctx.clearRect(lastX - 5, lastY - 5, 10, 10);

    // Рисование нового кадра
    ctx.fillStyle = 'green';
    ctx.fillRect(x - 5, y - 5, 10, 10);

    // Обновление последних координат
    lastX = x;
    lastY = y;
  }
}

function update() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  drawMovingObject(x, y);
}

setInterval(update, 1000 / 60); // Обновление экрана 60 раз в секунду

// Итог:
// Использование двойной буферизации и минимизация перерисовок и вычислений являются важными методами для улучшения производительности при работе с Canvas.
// Эти подходы помогают избежать ненужных операций рисования и обеспечить более плавное обновление экрана.
