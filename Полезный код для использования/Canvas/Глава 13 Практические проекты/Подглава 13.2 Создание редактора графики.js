// Глава 13: Практические проекты в Canvas
// Подглава 13.2: Создание редактора графики

// Основы создания графического редактора:
// Графический редактор позволяет пользователям рисовать и редактировать изображения прямо в браузере.
// Для создания такого редактора в HTML5 Canvas нужно использовать JavaScript для управления инструментами рисования и событиями мыши.

// 1. Создание HTML структуры:
// Для начала, создадим HTML-структуру с элементом <canvas> и элементами управления.

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Graphic Editor</title>
//   <style>
//     canvas {
//       border: 1px solid black;
//       display: block;
//       margin: 20px auto;
//     }
//   </style>
// </head>
// <body>
//   <canvas id="drawingCanvas" width="800" height="600"></canvas>
//   <div>
//     <button id="clearButton">Clear</button>
//     <input type="color" id="colorPicker" value="#000000">
//     <input type="range" id="brushSize" min="1" max="50" value="5">
//   </div>
//   <script src="app.js"></script>
// </body>
// </html>

// 2. Инициализация Canvas и управление инструментами рисования:
// В JavaScript мы будем управлять инструментами рисования, такими как цвет кисти и размер кисти, а также обрабатывать события мыши для рисования на Canvas.

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');
  const clearButton = document.getElementById('clearButton');
  const colorPicker = document.getElementById('colorPicker');
  const brushSize = document.getElementById('brushSize');

  let drawing = false;
  let brushColor = colorPicker.value;
  let brushWidth = brushSize.value;

  // Начало рисования
  canvas.addEventListener('mousedown', () => {
    drawing = true;
  });

  // Окончание рисования
  canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
  });

  // Рисование на Canvas
  canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  });

  // Очистка Canvas
  clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Изменение цвета кисти
  colorPicker.addEventListener('input', (e) => {
    brushColor = e.target.value;
  });

  // Изменение размера кисти
  brushSize.addEventListener('input', (e) => {
    brushWidth = e.target.value;
  });
});

// Итог:
// Мы создали простой графический редактор, который позволяет рисовать на Canvas с использованием мыши.
// Пользователи могут выбирать цвет кисти и размер кисти, а также очищать Canvas.
// Данный проект демонстрирует основные принципы работы с HTML5 Canvas и JavaScript для создания интерактивных графических приложений.
