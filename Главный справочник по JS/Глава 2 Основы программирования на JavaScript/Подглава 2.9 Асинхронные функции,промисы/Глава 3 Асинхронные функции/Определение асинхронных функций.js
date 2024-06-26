/*
Глава 3: Асинхронные функции
Подглава 3.1: Определение асинхронных функций
*/

// Синтаксис функций async/await

// Асинхронная функция определяется с помощью ключевого слова `async`
async function fetchData() {
    try {
        // Внутри асинхронной функции мы можем использовать ключевое слово `await`
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Вызов асинхронной функции
fetchData();

/*
- Как работают асинхронные функции в JavaScript

Асинхронные функции позволяют писать асинхронный код, который выглядит и работает как синхронный. Это достигается благодаря комбинации `async` и `await`.

1. Ключевое слово `async` перед функцией определяет ее как асинхронную. Такая функция всегда возвращает промис.

2. Ключевое слово `await` можно использовать только внутри асинхронных функций. Оно заставляет интерпретатор JavaScript ждать завершения промиса перед продолжением выполнения кода.

Преимущества:
- Более читабельный и понятный код по сравнению с использованием цепочек промисов.
- Простая обработка ошибок с помощью конструкции `try...catch`.
*/

// Пример: Асинхронная функция для получения данных и обработки ошибок
async function getUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Не удалось получить данные пользователя:', error);
        return null;
    }
}

// Вызов асинхронной функции с обработкой результата
getUserData(1)
    .then(userData => {
        if (userData) {
            console.log('Данные пользователя:', userData);
        } else {
            console.log('Данные пользователя не найдены');
        }
    });

/*
Этот пример демонстрирует, как можно использовать асинхронные функции для выполнения сетевых запросов и обработки возможных ошибок. Использование `async/await` делает код более линейным и легко читаемым.
*/
