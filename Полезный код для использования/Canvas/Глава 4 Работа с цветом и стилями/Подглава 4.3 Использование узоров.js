// Глава 4: Работа с цветом и стилями в Canvas

// Подглава 4.3: Использование узоров

// В HTML5 Canvas API узоры (patterns) позволяют использовать изображения или текстуры в качестве заполнения для форм и объектов.
// Узоры можно использовать для создания различных визуальных эффектов, таких как фоны, текстуры и декоративные элементы.

// Как создать и применить узоры в Canvas:

// 1. Создание узора из изображения

// Для создания узора вам сначала нужно загрузить изображение, которое будет использоваться в качестве узора.
// Затем создается объект Pattern с помощью метода createPattern() контекста CanvasRenderingContext2D.

// Пример создания узора из изображения:

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Создаем объект Image и загружаем изображение
const image = new Image();
image.src = 'pattern-image.png'; // Замените на путь к вашему изображению

// Устанавливаем обработчик события onload для того, чтобы создать узор после загрузки изображения
image.onload = () => {
  // Создаем узор из изображения
  const pattern = ctx.createPattern(image, 'repeat'); // Можно использовать 'repeat', 'repeat-x', 'repeat-y', или 'no-repeat'
  ctx.fillStyle = pattern;

  // Рисуем прямоугольник с узором
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// 2. Создание узора с использованием Canvas

// Вы также можете создавать узоры с помощью другого canvas элемента.
// Это позволяет создавать более сложные узоры, например, геометрические фигуры или текстуры.

// Пример создания узора с использованием Canvas:

const patternCanvas = document.createElement('canvas');
const patternCtx = patternCanvas.getContext('2d');

// Устанавливаем размеры canvas для узора
patternCanvas.width = 50;
patternCanvas.height = 50;

// Рисуем узор на внутреннем canvas
patternCtx.fillStyle = 'blue';
patternCtx.fillRect(0, 0, 50, 50);
patternCtx.fillStyle = 'white';
patternCtx.fillRect(10, 10, 30, 30);

// Создаем узор из внутреннего canvas
const pattern2 = ctx.createPattern(patternCanvas, 'repeat'); // Здесь также можно использовать 'repeat', 'repeat-x', 'repeat-y', или 'no-repeat'
ctx.fillStyle = pattern2;

// Рисуем прямоугольник с новым узором
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 3. Применение узоров к различным формам

// Узоры можно применять не только к прямоугольникам, но и к другим формам, например, кругам или путям.

// Пример применения узора к кругу:

ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
ctx.fillStyle = pattern2;
ctx.fill();

// Итог:
// Узоры в Canvas API позволяют использовать изображения или текстуры в качестве фона или заполнения для различных форм и объектов.
// Вы можете создать узор из изображения или другого canvas, а затем применить его к своему рисунку.
// Узоры обеспечивают гибкость в создании сложных и визуально интересных графических элементов.

// Дополнительные возможности:
// - `ctx.createPattern(image, 'repeat')` — создайте узор с повторением изображения.
// - `ctx.createPattern(image, 'repeat-x')` — создайте узор с повторением изображения по горизонтали.
// - `ctx.createPattern(image, 'repeat-y')` — создайте узор с повторением изображения по вертикали.
// - `ctx.createPattern(image, 'no-repeat')` — создайте узор без повторения изображения.
