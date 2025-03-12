// 019-аннотации-типов-в-действии-исправление-типа-any.ts

// Этот раздел демонстрирует, как исправить использование типа any в TypeScript,
// заменяя его на более строгие и безопасные типы для повышения надёжности кода.

// 1. ПРОБЛЕМА С ANY В ПЕРЕМЕННЫХ
// Пример кода с any, который нужно исправить
let mystery: any = 7; // Может быть чем угодно
mystery = "Bond";
mystery = true;
console.log(mystery); // true - нет ошибок, но нет контроля

// Исправление: определяем конкретный тип или union
let agentId: number | string = 7; // Ограничиваем возможные типы
agentId = "007"; // Корректно
// agentId = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'
console.log(agentId); // "007"

// 2. ANY В ФУНКЦИЯХ
// Проблемный код: функция с any теряет типобезопасность
function processInput(input: any): any {
    return input.value; // Предполагаем, что input - объект с полем value
}
console.log(processInput({ value: "secret" })); // "secret"
console.log(processInput(123)); // undefined - ошибка в runtime, TS не предупреждает

// Исправление: задаём интерфейс для входных данных
interface InputData {
    value: string;
}
function processStrictInput(input: InputData): string {
    return input.value; // Гарантированно строка
}
console.log(processStrictInput({ value: "secret" })); // "secret"
// processStrictInput(123); // Ошибка: Type 'number' is not assignable to type 'InputData'

// 3. ANY В МАССИВАХ
// Проблема: массив с any допускает любые элементы
let items: any[] = [1, "two", true];
items.push({ random: "data" });
console.log(items); // [1, "two", true, { random: "data" }] - хаос типов

// Исправление: определяем конкретный тип элементов
let strictItems: (number | string)[] = [1, "two"];
strictItems.push(3); // Корректно
strictItems.push("four"); // Корректно
// strictItems.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'
console.log(strictItems); // [1, "two", 3, "four"]

// 4. ANY В ОБЪЕКТАХ
// Проблема: объект с any позволяет добавлять любые свойства
let agent: any = { id: 7, name: "Bond" };
agent.status = "active"; // Нет ошибки
agent.random = 123; // Нет ошибки
console.log(agent); // { id: 7, name: "Bond", status: "active", random: 123 }

// Исправление: используем интерфейс с опциональными свойствами
interface StrictAgent {
    id: number;
    name: string;
    status?: string; // Необязательное свойство
}
let strictAgent: StrictAgent = { id: 7, name: "Bond" };
strictAgent.status = "active"; // Корректно
// strictAgent.random = 123; // Ошибка: Property 'random' does not exist on type 'StrictAgent'
console.log(strictAgent); // { id: 7, name: "Bond", status: "active" }

// 5. ANY С ВНЕШНИМИ ДАННЫМИ (НАПРИМЕР, API)
// Проблема: неизвестные данные из внешнего источника
let apiData: any = { code: "GF", status: 200 };
console.log(apiData.status); // 200
apiData = "Error"; // Нет ошибки, но структура потеряна
console.log(apiData); // "Error"

// Исправление: определяем возможные варианты с union и интерфейсом
interface ApiResponse {
    code: string;
    status: number;
}
type ApiResult = ApiResponse | string; // Успешный ответ или ошибка
let strictApiData: ApiResult = { code: "GF", status: 200 };
console.log((strictApiData as ApiResponse).status); // 200 с приведением типа
strictApiData = "Error"; // Корректно
// strictApiData = true; // Ошибка: Type 'boolean' is not assignable to type 'ApiResult'

// Проверка типа для безопасной работы
function logApiData(data: ApiResult): void {
    if (typeof data === "string") {
        console.log(`Error: ${data}`);
    } else {
        console.log(`Code: ${data.code}, Status: ${data.status}`);
    }
}
logApiData(strictApiData); // "Error: Error"

// 6. ANY В CALLBACK-ФУНКЦИЯХ
// Проблема: callback с any допускает любые аргументы
function executeAction(action: (data: any) => any): any {
    return action("test");
}
const riskyResult = executeAction((data) => data.length); // Предполагаем, что data - строка
console.log(riskyResult); // 4
console.log(executeAction((data) => data + 1)); // NaN в runtime, TS не предупреждает

// Исправление: задаём строгие типы для callback
function executeStrictAction(action: (data: string) => number): number {
    return action("test");
}
const safeResult = executeStrictAction((data) => data.length); // Корректно
console.log(safeResult); // 4
// executeStrictAction((data) => data + 1); // Ошибка: Type 'string' is not assignable to parameter of type 'number'

// 7. ПЕРЕХОД ОТ ANY К UNKNOWN
// Проблема: any скрывает ошибки
let value: any = "007";
value.toUpperCase(); // "007"
value = 007;
value.toUpperCase(); // Ошибка в runtime, TS молчит

// Исправление: используем unknown для принудительной проверки
let safeValue: unknown = "007";
if (typeof safeValue === "string") {
    console.log(safeValue.toUpperCase()); // "007" - безопасно
}
safeValue = 007;
// safeValue.toUpperCase(); // Ошибка: Object is of type 'unknown'

// 8. РЕАЛЬНЫЙ СЦЕНАРИЙ С ИСПРАВЛЕНИЕМ ANY
// Проблемный код: миссия с any
let mission: any = { code: "GF", agent: "007" };
mission.priority = 1;
mission.completed = true;
function getMissionInfo(mission: any): any {
    return mission.code + " - " + mission.agent;
}
console.log(getMissionInfo(mission)); // "GF - 007"
console.log(getMissionInfo(null)); // Ошибка в runtime: Cannot read property 'code' of null

// Исправление: строгая типизация
interface StrictMission {
    code: string;
    agent: string;
    priority?: number;
    completed?: boolean;
}
let strictMission: StrictMission = { code: "GF", agent: "007" };
strictMission.priority = 1;
strictMission.completed = true;

function getStrictMissionInfo(mission: StrictMission): string {
    return `${mission.code} - ${mission.agent}`;
}
console.log(getStrictMissionInfo(strictMission)); // "GF - 007"
// getStrictMissionInfo(null); // Ошибка: Type 'null' is not assignable to type 'StrictMission'

// Итог: Исправление типа any на строгие типы (интерфейсы, union, unknown) повышает безопасность,
// предотвращает ошибки в runtime и улучшает читаемость кода.