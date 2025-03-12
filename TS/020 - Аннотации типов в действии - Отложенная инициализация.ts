// 020-аннотации-типов-в-действии-отложенная-инициализация.ts

// Этот раздел объясняет, как TypeScript обрабатывает отложенную инициализацию переменных,
// когда значение присваивается не сразу, а позже, и как аннотации типов помогают в таких случаях.

// 1. ПРОБЛЕМА БЕЗ АННОТАЦИЙ ПРИ ОТЛОЖЕННОЙ ИНИЦИАЛИЗАЦИИ
// Если переменная объявлена без начального значения, TS присваивает тип any
let agentCode; // TS выводит any (небезопасно)
agentCode = 7; // Корректно
agentCode = "007"; // Корректно, но теряется контроль типов
console.log(agentCode); // "007"

// 2. ЯВНАЯ АННОТАЦИЯ ДЛЯ ОТЛОЖЕННОЙ ИНИЦИАЛИЗАЦИИ
// Указываем тип заранее, чтобы TS проверял присваиваемые значения
let missionId: number; // Явно указываем тип number
// missionId = "GF"; // Ошибка: Type 'string' is not assignable to type 'number'
missionId = 7; // Корректно
console.log(missionId); // 7

// Пример со строкой
let missionName: string; // Тип string
missionName = "Goldfinger"; // Корректно
// missionName = 007; // Ошибка: Type 'number' is not assignable to type 'string'
console.log(missionName); // "Goldfinger"

// 3. ОТЛОЖЕННАЯ ИНИЦИАЛИЗАЦИЯ С UNION TYPES
// Переменная может принимать несколько типов
let status: string | null; // Может быть строкой или null
status = null; // Корректно (начальное состояние)
status = "active"; // Корректно (позже обновляем)
// status = 1; // Ошибка: Type 'number' is not assignable to type 'string | null'
console.log(status); // "active"

// 4. ОТЛОЖЕННАЯ ИНИЦИАЛИЗАЦИЯ В ФУНКЦИЯХ
// Переменная инициализируется внутри функции
function setAgentCode(isNumeric: boolean): string {
  let code: string; // Отложенная инициализация с типом string
  if (isNumeric) {
    code = "Agent-007"; // Устанавливаем значение позже
  } else {
    code = "Bond"; // Другое значение
  }
  return code;
}
console.log(setAgentCode(true)); // "Agent-007"
console.log(setAgentCode(false)); // "Bond"

// Проблема без инициализации в одном из путей
function riskySetCode(condition: boolean): number {
  let value: number; // Отложенная инициализация
  if (condition) {
    value = 7;
  }
  // return value; // Ошибка: Variable 'value' is used before being assigned
  // Исправление: нужно гарантировать присваивание
  value = condition ? 7 : 0; // Явное значение по умолчанию
  return value;
}
console.log(riskySetCode(true)); // 7

// 5. ОТЛОЖЕННАЯ ИНИЦИАЛИЗАЦИЯ С ОБЪЕКТАМИ
// Объявляем объект с типом, но заполняем позже
interface Agent {
  id: number;
  name: string;
}
let agent: Agent; // Отложенная инициализация
// console.log(agent.id); // Ошибка: Variable 'agent' is used before being assigned
agent = { id: 7, name: "James Bond" }; // Инициализация позже
console.log(agent.name); // "James Bond"

// 6. ИСПОЛЬЗОВАНИЕ NON-NULL ASSERTION (!) ДЛЯ ОТЛОЖЕННОЙ ИНИЦИАЛИЗАЦИИ
// Указываем TS, что переменная точно будет инициализирована перед использованием
let gadget!: string; // Обещаем, что gadget будет string и не null/undefined
function initializeGadget() {
  gadget = "Walther PPK"; // Инициализация позже
}
initializeGadget();
console.log(gadget); // "Walther PPK"
// Без "!" будет ошибка: Variable 'gadget' is used before being assigned
// Но осторожно: если забыть вызвать initializeGadget(), будет runtime ошибка

// 7. ОТЛОЖЕННАЯ ИНИЦИАЛИЗАЦИЯ В КЛАССАХ
// Свойства класса с отложенной инициализацией
class Mission {
  code!: string; // Указываем, что code будет инициализирован
  constructor() {
    this.initialize(); // Гарантируем инициализацию
  }
  initialize() {
    this.code = "GF";
  }
}
const mission = new Mission();
console.log(mission.code); // "GF"

// Без "!" нужно либо инициализировать сразу, либо сделать свойство опциональным
class StrictMission {
  code: string | undefined; // Опциональный тип
  constructor() {
    this.code = undefined; // Явное начальное значение
  }
  setCode(value: string) {
    this.code = value;
  }
}
const strictMission = new StrictMission();
strictMission.setCode("SF");
console.log(strictMission.code); // "SF"

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С ОТЛОЖЕННОЙ ИНИЦИАЛИЗАЦИЕЙ
// Сценарий: подготовка данных для миссии агента
interface MissionData {
  agentId: number;
  missionCode: string;
  gadgets: string[];
}

let operation: MissionData; // Отложенная инициализация
function prepareOperation(isUrgent: boolean) {
  operation = {
    agentId: 7,
    missionCode: isUrgent ? "GF" : "SF",
    gadgets: ["Walther PPK"],
  };
}
prepareOperation(true);
console.log(operation); // { agentId: 7, missionCode: "GF", gadgets: ["Walther PPK"] }

// Пример с функцией и проверкой
function getOperationDetails(): string {
  if (!operation) {
    return "Operation not prepared";
  }
  return `${operation.agentId} - ${operation.missionCode}`;
}
console.log(getOperationDetails()); // "7 - GF"

// 9. ОШИБКИ ПРИ ОТЛОЖЕННОЙ ИНИЦИАЛИЗАЦИИ
// Проблема: использование до присваивания
let riskyValue: number;
// console.log(riskyValue + 1); // Ошибка: Variable 'riskyValue' is used before being assigned
riskyValue = 10;
console.log(riskyValue + 1); // 11 - безопасно после инициализации

// Итог: Отложенная инициализация требует явных аннотаций типов для контроля,
// а non-null assertion (!) или гарантия присваивания помогают избежать ошибок.
