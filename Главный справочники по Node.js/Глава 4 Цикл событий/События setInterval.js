// Глава 4: Цикл событий

// В JavaScript цикл событий (event loop) управляет выполнением кода, сбором и обработкой событий, и выполнением подзадач из очереди.
// События, такие как setInterval, позволяют выполнять определенные действия через регулярные интервалы времени.

// setInterval
// Метод setInterval используется для повторного выполнения функции через определенные интервалы времени (в миллисекундах).
// Это может быть полезно для обновления пользовательского интерфейса, выполнения регулярных проверок данных и других периодических задач.

// Синтаксис setInterval:
const intervalId = setInterval(callback, delay);

// Параметры:
// - callback: Функция, которая будет выполняться через каждые delay миллисекунд.
// - delay: Интервал времени в миллисекундах между вызовами callback.

// Пример использования setInterval:
function printMessage() {
  console.log('Сообщение выводится каждые 2 секунды');
}

// Запускаем setInterval с интервалом в 2000 миллисекунд (2 секунды)
const intervalId = setInterval(printMessage, 2000);

// Для остановки выполнения setInterval можно использовать clearInterval:
clearInterval(intervalId);

// Пример использования setInterval в компоненте React:
import React, { useState, useEffect } from 'react';

function TimerComponent() {
  const [seconds, setSeconds] = useState(0); // состояние для отслеживания секунд

  useEffect(() => {
    // Функция для увеличения состояния секунд на 1
    const tick = () => {
      setSeconds(prevSeconds => prevSeconds + 1);
    };

    // Запускаем setInterval с интервалом в 1000 миллисекунд (1 секунда)
    const intervalId = setInterval(tick, 1000);

    // Очищаем setInterval при размонтировании компонента, чтобы избежать утечек памяти
    return () => clearInterval(intervalId);
  }, []); // пустой массив зависимостей, чтобы useEffect сработал только при монтировании компонента

  return (
    <div>
      <h1>Прошло секунд: {seconds}</h1>
    </div>
  );
}

// Пример использования TimerComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример setInterval в React</h1>
      <TimerComponent />
    </div>
  );
}

export default App;

// Итог:
// Метод setInterval позволяет выполнять функции через регулярные интервалы времени, что может быть полезно для различных задач в веб-разработке.
// Важно очищать setInterval при необходимости, чтобы избежать утечек памяти и неконтролируемого выполнения задач.
