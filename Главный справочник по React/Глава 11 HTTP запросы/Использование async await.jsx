// Глава 11: HTTP запросы

// Введение в использование async и await для выполнения HTTP-запросов в React
// Async и await предоставляют удобный синтаксический сахар для работы с промисами, 
// позволяя писать асинхронный код, который выглядит как синхронный.

// Что такое async и await:
// - async: ключевое слово, которое используется для объявления асинхронной функции. Асинхронные функции всегда возвращают промис.
// - await: ключевое слово, которое используется для ожидания выполнения промиса. Оно может использоваться только внутри асинхронных функций.

// Преимущества использования async и await:
// - Более читаемый и управляемый код по сравнению с цепочками промисов.
// - Легкость в обработке ошибок с использованием блоков try...catch.

// Пример использования async и await для выполнения HTTP-запроса:

import React, { Component } from 'react';

// Компонент, который делает HTTP-запрос для получения данных
class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  // Асинхронный метод для получения данных
  async fetchData() {
    try {
      // Выполняем HTTP-запрос с помощью fetch API
      const response = await fetch('https://api.example.com/data');
      // Проверяем, был ли запрос успешным
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Парсим JSON-ответ
      const data = await response.json();
      // Обновляем состояние компонента с полученными данными
      this.setState({ data, loading: false });
    } catch (error) {
      // Обрабатываем ошибки, если запрос не удался
      this.setState({ error: error.message, loading: false });
    }
  }

  // Вызываем fetchData, когда компонент монтируется
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data, loading, error } = this.state;
    
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Data fetched from server:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

// Итог:
// Использование async и await позволяет писать асинхронный код, который проще читать и поддерживать.
// Это особенно полезно в React-компонентах для выполнения HTTP-запросов и обработки их результатов.

export default DataFetcher;
