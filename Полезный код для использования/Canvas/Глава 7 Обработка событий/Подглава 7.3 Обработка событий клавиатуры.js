// Глава 7: Обработка событий в Canvas

// Подглава 7.3: Обработка событий клавиатуры

// В Canvas можно обрабатывать события клавиатуры для управления объектами или для выполнения определенных действий.
// Основные события клавиатуры, которые можно использовать: `keydown` и `keyup`.

// 1. Событие `keydown`:
// Событие `keydown` возникает, когда пользователь нажимает клавишу на клавиатуре.
// Это событие срабатывает в момент нажатия клавиши и позволяет начать обработку сразу при нажатии.

document.addEventListener('keydown', (event) => {
    console.log('Key down:', event.key); // Выведет нажатую клавишу
    // Пример обработки: перемещение объекта влево при нажатии клавиши со стрелкой влево
    if (event.key === 'ArrowLeft') {
      moveObject(-10, 0);
    }
  });
  
  // 2. Событие `keyup`:
  // Событие `keyup` возникает, когда пользователь отпускает клавишу на клавиатуре.
  // Это событие срабатывает в момент отпускания клавиши и позволяет завершить обработку действий.
  
  document.addEventListener('keyup', (event) => {
    console.log('Key up:', event.key); // Выведет нажатую клавишу
    // Пример обработки: остановка движения объекта при отпускании клавиши
    if (event.key === 'ArrowLeft') {
      stopObjectMovement();
    }
  });
  
  // Пример управления объектами с помощью клавиатуры:
  
  let objectPosition = { x: 100, y: 100 }; // Начальная позиция объекта
  let objectVelocity = { x: 0, y: 0 }; // Скорость объекта
  
  // Функция для перемещения объекта
  function moveObject(dx, dy) {
    objectVelocity.x = dx;
    objectVelocity.y = dy;
  }
  
  // Функция для остановки движения объекта
  function stopObjectMovement() {
    objectVelocity.x = 0;
    objectVelocity.y = 0;
  }
  
  // Основной игровой цикл, который обновляет позицию объекта и перерисовывает его
  function gameLoop() {
    objectPosition.x += objectVelocity.x;
    objectPosition.y += objectVelocity.y;
    drawObject(); // Функция отрисовки объекта на Canvas
    requestAnimationFrame(gameLoop); // Запрашиваем следующее обновление кадра
  }
  
  // Функция отрисовки объекта на Canvas
  function drawObject() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем Canvas
    ctx.fillStyle = 'blue';
    ctx.fillRect(objectPosition.x, objectPosition.y, 50, 50); // Рисуем объект
  }
  
  // Запускаем игровой цикл
  gameLoop();
  
  // Итог:
  // События `keydown` и `keyup` позволяют обрабатывать нажатия и отпускания клавиш на клавиатуре в Canvas-приложении.
  // Используйте `keydown` для начала действий, таких как движение объекта, и `keyup` для завершения действий.
  // В примере выше показан способ управления объектом на Canvas с помощью клавиш и основной игровой цикл для обновления и отрисовки объекта.
  