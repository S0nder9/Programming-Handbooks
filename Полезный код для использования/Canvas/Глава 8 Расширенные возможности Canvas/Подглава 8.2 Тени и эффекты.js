// Глава 8: Расширенные возможности Canvas

// Подглава 8.2: Тени и эффекты

// В HTML5 Canvas API доступны различные методы для создания визуальных эффектов на графических объектах.
// Одним из таких эффектов является добавление теней к объектам. Это можно сделать с помощью свойств контекста `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, и `shadowColor`.
// Эти свойства позволяют настраивать положение, размытость и цвет тени.

// Настройка и применение теней к объектам в Canvas:

// 1. Получаем контекст рисования с помощью метода getContext('2d').

// Пример:
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 2. Устанавливаем свойства тени.

ctx.shadowOffsetX = 10;   // Смещение тени по оси X
ctx.shadowOffsetY = 10;   // Смещение тени по оси Y
ctx.shadowBlur = 15;      // Радиус размытия тени
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';  // Цвет тени с прозрачностью

// 3. Рисуем графический объект (например, прямоугольник) с установленными свойствами тени.

// Пример рисования прямоугольника с тенью:
ctx.fillStyle = '#3498db';  // Цвет заливки прямоугольника
ctx.fillRect(50, 50, 200, 100);  // Рисуем прямоугольник

// 4. Дополнительные примеры настройки теней для разных объектов:

// Пример рисования текста с тенью:
ctx.font = '30px Arial';
ctx.fillStyle = '#e74c3c';  // Цвет текста
ctx.fillText('Hello, Canvas!', 100, 200);  // Рисуем текст с тенью

// Пример рисования круга с тенью:
ctx.beginPath();
ctx.arc(400, 150, 50, 0, Math.PI * 2, false);  // Рисуем круг
ctx.fillStyle = '#2ecc71';  // Цвет заливки круга
ctx.fill();  // Применяем заливку

// Пример рисования градиента с тенью:
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, '#f39c12');
gradient.addColorStop(1, '#f1c40f');

ctx.fillStyle = gradient;  // Устанавливаем градиент как цвет заливки
ctx.fillRect(50, 250, 200, 100);  // Рисуем прямоугольник с градиентом

// Пример рисования изображения с тенью:
const img = new Image();
img.src = 'example.png';  // Указываем путь к изображению
img.onload = () => {
  ctx.drawImage(img, 50, 400, 100, 100);  // Рисуем изображение с установленными свойствами тени
};

// Пример использования функции рисования с тенью:
const drawRectWithShadow = (x, y, width, height, color, shadowOptions) => {
  ctx.shadowOffsetX = shadowOptions.offsetX;
  ctx.shadowOffsetY = shadowOptions.offsetY;
  ctx.shadowBlur = shadowOptions.blur;
  ctx.shadowColor = shadowOptions.color;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

// Применение функции для рисования прямоугольника с тенью:
drawRectWithShadow(250, 400, 150, 75, '#9b59b6', {
  offsetX: 12,
  offsetY: 12,
  blur: 20,
  color: 'rgba(0, 0, 0, 0.6)',
});

// Итог:
// Использование свойств тени в Canvas API позволяет создавать разнообразные визуальные эффекты для графических объектов.
// Настройка параметров тени, таких как смещение, размытие и цвет, дает возможность улучшить визуальную привлекательность и выразительность графики на веб-страницах.
