// Глава 7: Portals в React

// Введение
// Portals в React позволяют рендерить дочерние элементы в DOM-узел, который существует вне DOM-иерархии родительского компонента.
// Это особенно полезно для рендеринга модальных окон, всплывающих подсказок и других элементов, которые должны появляться
// поверх других элементов.

// ReactDom.createPortal(JSX-элемент, ссылка на объект в HTML-документе);

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Подглава 7.1: Создание и использование порталов

// 1. Создание целевого DOM-узла
// Добавьте целевой DOM-узел в HTML-документ, куда будут рендериться дочерние элементы через портал.
// В вашем HTML файле добавьте:
// <div id="portal-root"></div>
const portalRoot = document.getElementById('portal-root');

// 2. Использование ReactDOM.createPortal
// Внутри функционального компонента используйте ReactDOM.createPortal для рендеринга элементов в целевой DOM-узел.
function Modal({ onClose }) {
  return ReactDOM.createPortal(
    <div className="modal">
      <h2>Это модальное окно</h2>
      <p>Контент модального окна</p>
      <button onClick={onClose}>Закрыть</button>
    </div>,

    portalRoot
  );
}

// 3. Создание компонента с модальным окном
// Создадим компонент, который будет отображать модальное окно при нажатии на кнопку.
function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div>
      <h1>Пример использования порталов</h1>
      <button onClick={toggleModal}>
        {showModal ? 'Скрыть модальное окно' : 'Показать модальное окно'}
      </button>
      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
}

export default App;

// Объяснение:
// 1. Мы создали целевой DOM-узел в HTML-документе с id "portal-root".
// 2. Мы используем ReactDOM.createPortal для рендеринга содержимого модального окна в этот целевой DOM-узел.
// 3. Компонент App управляет состоянием видимости модального окна с помощью useState.
// 4. При нажатии на кнопку переключается состояние showModal, что приводит к отображению или скрытию модального окна.


// Что такое работа с порталами?

// Работа с порталами в React позволяет рендерить компоненты вне их иерархии компонентов.

//  Это полезно для UI-элементов, которые должны появляться поверх других элементов, например, модальные окна или всплывающие подсказки. 
//  Это достигается с помощью функции ReactDOM.createPortal(), которая принимает два аргумента: дочерний элемент, который нужно отрендерить, 
//  и DOM-узел, в который этот элемент будет отрендерен.

// Пошаговое руководство по работе с порталами:

// Создание базового компонента: Определите компонент, который будет использовать портал.

// Создание целевого DOM-узла: В HTML-документе добавьте элемент, который будет целевым для портала.

// Использование ReactDOM.createPortal: В компоненте используйте ReactDOM.createPortal для рендеринга содержимого в целевой DOM-узел.

// Создание компонента с модальным окном: Создайте компонент, который будет показывать и скрывать модальное окно с использованием портала.