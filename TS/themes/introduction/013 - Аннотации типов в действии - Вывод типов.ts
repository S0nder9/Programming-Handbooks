// 013-аннотации-типов-в-действии-вывод-типов.ts

// Этот раздел объясняет, как аннотации типов и вывод типов (type inference) работают в TypeScript.
// Аннотации типов - это явное указание типов, а вывод типов - автоматическое определение типов компилятором.

// 1. ЯВНЫЕ АННОТАЦИИ ТИПОВ
// Мы сами указываем тип переменной, чтобы быть уверенными в её поведении
let agentId: number = 7; // Явно указываем, что это число
let agentName: string = "James Bond"; // Явно указываем строку
// agentId = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// Пример с функцией и явными аннотациями
function getAgentDetails(id: number, name: string): string {
    return `Agent ${id}: ${name}`;
}
console.log(getAgentDetails(7, "Bond")); // "Agent 7: Bond"
// getAgentDetails("007", "Bond"); // Ошибка: Type 'string' is not assignable to type 'number'

// 2. ВЫВОД ТИПОВ (TYPE INFERENCE)
// TypeScript автоматически определяет тип на основе присваиваемого значения
let code = 7; // TS выводит тип number
let name = "James Bond"; // TS выводит тип string
// code = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// name = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// Пример вывода типа в массиве
let gadgets = ["Walther PPK", "Aston Martin DB5"]; // TS выводит string[]
gadgets.push("Jetpack"); // Корректно
// gadgets.push(007); // Ошибка: Type 'number' is not assignable to type 'string'

// 3. ВЫВОД ТИПОВ В ФУНКЦИЯХ
// TS может вывести тип возвращаемого значения
function introduceAgent(id: number, codename: string) {
    return `Agent ${id}: ${codename}`; // TS выводит, что функция возвращает string
}
const intro = introduceAgent(7, "Bond"); // intro автоматически имеет тип string
console.log(intro); // "Agent 7: Bond"

// Если не указать типы параметров, TS выведет их как any (не рекомендуется)
function add(a, b) {
    return a + b; // TS не знает, что возвращается, тип будет any
}
const result = add(5, "10"); // "510" - нет ошибки, но это опасно

// С явными типами лучше
function safeAdd(a: number, b: number): number {
    return a + b;
}
// safeAdd(5, "10"); // Ошибка: Type 'string' is not assignable to type 'number'

// 4. ВЫВОД ТИПОВ С ОБЪЕКТАМИ
// TS выводит типы свойств объекта на основе значений
let agent = {
    id: 7,
    name: "James Bond",
    active: true
}; // TS выводит тип { id: number, name: string, active: boolean }
// agent.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// Явная аннотация с интерфейсом
interface Agent {
    id: number;
    name: string;
    active: boolean;
}
const bond: Agent = {
    id: 7,
    name: "James Bond",
    active: true
}; // Тип явно указан через интерфейс

// 5. ВЫВОД ТИПОВ С UNION TYPES
// TS может вывести объединённый тип, если переменная используется с разными типами
let status = "active"; // TS выводит string
status = 1; // TS переопределяет тип как string | number
// status = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Пример с массивом
let mixedArray = [1, "two"]; // TS выводит (string | number)[]
// mixedArray.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// 6. КОГДА ВЫВОД ТИПОВ НЕДОСТАТОЧЕН
// Без аннотации TS может ошибочно вывести слишком широкий тип
let mission = { code: "GF" }; // TS выводит { code: string }
mission = { code: "SF", location: "Shanghai" }; // Корректно, но location не проверяется

// С явной аннотацией лучше
type Mission = {
    code: string;
    location?: string; // Необязательное свойство
};
let safeMission: Mission = { code: "GF" }; // Теперь структура строго определена
safeMission = { code: "SF", location: "Shanghai" }; // Корректно
// safeMission = { code: "SF", priority: 1 }; // Ошибка: Object literal may only specify known properties

// 7. ВЫВОД ТИПОВ В GENERICS
// TS может вывести тип для обобщённых функций
function getFirst<T>(items: T[]): T {
    return items[0];
}
const firstNum = getFirst([1, 2, 3]); // TS выводит T как number, firstNum: number
const firstStr = getFirst(["a", "b"]); // TS выводит T как string, firstStr: string
console.log(firstNum); // 1
console.log(firstStr); // "a"

// Явное указание типа тоже возможно
const explicitFirst = getFirst<string>(["x", "y"]); // Явно указываем string

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С АННОТАЦИЯМИ И ВЫВОДОМ
// Комбинируем оба подхода
interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}

function equipAgent(gadgetNames: string[]): Gadget[] {
    // TS выводит возвращаемый тип как Gadget[]
    return gadgetNames.map(name => ({
        name,
        type: name.includes("PPK") ? "weapon" : "vehicle" // TS выводит "weapon" | "vehicle"
    }));
}

const equipped = equipAgent(["Walther PPK", "Aston Martin DB5"]);
console.log(equipped); 
// [{ name: "Walther PPK", type: "weapon" }, { name: "Aston Martin DB5", type: "vehicle" }]

// Явная аннотация для большей строгости
const explicitEquip: Gadget[] = equipAgent(["Jetpack"]);
// explicitEquip[0].type = "tool"; // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'

// 9. ОГРАНИЧЕНИЯ ВЫВОДА ТИПОВ
// TS не всегда может вывести тип, если контекст недостаточен
const inferred = true ? "success" : 0; // TS выводит string | number
// const badAssignment: string = inferred; // Ошибка: Type 'string | number' is not assignable to type 'string'

// С явной аннотацией
const explicit: string = true ? "success" : "default"; // Корректно, оба варианта string

// Итог: Аннотации типов дают контроль, а вывод типов упрощает код там, где типы очевидны.
// Лучшая практика - комбинировать их для читаемости и безопасности.