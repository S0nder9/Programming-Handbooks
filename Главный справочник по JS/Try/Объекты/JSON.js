// JSON (JavaScript Object Notation) в JavaScript

// JSON (JavaScript Object Notation) - это формат обмена данными, основанный на синтаксисе объектов JavaScript.

// 1. Структура JSON:
// JSON представляет собой текстовый формат, состоящий из пар ключ-значение, которые разделяются запятыми и заключены в фигурные скобки {}.
// Ключи должны быть в двойных кавычках, а значения могут быть строками, числами, логическими значениями, массивами, объектами или null.

// Пример JSON:
let jsonExample = `{
    "name": "John",
    "age": 30,
    "isStudent": false,
    "hobbies": ["reading", "traveling"],
    "address": {
        "city": "New York",
        "country": "USA"
    },
    "car": null
}`;

// 2. Преобразование объектов в JSON и обратно:
// В JavaScript существуют методы JSON.stringify() и JSON.parse(), которые позволяют преобразовывать объекты в JSON и обратно.

// Преобразование объекта в JSON:
let person = { name: 'John', age: 30 };
let jsonPerson = JSON.stringify(person); // преобразование объекта в JSON строку

// Преобразование JSON в объект:
let parsedPerson = JSON.parse(jsonPerson); // преобразование JSON строки в объект

// 3. Обработка ошибок при парсинге JSON:
// При парсинге JSON в объект методом JSON.parse() может возникнуть ошибка, если JSON строка не является валидной.

// Обработка ошибок при парсинге JSON:
try {
    let invalidJSON = '{ name: "John", age: 30 }'; // невалидная JSON строка
    let parsedInvalidJSON = JSON.parse(invalidJSON); // попытка парсинга невалидной JSON строки
} catch (error) {
    console.error('Ошибка парсинга JSON:', error.message); // вывод сообщения об ошибке
}

// 4. Пример использования JSON:
// JSON широко используется для передачи данных между клиентом и сервером в веб-приложениях, а также для хранения конфигураций, настроек и других данных.

// Пример использования JSON в AJAX запросе:
fetch('https://api.example.com/data')
    .then(response => response.json()) // преобразование ответа сервера в JSON
    .then(data => console.log(data)) // вывод данных в консоль
    .catch(error => console.error('Ошибка запроса:', error));

// JSON предоставляет удобный и распространенный способ обмена данными в веб-разработке, благодаря своей простоте и удобочитаемости.

// Конец файла
