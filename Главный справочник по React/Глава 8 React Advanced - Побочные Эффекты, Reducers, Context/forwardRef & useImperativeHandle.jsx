// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

// forwardRef & useImperativeHandle
// forwardRef и useImperativeHandle - это инструменты React, используемые для управления рефами (ссылками) на дочерние компоненты. 
// Эти функции позволяют родительским компонентам взаимодействовать с DOM элементами или дочерними компонентами.

// Что такое forwardRef и useImperativeHandle?
// forwardRef - это функция, которая позволяет передавать рефы через компоненты к дочерним элементам. 
// Она полезна, когда вам нужно передать реф к DOM-элементу или другому компоненту, оборачивая промежуточные компоненты.
// useImperativeHandle - это хук, который позволяет настраивать и управлять тем, что возвращает реф. 
// Он позволяет определять, какие свойства и методы будут доступны для родительского компонента через реф.

// Как создается, где используется
// forwardRef создается с помощью оборачивания компонента и передачи рефа внутрь. Используется, когда нужно передавать рефы через несколько уровней компонентов.
// useImperativeHandle создается внутри компонента с помощью хуков и применяется для управления рефами и предоставления контролируемого интерфейса для родительских компонентов.

// Актуально ли
// Использование forwardRef и useImperativeHandle актуально, когда требуется глубокий контроль над рефами и управление ими в сложных компонентах или библиотеках компонентов.


// useImperativeHandle принимает два аргумента:

  // Первый аргумент - это ref, переданный компоненту.
  // Второй аргумент - это функция, которая возвращает объект с методами или свойствами, доступными для родительского компонента.
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));



// Несколько примеров

import React, { useRef, forwardRef, useImperativeHandle } from 'react';

// Пример использования forwardRef
const MyInput = forwardRef((props, ref) => (
  <input ref={ref} type="text" {...props} />
));

const ParentComponent = () => {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={focusInput}>Фокус на поле ввода</button>
    </div>
  );
};

// Пример использования useImperativeHandle
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} type="text" {...props} />;
});

const ParentComponentWithImperativeHandle = () => {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  const clearInput = () => {
    inputRef.current.clear();
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={focusInput}>Фокус на поле ввода</button>
      <button onClick={clearInput}>Очистить поле ввода</button>
    </div>
  );
};

// Итог
// forwardRef и useImperativeHandle предоставляют мощные возможности для управления рефами и создания контролируемых интерфейсов в React.
// Они полезны в ситуациях, когда необходимо передавать рефы через несколько компонентов или предоставлять расширенный контроль над дочерними компонентами.

export { ParentComponent, ParentComponentWithImperativeHandle };
