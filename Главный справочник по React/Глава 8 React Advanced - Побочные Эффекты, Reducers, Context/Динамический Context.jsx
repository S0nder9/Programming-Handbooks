// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

// Динамический Context
// Динамический контекст в React позволяет передавать данные через дерево компонентов без явной передачи пропсов от родительских к дочерним компонентам.
// Это особенно полезно, когда необходимо предоставить доступ к данным нескольким компонентам в разных уровнях иерархии.

// Как создается, где используется
// Контекст создается с помощью функции createContext из библиотеки React.
// Он используется, когда необходимо предоставить доступ к данным компонентам в разных частях приложения без явной передачи через пропсы.

// Актуально ли
// Использование динамического контекста актуально и рекомендуется в случаях, когда данные должны быть доступны множеству компонентов в разных частях приложения.

// Несколько примеров
import React, { createContext, useContext, useState } from 'react';

// Создание контекста
const ThemeContext = createContext();

// Компонент-поставщик контекста
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Компонент, использующий контекст
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
    </button>
  );
};

// Использование компонентов
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Dynamic Context Example</h1>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
};

// Итог
// Динамический контекст в React - мощный инструмент для передачи данных через дерево компонентов.
// Он позволяет управлять состоянием приложения и предоставлять доступ к данным компонентам в разных уровнях иерархии, без явной передачи пропсов.

export default App;
