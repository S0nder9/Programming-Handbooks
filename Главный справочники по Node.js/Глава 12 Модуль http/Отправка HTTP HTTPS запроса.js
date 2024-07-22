// Глава 12: Модуль http - Отправка HTTP/HTTPS запроса в Node.js

// В Node.js модуль `http` используется для создания HTTP-серверов и выполнения HTTP-запросов.
// С его помощью можно отправлять GET и POST запросы к внешним серверам или получать данные из API.

// Как работать с модулем http:
// Для отправки HTTP-запросов в Node.js используется метод `http.request`.
// Он позволяет отправлять запросы к указанному серверу и получать ответ.

// Пример отправки GET запроса с использованием модуля http:
const http = require('http');

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  // Получение данных по частям
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Конец получения данных
  res.on('end', () => {
    console.log('Response:', data);
  });
});

// Обработка ошибок запроса
req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

// Завершение запроса
req.end();

// Пример отправки POST запроса с использованием модуля http:
const postData = JSON.stringify({
  name: 'John Doe',
  age: 30,
});

const postOptions = {
  hostname: 'www.example.com',
  port: 80,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const postReq = http.request(postOptions, (res) => {
  let data = '';

  // Получение данных по частям
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Конец получения данных
  res.on('end', () => {
    console.log('Response:', data);
  });
});

// Обработка ошибок запроса
postReq.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

// Отправка данных в запросе
postReq.write(postData);
postReq.end();

// Работа с модулем https:
// Для отправки HTTPS-запросов в Node.js используется модуль `https`, который работает аналогично модулю `http`.

const https = require('https');

const httpsOptions = {
  hostname: 'www.example.com',
  port: 443,
  path: '/',
  method: 'GET',
};

const httpsReq = https.request(httpsOptions, (res) => {
  let data = '';

  // Получение данных по частям
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Конец получения данных
  res.on('end', () => {
    console.log('Response:', data);
  });
});

// Обработка ошибок запроса
httpsReq.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

// Завершение запроса
httpsReq.end();

// Итог:
// Модуль http позволяет отправлять HTTP-запросы к серверам и получать данные из API.
// Модуль https используется для отправки HTTPS-запросов и обеспечивает безопасность передачи данных.
// Эти модули являются важными инструментами для работы с сетью в Node.js.
