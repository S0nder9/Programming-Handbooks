// Глава 11: Оптимизация и производительность в Canvas
// Подглава 11.1: Оптимизация кода для Canvas
// - Снижение нагрузки на процессор и память

// Оптимизация кода для Canvas включает различные методы, которые помогают снизить нагрузку на процессор и память,
// обеспечивая более плавную и эффективную работу графических приложений.

// 1. Использование requestAnimationFrame вместо setInterval или setTimeout
// Вместо использования setInterval или setTimeout для обновления Canvas, используйте requestAnimationFrame.
// Этот метод синхронизирует обновления с частотой обновления экрана, что делает анимации более плавными и эффективными.

function draw() {
    // Ваш код для рисования на Canvas
    requestAnimationFrame(draw);
  }
  
  requestAnimationFrame(draw);
  
  // 2. Сокращение количества операций рисования
  // Старайтесь минимизировать количество вызовов методов рисования в Canvas.
  // Например, вместо того чтобы рисовать каждую отдельную фигуру, можно объединить несколько фигур в один путь.
  
  function drawMultipleShapes(context) {
    context.beginPath();
    context.rect(10, 10, 50, 50);
    context.arc(100, 100, 20, 0, Math.PI * 2);
    context.moveTo(200, 200);
    context.lineTo(250, 250);
    context.stroke();
  }
  
  // 3. Кэширование частично неизменяемых объектов
  // Если у вас есть объекты, которые редко меняются, нарисуйте их на отдельном off-screen Canvas и используйте этот Canvas
  // для рисования на основном Canvas. Это снижает количество операций рисования на основном Canvas.
  
  const offScreenCanvas = document.createElement('canvas');
  const offScreenContext = offScreenCanvas.getContext('2d');
  
  function drawOffScreen() {
    offScreenContext.fillStyle = 'blue';
    offScreenContext.fillRect(0, 0, 100, 100);
  }
  
  function drawOnMainCanvas(mainContext) {
    mainContext.drawImage(offScreenCanvas, 0, 0);
  }
  
  drawOffScreen();
  
  // В основном цикле рендеринга
  function mainRenderLoop(mainContext) {
    drawOnMainCanvas(mainContext);
    requestAnimationFrame(() => mainRenderLoop(mainContext));
  }
  
  // 4. Оптимизация работы с пикселями
  // Когда требуется работа с пиксельными данными, старайтесь минимизировать количество вызовов getImageData и putImageData.
  
  function manipulatePixels(context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Пример изменения цвета пикселя
      data[i] = 255 - data[i]; // Красный
      data[i + 1] = 255 - data[i + 1]; // Зеленый
      data[i + 2] = 255 - data[i + 2]; // Синий
    }
    context.putImageData(imageData, 0, 0);
  }
  
  // 5. Избегание избыточных вычислений и отрисовок
  // Избегайте повторных вычислений и отрисовок, которые не влияют на конечный результат.
  
  let previousState = {};
  
  function render(context, currentState) {
    if (JSON.stringify(currentState) !== JSON.stringify(previousState)) {
      // Только если состояние изменилось, перерисовываем
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Ваш код для рисования на Canvas
      previousState = currentState;
    }
    requestAnimationFrame(() => render(context, currentState));
  }
  
  // Итог:
  // Оптимизация кода для Canvas включает использование requestAnimationFrame, минимизацию операций рисования,
  // кэширование неизменяемых объектов, эффективную работу с пикселями и избежание избыточных вычислений.
  // Эти методы помогут снизить нагрузку на процессор и память, улучшив производительность ваших графических приложений.
  