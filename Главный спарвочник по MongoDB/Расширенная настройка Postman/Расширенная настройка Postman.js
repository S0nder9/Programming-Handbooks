// Глава 1: Введение в MongoDB - Расширенная настройка Postman

// MongoDB - это мощная база данных NoSQL, часто используемая для хранения данных в современных веб-приложениях.
// Postman - это инструмент для тестирования и автоматизации API-запросов, который позволяет легко взаимодействовать с сервером и отправлять HTTP-запросы к базе данных через API.
// В этой главе рассмотрим, как выполнить расширенную настройку Postman для работы с MongoDB.

// Настройка соединения с MongoDB через API

// 1. Установка окружения в Postman
// Postman позволяет настроить переменные окружения для упрощения работы с API. Настройка окружения поможет автоматически подставлять URL и порт сервера, параметры и токены в запросы.

// Шаги для настройки окружения:
// - Откройте Postman и перейдите в раздел "Environments".
// - Создайте новое окружение, например, "MongoDB Environment".
// - Добавьте переменные, такие как `baseUrl` для URL вашего сервера и `port` для порта.

// Пример настройки переменных окружения для локальной базы данных:
{
    "baseUrl": "http://localhost",
    "port": "3000"
  }
  
  // 2. Настройка коллекций запросов
  // В Postman можно создавать коллекции, которые содержат наборы запросов к API. Коллекции помогут организовать запросы и упростить тестирование.
  // - Создайте коллекцию, например, "MongoDB API Requests".
  // - Добавьте запросы для взаимодействия с MongoDB, такие как создание, чтение, обновление и удаление документов.
  
  // 3. Пример CRUD-запросов к MongoDB в Postman
  
  // Пример запроса для создания нового документа в базе данных:
  // Метод: POST
  // URL: {{baseUrl}}:{{port}}/api/collection
  // Тело запроса (Body):
  {
    "name": "Example Document",
    "description": "This is an example document."
  }
  
  // Пример запроса для чтения всех документов из коллекции:
  // Метод: GET
  // URL: {{baseUrl}}:{{port}}/api/collection
  
  // Пример запроса для обновления существующего документа:
  // Метод: PUT
  // URL: {{baseUrl}}:{{port}}/api/collection/:id
  // Тело запроса (Body):
  {
    "name": "Updated Document",
    "description": "This document has been updated."
  }
  
  // Пример запроса для удаления документа:
  // Метод: DELETE
  // URL: {{baseUrl}}:{{port}}/api/collection/:id
  
  // 4. Авторизация в Postman
  // Если ваше приложение использует аутентификацию, настройте авторизацию в Postman для доступа к защищенным ресурсам.
  // Вы можете использовать токены доступа (например, JWT) или базовую аутентификацию, указав данные авторизации в заголовках (Headers).
  
  // Пример добавления токена в заголовок запроса:
  // - Перейдите в раздел "Authorization" в Postman.
  // - Выберите "Bearer Token" и вставьте ваш токен доступа.
  // - Теперь все запросы будут отправляться с указанным токеном для доступа к защищенным маршрутам MongoDB API.
  
  // 5. Автоматизация тестов
  // Postman позволяет выполнять тесты для проверки корректности API-ответов.
  // Вы можете добавить тесты для проверки, что API возвращает ожидаемые данные, такие как статус ответа, значения полей и формат JSON.
  
  // Пример автоматического теста для проверки успешного ответа:
  pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
  });
  pm.test("Response has expected fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("name");
    pm.expect(jsonData).to.have.property("description");
  });
  
  // 6. Подготовка к использованию Postman с MongoDB Atlas
  // Если вы используете облачное хранилище MongoDB Atlas, настройте Postman для работы с удаленной базой данных MongoDB.
  // - Задайте правильные переменные окружения для URL и порта (например, `https://<cluster>.mongodb.net`).
  // - Убедитесь, что ваш IP-адрес добавлен в список разрешенных IP в настройках MongoDB Atlas для обеспечения доступа.
  
  // Итог:
  // Postman является мощным инструментом для работы с MongoDB через API. Правильная настройка окружений, коллекций запросов, авторизации и тестирования позволяет легко выполнять операции с базой данных и автоматизировать тестирование.
  // Эти возможности помогут упростить взаимодействие с MongoDB и повысить эффективность работы.
  