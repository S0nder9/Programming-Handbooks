// Глава 4: Цикл событий

// Цикл событий является одной из основных частей JavaScript среды выполнения (runtime), которая позволяет JavaScript выполнять асинхронные операции.
// Он отвечает за обработку событий, выполнения колбэков, и управление асинхронными операциями, такими как таймеры и HTTP запросы.

// Блокирование цикла событий

// Блокирование цикла событий происходит, когда одна или несколько задач занимают слишком много времени для выполнения, 
// что приводит к задержке выполнения других задач, ожидающих своей очереди в цикле событий.

// Примеры блокировки цикла событий:

// 1. Длительные вычисления
// Если выполнение длительных синхронных операций, таких как большие циклы, происходит в основном потоке, это может заблокировать цикл событий.
function longRunningTask() {
  const endTime = Date.now() + 5000; // выполняем задачу в течение 5 секунд
  while (Date.now() < endTime) {
    // Блокируемый код
  }
  console.log('Long running task finished');
}

longRunningTask();
console.log('This message will be logged after the long running task');

// 2. Вызов синхронных функций
// Выполнение синхронных операций, таких как чтение большого файла, также может заблокировать цикл событий.
const fs = require('fs');

function readFileSync() {
  const data = fs.readFileSync('/path/to/large/file', 'utf-8');
  console.log('File read');
}

readFileSync();
console.log('This message will be logged after reading the file');

// Как избежать блокировки цикла событий:

// 1. Разделение длительных задач
// Разделение больших задач на более мелкие части с использованием setTimeout или setImmediate, чтобы позволить циклу событий обрабатывать другие задачи.
function longRunningTaskAsync() {
  const chunkSize = 1000;
  let currentChunk = 0;

  function processChunk() {
    const endTime = Date.now() + chunkSize;
    while (Date.now() < endTime) {
      // Обработка части задачи
    }
    currentChunk++;
    if (currentChunk < 5) {
      setTimeout(processChunk, 0); // Разделение задач на части
    } else {
      console.log('Long running task finished');
    }
  }

  processChunk();
}

longRunningTaskAsync();
console.log('This message will be logged immediately');

// 2. Использование асинхронных операций
// Использование асинхронных API, таких как fs.readFile, вместо синхронных API для выполнения ввода-вывода и других длительных операций.
function readFileAsync() {
  fs.readFile('/path/to/large/file', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File read');
  });
}

readFileAsync();
console.log('This message will be logged immediately');

// Итог:
// Блокирование цикла событий может привести к задержке выполнения других задач и ухудшению отзывчивости приложения.
// Для избежания блокировки используйте асинхронные операции и разделяйте длительные задачи на более мелкие части, чтобы позволить циклу событий обрабатывать другие задачи.
