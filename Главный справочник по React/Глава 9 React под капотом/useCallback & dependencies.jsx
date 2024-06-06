// Глава 9: React под капотом

// useCallback и зависимости
// useCallback - это хук, который возвращает мемоизированный коллбэк.
// Он полезен для оптимизации производительности компонентов, предотвращая создание новых функций при каждом рендере, если зависимости не изменились.

import React, { useState, useCallback } from 'react';

// Пример использования useCallback
const Counter = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useCallback мемоизирует функцию инкремента
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={increment}>Увеличить</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
      />
    </div>
  );
};

export default Counter;

// Замыкания
// Замыкания - это функция, которая запоминает свою внешнюю область видимости и имеет доступ к переменным этой области даже после завершения выполнения внешней функции.

const createCounter = () => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
};

// Пример использования замыкания
const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = createCounter();
console.log(counter2()); // 1
console.log(counter2()); // 2

// Итог
// useCallback используется для оптимизации производительности в React-приложениях, предотвращая ненужные перерендеры.
// Замыкания в JavaScript позволяют функциям запоминать и получать доступ к переменным из внешнего контекста, даже после завершения их выполнения.
// Понимание этих концепций помогает писать более эффективный и оптимизированный код.

export { Counter, createCounter };
