// Глава 4: Отображение Контента по Условию и Списков

// Использование списков с состоянием

// Создаем компонент ListComponent для отображения списка с состоянием
class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        // Инициализируем состояние компонента
        this.state = {
            items: ['item 1', 'item 2', 'item 3'], // Исходный список элементов
            newItem: '' // Новый элемент списка, который будет добавлен
        };
    }

    // Обработчик изменения поля ввода нового элемента списка
    handleInputChange = (event) => {
        this.setState({ newItem: event.target.value });
    };

    // Обработчик добавления нового элемента в список
    handleAddItem = () => {
        // Создаем копию текущего списка элементов
        const updatedItems = [...this.state.items];
        // Добавляем новый элемент в копию списка
        updatedItems.push(this.state.newItem);
        // Обновляем состояние компонента, включая новый элемент
        this.setState({ items: updatedItems, newItem: '' });
    };

    render() {
        return (
            <div>
                <h2>List Component</h2>
                {/* Отображаем текущий список элементов */}
                <ul>
                    {this.state.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                {/* Поле ввода для нового элемента списка */}
                <input
                    type="text"
                    value={this.state.newItem}
                    onChange={this.handleInputChange}
                />
                {/* Кнопка для добавления нового элемента в список */}
                <button onClick={this.handleAddItem}>Add Item</button>
            </div>
        );
    }
}

// Использование списков с состоянием в другом компоненте
function App() {
    return (
        <div>
            <h1>Using Stateful Lists</h1>
            <ListComponent />
        </div>
    );
}

// Рендеринг компонента App в корневом элементе приложения
ReactDOM.render(<App />, document.getElementById('root'));


// В этом примере создается компонент ListComponent, который представляет список с состоянием. Компонент содержит массив items в своем состоянии, который хранит элементы списка. 
// Есть также поле ввода и кнопка для добавления нового элемента в список. При каждом изменении поля ввода обработчик handleInputChange обновляет состояние компонента newItem. 
// При нажатии на кнопку "Add Item" вызывается обработчик handleAddItem, который добавляет новый элемент в список путем обновления состояния компонента items. 
// Компонент ListComponent рендерит текущий список элементов и обновляется при добавлении новых элементов. 
// Компонент App использует ListComponent для демонстрации использования списков с состоянием.