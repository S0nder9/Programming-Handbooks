/*
Глава 2: Промисы
Подглава 2.4: Практические примеры использования промисов
- Загрузка данных с сервера
- Обработка последовательности асинхронных операций
*/

// Загрузка данных с сервера
function fetchData(url) {
    return new Promise((resolve, reject) => {
        // Используем Fetch API для получения данных
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Пример использования функции fetchData
fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
        console.log('Данные получены:', data);
    })
    .catch(error => {
        console.error('Произошла ошибка при загрузке данных:', error);
    });

// Обработка последовательности асинхронных операций
function firstAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Первая операция завершена');
            resolve('Результат первой операции');
        }, 1000);
    });
}

function secondAsyncOperation(resultFromFirst) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Вторая операция завершена, используя результат первой:', resultFromFirst);
            resolve('Результат второй операции');
        }, 1000);
    });
}

function thirdAsyncOperation(resultFromSecond) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Третья операция завершена, используя результат второй:', resultFromSecond);
            resolve('Результат третьей операции');
        }, 1000);
    });
}

// Цепочка промисов для последовательного выполнения асинхронных операций
firstAsyncOperation()
    .then(resultFromFirst => {
        return secondAsyncOperation(resultFromFirst);
    })
    .then(resultFromSecond => {
        return thirdAsyncOperation(resultFromSecond);
    })
    .then(finalResult => {
        console.log('Все операции завершены, финальный результат:', finalResult);
    })
    .catch(error => {
        console.error('Произошла ошибка в цепочке асинхронных операций:', error);
    });
