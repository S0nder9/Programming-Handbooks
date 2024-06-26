// Глава 10: Компоненты на основе классов

// Что такое компоненты на основе классов
// В React компоненты могут быть созданы как функции или как классы. Компоненты на основе классов были основным способом создания компонентов до введения хуков в React 16.8.
// Компоненты на основе классов наследуются от React.Component и должны содержать метод render, который возвращает JSX-разметку.

// Как создается, где используется
// Компоненты на основе классов создаются путем объявления класса, который наследует React.Component, и определения метода render, который возвращает JSX.
// Они используются для создания более сложных компонентов, которые могут иметь состояние и методы жизненного цикла.

// Актуально ли
// С введением хуков в React 16.8, компоненты на основе классов постепенно заменяются функциональными компонентами с хуками.
// Тем не менее, компоненты на основе классов все еще используются и актуальны, особенно в существующих кодовых базах.

// Несколько примеров

import React, { Component } from 'react';

// Пример компонента на основе класса
class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния
    this.state = {
      count: 0
    };
  }

  // Метод для увеличения счетчика
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  // Метод render для отображения JSX
  render() {
    return (
      <div>
        <p>Счетчик: {this.state.count}</p>
        <button onClick={this.increment}>Увеличить</button>
      </div>
    );
  }
}

// Пример компонента на основе класса с методами жизненного цикла
class LifecycleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  // Метод, вызываемый перед монтированием компонента
  componentDidMount() {
    // Имитация запроса к API
    setTimeout(() => {
      this.setState({ data: 'Полученные данные' });
    }, 2000);
  }

  // Метод render для отображения JSX
  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Методы жизненного цикла</h1>
        {data ? <p>{data}</p> : <p>Загрузка...</p>}
      </div>
    );
  }
}

// Итог
// Компоненты на основе классов предоставляют мощные возможности для управления состоянием и методами жизненного цикла в React.
// Хотя функциональные компоненты с хуками стали более популярными, компоненты на основе классов остаются важной частью React и часто встречаются в существующих проектах.

export { MyClassComponent, LifecycleComponent };
