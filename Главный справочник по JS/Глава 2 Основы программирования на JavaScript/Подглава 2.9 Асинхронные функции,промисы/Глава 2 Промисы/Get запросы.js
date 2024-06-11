// Глава 2: Промисы

// Подглава 2.5: Get запросы

/**
 * Fetch API
 * 
 * Fetch API предоставляет интерфейс для работы с HTTP-запросами (например, GET, POST и т.д.)
 * Он возвращает промисы, что позволяет легко обрабатывать асинхронные операции.
 * 
 * Второй аргумент метода fetch - это объект с опциями, который позволяет настроить запрос (например, метод, заголовки и т.д.)
 */

// Пример использования fetch для выполнения GET-запроса
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

/**
 * Второй аргумент fetch
 * 
 * Второй аргумент метода fetch - это объект с опциями, который позволяет настроить запрос.
 * Вот некоторые ключи, которые можно использовать в этом объекте:
 * 
 * - method: Метод HTTP-запроса (GET, POST, PUT, DELETE и т.д.)
 * - headers: Объект с заголовками HTTP-запроса
 * - body: Тело запроса (обычно используется с методами POST, PUT)
 * - mode: Режим запроса (cors, no-cors, same-origin)
 * - credentials: Куки (omit, same-origin, include)
 * - cache: Политика кеширования (default, no-store, reload, no-cache, force-cache, only-if-cached)
 */

// Пример использования второго аргумента fetch
fetch('https://api.example.com/data', {
    method: 'GET', // Метод запроса
    headers: {
        'Content-Type': 'application/json', // Заголовок запроса
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Авторизация (если требуется)
    },
    mode: 'cors', // Режим запроса
    credentials: 'same-origin', // Отправка куков
    cache: 'no-cache' // Политика кеширования
})
    .then(response => response.json())
    .then(data => {
        console.log('Data received with options:', data);
    })
    .catch(error => {
        console.error('Fetch operation with options failed:', error);
    });

/**
 * Обращение к собственной базе данных
 * 
 * Для обращения к своей базе данных обычно требуется развернуть сервер (например, с использованием Node.js, Express)
 * и настроить эндпоинты для обработки запросов. Пример ниже показывает, как можно настроить сервер на Node.js и Express.
 */

// Пример сервера на Node.js и Express
const express = require('express');
const app = express();
const port = 3000;

// Пример маршрута для GET-запроса
app.get('/api/data', (req, res) => {
    const data = {
        id: 1,
        name: 'Example Data'
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

/**
 * Запрос данных с собственного сервера
 * 
 * После настройки сервера, можно использовать fetch для обращения к собственному API.
 */
fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
        console.log('Data received from own server:', data);
    })
    .catch(error => {
        console.error('Fetch operation from own server failed:', error);
    });

/**
 * Этот код показывает, как выполнять GET-запросы с помощью fetch, как использовать второй аргумент fetch для настройки запроса,
 * и как обращаться к собственному серверу и базе данных.
 */
