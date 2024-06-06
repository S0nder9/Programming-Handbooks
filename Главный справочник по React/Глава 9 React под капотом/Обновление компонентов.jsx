// Глава 9: React под капотом

// Как работает Обновление компонентов
// Обновление компонентов в React происходит, когда изменяются состояние (state) или свойства (props) компонента.
// React автоматически сравнивает новое состояние или свойства с предыдущими и решает, нужно ли перерисовать компонент.

// Когда обновляется состояние или свойства, React вызывает процесс, называемый рендерингом.
// В процессе рендеринга создается виртуальное представление пользовательского интерфейса (Virtual DOM).
// React сравнивает новый Virtual DOM с предыдущим, находит различия и применяет необходимые изменения к реальному DOM (это называется reconciliation).

// Обновление компонентов, когда изменяется состояние
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};

// В этом примере компонент Counter обновляется каждый раз, когда вызывается setCount.
// React вызывает рендеринг компонента, чтобы отобразить новое значение счетчика.

// Обновление компонентов, когда изменяются свойства
const DisplayCount = ({ count }) => {
  return <p>Счетчик: {count}</p>;
};

const CounterWithProps = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <DisplayCount count={count} />
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};

// В этом примере DisplayCount является дочерним компонентом CounterWithProps.
// Каждый раз, когда обновляется состояние count в CounterWithProps, свойства count в DisplayCount также обновляются, что вызывает его повторный рендеринг.

// Как React определяет, нужно ли обновлять компонент
// React использует метод shouldComponentUpdate() в классовых компонентах или React.memo в функциональных компонентах для оптимизации рендеринга.
// По умолчанию, все компоненты рендерятся повторно при изменении состояния или свойств.
// Метод shouldComponentUpdate позволяет контролировать этот процесс, возвращая true или false.

import React, { memo } from 'react';

// Пример использования React.memo для оптимизации
const OptimizedDisplayCount = memo(({ count }) => {
  return <p>Счетчик: {count}</p>;
});

const CounterWithOptimizedProps = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <OptimizedDisplayCount count={count} />
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};

// В этом примере OptimizedDisplayCount обернут в React.memo, что предотвращает его повторный рендеринг, если свойства count не изменились.

// Итог
// Обновление компонентов в React происходит при изменении состояния или свойств.
// React оптимизирует этот процесс, сравнивая новый и предыдущий Virtual DOM и обновляя только те части реального DOM, которые изменились.
// Использование методов оптимизации, таких как shouldComponentUpdate и React.memo, позволяет улучшить производительность приложения.

export { Counter, CounterWithProps, CounterWithOptimizedProps };
