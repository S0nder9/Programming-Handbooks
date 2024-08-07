// Глава 4: Цикл событий

// Цикл событий (Event Loop) является одним из ключевых аспектов платформы Node.js. 
// Он позволяет Node.js выполнять неблокирующие операции — несмотря на то, что Node.js работает в однопоточном режиме, 
// он может обрабатывать несколько операций ввода-вывода одновременно.

// Основные задачи цикла событий:
// 1. Управление выполнением кода
// 2. Обработка событий
// 3. Выполнение субзадач

// Цикл событий состоит из нескольких фаз:
// 1. Timers — выполняются колбэки setTimeout и setInterval
// 2. I/O callbacks — выполнение I/O операций
// 3. Idle, prepare — используется внутри Node.js
// 4. Poll — получение новых I/O событий, выполнение I/O колбэков
// 5. Check — выполнение колбэков setImmediate
// 6. Close callbacks — выполнение колбэков закрытия, таких как socket.on('close')

// Пример использования цикла событий с неблокирующим циклом while:

const fs = require('fs');

function nonBlockingWhileLoop() {
  let count = 0;

  function processNext() {
    if (count < 10) {
      console.log(`Count: ${count}`);
      count++;
      setImmediate(processNext); // setImmediate помещает выполнение функции в фазу Check цикла событий
    }
  }

  processNext(); // Начинаем цикл

  // Одновременно выполняем асинхронную операцию чтения файла
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return;
    }
    console.log('Содержимое файла:', data);
  });

  console.log('Не блокирующий цикл while начат');
}

nonBlockingWhileLoop();

// Итог:
// В Node.js цикл событий позволяет выполнять асинхронные операции и не блокировать выполнение основного потока. 
// Использование таких методов, как setImmediate, позволяет реализовать неблокирующие циклы, что особенно полезно для 
// выполнения длительных или повторяющихся задач, не мешая обработке других событий и операций ввода-вывода.
