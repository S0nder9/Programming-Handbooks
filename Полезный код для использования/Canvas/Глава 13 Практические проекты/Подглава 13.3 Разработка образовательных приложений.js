// Глава 13: Практические проекты в Canvas

// Подглава 13.3: Разработка образовательных приложений

// В этой подглаве мы рассмотрим создание образовательных приложений с использованием Canvas API в JavaScript.
// Canvas API позволяет рисовать графику, анимации и визуализировать данные на веб-страницах, что делает его отличным инструментом для создания интерактивных учебных материалов.

// Примеры приложений для обучения и визуализации учебных материалов:

// 1. Интерактивные диаграммы и графики

// Приложение для визуализации данных и создания диаграмм:
// Вы можете использовать Canvas для создания различных типов диаграмм, таких как столбчатые, линейные и круговые диаграммы.
// Эти диаграммы могут быть использованы для обучения студентов основам статистики и анализа данных.

// Пример реализации столбчатой диаграммы:
const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

const data = [10, 20, 30, 40, 50];
const labels = ['A', 'B', 'C', 'D', 'E'];

data.forEach((value, index) => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(index * 60, canvas.height - value, 50, value);
});

// 2. Образовательные игры

// Приложение для создания простых образовательных игр:
// Игры на Canvas могут помочь студентам в изучении математики, языков или других предметов.
// Например, можно создать игру на нахождение правильного ответа на математическую задачу или игру на основе карточек для изучения новых слов.

// Пример реализации простой игры "Найди правильное число":
let targetNumber = Math.floor(Math.random() * 100);
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px Arial';
  ctx.fillText('Попробуйте угадать число от 1 до 100', 10, 50);
};

const checkGuess = (guess) => {
  if (guess === targetNumber) {
    alert('Правильно!');
  } else {
    alert('Попробуйте снова.');
  }
};

drawGame();
canvas.addEventListener('click', () => {
  const guess = prompt('Введите ваше число:');
  checkGuess(parseInt(guess, 10));
});

// 3. Визуализация процессов и алгоритмов

// Приложение для визуализации алгоритмов и учебных процессов:
// Canvas может быть использован для визуализации алгоритмов сортировки, поиска и других учебных процессов.
// Это помогает студентам лучше понять, как работают алгоритмы и как изменяются данные на каждом этапе.

// Пример реализации визуализации алгоритма сортировки пузырьком:
const visualizeSort = async (array) => {
  const canvas = document.getElementById('sortCanvas');
  const ctx = canvas.getContext('2d');
  const barWidth = canvas.width / array.length;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
        drawArray(array, ctx, barWidth);
        await new Promise(resolve => setTimeout(resolve, 100)); // Pause for visualization
      }
    }
  }
};

const drawArray = (array, ctx, barWidth) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  array.forEach((value, index) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(index * barWidth, canvas.height - value, barWidth, value);
  });
};

// Пример вызова функции для визуализации сортировки:
const array = [10, 20, 5, 8, 30];
visualizeSort(array);

// 4. Создание учебных инструментов и симуляторов

// Приложение для создания симуляторов и учебных инструментов:
// Вы можете создать симуляторы различных научных явлений или учебные инструменты для решения практических задач.
// Например, симулятор движения планет в солнечной системе или инструмент для решения химических уравнений.

// Пример реализации симулятора движения планет:
const canvas = document.getElementById('planetCanvas');
const ctx = canvas.getContext('2d');

const planets = [
  { name: 'Земля', x: 300, y: 200, radius: 30, color: 'blue', angle: 0 },
  { name: 'Марс', x: 400, y: 200, radius: 20, color: 'red', angle: 0 },
];

const drawPlanets = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  planets.forEach(planet => {
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    ctx.closePath();
  });
};

const updatePlanets = () => {
  planets.forEach(planet => {
    planet.angle += 0.01;
    planet.x = 300 + 100 * Math.cos(planet.angle);
    planet.y = 200 + 100 * Math.sin(planet.angle);
  });
};

const animate = () => {
  drawPlanets();
  updatePlanets();
  requestAnimationFrame(animate);
};

animate();

// Итог:
// Canvas API предоставляет множество возможностей для создания образовательных приложений.
// Используйте Canvas для разработки интерактивных диаграмм, образовательных игр, визуализации алгоритмов и симуляторов.
// Эти приложения могут улучшить учебный процесс и сделать его более увлекательным и информативным.
