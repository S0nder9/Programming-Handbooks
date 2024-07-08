// Глава 4: Цикл событий

// Оптимизация кода с событиями в NodeJS

// В NodeJS цикл событий (event loop) является ключевым механизмом, который управляет выполнением асинхронного кода.
// Он позволяет NodeJS эффективно обрабатывать множество запросов без блокировки, используя неблокирующий ввод/вывод и колбэки.

// Основные принципы:
// - Цикл событий состоит из нескольких фаз, каждая из которых обрабатывает разные типы событий (таймеры, I/O события, колбэки и т.д.).
// - Каждый раз, когда начинается новый цикл, NodeJS проверяет, есть ли новые события для обработки.
// - Цикл продолжается до тех пор, пока есть события для обработки.

// Оптимизация кода с использованием цикла событий может включать:

// 1. Использование асинхронных функций и промисов для неблокирующих операций
const fs = require('fs').promises;

async function readFileAsync(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    console.log('File data:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

// 2. Использование setImmediate для отложенного выполнения кода
// setImmediate ставит выполнение функции в конец очереди событий, обеспечивая выполнение других важных задач
function delayedExecution() {
  console.log('Start');

  setImmediate(() => {
    console.log('This runs after the current event loop turn.');
  });

  console.log('End');
}

// 3. Использование process.nextTick для приоритетного выполнения колбэков
// process.nextTick позволяет выполнить функцию на следующем цикле событий до выполнения I/O операций
function immediateTask() {
  console.log('Start');

  process.nextTick(() => {
    console.log('This runs before any I/O operations.');
  });

  console.log('End');
}

// 4. Оптимизация работы с таймерами
// setTimeout и setInterval могут быть использованы для планирования выполнения кода в будущем
function timerExample() {
  console.log('Timer start');

  setTimeout(() => {
    console.log('Timeout executed after 1000ms');
  }, 1000);

  console.log('Timer end');
}

// Пример оптимизации с использованием всех перечисленных подходов
async function optimizedEventLoopExample() {
  console.log('Optimization example start');

  readFileAsync('./example.txt'); // Асинхронное чтение файла

  setImmediate(() => {
    console.log('Immediate callback');
  });

  process.nextTick(() => {
    console.log('Next tick callback');
  });

  setTimeout(() => {
    console.log('Timeout callback');
  }, 500);

  console.log('Optimization example end');
}

// Итог:
// Оптимизация кода с использованием цикла событий в NodeJS позволяет добиться высокой производительности и эффективности приложения.
// Использование асинхронных функций, setImmediate, process.nextTick и таймеров помогает управлять выполнением кода и уменьшать блокировку основного потока.
