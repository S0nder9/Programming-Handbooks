// 025-аннотации-для-функций-и-объектов-void-never.ts

// Этот раздел объясняет использование типов void и never в аннотациях функций в TypeScript.
// Void указывает, что функция ничего не возвращает, а never - что функция никогда не завершится успешно.

// 1. ТИП VOID
// Void используется для функций, которые не возвращают значений
function logAgent(name: string): void {
    console.log(`Agent: ${name}`);
    // return "done"; // Ошибка: Type 'string' is not assignable to type 'void'
}
logAgent("James Bond"); // "Agent: James Bond"

// Пример с опциональным возвращением (не влияет на тип)
function warnAgent(message: string): void {
    console.log(`Warning: ${message}`);
    if (message === "urgent") return; // Корректно, ранний возврат допустим
}
warnAgent("mission critical"); // "Warning: mission critical"

// Void в стрелочной функции
const notify = (code: string): void => console.log(`Mission ${code} notified`);
notify("GF"); // "Mission GF notified"

// 2. VOID В CALLBACK-ФУНКЦИЯХ
// Указывает, что callback ничего не возвращает
function executeTask(task: (id: number) => void): void {
    task(7);
    console.log("Task executed");
}
executeTask((id) => console.log(`Agent ${id} activated`)); 
// "Agent 7 activated"
// "Task executed"
// executeTask((id) => `Agent ${id}`); // Ошибка: Type 'string' is not assignable to type 'void'

// 3. ТИП NEVER
// Never указывает, что функция никогда не завершится нормальным образом
function failMission(message: string): never {
    throw new Error(`Mission failed: ${message}`);
    // Код после throw недостижим
}
// failMission("Target escaped"); // Выбросит исключение: "Mission failed: Target escaped"

// Never в бесконечном цикле
function infiniteLoop(): never {
    while (true) {
        console.log("Running...");
    }
    // Никогда не дойдёт до конца
}

// 4. NEVER В УСЛОВНЫХ СЦЕНАРИЯХ
// Используется для обозначения исчерпывающих проверок
type Status = "active" | "inactive";
function handleStatus(status: Status): string {
    switch (status) {
        case "active":
            return "Mission is active";
        case "inactive":
            return "Mission is inactive";
        default:
            const exhaustiveCheck: never = status; // Если добавится новый статус, TS выдаст ошибку
            throw new Error(`Unknown status: ${exhaustiveCheck}`);
    }
}
console.log(handleStatus("active")); // "Mission is active"

// 5. VOID VS NEVER
// Void: функция завершается, но ничего не возвращает
function completeMission(code: string): void {
    console.log(`${code} completed`);
}
completeMission("GF"); // "GF completed"

// Never: функция не завершается (исключение или бесконечный цикл)
function abortMission(code: string): never {
    throw new Error(`${code} aborted`);
}
// abortMission("SF"); // Выбросит исключение

// 6. VOID В ОБЪЕКТАХ И МЕТОДАХ
// Аннотация метода объекта
interface Agent {
    name: string;
    report(this: Agent): void;
}
const bond: Agent = {
    name: "James Bond",
    report() {
        console.log(`Reporting: ${this.name}`);
    }
};
bond.report(); // "Reporting: James Bond"

// 7. NEVER В GENERICS
// Пример с обобщённой функцией, которая всегда бросает ошибку
function throwError<T>(message: string): T {
    throw new Error(message);
    // Возвращаемый тип T никогда не достигается, фактически never
}
// const result: string = throwError("Oops"); // Ошибка выброшена, result не присвоится

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С VOID И NEVER
// Сценарий: управление миссией агента
interface Mission {
    code: string;
    execute: () => void; // Метод ничего не возвращает
    fail: (reason: string) => never; // Метод всегда завершается исключением
}

const operation: Mission = {
    code: "GF",
    execute() {
        console.log(`Executing ${this.code}`);
    },
    fail(reason) {
        throw new Error(`Failed ${this.code}: ${reason}`);
    }
};

// Использование void
operation.execute(); // "Executing GF"

// Использование never
try {
    operation.fail("target escaped");
} catch (error) {
    console.log(error.message); // "Failed GF: target escaped"
}

// 9. VOID С АСИНХРОННЫМИ ФУНКЦИЯМИ
// Асинхронная функция, не возвращающая значение
async function logAsyncMission(code: string): Promise<void> {
    console.log(`Async mission ${code} logged`);
}
logAsyncMission("SF").then(() => console.log("Done")); 
// "Async mission SF logged"
// "Done"

// Never в асинхронной функции
async function asyncFail(code: string): Promise<never> {
    throw new Error(`Async failure: ${code}`);
}
// asyncFail("SF").catch(err => console.log(err.message)); // "Async failure: SF"

// 10. ОШИБКИ И ОГРАНИЧЕНИЯ
// Void не допускает возврата значений
function badVoid(): void {
    // return 123; // Ошибка: Type 'number' is not assignable to type 'void'
}

// Never требует, чтобы функция не завершалась нормальным return
function badNever(): never {
    throw new Error("Error");
    // return "done"; // Ошибка: A function returning 'never' cannot have a reachable end point
}

// Итог: Void используется для функций, которые завершаются без возврата значения,
// а never - для функций, которые никогда не завершаются нормальным образом (исключения, бесконечные циклы).