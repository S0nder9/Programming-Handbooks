// Глава 2: Промисы
// Подглава 2.3: Обработка результатов промисов

// Методы then() и catch() для обработки успешного выполнения и ошибок

// Пример создания промиса
let myPromise = new Promise((resolve, reject) => {
    let success = true; // Для примера можно менять значение на false

    if (success) {
        resolve("Промис выполнен успешно!");
    } else {
        reject("Произошла ошибка!");
    }
});

// Обработка успешного выполнения промиса
myPromise.then(result => {
    console.log(result); // Выведет "Промис выполнен успешно!"
}).catch(error => {
    console.error(error); // Выведет "Произошла ошибка!" если success = false
});

// Цепочки промисов для последовательного выполнения операций

// Пример последовательного выполнения операций с помощью цепочек промисов
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Первый промис выполнен"), 1000);
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Второй промис выполнен"), 2000);
});

let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Третий промис выполнен"), 3000);
});

// Цепочка промисов
promise1.then(result1 => {
    console.log(result1); // Выведет "Первый промис выполнен"
    return promise2;
}).then(result2 => {
    console.log(result2); // Выведет "Второй промис выполнен"
    return promise3;
}).then(result3 => {
    console.log(result3); // Выведет "Третий промис выполнен"
}).catch(error => {
    console.error(error); // Обработка любой ошибки в цепочке промисов
});

// Пример с использованием промисов для последовательного выполнения операций
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Данные получены с ${url}`);
            } else {
                reject("URL не задан");
            }
        }, 1000);
    });
}

fetchData("https://api.example.com/data")
    .then(data => {
        console.log(data);
        return fetchData("https://api.example.com/other-data");
    })
    .then(otherData => {
        console.log(otherData);
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });
