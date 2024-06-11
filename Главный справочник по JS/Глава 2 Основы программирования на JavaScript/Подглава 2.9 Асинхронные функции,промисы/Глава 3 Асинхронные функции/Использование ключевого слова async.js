// Глава 3: Асинхронные функции

// Подглава 3.2: Использование ключевого слова async

// Объявление асинхронной функции с использованием async
async function fetchData() {
    // Симулируем задержку в 2 секунды, используя setTimeout в Promise
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Данные получены"), 2000);
    });

    // Ожидаем выполнения промиса
    let result = await promise; // Ожидание выполнения промиса

    // Возвращаем результат
    return result;
}

// Использование асинхронной функции
fetchData().then(result => console.log(result)); // Должно вывести "Данные получены" через 2 секунды

// Пример асинхронной функции, возвращающей промисы
async function fetchUserData(userId) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    let data = await response.json();
    return data;
}

// Вызов функции и обработка результата
fetchUserData(1)
    .then(user => {
        console.log("User Data:", user);
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
    });

// Асинхронная функция с использованием try...catch для обработки ошибок
async function fetchDataWithErrorHandling() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Вызов функции с ошибками
fetchDataWithErrorHandling().then(result => {
    if (result) {
        console.log("Fetched Data:", result);
    } else {
        console.log("No data fetched due to error.");
    }
});
