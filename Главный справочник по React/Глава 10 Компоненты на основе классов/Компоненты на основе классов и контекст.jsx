// Глава 10: Компоненты на основе классов

// Компоненты на основе классов и контекст
// В React компоненты можно создавать как на основе классов, так и на основе функций.
// Компоненты на основе классов позволяют использовать методы жизненного цикла и предоставляют возможность работы с состоянием (state) и свойствами (props).

// Контекст в React используется для передачи данных через дерево компонентов без необходимости явно передавать props на каждом уровне.
// Это особенно полезно для глобальных данных, таких как текущий пользователь, тема или язык.

// Как создается, где используется
// Компонент на основе класса создается путем расширения (extends) класса React.Component и обязательного определения метода render, который возвращает JSX.

// Контекст создается с помощью React.createContext и включает в себя два компонента: Provider и Consumer.
// Provider используется для предоставления значения контекста, а Consumer - для его потребления в компонентах.

// Актуально ли
// Несмотря на то, что функциональные компоненты и хуки сейчас более популярны, компоненты на основе классов и контекст все еще актуальны и часто используются в существующих кодовых базах и крупных приложениях.

// Примеры

import React, { Component, createContext } from 'react';

// Создаем контекст
const MyContext = createContext();

// Компонент на основе класса, использующий контекст
class MyContextProvider extends Component {
  state = {
    data: 'initialValue'
  };

  setData = (newData) => {
    this.setState({ data: newData });
  };

  render() {
    return (
      <MyContext.Provider value={{ data: this.state.data, setData: this.setData }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class ChildComponent extends Component {
  static contextType = MyContext;

  handleChange = () => {
    this.context.setData('newValue');
  };

  render() {
    return (
      <div>
        <p>Значение из контекста: {this.context.data}</p>
        <button onClick={this.handleChange}>Изменить значение</button>
      </div>
    );
  }
}

// Использование кастомного компонента Context Provider в компоненте на основе класса
class App extends Component {
  render() {
    return (
      <MyContextProvider>
        <ChildComponent />
      </MyContextProvider>
    );
  }
}

// Итог
// Компоненты на основе классов и контекст предоставляют мощные инструменты для построения сложных React приложений.
// Классовые компоненты позволяют использовать методы жизненного цикла и управлять состоянием, а контекст упрощает передачу глобальных данных через дерево компонентов.

export default App;
