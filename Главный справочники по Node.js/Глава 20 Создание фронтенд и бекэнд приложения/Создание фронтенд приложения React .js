// Глава 20: Создание фронтенд и бекэнд приложения - Создание фронтенд приложения React в Node.js

// В этой главе мы рассмотрим, как создать фронтенд приложение с использованием React в среде Node.js.
// Мы также покажем, как настроить проект, установить необходимые зависимости и запустить приложение.

// Шаг 1: Инициализация проекта
// Сначала создайте новый проект с помощью create-react-app. Это инструмент для быстрого создания React приложений.
const execSync = require('child_process').execSync;

const createReactApp = () => {
  console.log('Создание нового проекта React...');
  execSync('npx create-react-app my-react-app', { stdio: 'inherit' });
};

// Запускаем создание проекта
createReactApp();

// Шаг 2: Установка зависимостей
// Перейдите в директорию созданного проекта и установите дополнительные зависимости, если это необходимо.
const installDependencies = () => {
  console.log('Установка зависимостей...');
  execSync('cd my-react-app && npm install axios react-router-dom', { stdio: 'inherit' });
};

// Запускаем установку зависимостей
installDependencies();

// Шаг 3: Создание базового компонента
// Откройте файл src/App.js и измените его, чтобы создать простой компонент React.
const fs = require('fs');
const path = require('path');

const createAppComponent = () => {
  const appFilePath = path.join('my-react-app', 'src', 'App.js');
  const appContent = `
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Добро пожаловать в React приложение!</h1>
      </header>
    </div>
  );
}

export default App;
  `;
  fs.writeFileSync(appFilePath, appContent);
};

// Создаем компонент
createAppComponent();

// Шаг 4: Запуск приложения
// Теперь можно запустить приложение и убедиться, что оно работает.
const startReactApp = () => {
  console.log('Запуск приложения...');
  execSync('cd my-react-app && npm start', { stdio: 'inherit' });
};

// Запускаем приложение
startReactApp();

// Итог:
// Мы создали фронтенд приложение на React, используя Node.js для автоматизации процесса создания и запуска.
// Сначала мы инициализировали проект, установили необходимые зависимости, создали базовый компонент и запустили приложение.
