// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

// Ограничения Context
// Хотя Context API предоставляет мощный способ управления состоянием и передачи данных через дерево компонентов,
// у него есть свои ограничения и подводные камни, которые следует учитывать при его использовании.

// Ограничения Context:
// 1. Производительность: Каждый раз, когда значение контекста изменяется, все компоненты, использующие этот контекст, рендерятся заново.
//    Это может привести к проблемам с производительностью, особенно в больших приложениях с глубокими деревьями компонентов.

// 2. Лишние рендеры: Контекст может вызвать лишние рендеры компонентов, которые не должны обновляться при изменении контекста.
//    Это происходит, потому что каждый компонент, использующий контекст, подписывается на его изменения.

// 3. Трудности с отладкой: Контекст может усложнить отладку приложения, так как изменения состояния могут происходить в любом месте дерева компонентов,
//    что затрудняет отслеживание источника этих изменений.

// 4. Отсутствие оптимизации: В отличие от использования Redux или других сторонних библиотек для управления состоянием,
//    Context API не предоставляет встроенных инструментов для оптимизации производительности или удобного управления состоянием.

// Как смягчить ограничения:
// 1. Использование мемоизации: Используйте React.memo и useMemo для оптимизации производительности компонентов, которые используют контекст.
// 2. Разделение контекста: Разделите контекст на несколько более мелких контекстов, чтобы уменьшить количество компонентов, которые рендерятся заново при изменении контекста.
// 3. Инструменты для отладки: Используйте расширения для отладки, такие как React DevTools, чтобы легче отслеживать изменения состояния и контекста.

// Примеры смягчения ограничений:
import React, { createContext, useContext, useState, memo, useMemo } from 'react';

// Создание нескольких контекстов для разделения состояния
const UserContext = createContext();
const ThemeContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John Doe' });
  
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Компонент, использующий контексты
const UserProfile = memo(() => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Имя пользователя: {user.name}</p>
    </div>
  );
});

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <UserProfile />
      </ThemeProvider>
    </UserProvider>
  );
};

// Итог
// Контекст API предоставляет мощные возможности для управления состоянием и передачи данных в React-приложениях,
// однако следует учитывать его ограничения и применять соответствующие стратегии для их смягчения.

export default App;
