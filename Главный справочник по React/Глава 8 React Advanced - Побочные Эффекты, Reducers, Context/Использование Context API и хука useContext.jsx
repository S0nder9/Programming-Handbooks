// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

// Использование хука useContext и Использование Context API
// useContext - это хук, который позволяет компонентам получать доступ к значению контекста, созданного с помощью Context API.
// Context API - это механизм React, который позволяет передавать данные через дерево компонентов без явной передачи props.

// Как создается, где используется
// Контекст создается с помощью функции createContext, которая создает объект контекста.
// Он используется там, где требуется передача данных между компонентами без явной передачи props.
// useContext используется внутри функциональных компонентов для получения значения контекста.

// Актуально ли
// Использование useContext и Context API актуально для передачи данных между компонентами в React-приложениях.

// Несколько примеров
import React, { createContext, useContext } from 'react';

// Пример использования Context API
// Создание контекста
const ThemeContext = createContext('light');

// Компонент-потребитель контекста
const ThemedComponent = () => {
  // Получение значения контекста с помощью useContext
  const theme = useContext(ThemeContext);

  return <div>Текущая тема: {theme}</div>;
};

// Пример использования useContext
// Компонент-поставщик контекста
const ThemeProvider = ({ children }) => {
  return (
    // Предоставление значения контекста через провайдер
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
};

// Итог
// Использование useContext и Context API позволяет передавать данные между компонентами без явной передачи props,
// что делает код более чистым и удобным для работы с состоянием приложения.

export { ThemedComponent, ThemeProvider };
