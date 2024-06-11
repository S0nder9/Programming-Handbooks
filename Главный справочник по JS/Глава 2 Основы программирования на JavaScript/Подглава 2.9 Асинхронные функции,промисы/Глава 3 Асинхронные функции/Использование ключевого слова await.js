// Глава 3: Асинхронные функции

// Подглава 3.2: Использование ключевого слова await

// Функция, возвращающая промис с задержкой
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Асинхронная функция, использующая ключевое слово await
async function exampleAsyncFunction() {
    console.log("Начало выполнения асинхронной функции");

    // Ожидание выполнения промиса с помощью await
    await wait(2000); // Подождать 2 секунды

    console.log("Прошло 2 секунды");

    // Получение результата выполнения промиса
    return "Готово";
}

// Вызов асинхронной функции и обработка ее результата
exampleAsyncFunction()
    .then(result => {
        console.log("Результат:", result); // Результат: Готово
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });
