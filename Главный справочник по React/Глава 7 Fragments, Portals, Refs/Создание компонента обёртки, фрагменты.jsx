// Раздел 7: Fragments

// Что такое фрагменты?
// В React, фрагменты позволяют группировать список дочерних элементов без добавления дополнительных узлов в DOM. 
// Это полезно, когда вам нужно вернуть несколько элементов из компонента без создания дополнительного элемента-контейнера.

import React from 'react';

// Шаг 1: Создание компонента обёртки
// Компонент обёртки - это компонент, который используется для обёртывания других компонентов или элементов. 
// Он может быть полезен для добавления общей логики, стилей или структурирования компонентов.

const Wrapper = (props) => {
  return <div className="wrapper">{props.children}</div>;
};

// Шаг 2: Использование компонента обёртки
// Вы можете использовать компонент обёртки в своих компонентах, чтобы обернуть другие элементы или компоненты.
const WrappedComponent = () => {
  return (
    <Wrapper>
      <h1>Заголовок</h1>
      <p>Некоторый текст.</p>
    </Wrapper>
  );
};

// Шаг 3: Использование фрагментов
// Вместо использования дополнительного элемента-контейнера, вы можете использовать React.Fragment или его сокращённый синтаксис <> </>.

const FragmentExample = () => {
  return (
    <>
      <h1>Заголовок</h1>
      <p>Некоторый текст.</p>
    </>
  );
};

// Шаг 4: Создание компонента, использующего фрагменты
// Создадим компонент, который возвращает несколько элементов без обёртки в дополнительный контейнер.

const ListItems = () => {
  return (
    <React.Fragment>
      <li>Элемент списка 1</li>
      <li>Элемент списка 2</li>
      <li>Элемент списка 3</li>
    </React.Fragment>
  );
};

// Шаг 5: Использование компонента с фрагментами в другом компоненте
// Теперь мы можем использовать компонент ListItems внутри другого компонента.

const FragmentContainer = () => {
  return (
    <ul>
      <ListItems />
    </ul>
  );
};

// Экспортируем все компоненты для использования в приложении
export { WrappedComponent, FragmentExample, FragmentContainer };

// Альтернатирная запись: 

import {Fragment} from "react";

return 

<Fragment>

</Fragment>