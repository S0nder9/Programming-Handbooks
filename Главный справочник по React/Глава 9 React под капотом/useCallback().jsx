// Глава 9: React под капотом

// Предотвращение пересоздания функций при помощи useCallback

// В React, пересоздание функций при каждом рендере может привести к ненужным затратам ресурсов и ухудшению производительности.
// Хук useCallback() позволяет предотвратить это, мемоизируя функции и гарантируя, что одна и та же функция не будет пересоздаваться при каждом рендере, если её зависимости не изменились.

// Как создается, где используется
// useCallback() создается путем вызова функции useCallback и передачи в неё функции, которую необходимо мемоизировать, и массива зависимостей.
// Он используется в компонентах, где часто происходит повторный рендеринг, особенно при передаче функций в дочерние компоненты или обработчики событий.

// Актуально ли
// Использование useCallback актуально для оптимизации производительности React-приложений, особенно в случае сложных компонентов и больших приложений.

// Пример использования useCallback

import React, { useState, useCallback } from 'react';

// Компонент с использованием useCallback для предотвращения пересоздания функции
const Counter = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Функция увеличения счетчика мемоизируется с помощью useCallback
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
      <button onClick={() => setOtherState(!otherState)}>Переключить состояние</button>
    </div>
  );
};

// Пример использования useCallback для передачи функции в дочерний компонент

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Функция увеличения счетчика мемоизируется с помощью useCallback
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Счетчик: {count}</p>
      <ChildComponent increment={increment} />
    </div>
  );
};

const ChildComponent = React.memo(({ increment }) => {
  console.log('ChildComponent рендерится');
  return (
    <button onClick={increment}>Увеличить в дочернем компоненте</button>
  );
});

// Итог
// Хук useCallback позволяет предотвратить пересоздание функций при каждом рендере, что может значительно улучшить производительность вашего приложения.
// Использование useCallback особенно полезно в случае, когда функции передаются в дочерние компоненты или используются в обработчиках событий.

export { Counter, ParentComponent };
