// Глава 14: NPM - Зависимости для процесса разработки (devDependencies) в Node.js

// Зависимости для процесса разработки (devDependencies) - это пакеты, которые необходимы только во время разработки вашего проекта.
// Они не требуются для работы приложения в продакшене, поэтому их можно отделить от обычных зависимостей (dependencies).

// Основные примеры devDependencies:
// - Инструменты для сборки и компиляции (например, Webpack, Babel).
// - Инструменты для тестирования (например, Jest, Mocha).
// - Линтеры и форматеры кода (например, ESLint, Prettier).

// Как установить devDependencies:
// Для установки пакета как зависимости для разработки используется флаг `--save-dev` или `-D`.

npm install webpack --save-dev
// или
npm install webpack -D

// Пример файла package.json с devDependencies:
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Пример проекта с devDependencies",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.17.1" // обычные зависимости
  },
  "devDependencies": {
    "webpack": "^5.38.1", // зависимости для разработки
    "babel-core": "^6.26.3",
    "eslint": "^7.27.0"
  },
  "license": "ISC"
}

// Пример использования devDependencies:
// Например, можно использовать Webpack для сборки вашего проекта.

const path = require('path');

module.exports = {
  entry: './src/index.js', // точка входа
  output: {
    filename: 'bundle.js', // выходной файл
    path: path.resolve(__dirname, 'dist') // выходная директория
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // использование Babel для транспиляции
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

// Итог:
// devDependencies позволяют управлять зависимостями, необходимыми только для разработки вашего проекта.
// Это помогает уменьшить размер финального приложения и отделить зависимости, которые не нужны в продакшене.
// Используйте флаг `--save-dev` или `-D` при установке пакетов, чтобы добавить их в devDependencies.
