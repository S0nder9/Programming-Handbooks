// Глава 5: Оптимизация и отладка асинхронного код

// Подглава 5.1: Оптимизация производительности асинхронных функций


// Минимизация количества запросов и операций

// Плохой подход: отправка нескольких запросов к серверу одновременно
async function fetchDataBad(urlArray) {
    const promises = urlArray.map(url => fetch(url));
    const responses = await Promise.all(promises);
    return responses.map(response => response.json());
}

// Хороший подход: отправка одного запроса к серверу с необходимыми параметрами
async function fetchDataGood(params) {
    const url = constructURL(params);
    const response = await fetch(url);
    return response.json();
}

// Использование кэширования для ускорения повторных запросов

// Простой кэш для хранения результатов запросов
const cache = {};

async function fetchDataWithCache(url) {
    if (cache[url]) {
        console.log("Данные загружены из кэша");
        return cache[url];
    } else {
        console.log("Данные загружены с сервера");
        const response = await fetch(url);
        const data = await response.json();
        cache[url] = data;
        return data;
    }
}

// В этом примере функция fetchDataBad отправляет несколько запросов к серверу одновременно для получения данных, что может быть неэффективно и нагружать сервер. Вместо этого, функция fetchDataGood отправляет только один запрос с необходимыми параметрами.

// Также в примере представлена функция fetchDataWithCache, которая использует простой механизм кэширования для хранения результатов запросов. При повторных запросах к тому же URL данные берутся из кэша, что ускоряет выполнение операций и снижает нагрузку на сервер.