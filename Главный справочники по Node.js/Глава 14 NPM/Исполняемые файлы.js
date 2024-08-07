// Глава 14: NPM - Исполняемые файлы в Node.js

// NPM (Node Package Manager) позволяет управлять зависимостями и скриптами в проектах Node.js.
// Исполняемые файлы (или CLI-утилиты) - это файлы, которые можно запускать из командной строки.
// Они могут использоваться для выполнения различных задач, таких как автоматизация, тестирование и сборка проектов.

// Как создать исполняемый файл в Node.js:
// 1. Создайте файл с необходимым кодом, который вы хотите выполнить.
// 2. Включите в файл шебанг (shebang) в первой строке для указания интерпретатора.
// 3. Определите исполняемый файл в package.json.

// Пример создания простого исполняемого файла:

// Создайте файл `cli.js`:

#!/usr/bin/env node

console.log('Hello from my CLI tool!');

// Сохраните файл и сделайте его исполняемым (только в UNIX-подобных системах):
// $ chmod +x cli.js

// Обновите файл `package.json`, чтобы указать на ваш исполняемый файл:
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "bin": {
    "mycli": "./cli.js"
  },
  "scripts": {
    "start": "node cli.js"
  }
}

// После этого вы можете установить ваш пакет глобально с помощью NPM:
// $ npm install -g .

// Теперь вы можете запустить ваш CLI-утилиту из командной строки:
$ mycli
// Выведет: Hello from my CLI tool!

// Итог:
// Создание исполняемых файлов в Node.js позволяет создавать удобные инструменты командной строки.
// Убедитесь, что ваш файл начинается с шебанга и зарегистрируйте его в `package.json`, чтобы обеспечить простую установку и использование.
