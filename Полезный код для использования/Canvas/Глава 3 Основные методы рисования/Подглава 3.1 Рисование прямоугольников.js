// Глава 3: Основные методы рисования

// Подглава 3.1: Рисование прямоугольников

// В HTML5 Canvas API есть три основных метода для рисования прямоугольников:
// 1. fillRect()
// 2. strokeRect()
// 3. clearRect()

// Эти методы позволяют создавать прямоугольные формы и очищать области на холсте.

// 1. fillRect(x, y, width, height)
// Метод fillRect рисует заполненный прямоугольник с указанными размерами и координатами.
// - x и y: координаты верхнего левого угла прямоугольника.
// - width и height: ширина и высота прямоугольника.

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue'; // Устанавливаем цвет заливки
ctx.fillRect(50, 50, 150, 100); // Рисуем заполненный прямоугольник на холсте

// 2. strokeRect(x, y, width, height)
// Метод strokeRect рисует прямоугольник только с границей, без заполнения.
// - x и y: координаты верхнего левого угла прямоугольника.
// - width и height: ширина и высота прямоугольника.

ctx.strokeStyle = 'red'; // Устанавливаем цвет границы
ctx.lineWidth = 5; // Устанавливаем ширину границы
ctx.strokeRect(250, 50, 150, 100); // Рисуем прямоугольник с границей на холсте

// 3. clearRect(x, y, width, height)
// Метод clearRect очищает прямоугольную область на холсте, делая её прозрачной.
// - x и y: координаты верхнего левого угла области.
// - width и height: ширина и высота области для очистки.

ctx.clearRect(100, 75, 100, 50); // Очищаем прямоугольную область на холсте

// Пример использования всех трех методов вместе:

// Устанавливаем цвет заливки для первого прямоугольника
ctx.fillStyle = 'green';
ctx.fillRect(20, 20, 100, 100); // Рисуем заполненный прямоугольник

// Устанавливаем цвет границы и ширину линии для второго прямоугольника
ctx.strokeStyle = 'orange';
ctx.lineWidth = 8;
ctx.strokeRect(150, 20, 100, 100); // Рисуем прямоугольник с границей

// Очищаем область на холсте
ctx.clearRect(50, 50, 50, 50); // Очищаем часть холста

// Итог:
// Методы fillRect(), strokeRect() и clearRect() являются основными инструментами для работы с прямоугольниками на холсте.
// Используйте fillRect() для создания заполненных прямоугольников, strokeRect() для рисования только границы прямоугольника, и clearRect() для очистки областей на холсте.
