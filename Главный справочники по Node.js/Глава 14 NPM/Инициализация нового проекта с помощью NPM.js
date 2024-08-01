// Глава 14: NPM - Инициализация нового проекта с помощью NPM в Node.js

// NPM (Node Package Manager) - это менеджер пакетов для JavaScript, который используется для управления зависимостями в проектах Node.js.
// Он позволяет устанавливать, обновлять и удалять пакеты, а также управлять версиями и зависимостями ваших проектов.

// Как инициализировать новый проект с помощью NPM:
// 1. Создайте новую директорию для вашего проекта и перейдите в нее:
//    mkdir my-new-project
//    cd my-new-project

// 2. Инициализируйте новый проект с помощью команды npm init:
//    Эта команда создаст файл package.json, который будет содержать метаинформацию о вашем проекте и его зависимостях.
//    npm init

// В процессе инициализации вам будут заданы вопросы о вашем проекте, такие как его имя, версия, описание, точка входа, тестовая команда, репозиторий Git, ключевые слова и автор. 
// Вы можете принять значения по умолчанию, нажав Enter, или ввести свои собственные значения.

// Пример инициализации нового проекта:
// Запустите команду npm init и ответьте на вопросы:
//    $ npm init
//    This utility will walk you through creating a package.json file.
//    It only covers the most common items, and tries to guess sensible defaults.

//    See `npm help json` for definitive documentation on these fields
//    and exactly what they do.

//    Use `npm install <pkg>` afterwards to install a package and
//    save it as a dependency in the package.json file.

//    Press ^C at any time to quit.
//    package name: (my-new-project) 
//    version: (1.0.0) 
//    description: A new Node.js project
//    entry point: (index.js) 
//    test command: 
//    git repository: 
//    keywords: 
//    author: 
//    license: (ISC) 

//    About to write to /path/to/my-new-project/package.json:

//    {
//      "name": "my-new-project",
//      "version": "1.0.0",
//      "description": "A new Node.js project",
//      "main": "index.js",
//      "scripts": {
//        "test": "echo \"Error: no test specified\" && exit 1"
//      },
//      "author": "",
//      "license": "ISC"
//    }

//    Is this OK? (yes) 

// 3. После завершения процесса инициализации у вас будет файл package.json в директории вашего проекта.
//    Этот файл содержит информацию о вашем проекте и будет использоваться NPM для управления зависимостями и другими настройками.

// Пример package.json:
{
    "name": "my-new-project",
    "version": "1.0.0",
    "description": "A new Node.js project",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }
  
  // Итог:
  // Инициализация нового проекта с помощью NPM - это простой процесс, который позволяет создать файл package.json с метаинформацией о вашем проекте.
  // Этот файл служит основой для управления зависимостями и конфигурацией проекта с помощью NPM.
  