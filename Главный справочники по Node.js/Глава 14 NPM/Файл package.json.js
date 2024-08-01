// Глава 14: NPM - Файл package.json в Node.js

// Введение в package.json:
// Файл package.json является важным компонентом любого проекта на Node.js.
// Он содержит метаданные о проекте и управляет зависимостями, скриптами и конфигурацией.
// package.json позволяет легко делиться проектами и устанавливать зависимости.

// Основные поля файла package.json:
// 1. name - имя проекта. Оно должно быть уникальным и соответствовать npm правилам именования.
{
    "name": "my-awesome-project",
    // ...
  }
  
  // 2. version - версия проекта в формате Semantic Versioning (semver).
  {
    "version": "1.0.0",
    // ...
  }
  
  // 3. description - краткое описание проекта.
  {
    "description": "This is an awesome project",
    // ...
  }
  
  // 4. main - точка входа проекта, обычно это файл, который будет исполняться при запуске.
  {
    "main": "index.js",
    // ...
  }
  
  // 5. scripts - скрипты для автоматизации задач. Скрипты могут быть запущены с помощью команды `npm run`.
  {
    "scripts": {
      "start": "node index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    // ...
  }
  
  // 6. dependencies - список зависимостей проекта и их версии. Эти пакеты будут установлены при выполнении `npm install`.
  {
    "dependencies": {
      "express": "^4.17.1",
      "lodash": "^4.17.21"
    },
    // ...
  }
  
  // 7. devDependencies - список зависимостей, необходимых только для разработки. Они также устанавливаются командой `npm install`.
  {
    "devDependencies": {
      "jest": "^27.0.6",
      "eslint": "^7.32.0"
    },
    // ...
  }
  
  // 8. author - информация об авторе проекта.
  {
    "author": "Nikita Patrushev",
    // ...
  }
  
  // 9. license - лицензия проекта.
  {
    "license": "MIT",
    // ...
  }
  
  // Пример полного файла package.json:
  {
    "name": "my-awesome-project",
    "version": "1.0.0",
    "description": "This is an awesome project",
    "main": "index.js",
    "scripts": {
      "start": "node index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "dependencies": {
      "express": "^4.17.1",
      "lodash": "^4.17.21"
    },
    "devDependencies": {
      "jest": "^27.0.6",
      "eslint": "^7.32.0"
    },
    "author": "Nikita Patrushev",
    "license": "MIT"
  }
  
  // Итог:
  // Файл package.json является важным элементом для управления проектом на Node.js.
  // Он позволяет определить метаданные проекта, управлять зависимостями, создавать скрипты для автоматизации задач и многое другое.
  // Понимание структуры и содержания package.json помогает эффективнее управлять проектами и их зависимостями.
  