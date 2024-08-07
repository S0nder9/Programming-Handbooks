// Глава 19: Функции middleware в Express

// Middleware функции в Express являются важной частью любого приложения на Node.js.
// Они представляют собой функции, которые имеют доступ к объектам запроса (req), ответа (res) и следующей функции middleware в цикле запроса-ответа приложения.
// Middleware функции могут выполнять различные задачи, такие как обработка запросов, изменение объектов запроса и ответа, завершение цикла запроса-ответа или вызов следующей функции middleware.

// Как работают функции middleware:
// Функции middleware выполняются последовательно, одна за другой, пока не будет достигнут конечный обработчик запроса или ошибка.
// В функции middleware всегда есть три аргумента: req, res и next.

// Пример простой функции middleware:
const express = require('express');
const app = express();

const myMiddleware = (req, res, next) => {
  console.log('Request received at:', new Date());
  next(); // Передаем управление следующей функции middleware
};

app.use(myMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// В этом примере myMiddleware логирует время каждого запроса и передает управление следующей функции middleware с помощью next().

// Типы middleware функций:
// 1. Built-in middleware (встроенные middleware):
// Express поставляется с несколькими встроенными middleware функциями, такими как express.json() и express.urlencoded().
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Application-level middleware (уровень приложения):
// Эти middleware функции привязываются к экземпляру приложения с помощью app.use() или app.METHOD().
app.use((req, res, next) => {
  console.log('Application-level middleware');
  next();
});

app.get('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
}, (req, res, next) => {
  res.send('User Info');
});

// 3. Router-level middleware (уровень маршрутизатора):
// Эти middleware функции привязываются к экземпляру маршрутизатора с помощью router.use() или router.METHOD().
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router-level middleware');
  next();
});

router.get('/profile', (req, res) => {
  res.send('User Profile');
});

app.use('/user', router);

// 4. Error-handling middleware (обработка ошибок):
// Эти middleware функции предназначены для обработки ошибок и имеют четыре аргумента: err, req, res, next.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 5. Third-party middleware (сторонние middleware):
// Можно использовать сторонние middleware, такие как morgan для логирования запросов.
const morgan = require('morgan');
app.use(morgan('combined'));

// Итог:
// Middleware функции в Express являются мощным инструментом для управления запросами и ответами в приложении.
// Они позволяют выполнять предварительную обработку запросов, добавлять функциональность, обрабатывать ошибки и улучшать модульность кода.
