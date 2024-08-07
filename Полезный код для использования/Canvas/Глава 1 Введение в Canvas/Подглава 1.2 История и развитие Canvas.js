// Глава 1: Введение в Canvas
// Подглава 1.2: История и развитие Canvas

// Появление Canvas в HTML5
// Элемент <canvas> был представлен в спецификации HTML5, разработанной WHATWG (Web Hypertext Application Technology Working Group).
// Он был впервые внедрен компанией Apple для использования в веб-браузере Safari и iOS.
// Canvas предоставляет программный интерфейс для рисования и рендеринга графики в пределах веб-страницы.
// Этот элемент позволяет разработчикам создавать динамическую графику, игры, визуализацию данных и многое другое, используя JavaScript для управления рендерингом.

// Пример простого использования Canvas:
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
context.fillStyle = 'blue';
context.fillRect(10, 10, 150, 100); // Рисует прямоугольник синего цвета

// Развитие и поддержка Canvas в различных браузерах
// С момента появления в HTML5, поддержка элемента <canvas> быстро распространилась на большинство современных браузеров.
// Это включало браузеры Chrome, Firefox, Safari, Edge и Opera.
// Поддержка Canvas со временем улучшалась, включая оптимизации производительности и новые возможности API.
// Современные браузеры предоставляют высокий уровень совместимости с Canvas, что делает его важным инструментом для веб-разработчиков.

// Проверка поддержки Canvas в браузере:
if (canvas.getContext) {
  const context = canvas.getContext('2d');
  // Код для работы с Canvas
} else {
  console.error('Canvas не поддерживается вашим браузером');
}

// Итог:
// Элемент <canvas> стал значительным шагом вперед в веб-разработке, предоставляя мощный инструмент для создания графики на стороне клиента.
// Благодаря широкой поддержке в современных браузерах, Canvas стал стандартом для динамической графики в вебе.
