// Глава 2: Основы React

// JSX - это расширение синтаксиса JavaScript, которое позволяет писать код React более декларативно.

// Пример использования JSX:

// Создание компонента "Приветствие"
const Greeting = ({ name }) => {
    return <h1>Hello, {name}!</h1>;
};

// Использование компонента "Приветствие" в приложении
const App = () => {
    return (
        <div>
            <Greeting name="Alice" />
            <Greeting name="Bob" />
        </div>
    );
};

// JSX позволяет использовать выражения JavaScript внутри тегов и внутри атрибутов,
// а также создавать древовидную структуру UI, которая напоминает HTML.

// Примеры использования JSX:

// 1. Вывод переменной внутри JSX
const message = 'Welcome to React!';
const Element = <h2>{message}</h2>;

// 2. Использование условных операторов
const isUserLoggedIn = true;
const loginStatus = (
    <p>
        {isUserLoggedIn ? 'You are logged in' : 'Please log in'}
    </p>
);

// 3. Использование массивов
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li key={number}>{number}</li>);
const numberList = <ul>{listItems}</ul>;

// 4. Вложенность компонентов
const Button = () => {
    return <button>Click me</button>;
};

const Form = () => {
    return (
        <form>
            <input type="text" />
            <Button />
        </form>
    );
};

// JSX компилируется в вызовы функций React.createElement(),
// которые создают объекты React элементов, представляющие UI компоненты.
