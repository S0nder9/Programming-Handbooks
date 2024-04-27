// Подглава 6.3: Асинхронные функции (async/await)

// Синтаксис async/await
/*
Асинхронные функции (async/await) - это специальный синтаксис для работы с асинхронными операциями в JavaScript. 
Он позволяет писать асинхронный код так, как будто он синхронный, что делает его более читаемым и понятным.
*/

// Пример синтаксиса async/await
async function fetchDataAsync() {
    try {
        const data = await fetchDataPromise; // Ожидание завершения промиса
        console.log("Данные успешно получены:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error; // Пробрасываем ошибку дальше
    }
}

fetchDataAsync();

/*
В этом примере создается асинхронная функция fetchDataAsync с ключевым словом async. 
Внутри функции используется ключевое слово await для ожидания завершения промиса fetchDataPromise. 
Когда промис успешно завершается, результат его выполнения сохраняется в переменной data. 
Если возникает ошибка, она обрабатывается в блоке catch.
*/

// Ошибки и обработка исключений
/*
Асинхронные функции могут использовать стандартный синтаксис блоков try/catch для обработки ошибок, как и синхронный код.
*/

// Комбинирование с промисами
/*
Асинхронные функции могут быть использованы с промисами, что позволяет легко комбинировать их для выполнения сложных асинхронных операций.
*/

// Пример комбинирования с промисами
async function fetchDataAndProcess() {
    try {
        const data = await fetchDataPromise;
        console.log("Данные успешно получены:", data);
        const processedData = await processData(data);
        console.log("Данные успешно обработаны:", processedData);
        return processedData;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}

fetchDataAndProcess();

/*
В этом примере асинхронная функция fetchDataAndProcess использует ключевое слово await для ожидания завершения промисов fetchDataPromise и processData. 
Результаты обеих операций сохраняются в переменных data и processedData соответственно.
*/
