// Глава 5: Стилизация компонентов

// Styled Components и Media Queries

// Что такое Styled Components:
// Styled Components - это библиотека для стилизации компонентов в React. Она позволяет писать CSS внутри JavaScript, что делает код более модульным, читаемым и переиспользуемым.

// Шаг 1: Установка и импорт Styled Components
// Установка Styled Components:
// npm install styled-components
// Импорт в файле компонента:
import styled from 'styled-components';

// Шаг 2: Создание стилизованного компонента
// Создадим пример компонента Button:
const Button1 = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

// Шаг 3: Использование стилизованного компонента
// В рендере компонента используем созданный Button:
function App() {
    return (
        <div>
            <Button1>Нажми меня</Button1>
        </div>
    );
}

// Что такое Media Queries:
// Media Queries - это способ добавления условных стилей, которые зависят от различных характеристик устройства, таких как ширина экрана, ориентация устройства и т.д. В React с Styled Components мы можем легко добавить Media Queries для создания отзывчивого дизайна.

// Шаг 4: Добавление Media Queries
// Пример использования Media Queries для адаптивного дизайна:
const Button2 = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
    }
`;

// В этом примере мы устанавливаем другие значения для отступов кнопки при ширине экрана меньше 768 пикселей.

// После завершения этих шагов, ваш компонент Button будет стилизован с использованием Styled Components, а также будет иметь адаптивный дизайн благодаря Media Queries.
