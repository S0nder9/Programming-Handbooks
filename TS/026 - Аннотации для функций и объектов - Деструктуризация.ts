// 026-аннотации-для-функций-и-объектов-деструктуризация.ts

// Этот раздел объясняет, как аннотации типов применяются при деструктуризации объектов и массивов в TypeScript,
// обеспечивая строгую типизацию и предотвращая ошибки.

// 1. ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТОВ В ПАРАМЕТРАХ ФУНКЦИЙ
// Аннотируем структуру объекта, который деструктурируется
function briefAgent({ name, id }: { name: string; id: number }): string {
  return `${name} (ID: ${id})`;
}
const agent = { name: "James Bond", id: 7 };
console.log(briefAgent(agent)); // "James Bond (ID: 7)"
// briefAgent({ name: "Bond", id: "007" }); // Ошибка: Type 'string' is not assignable to type 'number'

// С использованием интерфейса
interface Agent {
  name: string;
  id: number;
}
function briefStrictAgent({ name, id }: Agent): string {
  return `${name} (ID: ${id})`;
}
console.log(briefStrictAgent(agent)); // "James Bond (ID: 7)"

// 2. ДЕСТРУКТУРИЗАЦИЯ С ОПЦИОНАЛЬНЫМИ СВОЙСТВАМИ
// Указываем, что некоторые свойства могут отсутствовать
interface Mission {
  code: string;
  location?: string;
}
function describeMission({ code, location }: Mission): string {
  return `${code}${location ? ` in ${location}` : ""}`;
}
console.log(describeMission({ code: "GF" })); // "GF"
console.log(describeMission({ code: "SF", location: "Shanghai" })); // "SF in Shanghai"
// describeMission({ code: "SF", priority: 1 }); // Ошибка: Object literal may only specify known properties

// 3. ДЕСТRUКТУРИЗАЦИЯ С ЗНАЧЕНИЯМИ ПО УМОЛЧАНИЮ
// Устанавливаем значения по умолчанию с аннотациями
function equipAgent({
  name,
  gadget = "Walther PPK",
}: {
  name: string;
  gadget?: string;
}): string {
  return `${name} equipped with ${gadget}`;
}
console.log(equipAgent({ name: "007" })); // "007 equipped with Walther PPK"
console.log(equipAgent({ name: "007", gadget: "Jetpack" })); // "007 equipped with Jetpack"
// equipAgent({ name: "007", gadget: 123 }); // Ошибка: Type 'number' is not assignable to type 'string'

// 4. ДЕСТРУКТУРИЗАЦИЯ ВЛОЖЕННЫХ ОБЪЕКТОВ
// Аннотируем вложенные структуры
interface Operation {
  agent: {
    id: number;
    name: string;
  };
  mission: string;
}
function logOperation({ agent: { id, name }, mission }: Operation): string {
  return `Agent ${id} (${name}) on ${mission}`;
}
const op = { agent: { id: 7, name: "James Bond" }, mission: "GF" };
console.log(logOperation(op)); // "Agent 7 (James Bond) on GF"
// logOperation({ agent: { id: "007", name: "Bond" }, mission: "GF" }); // Ошибка: Type 'string' is not assignable to type 'number'

// 5. ДЕСТРУКТУРИЗАЦИЯ МАССИВОВ
// Аннотируем элементы массива при деструктуризации
function processCoordinates([lat, lon]: [number, number]): string {
  return `Lat: ${lat}, Lon: ${lon}`;
}
console.log(processCoordinates([51.477928, -0.001545])); // "Lat: 51.477928, Lon: -0.001545"
// processCoordinates(["51", 0]); // Ошибка: Type 'string' is not assignable to type 'number'

// С необязательными элементами
function getFirstTwo([first, second = "none"]: [string, string?]): string {
  return `${first}, ${second}`;
}
console.log(getFirstTwo(["gun"])); // "gun, none"
console.log(getFirstTwo(["gun", "car"])); // "gun, car"

// 6. ДЕСТРУКТУРИЗАЦИЯ В ПЕРЕМЕННЫХ
// Применяем аннотации при деструктуризации вне функций
const gadget: { name: string; type: "weapon" | "vehicle" } = {
  name: "Walther PPK",
  type: "weapon",
};
const { name, type } = gadget;
console.log(`${name} is a ${type}`); // "Walther PPK is a weapon"
// TS автоматически выводит типы name: string и type: "weapon" | "vehicle"

// Явная аннотация для большей строгости
const {
  name: gadgetName,
  type: gadgetType,
}: { name: string; type: "weapon" | "vehicle" } = gadget;
console.log(`${gadgetName} (${gadgetType})`); // "Walther PPK (weapon)"

// 7. ДЕСТРУКТУРИЗАЦИЯ С REST ПАРАМЕТРАМИ
// Аннотируем остаточные свойства
function listAgentDetails({
  name,
  ...rest
}: {
  name: string;
  [key: string]: any;
}): string {
  return `${name}, other details: ${JSON.stringify(rest)}`;
}
console.log(listAgentDetails({ name: "Bond", id: 7, active: true }));
// "Bond, other details: {\"id\":7,\"active\":true}"

// Более строгая версия с интерфейсом
interface AgentDetails {
  name: string;
  id: number;
  active?: boolean;
}
function listStrictDetails({ name, ...rest }: AgentDetails): string {
  return `${name}, rest: ${JSON.stringify(rest)}`;
}
console.log(listStrictDetails({ name: "Bond", id: 7 })); // "Bond, rest: {\"id\":7}"

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С ДЕСТРУКТУРИЗАЦИЕЙ
// Комбинируем деструктуризацию в сценарии миссии
interface MissionData {
  agent: {
    id: number;
    name: string;
    skills?: string[];
  };
  mission: {
    code: string;
    gadgets: { name: string }[];
  };
}

function prepareMission({
  agent: { id, name, skills = [] },
  mission: { code, gadgets },
}: MissionData): string {
  const gadgetList = gadgets.map((g) => g.name).join(", ");
  return `Agent ${id} (${name}) on ${code} with ${gadgetList}, skills: ${skills.join(
    ", "
  )}`;
}

const missionData: MissionData = {
  agent: { id: 7, name: "James Bond", skills: ["stealth"] },
  mission: {
    code: "GF",
    gadgets: [{ name: "Walther PPK" }, { name: "Aston Martin DB5" }],
  },
};
console.log(prepareMission(missionData));
// "Agent 7 (James Bond) on GF with Walther PPK, Aston Martin DB5, skills: stealth"

// 9. ОШИБКИ ПРИ ДЕСТРУКТУРИЗАЦИИ
// Проблема: несоответствие структуры
// briefAgent({ name: "Bond" }); // Ошибка: Property 'id' is missing in type '{ name: string; }'
// processCoordinates([1]); // Ошибка: Tuple type '[number, number]' of length '2' has no element at index '1'

// Итог: Деструктуризация с аннотациями типов позволяет безопасно извлекать данные из объектов и массивов,
// сохраняя строгую проверку типов и улучшая читаемость кода.
