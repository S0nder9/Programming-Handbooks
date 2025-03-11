// 008-что-такое-система-типов-краткий-обзор-курса.ts

// Система типов - это набор правил, определяющих, как данные классифицируются и взаимодействуют в языке программирования.
// TypeScript использует статическую типизацию для проверки кода на этапе компиляции.

// 1. ЧТО ТАКОЕ СИСТЕМА ТИПОВ?
// Это способ классифицировать данные (числа, строки и т.д.) и задавать правила их использования
let agentId: number = 7; // Тип "number" говорит, что переменная принимает только числа
let agentName: string = "James Bond"; // Тип "string" ограничивает значения строками
// agentId = agentName; // Ошибка: Type 'string' is not assignable to type 'number'

// 2. СТАТИЧЕСКАЯ VS ДИНАМИЧЕСКАЯ ТИПИЗАЦИЯ
// TypeScript - статически типизированный язык (проверка типов до выполнения кода)
function getAgentInfo(id: number): string {
    return `Agent ID: ${id}`;
}
// getAgentInfo("007"); // Ошибка: Argument of type 'string' is not assignable to parameter of type 'number'
console.log(getAgentInfo(7)); // Работает: "Agent ID: 7"

// В JavaScript (динамическая типизация) такая ошибка проявилась бы только в runtime
// const jsExample = (id) => `Agent ID: ${id}`;
// console.log(jsExample("007")); // "Agent ID: 007" - нет ошибки, но может быть нежелательно

// 3. ОСНОВНЫЕ ТИПЫ В TYPESCRIPT
// Примитивные типы - основа системы типов
let code: number = 007; // Число
let codename: string = "Bond"; // Строка
let isActive: boolean = true; // Булево значение
let secret: null = null; // Ничего
let unknownData: undefined = undefined; // Не определено

// 4. СОСТАВНЫЕ ТИПЫ
// Объединяют примитивные типы для большей гибкости
// Union Type (объединение типов)
let status: string | number;
status = "active"; // Корректно
status = 1; // Корректно
// status = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Интерфейсы для объектов
interface Agent {
    id: number;
    name: string;
    active: boolean;
}
const bond: Agent = { id: 7, name: "James Bond", active: true };
// bond.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// 5. ПОЧЕМУ СИСТЕМА ТИПОВ ВАЖНА?
// Пример: предотвращение ошибок в реальном коде
function deployAgent(agent: Agent, mission: string): string {
    if (agent.active) {
        return `${agent.name} deployed to ${mission}`;
    }
    return `${agent.name} is not available`;
}
const deployment = deployAgent(bond, "Goldfinger"); // "James Bond deployed to Goldfinger"
// deployAgent("Bond", "Goldfinger"); // Ошибка: Argument of type 'string' is not assignable to parameter of type 'Agent'

// 6. КРАТКИЙ ОБЗОР КУРСА ПО СИСТЕМЕ ТИПОВ
// Что обычно изучают в курсе по TypeScript:
interface CourseOverview {
    topic: string;
    description: string;
    example: () => string;
}

const topics: CourseOverview[] = [
    {
        topic: "Базовые типы",
        description: "Числа, строки, булевы значения",
        example: () => {
            let x: number = 42;
            return `Тип числа: ${x}`;
        }
    },
    {
        topic: "Интерфейсы и типы",
        description: "Описание структуры объектов",
        example: () => {
            interface Item { name: string }
            let gun: Item = { name: "Walther PPK" };
            return gun.name;
        }
    },
    {
        topic: "Generics",
        description: "Обобщённые типы для переиспользуемого кода",
        example: () => {
            function getFirst<T>(arr: T[]): T {
                return arr[0];
            }
            return getFirst<string>(["a", "b"]); // "a"
        }
    }
];

// Пример вызова
topics.forEach(topic => {
    console.log(`${topic.topic}: ${topic.description}`);
    console.log(`Пример: ${topic.example()}`);
});

// 7. ПРЕИМУЩЕСТВА СИСТЕМЫ ТИПОВ В TYPESCRIPT
// - Выявление ошибок на этапе компиляции
// - Улучшение читаемости кода
// - Подсказки в IDE
// - Упрощение рефакторинга

// Итог: Система типов в TypeScript - это мощный инструмент для создания надёжного и масштабируемого кода