// Глава 2: Краткий курс по JavaScript - JSON

// JSON (JavaScript Object Notation) — это формат обмена данными, который легко читается и пишется человеком и легко парсится и генерируется программой.
// JSON используется для передачи данных между клиентом и сервером, и он основан на JavaScript-объектах.

// Подглава 2.1: Основы JSON

// 1. Что такое JSON?
// JSON — это текстовый формат для хранения и передачи данных. Он представляет собой набор пар "ключ-значение" и упрощает обмен данными между различными системами.

// Пример JSON-объекта:
const jsonString = '{"name": "Alice", "age": 30, "city": "New York"}';

// JSON-объекты всегда начинаются с фигурных скобок и содержат пары ключ-значение:
// { "ключ": "значение", "ключ": "значение", ... }

// 2. Синтаксис JSON
// JSON использует следующие правила синтаксиса:
// - Ключи и строки должны быть в двойных кавычках.
// - Значения могут быть строками, числами, объектами, массивами, true, false или null.
// - Объекты разделяются запятыми, и ключи должны быть строками в двойных кавычках.

const exampleJson = {
  "name": "Bob",
  "age": 25,
  "isStudent": true,
  "courses": ["Math", "Science"],
  "address": {
    "street": "123 Main St",
    "city": "Los Angeles"
  }
};

// 3. Преобразование объектов JavaScript в JSON

// Для преобразования объекта JavaScript в JSON используется метод JSON.stringify().

const jsonStringified = JSON.stringify(exampleJson);
console.log(jsonStringified);
// Вывод: {"name":"Bob","age":25,"isStudent":true,"courses":["Math","Science"],"address":{"street":"123 Main St","city":"Los Angeles"}}

// Подглава 2.2: Преобразование JSON в объекты

// 1. Парсинг JSON с помощью JSON.parse()

// Для преобразования строки JSON в объект JavaScript используется метод JSON.parse().

const jsonParsed = JSON.parse(jsonString);
console.log(jsonParsed);
// Вывод: { name: 'Alice', age: 30, city: 'New York' }

// 2. Обработка ошибок при парсинге JSON

// При парсинге JSON может произойти ошибка, если JSON имеет неверный формат.
// Поэтому рекомендуется обрабатывать ошибки с помощью try-catch.

try {
  const invalidJsonString = '{"name": "Alice", "age": 30, "city": "New York"'; // неверный формат
  const data = JSON.parse(invalidJsonString);
} catch (error) {
  console.error('Ошибка парсинга JSON:', error.message);
  // Вывод: Ошибка парсинга JSON: Unexpected end of JSON input
}

// 3. Использование ревайва функции для десериализации

// Можно передать второй аргумент в JSON.parse() для преобразования значений, это называется "ревайв-функция".

const jsonStringWithDate = '{"name": "Alice", "birthdate": "2000-01-01T00:00:00Z"}';

const reviver = (key, value) => {
  if (key === 'birthdate') {
    return new Date(value); // преобразуем строку в объект Date
  }
  return value;
};

const parsedWithReviver = JSON.parse(jsonStringWithDate, reviver);
console.log(parsedWithReviver.birthdate instanceof Date); // true
console.log(parsedWithReviver.birthdate.toISOString()); // 2000-01-01T00:00:00.000Z

// Подглава 2.3: Работа с JSON в асинхронных запросах

// 1. Применение JSON с Fetch API

// Метод fetch() позволяет выполнять HTTP-запросы. Используйте JSON для обработки ответов.

fetch('https://api.example.com/data')
  .then(response => response.json()) // преобразуем ответ в JSON
  .then(data => console.log(data)) // работа с данными
  .catch(error => console.error('Ошибка запроса:', error));

// 2. Применение JSON с XMLHttpRequest

// С помощью XMLHttpRequest также можно выполнять запросы и работать с JSON.

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error('Ошибка запроса:', xhr.statusText);
  }
};
xhr.onerror = () => {
  console.error('Ошибка запроса:', xhr.statusText);
};
xhr.send();

// Подглава 2.4: Работа с JSON в React

// 1. Загрузка данных и работа с JSON в компонентах React

// Пример компонента, который загружает данные и отображает их.

import React, { useState, useEffect } from 'react';

function JsonDataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>Данные из JSON</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// 2. Отправка данных JSON на сервер

// Пример отправки данных JSON на сервер с использованием fetch.

const dataToSend = {
  name: 'Charlie',
  age: 35,
  city: 'San Francisco'
};

fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToSend) // преобразуем данные в строку JSON
})
  .then(response => response.json())
  .then(result => console.log('Ответ от сервера:', result))
  .catch(error => console.error('Ошибка отправки данных:', error));

// Итог:
// В этой главе мы изучили основы работы с JSON в JavaScript, включая преобразование между строками и объектами, работу с асинхронными запросами и использование JSON в React.
// Понимание этих концепций важно для эффективного обмена данными и взаимодействия с внешними API в ваших приложениях.
