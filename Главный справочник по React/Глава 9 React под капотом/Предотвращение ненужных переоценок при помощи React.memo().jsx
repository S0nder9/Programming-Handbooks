// Глава 9: React под капотом

// React.memo() - это функция высшего порядка, которая помогает предотвратить ненужные повторные рендеры функциональных компонентов.
// Она мемоизирует результат рендера и повторно использует его, если пропсы не изменились.

// Зачем используется React.memo()?
// В React каждый раз, когда обновляется состояние или пропсы компонента, он повторно рендерится. 
// Однако в некоторых случаях это может привести к ненужным рендерам, что негативно сказывается на производительности.
// React.memo() помогает избежать этого, используя предыдущее состояние компонента, если его пропсы не изменились.

// Как использовать React.memo()?
// Чтобы использовать React.memo(), просто оберните свой функциональный компонент этой функцией при его экспорте или определении.

// Несколько примеров

import React, { useState } from 'react';

// Создаем простой функциональный компонент
const MyComponent = React.memo(({ name }) => {
  console.log('Рендеринг MyComponent');
  return <div>Привет, {name}!</div>;
});

// Основной компонент приложения
const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Мир');

  const increment = () => {
    setCount(count + 1);
  };

  const changeName = () => {
    setName(name === 'Мир' ? 'React' : 'Мир');
  };

  return (
    <div>
      <button onClick={increment}>Увеличить счетчик</button>
      <button onClick={changeName}>Изменить имя</button>
      <p>Счетчик: {count}</p>
      <MyComponent name={name} />
    </div>
  );
};

// Итог
// React.memo() помогает предотвратить ненужные рендеры, улучшая производительность приложения.
// Использование React.memo() особенно полезно для функциональных компонентов, которые зависят от неизменных пропсов.

export default App;
