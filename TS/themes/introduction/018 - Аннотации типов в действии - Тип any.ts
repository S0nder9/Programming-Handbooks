// 018-аннотации-типов-в-действии-тип-any.ts

// Этот раздел объясняет, что такое тип any в TypeScript, как он работает и почему его следует использовать с осторожностью.
// Тип any отключает проверку типов, позволяя переменной принимать любые значения, что может снизить безопасность кода.

// 1. ОСНОВЫ ТИПА ANY
// Переменная с типом any может содержать значение любого типа
let mystery: any = 7; // Изначально число
mystery = "James Bond"; // Теперь строка
mystery = true; // Теперь булево значение
mystery = { id: 7 }; // Теперь объект
console.log(mystery); // { id: 7 }
// Нет ошибок, так как any разрешает всё

// Пример без явной аннотации (TS выведет any, если тип не указан и не ясен)
let unknown; // TS присваивает any
unknown = 5;
unknown = "test";
console.log(unknown); // "test"

// 2. ИСПОЛЬЗОВАНИЕ ANY В ФУНКЦИЯХ
// Параметры и возвращаемые значения с any теряют строгую проверку
function logAnything(value: any): any {
    console.log(value);
    return value; // Может вернуть что угодно
}
logAnything(7); // 7
logAnything("Mission"); // "Mission"
logAnything([1, 2, 3]); // [1, 2, 3]
const result = logAnything(true); // result имеет тип any
console.log(result); // true

// Опасность: можно вызвать несуществующие методы
let data: any = "007";
data.toUpperCase(); // Работает, так как строка
data = 007;
data.toUpperCase(); // Ошибка в runtime: data.toUpperCase is not a function, но TS не предупредит

// 3. ANY С ОБЪЕКТАМИ
// Объекты с типом any позволяют обращаться к любым свойствам
let agent: any = { id: 7, name: "Bond" };
console.log(agent.name); // "Bond"
agent.status = "active"; // Корректно, хотя свойства status изначально нет
console.log(agent.status); // "active"
agent.randomMethod(); // TS не выдаст ошибку, но в runtime это сломается, если метода нет

// Сравнение с выводом типов
let inferredAgent = { id: 7, name: "Bond" }; // TS выводит { id: number; name: string }
// inferredAgent.status = "active"; // Ошибка: Property 'status' does not exist on type '{ id: number; name: string }'

// 4. ПРАКТИЧЕСКИЙ СЦЕНАРИЙ С ANY
// Использование any для работы с неизвестными данными (например, API)
let apiResponse: any = { code: "GF", status: 200 }; // Предполагаем, что это ответ от сервера
console.log(apiResponse.status); // 200
apiResponse = "Error occurred"; // Ответ изменился
console.log(apiResponse); // "Error occurred"
// Проблема: TS не предупредит о несоответствии структуры

// 5. ОПАСНОСТИ ТИПА ANY
// Пример: потеря типобезопасности
function processData(data: any): string {
    return data.name; // Предполагаем, что data - объект с полем name
}
console.log(processData({ name: "Bond" })); // "Bond"
console.log(processData(007)); // undefined в runtime, TS не предупредит
// processData(null).toLowerCase(); // Ошибка в runtime: Cannot read property 'toLowerCase' of null

// 6. ANY VS UNKNOWN
// Тип unknown - более безопасная альтернатива any
let uncertain: unknown = 7;
uncertain = "Bond";
// uncertain.toUpperCase(); // Ошибка: Object is of type 'unknown' - нужно проверить тип

if (typeof uncertain === "string") {
    console.log(uncertain.toUpperCase()); // "BOND" - безопасно после проверки
}

// Сравнение с any
let anyValue: any = "007";
console.log(anyValue.toUpperCase()); // "007" - работает, но опасно, если тип изменится

// 7. КОГДА ИСПОЛЬЗОВАТЬ ANY
// Пример: временная заглушка для ещё не типизированного кода
function tempProcess(input: any) {
    // Пока не знаем точную структуру
    return input.data?.value ?? "unknown";
}
console.log(tempProcess({ data: { value: "secret" } })); // "secret"
console.log(tempProcess(123)); // "unknown"

// Лучше заменить на строгую типизацию позже
interface StrictInput {
    data?: {
        value: string;
    };
}
function strictProcess(input: StrictInput): string {
    return input.data?.value ?? "unknown";
}
// strictProcess(123); // Ошибка: Type 'number' is not assignable to type 'StrictInput'

// 8. РЕАЛЬНЫЙ СЦЕНАРИЙ С ANY
// Работа с динамическими данными (например, шпионский отчёт)
let report: any = {
    agent: "007",
    mission: "GF"
};
report.status = 200; // Добавляем свойство
report.completed = true; // Ещё одно свойство
console.log(report); // { agent: "007", mission: "GF", status: 200, completed: true }

// Проблема: отсутствие проверки
function getMissionCode(report: any): string {
    return report.mission; // Предполагаем, что mission есть и это строка
}
console.log(getMissionCode(report)); // "GF"
console.log(getMissionCode(null)); // undefined в runtime, TS не предупредит

// Более безопасный вариант с интерфейсом
interface Report {
    agent: string;
    mission: string;
    status?: number;
    completed?: boolean;
}
let strictReport: Report = {
    agent: "007",
    mission: "GF"
};
function getStrictMissionCode(report: Report): string {
    return report.mission; // Гарантированно строка
}
console.log(getStrictMissionCode(strictReport)); // "GF"
// getStrictMissionCode(null); // Ошибка: Type 'null' is not assignable to type 'Report'

// 9. ИЗБЕГАНИЕ ANY С ПОМОЩЬЮ ВЫВОДА ТИПОВ
// TS может вывести тип автоматически, если не использовать any
let inferred = { id: 7, name: "Bond" }; // TS выводит { id: number; name: string }
// inferred.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// Итог: Тип any отключает проверку типов, что удобно для временных решений или работы с неизвестными данными,
// но снижает безопасность. Лучше использовать строгие типы или unknown, где это возможно.