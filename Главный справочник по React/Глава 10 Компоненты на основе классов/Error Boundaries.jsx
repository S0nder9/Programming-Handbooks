// Глава 10: Компоненты на основе классов

// Error Boundaries в React используются для обработки ошибок, которые могут возникнуть в процессе рендеринга компонентов или выполнения их методов жизненного цикла.
// Позволяют изолировать ошибки, предотвращая их распространение по всему приложению, и предоставляют способ отображения запасного интерфейса в случае сбоя.

// Как работают Error Boundaries:
// Компонент Error Boundary определяется как компонент, который реализует методы componentDidCatch и render.
// Когда дочерний компонент внутри Error Boundary бросает исключение во время рендеринга, Error Boundary перехватывает это исключение и вызывает метод componentDidCatch.
// Затем Error Boundary может отобразить запасной UI вместо обычного содержимого компонента, который вызвал ошибку.

// Где используется:
// Error Boundaries могут использоваться в любом месте вашего приложения, где вы хотите обрабатывать потенциальные ошибки.
// Это особенно полезно в крупных приложениях, где ошибка в одном компоненте может привести к сбою всего приложения.

// Пример использования Error Boundaries:
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // Можно отправить отчет об ошибке на сервер
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Отображаем запасной UI в случае ошибки
      return <h1>Что-то пошло не так.</h1>;
    }
    return this.props.children;
  }
}

// Пример использования Error Boundary в компоненте
class MyComponent extends Component {
  render() {
    // Если что-то идет не так в этом компоненте, ErrorBoundary перехватит ошибку
    return (
      <ErrorBoundary>
        <div>
          {/* Этот компонент может бросить исключение */}
          {this.props.children}
        </div>
      </ErrorBoundary>
    );
  }
}

// Итог:
// Error Boundaries являются мощным инструментом для обработки ошибок в React-приложениях.
// Используйте их, чтобы изолировать ошибки и обеспечить более стабильный пользовательский опыт.
