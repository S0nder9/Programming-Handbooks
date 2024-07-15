// Глава 7: Обработка событий в Canvas
// Подглава 7.2: Обработка событий мыши

// В Canvas API можно обрабатывать различные события мыши, такие как click, mousedown, mouseup и mousemove.
// Эти события позволяют взаимодействовать с элементом Canvas, а также получать информацию о позиции мыши на Canvas.

// Событие click:
// Событие click происходит, когда пользователь нажимает и отпускает кнопку мыши в пределах Canvas.
// Используется для выполнения действий при клике на Canvas.

const canvas = document.getElementById('myCanvas');
canvas.addEventListener('click', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  console.log(`Click event at (${mouseX}, ${mouseY})`);
});

// Событие mousedown:
// Событие mousedown происходит, когда пользователь нажимает кнопку мыши на Canvas.
// Используется для начала каких-либо действий, например рисования.

canvas.addEventListener('mousedown', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  console.log(`Mouse down at (${mouseX}, ${mouseY})`);
});

// Событие mouseup:
// Событие mouseup происходит, когда пользователь отпускает кнопку мыши после того, как нажал ее на Canvas.
// Используется для завершения действий, начатых с mousedown.

canvas.addEventListener('mouseup', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  console.log(`Mouse up at (${mouseX}, ${mouseY})`);
});

// Событие mousemove:
// Событие mousemove происходит, когда пользователь перемещает мышь по Canvas.
// Используется для отслеживания движения мыши и выполнения действий на основе этих движений.

canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  console.log(`Mouse move at (${mouseX}, ${mouseY})`);
});

// Определение координат мыши на Canvas:
// Для определения координат мыши на Canvas нужно учитывать положение Canvas относительно окна браузера.
// В примерах выше используется метод getBoundingClientRect(), который возвращает размеры и позицию Canvas.

const getMousePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  return { mouseX, mouseY };
};

canvas.addEventListener('click', (event) => {
  const { mouseX, mouseY } = getMousePosition(event);
  console.log(`Click event at (${mouseX}, ${mouseY})`);
});

canvas.addEventListener('mousedown', (event) => {
  const { mouseX, mouseY } = getMousePosition(event);
  console.log(`Mouse down at (${mouseX}, ${mouseY})`);
});

canvas.addEventListener('mouseup', (event) => {
  const { mouseX, mouseY } = getMousePosition(event);
  console.log(`Mouse up at (${mouseX}, ${mouseY})`);
});

canvas.addEventListener('mousemove', (event) => {
  const { mouseX, mouseY } = getMousePosition(event);
  console.log(`Mouse move at (${mouseX}, ${mouseY})`);
});

// Итог:
// События мыши в Canvas (click, mousedown, mouseup, mousemove) позволяют реализовать интерактивные функции и отслеживать действия пользователя.
// Определение координат мыши на Canvas важно для создания различных взаимодействий, таких как рисование или обработка кликов.
