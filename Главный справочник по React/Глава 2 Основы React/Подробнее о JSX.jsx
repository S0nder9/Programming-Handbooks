// Файл: app.jsx

// JSX - это расширение языка JavaScript, которое позволяет писать код, похожий на HTML, но внутри JavaScript.
// JSX упрощает создание и использование компонентов React.

// В JSX вы можете создавать элементы как в HTML, используя угловые скобки для вставки JavaScript-выражений.
// JSX-элементы компилируются в вызовы функций React.createElement().

// Пример JSX:
return React.createElement(
    "div",            // Тип элемента
    {},               // Атрибуты (пустой объект, если атрибутов нет)
    React.createElement(
        "h1",        // Вложенный элемент - заголовок h1
        {},          // Атрибуты (опять же, пустой объект)
        "Start!"     // Текст заголовка
    ),
    React.createElement(
        Costs,       // Вложенный компонент Costs, передается в качестве атрибута
        { costs: costs } // Атрибуты компонента Costs
    )
);

// В приведенном выше примере:
// - Создается корневой элемент <div>.
// - Внутри него создается заголовок <h1> с текстом "Start!".
// - После этого вставляется компонент Costs, который принимает атрибут costs.

// JSX делает код более читаемым и легким для понимания, особенно когда вы работаете с комплексными структурами UI.

// Аналогичный код, используя современный JSX:

return (
    <div>
        <h1>Start!</h1>
        <Costs costs = {costs}/>
    </div>
)