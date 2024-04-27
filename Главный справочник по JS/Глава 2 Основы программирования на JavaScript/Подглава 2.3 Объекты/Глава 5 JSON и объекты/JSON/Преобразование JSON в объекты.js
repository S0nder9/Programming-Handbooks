// Подглава 5.2: Преобразование JSON в объекты

// Парсинг JSON с помощью JSON.parse()
/*
Метод JSON.parse() используется для преобразования строки JSON в объект JavaScript.
*/

// Пример парсинга JSON с помощью JSON.parse():
const jsonString = '{"name":"John","age":30,"hobbies":["reading","coding"]}';
const parsedData = JSON.parse(jsonString);

console.log(parsedData.name); // Выведет: John
console.log(parsedData.age); // Выведет: 30
console.log(parsedData.hobbies); // Выведет: ["reading", "coding"]

// Обработка ошибок при парсинге JSON
/*
При парсинге JSON возможны ошибки, например, если строка JSON некорректна или не соответствует ожидаемой структуре данных.
*/

// Пример обработки ошибок при парсинге JSON:
const invalidJsonString = '{"name":"John",age:30}';

try {
    const parsedData2 = JSON.parse(invalidJsonString);
    console.log(parsedData2); // Выведет ошибку, так как JSON некорректен
} catch (error) {
    console.error("Ошибка при парсинге JSON:", error.message);
}

// Использование ревайва функции для десериализации
/*
Ревайв функция может быть передана вторым аргументом методу JSON.parse(). Эта функция вызывается для каждой пары ключ-значение в объекте, созданном при парсинге JSON.
*/

// Пример использования ревайва функции для десериализации:
const jsonString2 = '{"name":"John","age":"30","dateOfBirth":"1992-10-08"}';

const reviver = function(key, value) {
    if (key === 'dateOfBirth') {
        return new Date(value);
    }
    return value;
};

const parsedData3 = JSON.parse(jsonString2, reviver);
console.log(parsedData3.dateOfBirth); // Выведет: Wed Oct 07 1992 20:00:00 GMT-0400 (Eastern Daylight Time)
