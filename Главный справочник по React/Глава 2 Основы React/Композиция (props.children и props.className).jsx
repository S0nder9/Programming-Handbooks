// Глава 2: Основы React

// Композиция (props.children и props.className)

// Компонент, использующий композицию для вставки содержимого
// внутрь своей разметки с помощью props.children
const Card = (props) => {
    return (
        <div className={`card ${props.className}`}>
            {props.children}
        </div>
    );
};

// Пример использования компонента Card
const App = () => {
    return (
        <div>
            <Card className="blue-card">
                <h2>Title</h2>
                <p>Content goes here...</p>
            </Card>
        </div>
    );
};

// Рендеринг компонента App в корневой элемент приложения
ReactDOM.render(<App />, document.getElementById('root'));
