// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

// Кастомный компонент Context Provider
// Кастомный компонент Context Provider используется для создания собственного контекста в React приложении и предоставления его значения дочерним компонентам.

// Как создается, где используется
// Кастомный компонент Context Provider создается путем использования createContext и создания компонента, который оборачивает дочерние компоненты и предоставляет им значение контекста.
// Он используется в тех случаях, когда требуется передать данные через дерево компонентов без явной передачи через props.

// Актуально ли
// Использование кастомных компонентов Context Provider остается актуальным и удобным способом передачи данных в React-приложениях.

// Несколько примеров
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const MyContext = createContext();

// Кастомный компонент Context Provider
const MyContextProvider = ({ children }) => {
  const [data, setData] = useState('initialValue');

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

// Компонент, использующий контекст
const ChildComponent = () => {
  const { data, setData } = useContext(MyContext);

  const handleChange = () => {
    setData('newValue');
  };

  return (
    <div>
      <p>Значение из контекста: {data}</p>
      <button onClick={handleChange}>Изменить значение</button>
    </div>
  );
};

// Использование кастомного компонента Context Provider
const App = () => {
  return (
    <MyContextProvider>
      <ChildComponent />
    </MyContextProvider>
  );
};

// Итог
// Кастомный компонент Context Provider предоставляет удобный способ передачи данных через дерево компонентов в React.
// Он актуален и широко используется для организации передачи глобальных данных в приложении.

export default App;
