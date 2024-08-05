// Глава 17: Веб фреймворк Express - Перенос обработчиков запросов в каталог controllers в Node.js

// Express - популярный веб-фреймворк для Node.js, который упрощает создание веб-приложений и API.
// Чтобы лучше структурировать код в больших приложениях, обработчики запросов можно переносить в отдельный каталог controllers.

// Создание каталога controllers:
// 1. В корне вашего проекта создайте папку controllers.
// 2. В этой папке создайте файлы для каждого контроллера, например userController.js.

// Пример структуры проекта:
// my-app/
// ├── controllers/
// │   └── userController.js
// ├── routes/
// │   └── userRoutes.js
// ├── app.js
// ├── package.json

// Пример контроллера в controllers/userController.js:
const getUser = (req, res) => {
    // Логика для получения пользователя
    res.send('User details');
  };
  
  const createUser = (req, res) => {
    // Логика для создания пользователя
    res.send('User created');
  };
  
  module.exports = {
    getUser,
    createUser,
  };
  
  // Пример маршрутов в routes/userRoutes.js:
  const express = require('express');
  const router = express.Router();
  const userController = require('../controllers/userController');
  
  // Определение маршрутов и привязка их к соответствующим обработчикам
  router.get('/user', userController.getUser);
  router.post('/user', userController.createUser);
  
  module.exports = router;
  
  // Пример использования маршрутов в app.js:
  const express = require('express');
  const app = express();
  const userRoutes = require('./routes/userRoutes');
  
  // Подключение маршрутов
  app.use('/api', userRoutes);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  // Итог:
  // Перенос обработчиков запросов в каталог controllers помогает структурировать код,
  // делая его более управляемым и читаемым. Это особенно полезно в больших приложениях,
  // где обработчики запросов могут содержать много логики.
  