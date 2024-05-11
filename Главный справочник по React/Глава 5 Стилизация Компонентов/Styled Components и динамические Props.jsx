// Глава 5: Стилизация компонентов

// Styled Components и динамические Props

// Что такое Styled Components:
// Styled Components - это библиотека для стилизации React-компонентов, которая позволяет писать CSS внутри JavaScript-файлов.
// Она позволяет создавать компоненты, которые автоматически применяют стили к элементам DOM, с которыми они ассоциированы.

// Динамические Props:
// В Styled Components можно использовать динамические props для динамической стилизации компонентов.
// Это позволяет компонентам менять свой внешний вид на основе данных, переданных им в качестве props.

// Шаг 1: Установка Styled Components
// Установите Styled Components с помощью npm или yarn:
// npm install styled-components
// Или
// yarn add styled-components

// Шаг 2: Импорт Styled Components
// Импортируйте библиотеку Styled Components в вашем файле JSX:
import styled from 'styled-components';

// Шаг 3: Создание стилизованных компонентов
// Определите стилизованные компоненты, используя функцию styled и передавая ей имя HTML-элемента.
// Например, создадим стилизованный компонент Button:
const Button = styled.button`
    background-color: ${props => props.primary ? 'blue' : 'white'};
    color: ${props => props.primary ? 'white' : 'blue'};
    font-size: 16px;
    padding: 10px 20px;
    border: 2px solid blue;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.primary ? 'darkblue' : 'lightblue'};
        color: white;
    }
`;

// Шаг 4: Использование стилизованных компонентов
// Теперь вы можете использовать стилизованные компоненты в вашем JSX коде.
// Пример использования Button компонента:
function App() {
    return (
        <div>
            <Button primary>Primary Button</Button>
            <Button>Secondary Button</Button>
        </div>
    );
}

// Этот пример демонстрирует основные шаги использования Styled Components и динамических props для стилизации компонентов в React.
