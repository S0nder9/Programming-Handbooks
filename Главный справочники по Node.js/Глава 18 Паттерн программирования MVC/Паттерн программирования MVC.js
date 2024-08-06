// Глава 18: Паттерн программирования MVC - Паттерн программирования MVC в Node.js

// Паттерн Model-View-Controller (MVC) - это популярный паттерн проектирования, используемый для разделения логики приложения на три основные части:
// - Модель (Model): управляет данными и бизнес-логикой приложения
// - Представление (View): отвечает за отображение данных пользователю
// - Контроллер (Controller): обрабатывает пользовательский ввод и взаимодействует с моделью

// В Node.js этот паттерн может быть реализован с использованием различных фреймворков и библиотек, таких как Express.js для маршрутизации и обработки HTTP-запросов.

// Пример реализации паттерна MVC в Node.js:

// 1. Установка Express.js
// Для начала установим Express.js с помощью npm:
// npm install express

// 2. Создание структуры проекта
// ├── app.js
// ├── controllers
// │   └── userController.js
// ├── models
// │   └── userModel.js
// └── views
//     └── userView.js

// 3. Реализация модели (Model)
// models/userModel.js

const users = []; // Пример хранилища данных

class UserModel {
  static create(user) {
    users.push(user);
  }

  static findAll() {
    return users;
  }
}

module.exports = UserModel;

// 4. Реализация представления (View)
// views/userView.js

class UserView {
  static render(users) {
    return `
      <h1>User List</h1>
      <ul>
        ${users.map(user => `<li>${user.name}</li>`).join('')}
      </ul>
    `;
  }
}

module.exports = UserView;

// 5. Реализация контроллера (Controller)
// controllers/userController.js

const UserModel = require('../models/userModel');
const UserView = require('../views/userView');

class UserController {
  static createUser(req, res) {
    const newUser = { name: req.body.name };
    UserModel.create(newUser);
    res.redirect('/users');
  }

  static listUsers(req, res) {
    const users = UserModel.findAll();
    res.send(UserView.render(users));
  }
}

module.exports = UserController;

// 6. Настройка маршрутизации и запуск сервера
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/userController');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/users', UserController.createUser);
app.get('/users', UserController.listUsers);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Итог:
// Паттерн MVC помогает структурировать приложение, разделяя логику на три части: модель, представление и контроллер.
// Это делает код более организованным и облегчает поддержку и расширение приложения.
