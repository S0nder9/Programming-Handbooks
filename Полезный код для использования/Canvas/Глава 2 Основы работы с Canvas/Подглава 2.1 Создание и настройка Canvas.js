// Глава 2: Основы работы с Canvas
// Подглава 2.1: Создание и настройка Canvas

// Введение:
// Canvas - это HTML-элемент, который позволяет рисовать графику с помощью JavaScript.
// Он используется для создания динамичных и интерактивных визуальных эффектов на веб-страницах.

// Добавление элемента Canvas в HTML-документ:
// Для использования Canvas необходимо добавить элемент <canvas> в HTML-документ.

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Canvas Example</title>
</head>
<body>
  <canvas id="myCanvas"></canvas>
  <script src="script.js"></script>
</body>
</html>

// В этом примере мы добавили элемент <canvas> с идентификатором myCanvas в HTML-документ.
// Скрипт script.js будет содержать JavaScript-код для работы с Canvas.

// Задание размеров Canvas (ширина и высота):
// По умолчанию Canvas имеет размер 300x150 пикселей.
// Мы можем задать собственные размеры с помощью атрибутов width и height.

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Canvas Example</title>
</head>
<body>
  <canvas id="myCanvas" width="800" height="600"></canvas>
  <script src="script.js"></script>
</body>
</html>

// В этом примере мы задали размеры Canvas: 800 пикселей в ширину и 600 пикселей в высоту.

// Настройка Canvas с помощью JavaScript:
// Кроме задания размеров через HTML-атрибуты, мы можем задавать размеры Canvas с помощью JavaScript.

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  
  // Задаем размеры Canvas через JavaScript
  canvas.width = 800;
  canvas.height = 600;

  // Теперь можно использовать контекст для рисования на Canvas
  context.fillStyle = 'blue';
  context.fillRect(0, 0, canvas.width, canvas.height);
});

// В этом примере мы использовали метод getContext для получения контекста рисования 2d.
// Затем задали размеры Canvas и нарисовали прямоугольник, заполнив его синим цветом.

// Итог:
// Создание и настройка Canvas включает добавление элемента <canvas> в HTML-документ и задание его размеров.
// Мы можем задавать размеры как через HTML-атрибуты, так и через JavaScript.
// После настройки размеров мы можем использовать контекст рисования для создания графики на Canvas.
