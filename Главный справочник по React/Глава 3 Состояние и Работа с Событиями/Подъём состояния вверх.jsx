// Глава 3: Состояние и Работа с Событиями

// Подъём состояния вверх

// Подъём состояния вверх - это паттерн в React, который позволяет управлять состоянием нескольких компонентов из одного родительского компонента.

// Пример:

// Родительский компонент
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0 // начальное состояние
    };
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    // обработчик для увеличения счетчика
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <div>
        <h1>Счетчик: {this.state.count}</h1>
        <ChildComponent onIncrement={this.handleIncrement} />
      </div>
    );
  }
}

// Дочерний компонент
class ChildComponent extends React.Component {
  render() {
    return (
      <button onClick={this.props.onIncrement}>
        Увеличить счетчик
      </button>
    );
  }
}

// Примечание: здесь используется классовый синтаксис React. Также можно использовать функциональные компоненты и хуки.

// В этом примере родительский компонент ParentComponent содержит состояние count и метод handleIncrement для его обновления. 
// Дочерний компонент ChildComponent принимает обработчик onIncrement в качестве свойства и вызывает его при клике на кнопку.
// Таким образом, при нажатии кнопки в дочернем компоненте происходит увеличение счетчика в родительском компоненте.

ReactDOM.render(
  <ParentComponent />,
  document.getElementById('root')
);
