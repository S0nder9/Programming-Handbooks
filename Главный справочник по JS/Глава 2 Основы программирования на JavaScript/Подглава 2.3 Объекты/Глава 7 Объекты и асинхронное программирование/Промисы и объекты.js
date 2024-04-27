// Подглава 7.2: Промисы и объекты

// Использование объектов в цепочках промисов
/*
Объекты могут использоваться в цепочках промисов для передачи данных между асинхронными операциями.
*/

// Пример использования объектов в цепочках промисов:
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // Предположим, что здесь происходит асинхронный запрос данных о пользователе по его идентификатору
        // Вместо этого примера используем задержку для имитации асинхронной операции
        setTimeout(() => {
            const user = { id: userId, name: "John", age: 30 };
            resolve(user);
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        // Предположим, что здесь происходит асинхронный запрос данных о постах пользователя по его идентификатору
        // Вместо этого примера используем задержку для имитации асинхронной операции
        setTimeout(() => {
            const posts = [
                { id: 1, userId: userId, title: "Post 1" },
                { id: 2, userId: userId, title: "Post 2" }
            ];
            resolve(posts);
        }, 1500);
    });
}

fetchUserData(1)
    .then(user => {
        console.log("Данные о пользователе:", user);
        return fetchUserPosts(user.id); // Передача данных о пользователе в следующий промис
    })
    .then(posts => {
        console.log("Посты пользователя:", posts);
    })
    .catch(error => {
        console.error("Произошла ошибка:", error);
    });

// Работа с методами объекта в асинхронных функциях
/*
Методы объекта могут быть вызваны внутри асинхронных функций, в том числе и внутри промисов.
*/

// Пример работы с методами объекта в асинхронных функциях:
const person = {
    name: "Alice",
    age: 25,
    async greet() {
        return new Promise((resolve, reject) => {
            // Предположим, что здесь происходит асинхронное приветствие
            // Вместо этого примера используем задержку для имитации асинхронной операции
            setTimeout(() => {
                resolve(`Привет, меня зовут ${this.name} и мне ${this.age} лет.`);
            }, 2000);
        });
    }
};

person.greet()
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error("Произошла ошибка:", error);
    });
