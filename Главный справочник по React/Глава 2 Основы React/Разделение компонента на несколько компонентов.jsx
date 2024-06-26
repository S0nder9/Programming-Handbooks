// Глава 2: Основы React

// Композиция с использованием props.children и props.className
// В React композиция позволяет вам создавать компоненты, которые принимают внутреннее содержимое между своими открывающим и закрывающим тегами. 
// Это особенно удобно для создания общих компонентов, которые могут быть использованы для различных целей.
// Компонент, использующий композицию для вставки содержимого
// внутрь своей разметки с помощью props.children

// Кроме props.children, компоненты также могут принимать другие свойства, которые могут быть использованы для дополнительной настройки или стилизации. 
// В предыдущем примере мы использовали props.className для добавления дополнительного класса к основному классу card.

// В этом примере мы создаем компонент Card, который представляет собой карточку с контентом.
// Мы также используем свойство className для добавления дополнительных классов к карточке.

// Card.jsx
import React from 'react';

const Card = (props) => {
  // Создаем строку классов с помощью класса "card" и переданного через props.className класса
  const classes = "card " + props.className;

  // Возвращаем div с классом, содержащимся в переменной classes,
  // и выводим в нем содержимое, переданное через props.children
  return <div className={classes}>{props.children}</div>;
};

// export default Card;

// В другом файле, например, App.jsx, вы можете использовать этот компонент следующим образом:

import React from 'react';
import Card from './Card';

const App = () => {
  return (
    <div>
      {/* Используем компонент Card и передаем ему дочерние элементы */}
      <Card className="custom-card">
        <h2>Заголовок карточки</h2>
        <p>Содержимое карточки</p>
      </Card>
    </div>
  );
};

// export default App;
