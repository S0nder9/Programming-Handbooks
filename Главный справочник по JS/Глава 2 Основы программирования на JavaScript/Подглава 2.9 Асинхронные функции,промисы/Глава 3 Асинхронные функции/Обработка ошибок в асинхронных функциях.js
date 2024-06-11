// Глава 3: Асинхронные функции

// Пример обработки ошибок в асинхронной функции с помощью try...catch
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Произошла ошибка при загрузке данных:', error);
    }
}

fetchData();

// Пример обработки ошибок в цепочке асинхронных операций
async function processData() {
    try {
        const data = await fetchData();
        const processedData = await processDataAsync(data);
        console.log('Обработанные данные:', processedData);
    } catch (error) {
        console.error('Произошла ошибка при обработке данных:', error);
    }
}

async function processDataAsync(data) {
    return new Promise((resolve, reject) => {
        // В этом примере предполагается, что здесь происходит обработка данных,
        // которая может вызвать ошибку.
        setTimeout(() => {
            // Предположим, что произошла ошибка при обработке данных
            reject(new Error('Ошибка при обработке данных'));
        }, 1000);
    });
}

processData();
