// Глава 4: Цикл событий - Архитектура Node.js

// Псевдокод для цикла событий

// Цикл событий (Event Loop) в Node.js — это механизм, который позволяет Node.js выполнять асинхронные операции, такие как чтение файлов или запросы к базе данных,
// не блокируя основной поток выполнения. Это ключевая часть архитектуры Node.js, которая обеспечивает эффективное выполнение асинхронного кода.

// Основные компоненты цикла событий:
// 1. **Стек вызовов (Call Stack)** — место, где выполняются синхронные операции и функции.
// 2. **Очередь задач (Callback Queue)** — место, куда помещаются функции обратного вызова (callbacks), ожидающие выполнения.
// 3. **Очередь микротасков (Microtask Queue)** — место для обработки микротасков, таких как промисы и `process.nextTick()`.
// 4. **Таймеры** — отслеживание таймеров, таких как `setTimeout()` и `setInterval()`.
// 5. **Веб-API** — API браузера или Node.js, которые выполняют асинхронные операции.
// 6. **Фаза событий (Event Phase)** — фаза в цикле событий, когда обрабатываются события, такие как события ввода/вывода.

console.log("1. Начало работы основного потока");

// Пример работы цикла событий
function main() {
  console.log("2. Синхронный код выполняется сразу");

  // Устанавливаем таймер, который добавляется в очередь таймеров
  setTimeout(() => {
    console.log("5. Таймер сработал после 0 мс");
  }, 0);

  // Запускаем промис, который добавляется в очередь микротасков
  new Promise((resolve) => {
    console.log("3. Промис создается и добавляется в очередь микротасков");
    resolve();
  }).then(() => {
    console.log("7. Промис выполнен");
  });

  // Добавляем задачу в очередь задач
  process.nextTick(() => {
    console.log("4. process.nextTick() добавлен в очередь микротасков");
  });

  console.log("6. Конец выполнения синхронного кода");
}

main();

console.log("8. Завершение работы основного потока");

// Теоретические объяснения

// **Стек вызовов** (Call Stack) — это структура данных, которая хранит информацию о том, какие функции вызываются в данный момент. Функции добавляются в стек по мере их вызова и удаляются по мере завершения.

// **Очередь задач** (Callback Queue) — это очередь, где хранятся функции обратного вызова, которые должны быть выполнены после завершения текущих операций в стеке вызовов. Эти задачи могут быть вызваны по мере их завершения.

// **Очередь микротасков** (Microtask Queue) — это очередь, где хранятся микротаски, такие как задачи, созданные с помощью промисов или `process.nextTick()`. Микротаски имеют более высокий приоритет по сравнению с задачами в основной очереди задач.

// **Таймеры** (Timers) — это функции, такие как `setTimeout()` и `setInterval()`, которые добавляют задачи в очередь задач по истечении указанного времени.

// **Веб-API** (Web API) — API, которые предоставляются браузером или Node.js и позволяют выполнять асинхронные операции, такие как запросы HTTP, чтение файлов и т.д.

// **Фаза событий** (Event Phase) — это часть цикла событий, когда события, такие как пользовательский ввод или завершение ввода/вывода, обрабатываются и соответствующие обработчики событий вызываются.

// Как работает цикл событий:

/*
1. **Выполнение синхронного кода**:
   - Сначала выполняется синхронный код, который находится в стеке вызовов. 

2. **Обработка микротасков**:
   - После завершения синхронного кода Node.js переходит к выполнению микротасков из очереди микротасков, таких как `process.nextTick()` или `Promise.then()`.

3. **Обработка задач**:
   - Затем Node.js переходит к выполнению задач из очереди задач, таких как обработка таймеров (`setTimeout()` и `setInterval()`).

4. **Обработка событий**:
   - Если есть события, такие как события ввода/вывода, они обрабатываются на этой стадии.

5. **Возвращение к шагу 2**:
   - Процесс повторяется: выполнение синхронного кода, обработка микротасков, обработка задач и обработка событий.

*/

// Пример кода для иллюстрации цикла событий:
console.log("Синхронный код");

setTimeout(() => {
  console.log("Таймер");
}, 1000);

Promise.resolve()
  .then(() => {
    console.log("Промис");
  });

console.log("Конец");

// В этом примере, синхронный код выполняется сразу, затем `Promise` добавляется в очередь микротасков, а `setTimeout` добавляется в очередь задач. После выполнения синхронного кода и микротасков, Node.js обрабатывает задачи из очереди таймеров.

// Итог:
// Цикл событий — это основополагающий механизм в Node.js, который позволяет эффективно обрабатывать асинхронные операции и управлять выполнением кода. Знание его работы помогает разработчикам писать более эффективные и производительные приложения.

