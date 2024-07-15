// Глава 5: Трансформации и анимации в Canvas

// В этой главе мы рассмотрим основные методы трансформации и создания анимаций в Canvas API.
// Canvas API предоставляет возможности для рисования графики, а также для создания анимаций с использованием JavaScript.

// Подглава 5.3: Примеры анимаций

// В этой подглаве мы рассмотрим два типа анимаций: перемещение объектов и изменение размеров и формы объектов.

// 1. Анимация перемещения объектов
// Для создания анимации перемещения объектов на Canvas мы будем использовать метод requestAnimationFrame для обновления экрана.

// Пример анимации перемещения объекта:
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = 0; // начальная позиция по оси X
const dx = 2; // скорость перемещения по оси X

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // очистка Canvas

  ctx.beginPath();
  ctx.arc(x, canvas.height / 2, 20, 0, 2 * Math.PI); // рисование круга
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();

  x += dx; // перемещение объекта

  // Проверка границ Canvas для изменения направления движения
  if (x + 20 > canvas.width || x - 20 < 0) {
    dx = -dx; // изменяем направление движения
  }

  requestAnimationFrame(draw); // вызов функции draw для следующего кадра
}

draw(); // запуск анимации

// 2. Анимация изменения размеров и формы объектов
// В этом примере мы создадим анимацию изменения размеров прямоугольника, который будет увеличиваться и уменьшаться по мере времени.

// Пример анимации изменения размеров и формы объекта:
const canvas2 = document.getElementById('myCanvas2');
const ctx2 = canvas2.getContext('2d');

let width = 50; // начальная ширина прямоугольника
let height = 50; // начальная высота прямоугольника
let growing = true; // флаг для определения направления изменения размеров

function drawShape() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // очистка Canvas

  ctx2.beginPath();
  ctx2.rect(canvas2.width / 2 - width / 2, canvas2.height / 2 - height / 2, width, height); // рисование прямоугольника
  ctx2.fillStyle = 'red';
  ctx2.fill();
  ctx2.closePath();

  // Изменение размеров прямоугольника
  if (growing) {
    width += 2;
    height += 2;
    if (width > 100) growing = false; // если размеры становятся слишком большими, меняем направление
  } else {
    width -= 2;
    height -= 2;
    if (width < 50) growing = true; // если размеры становятся слишком маленькими, меняем направление
  }

  requestAnimationFrame(drawShape); // вызов функции drawShape для следующего кадра
}

drawShape(); // запуск анимации

// Итог:
// В этой подглаве мы рассмотрели два основных примера анимаций на Canvas: перемещение объектов и изменение их размеров и формы.
// Использование requestAnimationFrame позволяет создавать плавные анимации, которые обновляются с каждым кадром.
// Примеры помогут вам начать создавать свои собственные анимации в Canvas API.
