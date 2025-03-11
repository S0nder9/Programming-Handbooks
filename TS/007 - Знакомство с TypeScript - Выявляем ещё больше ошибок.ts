// 007-знакомство-с-typescript-выявляем-еще-больше-ошибок.ts

// Основная цель этого раздела - показать, как TypeScript помогает выявлять ошибки на этапе компиляции,
// а не в runtime, что экономит время разработки и повышает надёжность кода

// 1. БАЗОВЫЕ ТИПЫ И ИХ СТРОГАЯ ПРОВЕРКА
// TypeScript не позволяет присваивать значения неправильного типа
let age: number = 25; // Явно указываем, что переменная должна быть числом
// age = "двадцать пять"; // Ошибка: Type 'string' is not assignable to type 'number'

let username: string = "JamesBond"; // Переменная типизируется как строка
// username = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// Пример с булевым значением
let isAgent: boolean = true;
// isAgent = "yes"; // Ошибка: Type 'string' is not assignable to type 'boolean'

// 2. ТИПИЗАЦИЯ ФУНКЦИЙ
// Указываем типы параметров и возвращаемого значения для предотвращения ошибок
function getAgentCode(name: string, id: number): string {
    return `${name}-${id}`; // Корректное возвращаемое значение типа string
}
// getAgentCode("Bond", "007"); // Ошибка: Argument of type 'string' is not assignable to parameter of type 'number'
const code = getAgentCode("Bond", 7); // Работает корректно: "Bond-7"

// Пример функции с опциональным параметром
function greetAgent(codename: string, mission?: string): string {
    if (mission) {
        return `Агент ${codename}, ваша миссия: ${mission}`;
    }
    return `Добро пожаловать, агент ${codename}`;
}
console.log(greetAgent("007")); // "Добро пожаловать, агент 007"
console.log(greetAgent("007", "Goldfinger")); // "Агент 007, ваша миссия: Goldfinger"

// 3. ВЫЯВЛЕНИЕ ОШИБОК В ОБЪЕКТАХ
// Определяем интерфейс для строгой типизации объекта
interface Agent {
    name: string;
    code: number;
    active: boolean;
}

const bond: Agent = {
    name: "James Bond",
    code: 7,
    active: true
};
// bond.code = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// bond.status = "on duty"; // Ошибка: Property 'status' does not exist on type 'Agent'

// 4. РАБОТА С МАССИВАМИ
// Указываем тип элементов массива
let agentCodes: number[] = [7, 8, 9];
// agentCodes.push("10"); // Ошибка: Argument of type 'string' is not assignable to parameter of type 'number'
agentCodes.push(10); // Корректно

// Альтернативный синтаксис для массивов
let missions: Array<string> = ["Goldfinger", "Skyfall"];
// missions.push(007); // Ошибка: Argument of type 'number' is not assignable to parameter of type 'string'

// 5. UNION TYPES ДЛЯ ГИБКОСТИ И БЕЗОПАСНОСТИ
// Позволяет переменной принимать значения из нескольких типов
let status: string | number;
status = "active"; // Корректно
status = 1; // Корректно
// status = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Пример с функцией
function processInput(input: string | number): void {
    console.log(`Получено: ${input}`);
}
processInput("Agent"); // Работает
processInput(7); // Работает
// processInput(true); // Ошибка

// 6. ПРОВЕРКА NULL И UNDEFINED
// TypeScript помогает избежать ошибок с отсутствующими значениями
let gadget: string | null = "Walther PPK";
gadget = null; // Корректно
// gadget = undefined; // Ошибка: Type 'undefined' is not assignable to type 'string | null'

// Использование опциональной цепочки для безопасного доступа
interface Mission {
    name?: string;
    details?: {
        location?: string;
    };
}
const currentMission: Mission = {};
const location = currentMission.details?.location; // Безопасно, вернёт undefined вместо ошибки

// 7. TYPE ASSERTIONS ДЛЯ УТОЧНЕНИЯ ТИПОВ
// Когда мы точно знаем тип, но TS не может его вывести
let someValue: any = "007";
let strLength: number = (someValue as string).length; // Утверждаем, что это строка
console.log(strLength); // 3

// Альтернативный синтаксис утверждения типа
let numValue: any = "12345";
let numLength: number = (<string>numValue).length; // То же самое, что выше

// 8. ПРИМЕР РЕАЛЬНОЙ ОШИБКИ, КОТОРУЮ TS ПОМОГАЕТ ИЗБЕЖАТЬ
function assignMission(agent: Agent, mission: string): string {
    if (agent.active) {
        return `${agent.name} назначен на миссию: ${mission}`;
    }
    return `${agent.name} неактивен`;
}
// assignMission("Bond", "Skyfall"); // Ошибка: Argument of type 'string' is not assignable to parameter of type 'Agent'
const result = assignMission(bond, "Skyfall"); // Корректно: "James Bond назначен на миссию: Skyfall"

// Итог: TypeScript выявляет ошибки типов, несоответствия интерфейсов, 
// неправильные аргументы функций и многое другое ещё до запуска кода